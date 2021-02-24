import React, { useState, useEffect } from "react";
import Banks from "./Bank";
import {
  selectFetchStatus,
  selectAddStatus,
  selectBanks,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Finance/MasterData/Bank";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { toggle } from "../../../../store/ModalData";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchBanks,
  addBank,
  editStatus,
  editBank,
  deleteStatus,
  deleteBank,
  banks,
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
    fetchBanks();
  }, [fetchBanks, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Banks");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Bank");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Bank");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Bank");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addBank = (data) => {
    setAddLock(false);
    const requestBody = {
      id: data.id,
      name: data.name,
      code: data.code,
      bic: data.bic,
    };

    addBank(requestBody);
  };

  const _editBank = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      name: data.name,
      code: data.code,
      bic: data.bic,
    };

    editBank(requestBody);
  };

  const _deleteBank = (id) => {
    setDeleteLock(false);
    deleteBank(id);
  };

  useEffect(() => {
    if (doneAdd || doneEdit || doneDelete) {
      toggle({ type: "CLOSE" });
    }
  }, [doneAdd, doneEdit, doneDelete]);

  return (
    <Banks
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addBank={_addBank}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editBank={_editBank}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteBank={_deleteBank}
      _toggle={toggle}
      banks={banks}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  banks: selectBanks(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchBanks: () => dispatch(Fetch()),
  addBank: (data) => dispatch(Add(data)),
  editBank: (data) => dispatch(Edit(data)),
  deleteBank: (id) => dispatch(Remove(id)),
  toggle: (data) => dispatch(toggle(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
