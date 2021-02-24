import React, { useState, useEffect } from "react";
import CostingMethod from "./CostingMethod";
import {
  selectFetchStatus,
  selectAddStatus,
  selectCostingMethods,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../store/GeneralSetup/CostingMethods";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../constants/reduxStatus";
import { toggle } from "../../../store/ModalData";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchCostingMethods,
  addCostingMethod,
  editStatus,
  editCostingMethod,
  deleteStatus,
  deleteCostingMethod,
  costingMethods,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    setFetchLock(false);
    fetchCostingMethods();
  }, [fetchCostingMethods, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching account types");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Account Type");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Account Type");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Account Type");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addCostingMethod = (data) => {
    setAddLock(false);
    const requestBody = {
      name: String(data.name),
    };

    addCostingMethod(requestBody);
  };

  const _editCostingMethod = (data) => {
    setEditLock(false);
    const requestBody = {
      id: String(data.id),
      name: String(data.name),
    };

    editCostingMethod(requestBody);
  };

  const _deleteCostingMethod = (id) => {
    setDeleteLock(false);
    deleteCostingMethod(id);
  };

  return (
    <CostingMethod
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addCostingMethod={_addCostingMethod}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editCostingMethod={_editCostingMethod}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteCostingMethod={_deleteCostingMethod}
      _toggle={toggle}
      costingMethods={costingMethods}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  costingMethods: selectCostingMethods(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCostingMethods: () => dispatch(Fetch()),
  addCostingMethod: (data) => dispatch(Add(data)),
  editCostingMethod: (data) => dispatch(Edit(data)),
  deleteCostingMethod: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
