import React, { useState, useEffect } from "react";
import AccountTypes from "./AccountType";
import {
  selectFetchStatus,
  selectAddStatus,
  selectAccountTypes,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../store/GeneralSetup/AccountTypes";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../constants/reduxStatus";
import { toggle } from "../../../store/ModalData";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchAccountTypes,
  addAccountType,
  editStatus,
  editAccountType,
  deleteStatus,
  deleteAccountType,
  accountTypes,
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
    fetchAccountTypes();
  }, [fetchAccountTypes, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching AccountTypes");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added AccountType");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited AccountType");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted AccountType");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addAccountType = (data) => {
    setAddLock(false);
    const requestBody = {
      id: data.id,
      name: data.name,
      number_of_digits: data.number_of_digits,
      starting_number: data.starting_number,
    };

    addAccountType(requestBody);
  };

  const _editAccountType = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      name: data.name,
      number_of_digits: data.number_of_digits,
      starting_number: data.starting_number,
    };

    editAccountType(requestBody);
  };

  const _deleteAccountType = (id) => {
    setDeleteLock(false);
    deleteAccountType(id);
  };

  useEffect(() => {
    if (doneAdd || doneEdit || doneDelete) {
      toggle({ type: "CLOSE" });
    }
  }, [doneAdd, doneEdit, doneDelete]);

  return (
    <AccountTypes
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addAccountType={_addAccountType}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editAccountType={_editAccountType}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteAccountType={_deleteAccountType}
      _toggle={toggle}
      accountTypes={accountTypes}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  accountTypes: selectAccountTypes(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchAccountTypes: () => dispatch(Fetch()),
  addAccountType: (data) => dispatch(Add(data)),
  editAccountType: (data) => dispatch(Edit(data)),
  deleteAccountType: (id) => dispatch(Remove(id)),
  toggle: (data) => dispatch(toggle(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
