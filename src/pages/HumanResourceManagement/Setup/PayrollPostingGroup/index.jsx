import React, { useState, useEffect, useContext } from "react";
import PayrollPostingGroup from "./PayrollPostiongGroup";
import {
  selectFetchStatus,
  selectAddStatus,
  selectPyrollPostingGroups,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/HR/Setup/PayrollPostingGroup";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { SearchContext, MainContext } from "../../../../context";
import { assignFilterComponent } from "../../../../context/Main/States/search";
import { FilterByName } from "../../../../helpers/Filter";
import { Input } from "reactstrap";
import { selectChartOfAccounts } from "store/Finance/MasterData/ChartsOfAccounts/chartOfAccounts";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchPayrollPostingGroups,
  addPayrollPostingGroup,
  editStatus,
  editPayrollPostingGroup,
  deleteStatus,
  deletePayrollPostingGroup,
  payrollPostingGroups,
  chartOfAccounts,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    setData(payrollPostingGroups);
  }, [payrollPostingGroups, setData]);

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
    setData(FilterByName(payrollPostingGroups, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchPayrollPostingGroups();
  }, [fetchPayrollPostingGroups, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Payroll Posting Groups");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Payroll Posting Group");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Payroll Posting Group");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Payroll Posting Group");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addPayrollPostingGroup = (data) => {
    setAddLock(false);

    const requestBody = {
      salary_expense_account: data.salary_expense_account,
      overtime_account: data.overtime_account,
      employee_pension_account: data.employee_pension_account,
      transport_allowance_account: data.transport_allowance_account,
      loan_account: data.loan_account,
      local_sales_account: data.local_sales_account,
      income_tax_account: data.income_tax_account,
      pension_contribution_account: data.pension_contribution_account,
    };

    addPayrollPostingGroup(requestBody);
  };

  const _editPayrollPostingGroup = (data) => {
    setEditLock(false);
    console.log(data);
    const requestBody = {
      id: data.id,
      salary_expense_account: data.salary_expense_account,
      overtime_account: data.overtime_account,
      employee_pension_account: data.employee_pension_account,
      transport_allowance_account: data.transport_allowance_account,
      loan_account: data.loan_account,
      local_sales_account: data.local_sales_account,
      income_tax_account: data.income_tax_account,
      pension_contribution_account: data.pension_contribution_account,
    };
    editPayrollPostingGroup(requestBody);
  };

  const _deletePayrollPostingGroup = (id) => {
    setDeleteLock(false);
    deletePayrollPostingGroup(id);
  };

  return (
    <PayrollPostingGroup
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addPayrollPostingGroup={_addPayrollPostingGroup}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editPayrollPostingGroup={_editPayrollPostingGroup}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deletePayrollPostingGroup={_deletePayrollPostingGroup}
      payrollPostingGroups={data}
      chartOfAccounts={chartOfAccounts}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  payrollPostingGroups: selectPyrollPostingGroups(state),
  chartOfAccounts: selectChartOfAccounts(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPayrollPostingGroups: () => dispatch(Fetch()),
  addPayrollPostingGroup: (data) => dispatch(Add(data)),
  editPayrollPostingGroup: (data) => dispatch(Edit(data)),
  deletePayrollPostingGroup: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
