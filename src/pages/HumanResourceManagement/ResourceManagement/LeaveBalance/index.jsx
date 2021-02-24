import React, { useState, useEffect, useContext } from "react";
import LeaveBalance from "./LeaveBalance";
import {
  selectFetchStatus,
  selectAddStatus,
  selectLeaveBalances,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/HR/ResourceManagement/LeaveBalance";
import { selectLeaveTypes } from "store/HR/Setup/LeaveType";
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
  fetchLeaveBalances,
  addLeaveBalance,
  editStatus,
  editLeaveBalance,
  deleteStatus,
  deleteLeaveBalance,
  leaveBalances,
  employee,
  leaveTypes,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    setData(leaveBalances);
  }, [leaveBalances, setData]);

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
    setData(FilterByName(leaveBalances, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchLeaveBalances();
  }, [fetchLeaveBalances, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Leave Balances");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status, errors } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      toast.error(String(Object.values(errors.errors)));
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Leave Balance");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status, errors } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      toast.error(String(Object.values(errors.errors)));
      toast.error("Failed editing Leave Balance");
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Leave Balance");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      toast.error(deleteStatus.errors.errors.detail[0]);
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Leave Balance");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addLeaveBalance = (data) => {
    setAddLock(false);
    addLeaveBalance(data);
  };

  const _editLeaveBalance = (data) => {
    setEditLock(false);
    editLeaveBalance(data);
  };

  const _deleteLeaveBalance = (id) => {
    setDeleteLock(false);
    deleteLeaveBalance(id);
  };

  return (
    <LeaveBalance
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addLeaveBalance={_addLeaveBalance}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editLeaveBalance={_editLeaveBalance}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteLeaveBalance={_deleteLeaveBalance}
      leaveBalances={data}
      options={{ selectedEmployee: employee, leaveTypes }}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  leaveBalances: selectLeaveBalances(state),
  leaveTypes: selectLeaveTypes(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchLeaveBalances: () => dispatch(Fetch()),
  addLeaveBalance: (data) => dispatch(Add(data)),
  editLeaveBalance: (data) => dispatch(Edit(data)),
  deleteLeaveBalance: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
