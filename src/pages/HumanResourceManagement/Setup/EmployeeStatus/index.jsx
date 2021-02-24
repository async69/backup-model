import React, { useState, useEffect, useContext } from "react";
import EmployeeStatus from "./EmployeeStatus";
import {
  selectFetchStatus,
  selectAddStatus,
  selectEmployeeStatuses,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/HR/Setup/EmployeeStatus";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { SearchContext, MainContext } from "../../../../context/";
import { assignFilterComponent } from "../../../../context/Main/States/search";
import { FilterByName } from "../../../../helpers/Filter";
import { Input } from "reactstrap";
import entryTypeNames from "constants/entryTypeNames";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchEmployeeStatuss,
  addEmployeeStatus,
  editStatus,
  editEmployeeStatus,
  deleteStatus,
  deleteEmployeeStatus,
  employeeStatuses,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    setData(employeeStatuses);
  }, [employeeStatuses, setData]);

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
    setData(FilterByName(employeeStatuses, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchEmployeeStatuss();
  }, [fetchEmployeeStatuss, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Employee Statuses");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status, errors } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      toast.error(String(Object.values(errors.errors)));
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Employee Status");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status, errors } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      toast.error(String(Object.values(errors.errors)));
      toast.error("Failed editing Employee Status");
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Employee Status");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      toast.error(deleteStatus.errors.errors.detail[0]);
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Employee Status");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addEmployeeStatus = (data) => {
    setAddLock(false);
    const requestBody = {
      name: data.name,
      code: data.code,
      type: entryTypeNames.EmployeStatus,
      remarks: data.remarks,
    };

    addEmployeeStatus(requestBody);
  };

  const _editEmployeeStatus = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      name: data.name,
      code: data.code,
      type: entryTypeNames.EmployeStatus,
      remarks: data.remarks,
    };

    editEmployeeStatus(requestBody);
  };

  const _deleteEmployeeStatus = (id) => {
    setDeleteLock(false);
    deleteEmployeeStatus(id);
  };

  return (
    <EmployeeStatus
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addEmployeeStatus={_addEmployeeStatus}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editEmployeeStatus={_editEmployeeStatus}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteEmployeeStatus={_deleteEmployeeStatus}
      employeeStatuses={data}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  employeeStatuses: selectEmployeeStatuses(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchEmployeeStatuss: () => dispatch(Fetch()),
  addEmployeeStatus: (data) => dispatch(Add(data)),
  editEmployeeStatus: (data) => dispatch(Edit(data)),
  deleteEmployeeStatus: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
