import React, { useState, useEffect, useContext } from "react";
import DisciplinaryAction from "./DisciplinaryAction";
import {
  selectFetchStatus,
  selectAddStatus,
  selectDisciplinaryActions,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/HR/ResourceManagement/DisciplinaryAction";
import { selectDisciplinaryActionTypes } from "store/HR/Setup/DisciplinaryActionType";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { SearchContext, MainContext } from "../../../../context";
import { assignFilterComponent } from "../../../../context/Main/States/search";
import { FilterByName } from "../../../../helpers/Filter";
import { Input } from "reactstrap";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchDisciplinaryAction,
  addDisciplinaryAction,
  editStatus,
  editDisciplinaryAction,
  deleteStatus,
  deleteDisciplinaryAction,
  disciplinaryActions,
  employee,
  disciplinaryActionTypes,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    setData(disciplinaryActions);
  }, [disciplinaryActions, setData]);

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
    setData(FilterByName(disciplinaryActions, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchDisciplinaryAction();
  }, [fetchDisciplinaryAction, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching DisciplinaryAction");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status, errors } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      toast.error(String(Object.values(errors.errors)));
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added DisciplinaryAction");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status, errors } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      toast.error(String(Object.values(errors.errors)));
      toast.error("Failed editing DisciplinaryAction");
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited DisciplinaryAction");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      toast.error(deleteStatus.errors.errors.detail[0]);
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted DisciplinaryAction");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addDisciplinaryAction = (data) => {
    setAddLock(false);
    addDisciplinaryAction(data);
  };

  const _editDisciplinaryAction = (data) => {
    setEditLock(false);
    editDisciplinaryAction(data);
  };

  const _deleteDisciplinaryAction = (id) => {
    setDeleteLock(false);
    deleteDisciplinaryAction(id);
  };

  return (
    <DisciplinaryAction
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addDisciplinaryAction={_addDisciplinaryAction}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editDisciplinaryAction={_editDisciplinaryAction}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteDisciplinaryAction={_deleteDisciplinaryAction}
      disciplinaryActions={data}
      options={{ selectedEmployee: employee, disciplinaryActionTypes }}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  disciplinaryActions: selectDisciplinaryActions(state),
  disciplinaryActionTypes: selectDisciplinaryActionTypes(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchDisciplinaryAction: () => dispatch(Fetch()),
  addDisciplinaryAction: (data) => dispatch(Add(data)),
  editDisciplinaryAction: (data) => dispatch(Edit(data)),
  deleteDisciplinaryAction: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
