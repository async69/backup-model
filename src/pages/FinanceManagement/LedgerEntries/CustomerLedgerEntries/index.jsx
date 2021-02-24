import React, { useState, useEffect, useContext } from "react";
import CustomerLedgerEntries from "./CustomerLedgerEntries";
import {
  selectFetchStatus,
  selectAddStatus,
  selectCustomerLedgerEntries,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Finance/LedgerEntries/CustomerLedgerEntries";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { toggle } from "../../../../store/ModalData/";
import { MainContext } from "../../../../context/Main/";
import {
  setPageValues,
  getState,
} from "../../../../context/Main/States/Pagination";
import { activeTabs } from "../../LedgerEntries";

const Loader = ({
  fetchStatus,
  addStatus,
  customerLedgerEntries,
  fetchCustomerLedgerEntries,
  addBankAccount,
  editStatus,
  editBankAccount,
  deleteStatus,
  deleteBankAccount,
  toggle,
  activeTab,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  const doneAdd = addStatus.status === reduxStatus.success && !addLock;
  const doneEdit = editStatus.status === reduxStatus.success && !editLock;
  const doneDelete = deleteStatus.status === reduxStatus.success && !deleteLock;

  const { rootState, dispatch } = useContext(MainContext);

  useEffect(() => {
    try {
      const {
        options: { offset, limit, onClick },
      } = getState(rootState);
      if (onClick && activeTab === activeTabs.CUSTOMER_LEDGER_ENTRY) {
        fetchCustomerLedgerEntries([
          { key: "offset", value: offset },
          { key: "limit", value: limit },
        ]);
      }
    } catch (e) {}
  }, [getState(rootState)]);

  useEffect(() => {
    setFetchLock(false);
    fetchCustomerLedgerEntries();
  }, [fetchCustomerLedgerEntries, setFetchLock]);

  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching LedgerEntries");
      setFetchLock(true);
    } else {
      if (activeTab === activeTabs.CUSTOMER_LEDGER_ENTRY) {
        setPageValues(rootState, dispatch, response, "", activeTab);
      }
    }
  }, [fetchStatus, setFetchLock, activeTab, setPageValues]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Bank Account");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Bank Account");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Bank Account");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addBankAccount = (data) => {
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

    addBankAccount(requestBody);
  };

  const _editBankAccount = (data) => {
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

    editBankAccount(requestBody);
  };

  const _deleteBankAccount = (id) => {
    setDeleteLock(false);
    deleteBankAccount(id);
  };

  useEffect(() => {
    if (doneAdd || doneEdit || doneDelete) {
      toggle({ type: "CLOSE" });
    }
  }, [doneAdd, doneEdit, doneDelete]);

  return (
    <CustomerLedgerEntries
      customerLedgerEntries={customerLedgerEntries}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addBankAccount={_addBankAccount}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editBankAccount={_editBankAccount}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteBankAccount={_deleteBankAccount}
      _toggle={toggle}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  customerLedgerEntries: selectCustomerLedgerEntries(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCustomerLedgerEntries: (data = null) => dispatch(Fetch(data)),
  addBankAccount: (data) => dispatch(Add(data)),
  editBankAccount: (data) => dispatch(Edit(data)),
  deleteBankAccount: (id) => dispatch(Remove(id)),
  toggle: (data) => dispatch(toggle(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
