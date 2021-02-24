import React, { useState, useEffect, useContext } from "react";
import EmployeeSalary from "./EmployeePayrollSetup";
import {
  selectFetchStatus,
  selectAddStatus,
  selectEmployeePayrollSetups,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "store/HR/PayrollManagement/EmployeePayrollSetup";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "constants/reduxStatus";
import { SearchContext, MainContext } from "context/";
import { assignFilterComponent } from "context/Main/States/search";
import { FilterByName } from "helpers/Filter";
import { Input } from "reactstrap";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchEmployeeSalarys,
  addEmployeeSalary,
  editStatus,
  editEmployeeSalary,
  deleteStatus,
  deleteEmployeeSalary,
  employeeSalarys,

  employee,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    setData(employeeSalarys);
  }, [employeeSalarys, setData]);

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
    setData(FilterByName(employeeSalarys, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchEmployeeSalarys();
  }, [fetchEmployeeSalarys, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching EmployeeSalarys");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added EmployeeSalary");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited EmployeeSalary");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted EmployeeSalary");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addEmployeeSalary = (data) => {
    setAddLock(false);
    addEmployeeSalary(data);
  };

  const _editEmployeeSalary = (data) => {
    setEditLock(false);

    editEmployeeSalary(data);
  };

  const _deleteEmployeeSalary = (id) => {
    setDeleteLock(false);
    deleteEmployeeSalary(id);
  };

  return (
    <EmployeeSalary
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addEmployeeSalary={_addEmployeeSalary}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editEmployeeSalary={_editEmployeeSalary}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteEmployeeSalary={_deleteEmployeeSalary}
      employeeSalarys={data}
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
  employeeSalarys: selectEmployeePayrollSetups(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchEmployeeSalarys: () => dispatch(Fetch()),
  addEmployeeSalary: (data) => dispatch(Add(data)),
  editEmployeeSalary: (data) => dispatch(Edit(data)),
  deleteEmployeeSalary: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
