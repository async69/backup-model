import React, { useState, useEffect } from "react";
import Bin from "./Bin";
import {
  selectFetchStatus,
  selectAddStatus,
  selectBins,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../../store/Inventory/Bin";
import { selectWarehouses } from "../../../../../store/Inventory/Warehouse";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../../constants/reduxStatus";

const Loader = ({
  fetchStatus,
  addStatus,
  Bins,
  fetchBins,
  addBin,
  editStatus,
  editBin,
  deleteStatus,
  deleteBin,
  Warehouses,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    setFetchLock(false);
    fetchBins();
  }, [fetchBins, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Bins");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Bin");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Bin");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Bin");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addBin = (data) => {
    setAddLock(false);
    const requestBody = {
      code: data.code,
      name: data.name,
      warehouse: data.warehouse,
      remarks: data.remarks,
    };

    addBin(requestBody);
  };

  const _editBin = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      code: data.code,
      name: data.name,
      warehouse: data.warehouse,
      remarks: data.remarks,
    };

    editBin(requestBody);
  };

  const _deleteBin = (id) => {
    setDeleteLock(false);
    deleteBin(id);
  };

  return (
    <Bin
      Bins={Bins}
      Warehouses={Warehouses}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addBin={_addBin}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editBin={_editBin}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteBin={_deleteBin}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  Bins: selectBins(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  Warehouses: selectWarehouses(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchBins: () => dispatch(Fetch()),
  addBin: (data) => dispatch(Add(data)),
  editBin: (data) => dispatch(Edit(data)),
  deleteBin: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
