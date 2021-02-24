import React, { useState, useEffect, useContext } from "react";
import EmployeeBonus from "./EmployeeBonus";
import {
  selectFetchStatus,
  selectAddStatus,
  selectEmployeeBonuss,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "store/HR/PayrollManagement/EmployeeBonus";
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
  fetchEmployeeBonuss,
  addEmployeeBonus,
  editStatus,
  editEmployeeBonus,
  deleteStatus,
  deleteEmployeeBonus,
  employeeBonuss,

  employee,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    setData(employeeBonuss);
  }, [employeeBonuss, setData]);

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
    setData(FilterByName(employeeBonuss, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchEmployeeBonuss();
  }, [fetchEmployeeBonuss, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching EmployeeBonuss");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added EmployeeBonus");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited EmployeeBonus");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted EmployeeBonus");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addEmployeeBonus = (data) => {
    setAddLock(false);
    addEmployeeBonus(data);
  };

  const _editEmployeeBonus = (data) => {
    setEditLock(false);

    editEmployeeBonus(data);
  };

  const _deleteEmployeeBonus = (id) => {
    setDeleteLock(false);
    deleteEmployeeBonus(id);
  };

  return (
    <EmployeeBonus
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addEmployeeBonus={_addEmployeeBonus}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editEmployeeBonus={_editEmployeeBonus}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteEmployeeBonus={_deleteEmployeeBonus}
      employeeBonuss={data}
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
  employeeBonuss: selectEmployeeBonuss(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchEmployeeBonuss: () => dispatch(Fetch()),
  addEmployeeBonus: (data) => dispatch(Add(data)),
  editEmployeeBonus: (data) => dispatch(Edit(data)),
  deleteEmployeeBonus: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
