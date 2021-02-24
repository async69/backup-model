import React, { useState, useEffect } from "react";
import UnitOfMeasurments from "./UnitofMeasurment";
import {
  selectFetchStatus,
  selectAddStatus,
  selectUOMs,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Inventory/UnitOfMeasurement";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { toggle } from "../../../../store/ModalData";

const Loader = ({
  fetchStatus,
  addStatus,
  UOMs,
  fetchUOMs,
  addUOM,
  editStatus,
  editUOM,
  deleteStatus,
  deleteUOM,
  toggle,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  const doneAdd = addStatus.status === reduxStatus.success && !addLock;
  const doneEdit = editStatus.status === reduxStatus.success && !editLock;
  const doneDelete = deleteStatus.status === reduxStatus.success && !deleteLock;

  useEffect(() => {
    setFetchLock(false);
    fetchUOMs();
  }, [fetchUOMs, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching UOMs");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added UOM");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited UOM");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted UOM");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addUOM = (data) => {
    setAddLock(false);
    const requestBody = {
      name: data.name,
      code: data.code,
      remarks: data.remarks,
    };

    addUOM(requestBody);
  };

  const _editUOM = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      name: data.name,
      code: data.code,
      remarks: data.remarks,
    };

    editUOM(requestBody);
  };

  const _deleteUOM = (id) => {
    setDeleteLock(false);
    deleteUOM(id);
  };

  useEffect(() => {
    if (doneAdd || doneEdit || doneDelete) {
      toggle({ type: "CLOSE" });
    }
  }, [doneAdd, doneEdit, doneDelete]);

  return (
    <UnitOfMeasurments
      UOMs={UOMs}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addUOM={_addUOM}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editUOM={_editUOM}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteUOM={_deleteUOM}
      _toggle={toggle}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  UOMs: selectUOMs(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchUOMs: () => dispatch(Fetch()),
  addUOM: (data) => dispatch(Add(data)),
  editUOM: (data) => dispatch(Edit(data)),
  deleteUOM: (id) => dispatch(Remove(id)),
  toggle: (data) => dispatch(toggle(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
