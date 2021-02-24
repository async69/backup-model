import React, { useState, useEffect, useContext } from "react";
import EmployeeOvertime from "./EmployeeOvertime";
import {
  selectFetchStatus,
  selectAddStatus,
  selectEmployeeOvertimes,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "store/HR/PayrollManagement/EmployeeOvertime";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "constants/reduxStatus";
import { SearchContext, MainContext } from "context/";
import {
  assignFilterComponent,
  setLockComponent,
} from "context/Main/States/search";
import { FilterByName } from "helpers/Filter";
import { Input } from "reactstrap";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchEmployeeOvertimes,
  addEmployeeOvertime,
  editStatus,
  editEmployeeOvertime,
  deleteStatus,
  deleteEmployeeOvertime,
  employeeOvertimes,

  employee,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    setData(employeeOvertimes);
  }, [employeeOvertimes, setData]);

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
    setLockComponent({}, dispatch, false);
    assignFilterComponent({}, dispatch, FilterTypes);
  }, [dispatch]);

  useEffect(() => {
    setData(FilterByName(employeeOvertimes, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchEmployeeOvertimes();
  }, [fetchEmployeeOvertimes, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching EmployeeOvertimes");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added EmployeeOvertime");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited EmployeeOvertime");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted EmployeeOvertime");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addEmployeeOvertime = (data) => {
    setAddLock(false);
    addEmployeeOvertime(data);
  };

  const _editEmployeeOvertime = (data) => {
    setEditLock(false);

    editEmployeeOvertime(data);
  };

  const _deleteEmployeeOvertime = (id) => {
    setDeleteLock(false);
    deleteEmployeeOvertime(id);
  };

  return (
    <EmployeeOvertime
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addEmployeeOvertime={_addEmployeeOvertime}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editEmployeeOvertime={_editEmployeeOvertime}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteEmployeeOvertime={_deleteEmployeeOvertime}
      employeeOvertimes={data}
      options={{ employee }}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  employeeOvertimes: selectEmployeeOvertimes(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchEmployeeOvertimes: () => dispatch(Fetch()),
  addEmployeeOvertime: (data) => dispatch(Add(data)),
  editEmployeeOvertime: (data) => dispatch(Edit(data)),
  deleteEmployeeOvertime: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
