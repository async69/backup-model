import React, { useState, useEffect } from "react";
import Period from "./Period";
import {
  selectFetchStatus,
  selectAddStatus,
  selectPeriods,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Finance/Setup/Period/";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { selectFiscalYears } from "../../../../store/Finance/Setup/FiscalYear";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchPeriods,
  addPeriod,
  editStatus,
  editPeriod,
  deleteStatus,
  deletePeriod,
  periods,
  fiscalYears,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    setFetchLock(false);
    fetchPeriods();
  }, [fetchPeriods, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching Periods");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Period");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Period");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Period");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addPeriod = (data) => {
    setAddLock(false);
    const requestBody = {
      name: data.name ? data.name : "",
      start_date: data.start_date ? data.start_date : "",
      end_date: data.end_date ? data.end_date : "",
      state: data.state ? data.state : "",
      fiscal_year: data.fiscalYear ? data.fiscalYear : "",
    };

    addPeriod(requestBody);
  };

  const _editPeriod = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id ? data.id : "",
      name: data.name ? data.name : "",
      start_date: data.start_date ? data.start_date : "",
      end_date: data.end_date ? data.end_date : "",
      state: data.state ? data.state : "",
      fiscal_year: data.fiscalYear ? data.fiscalYear : "",
    };

    editPeriod(requestBody);
  };

  const _deletePeriod = (id) => {
    setDeleteLock(false);
    deletePeriod(id);
  };
  return (
    <Period
      periods={periods}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addPeriod={_addPeriod}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editPeriod={_editPeriod}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deletePeriod={_deletePeriod}
      fiscalYears={fiscalYears}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  periods: selectPeriods(state),
  fiscalYears: selectFiscalYears(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPeriods: () => dispatch(Fetch()),
  addPeriod: (data) => dispatch(Add(data)),
  editPeriod: (data) => dispatch(Edit(data)),
  deletePeriod: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
