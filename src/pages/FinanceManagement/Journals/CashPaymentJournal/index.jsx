import React, { useState, useEffect } from "react";
import CashPaymentJournal from "./CashPaymentJournal";
import {
  selectFetchStatus,
  selectAddStatus,
  selectCashPaymentJournals,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectPatchStatus,
  Patch,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Finance/Journals/CashPayment";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { selectChartOfAccounts } from "../../../../store/Finance/MasterData/ChartsOfAccounts/chartOfAccounts";
import { saveLineTag } from "./config";

const Loader = ({
  cashPaymentJournals,
  fetchStatus,
  addStatus,
  fetchCashPaymentJournals,
  addCashPaymentJournal,
  editStatus,
  editCashPaymentJournal,
  patchStatus,
  patchCashPaymentJournal,
  deleteStatus,
  deleteCashPaymentJournal,
  COAs,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [patchLock, setPatchLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    setFetchLock(false);
    fetchCashPaymentJournals();
  }, [fetchCashPaymentJournals, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching Cash Payment Journal");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Saved Cash Payment");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Cash Payment");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status, response } = patchStatus;
    if (status === reduxStatus.failure && !patchLock) {
      setPatchLock(true);
    } else if (status === reduxStatus.success && !patchLock) {
      toast.success(`${response.status} Cash Payment`);
      setPatchLock(true);
    }
  }, [patchStatus, setPatchLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Cash Payment");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addCashPaymentJournal = () => {
    setAddLock(false);
    const requestBody = {};

    addCashPaymentJournal(requestBody);
  };

  const _editCashPaymentJournal = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      status: data.status,
      date: data.date,
      document_number: data.document_number,
      description: data.description,
      remarks: data.remarks,
      vendor: data.vendor,
      invoice: data.invoice,
      [saveLineTag]: data[saveLineTag].map((line) => ({
        debit: line.debit,
        credit: line.credit,
        description: line.description,
        account_balance: line.account_balance,
        account: line.account,
        remarks: line.remarks,
      })),
    };

    editCashPaymentJournal(requestBody);
  };

  const _approveCashPaymentJournal = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: "Approved",
      posting_date: "2020-01-01",
    };
    patchCashPaymentJournal(requestBody);
  };

  const _postCashPaymentJournal = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: "Posted",
      posting_date: data.posting_date ? data.posting_date : "",
    };
    patchCashPaymentJournal(requestBody);
  };

  const _deleteCashPaymentJournal = (id) => {
    setDeleteLock(false);
    deleteCashPaymentJournal(id);
  };

  return (
    <CashPaymentJournal
      cashPaymentJournals={cashPaymentJournals}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addCashPaymentJournal={_addCashPaymentJournal}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editCashPaymentJournal={_editCashPaymentJournal}
      donePatch={patchStatus.status === reduxStatus.success && !patchLock}
      approveCashPaymentJournal={_approveCashPaymentJournal}
      postCashPaymentJournal={_postCashPaymentJournal}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteCashPaymentJournal={_deleteCashPaymentJournal}
      COAs={COAs}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  patchStatus: selectPatchStatus(state),
  deleteStatus: selectDeleteStatus(state),
  cashPaymentJournals: selectCashPaymentJournals(state),
  COAs: selectChartOfAccounts(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCashPaymentJournals: () => dispatch(Fetch()),
  addCashPaymentJournal: (data) => dispatch(Add(data)),
  editCashPaymentJournal: (data) => dispatch(Edit(data)),
  patchCashPaymentJournal: (data) => dispatch(Patch(data)),
  deleteCashPaymentJournal: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
