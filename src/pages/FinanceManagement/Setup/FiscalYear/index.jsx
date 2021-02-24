import React, { useState, useEffect } from "react";
import FiscalYear from "./FiscalYear";
import {
  selectFetchStatus,
  selectAddStatus,
  selectFiscalYears,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Finance/Setup/FiscalYear";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { selectCompany } from "../../../../store/GeneralSetup/Company/";

const Loader = ({
  fiscalYears,
  fetchStatus,
  addStatus,
  fetchFiscalYears,
  addFiscalYear,
  editStatus,
  editFiscalYear,
  deleteStatus,
  deleteFiscalYear,
  companyID,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    setFetchLock(false);
    fetchFiscalYears();
  }, [fetchFiscalYears, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching Fiscal Years");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Saved Fiscal Year");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Fiscal Year");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Fiscal Year");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addFiscalYear = (data) => {
    setAddLock(false);
    const requestBody = {
      year: data.year ? data.year : "",
      start_date: data.start_date ? data.start_date : "",
      end_date: data.end_date ? data.end_date : "",
      state: data.state ? data.state : "",
      company: companyID,
      fiscal_year_period: data.good_receiving_note_lines.map((line) => ({
        name: line.name,
        start_date: line.start_date,
        end_date: line.end_date,
        state: line.state,
      })),
    };

    addFiscalYear(requestBody);
  };

  const _editFiscalYear = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id ? data.id : "",
      year: data.year ? data.year : "",
      start_date: data.start_date ? data.start_date : "",
      end_date: data.end_date ? data.end_date : "",
      state: data.state ? data.state : "",
      company: companyID,
      fiscal_year_period: data.good_receiving_note_lines.map((line) => ({
        name: line.name,
        start_date: line.start_date,
        end_date: line.end_date,
        state: line.state,
      })),
    };

    editFiscalYear(requestBody);
  };

  const _deleteFiscalYear = (id) => {
    setDeleteLock(false);
    deleteFiscalYear(id);
  };

  return (
    <FiscalYear
      fiscalYears={fiscalYears}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addFiscalYear={_addFiscalYear}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editFiscalYear={_editFiscalYear}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteFiscalYear={_deleteFiscalYear}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  fiscalYears: selectFiscalYears(state),
  companyID: selectCompany(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchFiscalYears: () => dispatch(Fetch()),
  addFiscalYear: (data) => dispatch(Add(data)),
  editFiscalYear: (data) => dispatch(Edit(data)),
  deleteFiscalYear: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
