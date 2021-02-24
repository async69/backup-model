import React, { useState, useEffect, useContext } from "react";
import QualificationLevelType from "./QualificationLevelType";
import {
  selectFetchStatus,
  selectAddStatus,
  selectQualificationLevelTypes,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/HR/Setup/QualificationLevelType";
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
  fetchQualificationLevelTypes,
  addQualificationLevelType,
  editStatus,
  editQualificationLevelType,
  deleteStatus,
  deleteQualificationLevelType,
  qualificationLevelTypes,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    setData(qualificationLevelTypes);
  }, [qualificationLevelTypes, setData]);

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
    setData(FilterByName(qualificationLevelTypes, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchQualificationLevelTypes();
  }, [fetchQualificationLevelTypes, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Qualification Level Types");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status, errors } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      toast.error(String(Object.values(errors.errors)));
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Qualification Level Type");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status, errors } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      toast.error(String(Object.values(errors.errors)));
      toast.error("Failed editing Qualification Level Type");
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Qualification Level Type");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      toast.error(deleteStatus.errors.errors.detail[0]);
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Qualification Level Type");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addQualificationLevelType = (data) => {
    setAddLock(false);
    const requestBody = {
      name: data.name,
      code: data.code,
      remarks: data.remarks,
    };

    addQualificationLevelType(requestBody);
  };

  const _editQualificationLevelType = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      name: data.name,
      code: data.code,
      remarks: data.remarks,
    };

    editQualificationLevelType(requestBody);
  };

  const _deleteQualificationLevelType = (id) => {
    setDeleteLock(false);
    deleteQualificationLevelType(id);
  };

  return (
    <QualificationLevelType
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addQualificationLevelType={_addQualificationLevelType}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editQualificationLevelType={_editQualificationLevelType}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteQualificationLevelType={_deleteQualificationLevelType}
      qualificationLevelTypes={data}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  qualificationLevelTypes: selectQualificationLevelTypes(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchQualificationLevelTypes: () => dispatch(Fetch()),
  addQualificationLevelType: (data) => dispatch(Add(data)),
  editQualificationLevelType: (data) => dispatch(Edit(data)),
  deleteQualificationLevelType: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
