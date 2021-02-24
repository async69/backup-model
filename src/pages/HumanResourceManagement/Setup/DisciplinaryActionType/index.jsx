import React, { useState, useEffect, useContext } from "react";
import DisciplinaryActionType from "./DisciplinaryActionType";
import {
  selectFetchStatus,
  selectAddStatus,
  selectDisciplinaryActionTypes,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/HR/Setup/DisciplinaryActionType";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { SearchContext, MainContext } from "../../../../context/";
import { assignFilterComponent } from "../../../../context/Main/States/search";
import { FilterByName } from "../../../../helpers/Filter";
import { Input } from "reactstrap";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchDisciplinaryActionTypes,
  addDisciplinaryActionType,
  editStatus,
  editDisciplinaryActionType,
  deleteStatus,
  deleteDisciplinaryActionType,
  disciplinaryActionTypes,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    setData(disciplinaryActionTypes);
  }, [disciplinaryActionTypes, setData]);

  const { searchValue } = useContext(SearchContext);

  const { dispatch } = useContext(MainContext);
  const FilterTypes = () => (
    <Input
      type="select"
      onChange={({ currentTarget: { value } }) => setFilterType(value)}
    >
      <option value="name">By Name</option>
      <option value="code">By Code</option>
    </Input>
  );
  useEffect(() => {
    assignFilterComponent({}, dispatch, FilterTypes);
  }, [dispatch]);

  useEffect(() => {
    setData(FilterByName(disciplinaryActionTypes, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchDisciplinaryActionTypes();
  }, [fetchDisciplinaryActionTypes, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Disciplinary Action Types");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status, errors } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      toast.error(String(Object.values(errors.errors)));
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Disciplinary Action Type");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status, errors } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      toast.error(String(Object.values(errors.errors)));
      toast.error("Failed editing Disciplinary Action Type");
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Disciplinary Action Type");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      toast.error(deleteStatus.errors.errors.detail[0]);
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Disciplinary Action Type");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addDisciplinaryActionType = (data) => {
    setAddLock(false);
    const requestBody = {
      name: data.name,
      code: data.code,
      remarks: data.remarks,
    };

    addDisciplinaryActionType(requestBody);
  };

  const _editDisciplinaryActionType = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      name: data.name,
      code: data.code,
      remarks: data.remarks,
    };

    editDisciplinaryActionType(requestBody);
  };

  const _deleteDisciplinaryActionType = (id) => {
    setDeleteLock(false);
    deleteDisciplinaryActionType(id);
  };

  return (
    <DisciplinaryActionType
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addDisciplinaryActionType={_addDisciplinaryActionType}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editDisciplinaryActionType={_editDisciplinaryActionType}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteDisciplinaryActionType={_deleteDisciplinaryActionType}
      disciplinaryActionTypes={data}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  disciplinaryActionTypes: selectDisciplinaryActionTypes(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchDisciplinaryActionTypes: () => dispatch(Fetch()),
  addDisciplinaryActionType: (data) => dispatch(Add(data)),
  editDisciplinaryActionType: (data) => dispatch(Edit(data)),
  deleteDisciplinaryActionType: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
