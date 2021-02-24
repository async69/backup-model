import React, { useState, useEffect } from "react";
import EntryType from "./EntryType";
import {
  selectFetchStatus,
  selectAddStatus,
  selectEntryTypes,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Inventory/EntryType";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { toggle } from "../../../../store/ModalData/";

const Loader = ({
  fetchStatus,
  addStatus,
  entryTypes,
  fetchEntryTypes,
  addEntryType,
  editStatus,
  editEntryType,
  deleteStatus,
  deleteEntryType,
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
    fetchEntryTypes();
  }, [fetchEntryTypes, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Entry Types");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Entry Type");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Entry Type");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Entry Type");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addEntryType = (data) => {
    setAddLock(false);
    const requestBody = {
      name: data.name,
      remark: data.remarks,
    };

    addEntryType(requestBody);
  };

  const _editEntryType = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      name: data.name,
      remark: data.remarks,
    };

    editEntryType(requestBody);
  };

  const _deleteEntryType = (id) => {
    setDeleteLock(false);
    deleteEntryType(id);
  };

  useEffect(() => {
    if (doneAdd || doneEdit || doneDelete) {
      toggle({ type: "CLOSE" });
    }
  }, [doneAdd, doneEdit, doneDelete]);

  return (
    <EntryType
      entryTypes={entryTypes}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addEntryType={_addEntryType}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editEntryType={_editEntryType}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteEntryType={_deleteEntryType}
      _toggle={toggle}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  entryTypes: selectEntryTypes(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchEntryTypes: () => dispatch(Fetch()),
  addEntryType: (data) => dispatch(Add(data)),
  editEntryType: (data) => dispatch(Edit(data)),
  deleteEntryType: (id) => dispatch(Remove(id)),
  toggle: (data) => dispatch(toggle(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
