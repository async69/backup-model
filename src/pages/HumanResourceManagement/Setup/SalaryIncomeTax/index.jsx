import React, { useState, useEffect, useContext } from "react";
import SalaryIncomeTax from "./SalaryIncomeTax";
import {
  selectFetchStatus,
  selectAddStatus,
  selectSalaryIncomeTaxes,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/HR/Setup/SalaryIncomeTax";
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
  selectSalaryIncomeTaxes,
  addSalaryIncomeTax,
  editStatus,
  editSalaryIncomeTax,
  deleteStatus,
  deleteSalaryIncomeTax,
  salaryIncomeTaxes,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    setData(salaryIncomeTaxes);
  }, [salaryIncomeTaxes, setData]);

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
    setData(FilterByName(salaryIncomeTaxes, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    selectSalaryIncomeTaxes();
  }, [selectSalaryIncomeTaxes, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Salary Income Taxes");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status, errors } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      toast.error(String(Object.values(errors.errors)));
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Salary Income Tax");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status, errors } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      toast.error(String(Object.values(errors.errors)));
      toast.error("Failed editing Salary Income Tax");
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Salary Income Tax");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Salary Income Tax");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addSalaryIncomeTax = (data) => {
    setAddLock(false);
    const requestBody = {
      from_salary: data.from_salary,
      to_salary: data.to_salary,
      deduction: data.deduction,
      tax: data.tax,
      remarks: data.remarks,
    };

    addSalaryIncomeTax(requestBody);
  };

  const _editSalaryIncomeTax = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      from_salary: data.from_salary,
      to_salary: data.to_salary,
      deduction: data.deduction,
      tax: data.tax,
      remarks: data.remarks,
    };

    editSalaryIncomeTax(requestBody);
  };

  const _deleteSalaryIncomeTax = (id) => {
    setDeleteLock(false);
    deleteSalaryIncomeTax(id);
  };

  return (
    <SalaryIncomeTax
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addSalaryIncomeTax={_addSalaryIncomeTax}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editSalaryIncomeTax={_editSalaryIncomeTax}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteSalaryIncomeTax={_deleteSalaryIncomeTax}
      salaryIncomeTaxes={data}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  salaryIncomeTaxes: selectSalaryIncomeTaxes(state),
});

const mapDispatchToProps = (dispatch) => ({
  selectSalaryIncomeTaxes: () => dispatch(Fetch()),
  addSalaryIncomeTax: (data) => dispatch(Add(data)),
  editSalaryIncomeTax: (data) => dispatch(Edit(data)),
  deleteSalaryIncomeTax: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
