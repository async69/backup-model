import React, { useState, useEffect, useContext } from "react";

import Employees from "./Employees";
import {
  selectFetchStatus,
  selectAddStatus,
  selectEmployees,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "store/HR/ResourceManagement/Employee";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "constants/reduxStatus";
import { SearchContext, MainContext } from "context/";
import { assignFilterComponent } from "context/Main/States/search";
import { FilterByName } from "helpers/Filter";
import { Input } from "reactstrap";
import employmentTypes from "static/assets/options/employmentType.json";
import maritalStatuses from "static/assets/options/maritalStatus.json";
import { selectDepartments } from "store/HR/Setup/Department";
import { selectPositions } from "store/HR/Setup/Position";
import { selectPositionLevels } from "store/HR/Setup/PositionLevel";
import { selectNationalities } from "store/HR/Setup/Nationality";
import { selectLanguages } from "store/HR/Setup/Language";
import { selectEmployeeStatuses } from "store/HR/Setup/EmployeeStatus";
import { selectCities } from "store/GeneralSetup/Cities";
import { selectBanks } from "store/Finance/MasterData/Bank";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchEmployees,
  addEmployee,
  editStatus,
  editEmployee,
  deleteStatus,
  deleteEmployee,
  employees,

  banks,
  departments,
  positionLevels,
  positions,
  cities,
  nationalities,
  languages,
  employeeStatuses,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    setData(employees);
  }, [employees, setData]);

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
    setData(FilterByName(employees, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchEmployees();
  }, [fetchEmployees, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Employees");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Employee");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Employee");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Employee");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addEmployee = (data) => {
    setAddLock(false);
    const formData = new FormData();
    for (var key in data) {
      formData.append(key, data[key]);
    }
    addEmployee(formData);
  };

  const _editEmployee = (data) => {
    setEditLock(false);

    const formData = new FormData();
    for (var key in data) {
      formData.append(key, data[key]);
    }

    editEmployee(formData);
  };

  const _deleteEmployee = (id) => {
    setDeleteLock(false);
    deleteEmployee(id);
  };

  return (
    <Employees
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addEmployee={_addEmployee}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editEmployee={_editEmployee}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteEmployee={_deleteEmployee}
      employees={data}
      options={{
        employmentTypes,
        maritalStatuses,
        departments,
        positionLevels,
        positions,
        cities,
        nationalities,
        languages,
        employeeStatuses,
        employees,
        banks,
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  employees: selectEmployees(state),

  departments: selectDepartments(state),
  positionLevels: selectPositionLevels(state),
  positions: selectPositions(state),
  cities: selectCities(state),
  nationalities: selectNationalities(state),
  languages: selectLanguages(state),
  employeeStatuses: selectEmployeeStatuses(state),
  banks: selectBanks(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchEmployees: () => dispatch(Fetch()),
  addEmployee: (data) => dispatch(Add(data)),
  editEmployee: (data) => dispatch(Edit(data)),
  deleteEmployee: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
