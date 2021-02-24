import React, { useState, useEffect, useContext } from "react";
import EmployeeSlip from "./EmployeeSlip";
import {
  selectFetchStatus,
  selectAddStatus,
  selectEmployeeSlips,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "store/HR/PayrollManagement/EmployeeSlip";
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
import { startOfMonth, endOfMonth } from "helpers/date";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchEmployeeSlips,
  addEmployeeSlip,
  editStatus,
  editEmployeeSlip,
  deleteStatus,
  deleteEmployeeSlip,
  employeeSlips,

  employee,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType] = useState("name");

  const [startDate, setStartDate] = useState(startOfMonth);
  const [endDate, setEndDate] = useState(endOfMonth);

  useEffect(() => {
    setData(employeeSlips);
  }, [employeeSlips, setData]);

  const { searchValue } = useContext(SearchContext);

  const { dispatch } = useContext(MainContext);
  // Filtering component by document_number and posting date
  const FilterTypes = () => {
    const [start, setStart] = useState(startOfMonth);
    const [end, setEnd] = useState(endOfMonth);

    useEffect(() => setStartDate(start), [start, setStartDate]);
    useEffect(() => setEndDate(end), [end, setEndDate]);

    return (
      <>
        Start Date{" "}
        <Input
          type="date"
          value={start}
          onChange={({ currentTarget: { value } }) => setStart(value)}
        />
        End Date
        <Input
          type="date"
          value={end}
          onChange={({ currentTarget: { value } }) => setEnd(value)}
        />
      </>
    );
  };
  useEffect(() => {
    setLockComponent({}, dispatch, false);
    assignFilterComponent({}, dispatch, FilterTypes);
  }, [dispatch]);

  useEffect(() => {
    setData(FilterByName(employeeSlips, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    if (employee) {
      fetchEmployeeSlips([
        { key: "from_date", value: startDate },
        { key: "to_date", value: endDate },
        { key: "employee", value: employee.id },
      ]);
    }
  }, [fetchEmployeeSlips, setFetchLock, startDate, endDate]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added EmployeeSlip");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited EmployeeSlip");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted EmployeeSlip");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addEmployeeSlip = (data) => {
    setAddLock(false);
    addEmployeeSlip(data);
  };

  const _editEmployeeSlip = (data) => {
    setEditLock(false);

    editEmployeeSlip(data);
  };

  const _deleteEmployeeSlip = (id) => {
    setDeleteLock(false);
    deleteEmployeeSlip(id);
  };

  return (
    <EmployeeSlip
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addEmployeeSlip={_addEmployeeSlip}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editEmployeeSlip={_editEmployeeSlip}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteEmployeeSlip={_deleteEmployeeSlip}
      employeeSlips={data}
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
  employeeSlips: selectEmployeeSlips(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchEmployeeSlips: (data = null) => dispatch(Fetch(data)),
  addEmployeeSlip: (data) => dispatch(Add(data)),
  editEmployeeSlip: (data) => dispatch(Edit(data)),
  deleteEmployeeSlip: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
