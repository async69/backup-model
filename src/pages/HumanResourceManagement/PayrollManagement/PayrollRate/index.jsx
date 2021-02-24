import React, { useState, useEffect, useContext } from "react";
import Departments from "./PayrollRate";
import {
  selectFetchStatus,
  selectAddStatus,
  selectDepartments,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/HR/Setup/Department";
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
  fetchDepartments,
  addDepartment,
  editStatus,
  editDepartment,
  deleteStatus,
  deleteDepartment,
  departments,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    setData(departments);
  }, [departments, setData]);

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
    setData(FilterByName(departments, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchDepartments();
  }, [fetchDepartments, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Department");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status, errors } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      toast.error(String(Object.values(errors.errors)));
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Department");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status, errors } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      toast.error(String(Object.values(errors.errors)));
      toast.error("Failed editing Department");
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Department");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      toast.error(deleteStatus.errors.errors.detail[0]);
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Department");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addDepartment = (data) => {
    setAddLock(false);
    const requestBody = {
      name: data.name,
      code: data.code,
      remarks: data.remarks,
    };

    addDepartment(requestBody);
  };

  const _editDepartment = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      name: data.name,
      code: data.code,
      remarks: data.remarks,
    };

    editDepartment(requestBody);
  };

  const _deleteDepartment = (id) => {
    setDeleteLock(false);
    deleteDepartment(id);
  };

  return (
    <Departments
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addDepartment={_addDepartment}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editDepartment={_editDepartment}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteDepartment={_deleteDepartment}
      departments={data}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  departments: selectDepartments(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchDepartments: () => dispatch(Fetch()),
  addDepartment: (data) => dispatch(Add(data)),
  editDepartment: (data) => dispatch(Edit(data)),
  deleteDepartment: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
