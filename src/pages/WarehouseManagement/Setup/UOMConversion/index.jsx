import React, { useState, useEffect } from "react";
import UnitOfMeasurmentConversion from "./UnitOfMeasurmentConversion";
import {
  selectFetchStatus,
  selectAddStatus,
  selectUOMConversions,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Inventory/UnitConversion";
import { selectUOMs } from "../../../../store/Inventory/UnitOfMeasurement";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { toggle } from "../../../../store/ModalData";

const Loader = ({
  fetchStatus,
  addStatus,
  UOMConversions,
  fetchUOMConversions,
  addUOMConversion,
  editStatus,
  editUOMConversion,
  deleteStatus,
  deleteUOMConversion,
  toggle,
  UOMs,
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
    fetchUOMConversions();
  }, [fetchUOMConversions, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching UOM Conversions");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added UOM Conversion");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited UOM Conversion");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted UOM Conversion");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addUOMConversion = (data) => {
    setAddLock(false);
    const requestBody = {
      amount: data.amount,
      basic_unit_of_measurement: data.basic_unit_of_measurement,
      derived_unit_of_measurement: data.derived_unit_of_measurement,
      remarks: data.remarks,
    };

    addUOMConversion(requestBody);
  };

  const _editUOMConversion = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      amount: data.amount,
      basic_unit_of_measurement: data.basic_unit_of_measurement,
      derived_unit_of_measurement: data.derived_unit_of_measurement,
      remarks: data.remarks,
    };
    editUOMConversion(requestBody);
  };

  const _deleteUOMConversion = (id) => {
    setDeleteLock(false);
    deleteUOMConversion(id);
  };

  useEffect(() => {
    if (doneAdd || doneEdit || doneDelete) {
      toggle({ type: "CLOSE" });
    }
  }, [doneAdd, doneEdit, doneDelete]);

  return (
    <UnitOfMeasurmentConversion
      UOMConversions={UOMConversions}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addUOMConversion={_addUOMConversion}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editUOMConversion={_editUOMConversion}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteUOMConversion={_deleteUOMConversion}
      _toggle={toggle}
      UOMs={UOMs}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  UOMConversions: selectUOMConversions(state),
  UOMs: selectUOMs(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchUOMConversions: () => dispatch(Fetch()),
  addUOMConversion: (data) => dispatch(Add(data)),
  editUOMConversion: (data) => dispatch(Edit(data)),
  deleteUOMConversion: (id) => dispatch(Remove(id)),
  toggle: (data) => dispatch(toggle(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
