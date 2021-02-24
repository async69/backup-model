import React, { useState, useEffect, useContext } from "react";
import Employees from "./Employees";
import {
  selectFetchStatus,
  selectAddStatus,
  selectITEmployees,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
  selectPatchStatus,
  Patch,
} from "../../../store/IT/Employees/";
import { getPermissions } from "../../../store/Permissions/Mocked/";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../constants/reduxStatus";
import { MainContext } from "../../../context/Main/";
import {
  setDepartment,
  setPermissions,
} from "../../../context/Main/States/Department";
import {
  setPageValues,
  getState,
} from "../../../context/Main/States/Pagination";
import { activeTabs } from "../EmployeeTabs";

const Loader = ({
  fetchStatus,
  addStatus,
  employees,
  fetchITEmployees,
  addITEmployee,
  editStatus,
  editITEmployee,
  deleteStatus,
  deleteITEmployee,
  activeTab,
  patchStatus,
  patchITEmployee,
  permissions,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [patchLock, setPatchLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  const { rootState, dispatch } = useContext(MainContext);

  useEffect(() => {
    try {
      const {
        options: { offset, limit, onClick },
      } = getState(rootState);
      if (onClick && activeTab === activeTabs.PURCHASE_LEDGER_ENTRY) {
        fetchITEmployees([
          { key: "offset", value: offset },
          { key: "limit", value: limit },
        ]);
      }
    } catch (e) {}
  }, [getState(rootState)]);

  useEffect(() => {
    setFetchLock(false);
    if (!(employees.length > 0)) {
      fetchITEmployees();
    }
  }, [fetchITEmployees, setFetchLock]);

  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching LedgerEntries");
      setFetchLock(true);
    } else {
      if (activeTab === activeTabs.PURCHASE_LEDGER_ENTRY) {
        setPageValues(rootState, dispatch, response, "", activeTab);
      }
    }
  }, [fetchStatus, setFetchLock, activeTab, setPageValues]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      toast.error("Failed Adding Employee");
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Employee");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status, response } = editStatus;
    console.log("edited", response);
    if (status === reduxStatus.failure && !editLock) {
      toast.error("Failed Editing Employee");
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Employee");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status, response } = patchStatus;
    if (response) {
      setDepartment({}, dispatch, response.department);
      setPermissions({}, dispatch, permissions[response.department]);
    }
    if (status === reduxStatus.failure && !patchLock) {
      toast.error("Failed Patching Employee");
      setPatchLock(true);
    } else if (status === reduxStatus.success && !patchLock) {
      toast.success("Employee Account Added");
      setPatchLock(true);
    }
  }, [patchStatus, setPatchLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      toast.error("Failed Deleting Employee");
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Employee");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addITEmployee = () => {
    setAddLock(false);
    const requestBody = {};

    addITEmployee(requestBody);
  };

  const getLines = (lines = []) => {
    const columns = lines.map((line) => line.resource);
    const data = lines.map((line) => {
      let objectSet = {};
      objectSet.create = String(line.create) === "true";
      objectSet.read = String(line.read) === "true";
      objectSet.update = String(line.update) === "true";
      objectSet.delete = String(line.create) === "true";
      return objectSet;
    });
    const permissions = {};
    columns.forEach((resource, idx) => {
      permissions[resource] = data[idx];
    });
    setPermissions({}, dispatch, permissions);
  };

  const _editITEmployee = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id ? data.id : "",
      permissions: getLines(data.lines),
      ...data,
    };

    editITEmployee(requestBody);
  };

  const _patchEmployee = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      department: data.department,
      hasAccount: true,
    };
    patchITEmployee(requestBody);
  };

  const _deleteITEmployee = (id) => {
    setDeleteLock(false);
    deleteITEmployee(id);
  };

  return (
    <Employees
      employees={employees}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addITEmployee={_addITEmployee}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editITEmployee={_editITEmployee}
      donePatch={patchStatus.status === reduxStatus.success && !patchLock}
      patchEmployee={_patchEmployee}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteITEmployee={_deleteITEmployee}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  employees: selectITEmployees(state),
  editStatus: selectEditStatus(state),
  patchStatus: selectPatchStatus(state),
  deleteStatus: selectDeleteStatus(state),
  permissions: getPermissions(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchITEmployees: (data = null) => dispatch(Fetch(data)),
  addITEmployee: (data) => dispatch(Add(data)),
  editITEmployee: (data) => dispatch(Edit(data)),
  patchITEmployee: (data) => dispatch(Patch(data)),
  deleteITEmployee: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
