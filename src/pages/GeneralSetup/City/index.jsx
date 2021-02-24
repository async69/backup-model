import React, { useState, useEffect } from "react";
import Cities from "./City";
import {
  selectFetchStatus,
  selectAddStatus,
  selectCities,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../store/GeneralSetup/Cities";
import { selectRegions } from "../../../store/GeneralSetup/Regions";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../constants/reduxStatus";
import { toggle } from "../../../store/ModalData";

const Loader = ({
  fetchStatus,
  addStatus,
  cities,
  fetchCities,
  addCity,
  editStatus,
  editCity,
  deleteStatus,
  deleteCity,
  regions,
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
    fetchCities();
  }, [fetchCities, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Cities");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added City");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited City");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted City");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addCity = (data) => {
    setAddLock(false);
    const requestBody = {
      name: data.name,
      code: data.code,
      region: data.regions,
      remark: data.remarks,
    };

    addCity(requestBody);
  };

  const _editCity = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      name: data.name,
      code: data.code,
      region: data.regions,
      remark: data.remarks,
    };

    editCity(requestBody);
  };

  const _deleteCity = (id) => {
    setDeleteLock(false);
    deleteCity(id);
  };

  useEffect(() => {
    if (doneAdd || doneEdit || doneDelete) {
      toggle({ type: "CLOSE" });
    }
  }, [doneAdd, doneEdit, doneDelete]);

  return (
    <Cities
      cities={cities}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addCity={_addCity}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editCity={_editCity}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteCity={_deleteCity}
      _toggle={toggle}
      regions={regions}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  cities: selectCities(state),
  regions: selectRegions(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCities: () => dispatch(Fetch()),
  addCity: (data) => dispatch(Add(data)),
  editCity: (data) => dispatch(Edit(data)),
  deleteCity: (id) => dispatch(Remove(id)),
  toggle: (data) => dispatch(toggle(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
