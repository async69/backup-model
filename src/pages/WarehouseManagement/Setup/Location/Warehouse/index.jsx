import React, { useState, useEffect } from "react";
import Warehouse from "./Warehouse";
import {
  selectFetchStatus,
  selectAddStatus,
  selectWarehouses,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../../store/Inventory/Warehouse";

import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../../constants/reduxStatus";

const Loader = ({
  fetchStatus,
  addStatus,
  Warehouses,
  fetchWarehouses,
  addWarehouse,
  editStatus,
  editWarehouse,
  deleteStatus,
  deleteWarehouse,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    setFetchLock(false);
    fetchWarehouses();
  }, [fetchWarehouses, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Warehouses");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Warehouse");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Warehouse");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Warehouse");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addWarehouse = (data) => {
    setAddLock(false);
    const requestBody = {
      code: data.code,
      name: data.name,
      location: data.location,
      is_bin_mandatory: data.is_bin_mandatory,
      remarks: data.remarks,
    };

    addWarehouse(requestBody);
  };

  const _editWarehouse = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      code: data.code,
      name: data.name,
      location: data.location,
      is_bin_mandatory: data.is_bin_mandatory,
      remarks: data.remarks,
    };

    editWarehouse(requestBody);
  };

  const _deleteWarehouse = (id) => {
    setDeleteLock(false);
    deleteWarehouse(id);
  };

  return (
    <Warehouse
      Warehouses={Warehouses}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addWarehouse={_addWarehouse}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editWarehouse={_editWarehouse}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteWarehouse={_deleteWarehouse}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  Warehouses: selectWarehouses(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchWarehouses: () => dispatch(Fetch()),
  addWarehouse: (data) => dispatch(Add(data)),
  editWarehouse: (data) => dispatch(Edit(data)),
  deleteWarehouse: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
