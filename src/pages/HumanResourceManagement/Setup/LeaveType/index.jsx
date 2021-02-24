import React, { useState, useEffect, useContext } from "react";
import LeaveType from "./LeaveType";
import {
  selectFetchStatus,
  selectAddStatus,
  selectLeaveTypes,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/HR/Setup/LeaveType";
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
  fetchLeaveTypes,
  addLeaveType,
  editStatus,
  editLeaveType,
  deleteStatus,
  deleteLeaveType,
  leaveTypes,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    setData(leaveTypes);
  }, [leaveTypes, setData]);

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
    setData(FilterByName(leaveTypes, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchLeaveTypes();
  }, [fetchLeaveTypes, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Leave Types");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status, errors } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      toast.error(String(Object.values(errors.errors)));
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Leave Type");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status, errors } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      toast.error(String(Object.values(errors.errors)));
      toast.error("Failed editing Leave Type");
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Leave Type");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      toast.error(deleteStatus.errors.errors.detail[0]);
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Leave Type");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addLeaveType = (data) => {
    setAddLock(false);
    const requestBody = {
      name: data.name,
      code: data.code,
      remarks: data.remarks,
    };

    addLeaveType(requestBody);
  };

  const _editLeaveType = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      name: data.name,
      code: data.code,
      remarks: data.remarks,
    };

    editLeaveType(requestBody);
  };

  const _deleteLeaveType = (id) => {
    setDeleteLock(false);
    deleteLeaveType(id);
  };

  return (
    <LeaveType
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addLeaveType={_addLeaveType}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editLeaveType={_editLeaveType}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteLeaveType={_deleteLeaveType}
      leaveTypes={data}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  leaveTypes: selectLeaveTypes(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchLeaveTypes: () => dispatch(Fetch()),
  addLeaveType: (data) => dispatch(Add(data)),
  editLeaveType: (data) => dispatch(Edit(data)),
  deleteLeaveType: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
