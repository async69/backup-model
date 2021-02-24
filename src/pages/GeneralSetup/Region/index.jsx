import React, { useState, useEffect } from "react";
import Regions from "./Region";
import {
  selectFetchStatus,
  selectAddStatus,
  selectRegions,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../store/GeneralSetup/Regions";
import { selectCountries } from "../../../store/GeneralSetup/Countries";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../constants/reduxStatus";
import { toggle } from "../../../store/ModalData";

const Loader = ({
  fetchStatus,
  addStatus,
  regions,
  fetchRegions,
  addRegion,
  editStatus,
  editRegion,
  deleteStatus,
  deleteRegion,
  countries,
  toggle,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    setFetchLock(false);
    fetchRegions();
  }, [fetchRegions, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Regions");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Region");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Region");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Region");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addRegion = (data) => {
    setAddLock(false);
    const requestBody = {
      name: data.name,
      code: data.code,
      country: data.countries,
      remarks: data.remarks,
    };

    addRegion(requestBody);
  };

  const _editRegion = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      name: data.name,
      code: data.code,
      country: data.countries,
      remarks: data.remarks,
    };

    editRegion(requestBody);
  };

  const _deleteRegion = (id) => {
    setDeleteLock(false);
    deleteRegion(id);
  };

  return (
    <Regions
      regions={regions}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addRegion={_addRegion}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editRegion={_editRegion}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteRegion={_deleteRegion}
      _toggle={toggle}
      countries={countries}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  regions: selectRegions(state),
  countries: selectCountries(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchRegions: () => dispatch(Fetch()),
  addRegion: (data) => dispatch(Add(data)),
  editRegion: (data) => dispatch(Edit(data)),
  deleteRegion: (id) => dispatch(Remove(id)),
  toggle: (data) => dispatch(toggle(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
