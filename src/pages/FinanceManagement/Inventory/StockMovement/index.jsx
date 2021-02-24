import React, { useState, useEffect } from "react";
import StockMovement from "./StockMovement";
import {
  selectFetchStatus,
  selectAddStatus,
  selectStockMovements,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Finance/InventoryContent/StockMovement/";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";

const Loader = ({
  fetchStatus,
  addStatus,
  stockMovements,
  fetchStockMovements,
  addStockMovement,
  editStatus,
  editStockMovement,
  deleteStatus,
  deleteStockMovement,
  toggle,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    setFetchLock(false);
    fetchStockMovements();
  }, [fetchStockMovements, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching Bank Ledger Entries");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      toast.error("Failed Adding Bank Account");
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Bank Account");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      toast.error("Failed Editing Bank Accounts");
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Bank Account");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      toast.error("Failed Deleting Bank Account");
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Bank Account");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addStockMovement = (data) => {
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

    addStockMovement(requestBody);
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

    editStockMovement(requestBody);
  };

  const _deleteStockMovement = (id) => {
    setDeleteLock(false);
    deleteStockMovement(id);
  };
  return (
    <StockMovement
      stockMovements={stockMovements}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addStockMovement={_addStockMovement}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editStockMovement={_editBankAccount}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteStockMovement={_deleteStockMovement}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  stockMovements: selectStockMovements(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchStockMovements: () => dispatch(Fetch()),
  addStockMovement: (data) => dispatch(Add(data)),
  editStockMovement: (data) => dispatch(Edit(data)),
  deleteStockMovement: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
