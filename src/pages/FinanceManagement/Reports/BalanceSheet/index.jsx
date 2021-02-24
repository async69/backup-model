import React, { useState, useEffect, useContext } from "react";
import BalanceSheet from "./BalanceSheet";
import {
  selectFetchStatus,
  selectAddStatus,
  selectBalanceSheet,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Finance/Reports/BalanceSheet";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { toggle } from "../../../../store/ModalData";
import { MainContext } from "../../../../context/Main";
import {
  setPageValues, 
  getState,
} from "../../../../context/Main/States/Pagination";
import { activeTabs } from "../../LedgerEntries";

const Loader = ({
  fetchStatus,
  addStatus,
  balanceSheets,
  fetchBalanceSheet,
  addBalanceSheet,
  editStatus,
  editBalanceSheet,
  deleteStatus,
  deleteBalanceSheet,
  toggle,
  activeTab,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  const { rootState, dispatch } = useContext(MainContext);

  useEffect(() => {
    // try {
    //   const {
    //     options: { offset, limit, onClick },
    //   } = getState(rootState);
    //   if (onClick && activeTab === activeTabs.BANK_LEDGER_ENTRY) {
    //     fetchBalanceSheet([
    //       { key: "offset", value: offset },
    //       { key: "limit", value: limit },
    //     ]);
    //   }
    // } catch (e) {}
  }, [getState(rootState)]);

  useEffect(() => {
    setFetchLock(false);
    fetchBalanceSheet();
  }, [fetchBalanceSheet, setFetchLock]);

  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching Balance Sheet");
      setFetchLock(true);
    } else {
      if (activeTab === activeTabs.BANK_LEDGER_ENTRY) {
        setPageValues(rootState, dispatch, response, "", activeTab);
      }
    }
  }, [fetchStatus, setFetchLock, activeTab]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Balance Sheet");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Balance Sheet");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Balance Sheet");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addBalanceSheet = (data) => {
    setAddLock(false);
    const requestBody = {
      bank_account_code: data.BalanceSheetCode ? data.BalanceSheetCode : "",
      branch_name: data.bankBranch ? data.bankBranch : "",
      account_number: data.BalanceSheetNumber
        ? Number(data.BalanceSheetNumber)
        : 0,
      is_active: data.isActive ? Boolean(data.isActive) : "",
      phone_no: data.phoneNumber ? data.phoneNumber : "",
      Postal_code: data.BalanceSheetCode ? data.BalanceSheetCode : "",
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

    addBalanceSheet(requestBody);
  };

  const _editBalanceSheet = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id ? data.id : "",
      bank_account_code: data.BalanceSheetCode ? data.BalanceSheetCode : "",
      branch_name: data.bankBranch ? data.bankBranch : "",
      account_number: data.BalanceSheetNumber
        ? Number(data.BalanceSheetNumber)
        : 0,
      is_active: data.isActive ? Boolean(data.isActive) : "",
      phone_no: data.phoneNumber ? data.phoneNumber : "",
      Postal_code: data.BalanceSheetCode ? data.BalanceSheetCode : "",
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

    editBalanceSheet(requestBody);
  };

  const _deleteBalanceSheet = (id) => {
    setDeleteLock(false);
    deleteBalanceSheet(id);
  };
  return (
    <BalanceSheet
      balanceSheets={balanceSheets}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addBalanceSheet={_addBalanceSheet}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editBalanceSheet={_editBalanceSheet}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteBalanceSheet={_deleteBalanceSheet}
      _toggle={toggle}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  balanceSheets: selectBalanceSheet(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchBalanceSheet: (data = null) => dispatch(Fetch(data)),
  addBalanceSheet: (data) => dispatch(Add(data)),
  editBalanceSheet: (data) => dispatch(Edit(data)),
  deleteBalanceSheet: (id) => dispatch(Remove(id)),
  toggle: (data) => dispatch(toggle(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
