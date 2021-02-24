import React, { useState, useEffect } from "react";
import NumberSeries from "./NumberSeries";
import {
  selectFetchStatus,
  selectAddStatus,
  selectNumberSeries,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../store/GeneralSetup/NumberSeries";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../constants/reduxStatus";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchNumberSeries,
  addNumberSeries,
  editStatus,
  editNumberSeries,
  deleteStatus,
  deleteNumberSeries,
  numberSeries,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    setFetchLock(false);
    fetchNumberSeries();
  }, [fetchNumberSeries, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Number Series");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Number Series");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Number Series");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Number Series");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addNumberSeries = (data) => {
    setAddLock(false);
    const requestBody = {
      feature_name: String(data.featureName),
      number_of_digits: Number(data.numberOfDigits),
      prefix: String(data.prefix),
      sufix: String(data.suffix),
      starting_number: Number(data.startingNumber),
      last_doc_number: String(data.endingNumber),
      remarks: String(data.remarks),
    };

    addNumberSeries(requestBody);
  };

  const _editNumberSeries = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      feature_name: String(data.featureName),
      number_of_digits: Number(data.numberOfDigits),
      prefix: String(data.prefix),
      sufix: String(data.suffix),
      starting_number: Number(data.startingNumber),
      last_doc_number: String(data.endingNumber),
      remarks: String(data.remarks),
    };

    editNumberSeries(requestBody);
  };

  const _deleteNumberSeries = (id) => {
    setDeleteLock(false);
    deleteNumberSeries(id);
  };

  return (
    <NumberSeries
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addNumberSeries={_addNumberSeries}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editNumberSeries={_editNumberSeries}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteNumberSeries={_deleteNumberSeries}
      numberSeries={numberSeries}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  numberSeries: selectNumberSeries(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchNumberSeries: () => dispatch(Fetch()),
  addNumberSeries: (data) => dispatch(Add(data)),
  editNumberSeries: (data) => dispatch(Edit(data)),
  deleteNumberSeries: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
