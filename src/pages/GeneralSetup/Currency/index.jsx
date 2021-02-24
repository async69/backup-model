import React, { useState, useEffect } from "react";
import Currency from "./Currency";
import {
  selectFetchStatus,
  selectAddStatus,
  selectCurrencies,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../store/GeneralSetup/Currencies";
import { selectCompany } from "store/GeneralSetup/Company"
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../constants/reduxStatus";
import { toggle } from "../../../store/ModalData";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchCurrencies,
  addCurrency,
  editStatus,
  editCurrency,
  deleteStatus,
  deleteCurrency,
  currencies,
  toggle,
  companyID,
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
    fetchCurrencies();
  }, [fetchCurrencies, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Currencies");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Currency");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Currency");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Currency");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addCurrency = (data) => {
    setAddLock(false);
    const requestBody = {
      name: String(data.name),
      symbol: String(data.symbol),
      accuracy: Number(data.accuracy),
      rounding_factor: Number(data.roundingFactor),
      company: companyID,
    };

    addCurrency(requestBody);
  };

  const _editCurrency = (data) => {
    const companyID = "0f1e28a7-7423-433b-87ec-242026272647";
    setEditLock(false);
    const requestBody = {
      id: String(data.id),
      name: String(data.name),
      symbol: String(data.symbol),
      accuracy: Number(data.accuracy),
      rounding_factor: Number(data.roundingFactor),
      company: companyID,
    };

    editCurrency(requestBody);
  };

  const _deleteCurrency = (id) => {
    setDeleteLock(false);
    deleteCurrency(id);
  };

  useEffect(() => {
    if (doneAdd || doneEdit || doneDelete) {
      toggle({ type: "CLOSE" });
    }
  }, [doneAdd, doneEdit, doneDelete]);

  return (
    <Currency
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addCurrency={_addCurrency}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editCurrency={_editCurrency}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteCurrency={_deleteCurrency}
      _toggle={toggle}
      currencies={currencies}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  currencies: selectCurrencies(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  companyID: selectCompany(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(Fetch()),
  addCurrency: (data) => dispatch(Add(data)),
  editCurrency: (data) => dispatch(Edit(data)),
  deleteCurrency: (id) => dispatch(Remove(id)),
  toggle: (data) => dispatch(toggle(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
