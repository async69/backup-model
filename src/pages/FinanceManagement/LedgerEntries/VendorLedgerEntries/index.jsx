import React, { useState, useEffect, useContext } from "react";
import VendorLedgerEntries from "./VendorLedgerEntries";
import {
  selectFetchStatus,
  selectAddStatus,
  selectVendorLedgerEntries,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Finance/LedgerEntries/VendorLedgerEntries";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { MainContext } from "../../../../context/Main/";
import {
  setPageValues,
  getState,
} from "../../../../context/Main/States/Pagination";
import { activeTabs } from "../../LedgerEntries";

const Loader = ({
  fetchStatus,
  addStatus,
  vendorLedgerEntries,
  fetchVendorLedgerEntries,
  addVendorLedgerEntry,
  editStatus,
  editVendorLedgerEntry,
  deleteStatus,
  deleteVendorLedgerEntry,
  activeTab,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  const { rootState, dispatch } = useContext(MainContext);

  useEffect(() => {
    try {
      const {
        options: { offset, limit, onClick },
      } = getState(rootState);
      if (onClick && activeTab === activeTabs.VENDOR_LEDGER_ENTRY) {
        fetchVendorLedgerEntries([
          { key: "offset", value: offset },
          { key: "limit", value: limit },
        ]);
      }
    } catch (e) {}
  }, [getState(rootState)]);

  useEffect(() => {
    setFetchLock(false);
    fetchVendorLedgerEntries();
  }, [fetchVendorLedgerEntries, setFetchLock]);

  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching Vendor Ledger Entries");
      setFetchLock(true);
    } else {
      if (activeTab === activeTabs.VENDOR_LEDGER_ENTRY) {
        setPageValues(rootState, dispatch, response, "", activeTab);
      }
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Vendor Ledgers Entries");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Vendor Ledgers Entries");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Vendor Ledgers Entries");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addVendorLedgerEntry = (data) => {
    setAddLock(false);
    const requestBody = {
      bank_account_code: data.bankAccountCode ? data.bankAccountCode : "",
      branch_name: data.bankBranch ? data.bankBranch : "",
      account_number: data.bankAccountNumber
        ? Number(data.bankAccountNumber)
        : 0,
      is_active: data.isActive ? Boolean(data.isActive) : "",
      phone_no: data.phoneNumber ? data.phoneNumber : "",
      Postal_code: data.bankAccountCode ? data.bankAccountCode : "",
      fax_no: data.faxNumber ? data.faxNumber : "",
      email: data.emailAdress ? data.emailAdress : "",
      remarks: data.remarks ? data.remarks : "",
      bank: data.bankName ? data.bankName : "",
      charts_of_account: data.chartsOfAccountNumber
        ? data.chartsOfAccountNumber
        : "",
      currency: data.currency ? data.currency : "",
      region: data.region ? data.region : "",
      city: data.city ? data.city : "",
    };

    addVendorLedgerEntry(requestBody);
  };

  const _editVendorLedgerEntry = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id ? data.id : "",
      bank_account_code: data.bankAccountCode ? data.bankAccountCode : "",
      branch_name: data.bankBranch ? data.bankBranch : "",
      account_number: data.bankAccountNumber
        ? Number(data.bankAccountNumber)
        : 0,
      is_active: data.isActive ? Boolean(data.isActive) : "",
      phone_no: data.phoneNumber ? data.phoneNumber : "",
      Postal_code: data.bankAccountCode ? data.bankAccountCode : "",
      fax_no: data.faxNumber ? data.faxNumber : "",
      email: data.emailAdress ? data.emailAdress : "",
      remarks: data.remarks ? data.remarks : "",
      bank: data.bankName ? data.bankName : "",
      charts_of_account: data.chartsOfAccountNumber
        ? data.chartsOfAccountNumber
        : "",
      currency: data.currency ? data.currency : "",
      region: data.region ? data.region : "",
      city: data.city ? data.city : "",
    };

    editVendorLedgerEntry(requestBody);
  };

  const _deleteVendorLedgerEntry = (id) => {
    setDeleteLock(false);
    deleteVendorLedgerEntry(id);
  };

  return (
    <VendorLedgerEntries
      vendorLedgerEntries={vendorLedgerEntries}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addVendorLedgerEntry={_addVendorLedgerEntry}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editVendorLedgerEntry={_editVendorLedgerEntry}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteVendorLedgerEntry={_deleteVendorLedgerEntry}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  vendorLedgerEntries: selectVendorLedgerEntries(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchVendorLedgerEntries: (data = null) => dispatch(Fetch(data)),
  addVendorLedgerEntry: (data) => dispatch(Add(data)),
  editVendorLedgerEntry: (data) => dispatch(Edit(data)),
  deleteVendorLedgerEntry: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
