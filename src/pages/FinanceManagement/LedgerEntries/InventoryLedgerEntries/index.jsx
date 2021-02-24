import React, { useState, useEffect } from "react";
import InventoryLedgerEntries from "./InventoryLedgerEntries";
import {
  selectFetchStatus,
  selectAddStatus,
  selectInventoryLedgerEntries,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Finance/LedgerEntries/InventoryLedgerEntries";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { toggle } from "../../../../store/ModalData/";

const Loader = ({
  fetchStatus,
  addStatus,
  inventoryLedgerEntries,
  fetchInventoryLedgerEntries,
  addBankAccount,
  editStatus,
  editBankAccount,
  deleteStatus,
  deleteBankAccount,
  toggle,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    setFetchLock(false);
    fetchInventoryLedgerEntries();
  }, [fetchInventoryLedgerEntries, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching LedgerEntries");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

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
  return (
    <InventoryLedgerEntries
      inventoryLedgerEntries={inventoryLedgerEntries}
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

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  inventoryLedgerEntries: selectInventoryLedgerEntries(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchInventoryLedgerEntries: () => dispatch(Fetch()),
  addBankAccount: (data) => dispatch(Add(data)),
  editBankAccount: (data) => dispatch(Edit(data)),
  deleteBankAccount: (id) => dispatch(Remove(id)),
  toggle: (data) => dispatch(toggle(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
