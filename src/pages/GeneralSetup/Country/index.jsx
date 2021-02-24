import React, { useState, useEffect } from "react";
import Countries from "./Country";
import {
  selectFetchStatus,
  selectAddStatus,
  selectCountries,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../store/GeneralSetup/Countries";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../constants/reduxStatus";
import { toggle } from "../../../store/ModalData";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchCountries,
  addCountry,
  editStatus,
  editCountry,
  deleteStatus,
  deleteCountry,
  countries,
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
    fetchCountries();
  }, [fetchCountries, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Countries");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Country");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Country");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Country");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addCountry = (data) => {
    setAddLock(false);
    const requestBody = {
      id: data.id,
      name: data.name,
      code: data.code,
      remarks: data.remarks,
    };

    addCountry(requestBody);
  };

  const _editCountry = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      name: data.name,
      code: data.code,
      remarks: data.remarks,
    };

    editCountry(requestBody);
  };

  const _deleteCountry = (id) => {
    setDeleteLock(false);
    deleteCountry(id);
  };

  useEffect(() => {
    if (doneAdd || doneEdit || doneDelete) {
      toggle({ type: "CLOSE" });
    }
  }, [doneAdd, doneEdit, doneDelete]);

  return (
    <Countries
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addCountry={_addCountry}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editCountry={_editCountry}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteCountry={_deleteCountry}
      _toggle={toggle}
      countries={countries}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  countries: selectCountries(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCountries: () => dispatch(Fetch()),
  addCountry: (data) => dispatch(Add(data)),
  editCountry: (data) => dispatch(Edit(data)),
  deleteCountry: (id) => dispatch(Remove(id)),
  toggle: (data) => dispatch(toggle(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
