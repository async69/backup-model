import React, { useState, useEffect, useContext } from "react";
import PayrollRate from "./PayrollRate";
import {
  selectFetchStatus,
  selectAddStatus,
  selectPayrollRates,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/HR/Setup/PayrollRate";
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
  fetchPayrollRates,
  addPayrollRate,
  editStatus,
  editPayrollRate,
  deleteStatus,
  deletePayrollRate,
  payrollRates,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    setData(payrollRates);
  }, [payrollRates, setData]);

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
    setData(FilterByName(payrollRates, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchPayrollRates();
  }, [fetchPayrollRates, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Payroll Rate");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status, errors } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      toast.error(String(Object.values(errors.errors)));
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Payroll Rate");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status, errors } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      toast.error(String(Object.values(errors.errors)));
      toast.error("Failed editing Payroll Rate");
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Payroll Rate");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      toast.error(deleteStatus.errors.errors.detail[0]);
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Payroll Rate");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addPayrollRate = (data) => {
    setAddLock(false);
    const requestBody = {
      employee_pension_rate: data.employee_pension_rate,
      employer_pension_rate: data.employer_pension_rate,
      holiday_overtime_rate: data.holiday_overtime_rate,
      night_overtime_rate: data.night_overtime_rate,
      weekend_overtime_rate: data.weekend_overtime_rate,
      overtime_rate: data.overtime_rate,
      remarks: data.remarks,
    };

    addPayrollRate(requestBody);
  };

  const _editPayrollRate = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      employee_pension_rate: data.employee_pension_rate,
      employer_pension_rate: data.employer_pension_rate,
      holiday_overtime_rate: data.holiday_overtime_rate,
      night_overtime_rate: data.night_overtime_rate,
      weekend_overtime_rate: data.weekend_overtime_rate,
      overtime_rate: data.overtime_rate,
      remarks: data.remarks,
    };

    editPayrollRate(requestBody);
  };

  const _deletePayrollRate = (id) => {
    setDeleteLock(false);
    deletePayrollRate(id);
  };

  return (
    <PayrollRate
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addPayrollRate={_addPayrollRate}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editPayrollRate={_editPayrollRate}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deletePayrollRate={_deletePayrollRate}
      payrollRates={data}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  payrollRates: selectPayrollRates(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPayrollRates: () => dispatch(Fetch()),
  addPayrollRate: (data) => dispatch(Add(data)),
  editPayrollRate: (data) => dispatch(Edit(data)),
  deletePayrollRate: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
