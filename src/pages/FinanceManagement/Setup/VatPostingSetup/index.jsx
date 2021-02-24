import React, { useState, useEffect } from "react";
import VATPostingSetup from "./VatPostingSetup";
import {
  selectFetchStatus,
  selectAddStatus,
  selectVATPostingSetups,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/GeneralSetup/Posting/VAT_Posting_Setup";
import { selectVATPostingGroups } from "../../../../store/GeneralSetup/Posting/VAT_Posting_Group";
import { selectChartOfAccounts } from "../../../../store/Finance/MasterData/ChartsOfAccounts/chartOfAccounts";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchVATPostingSetups,
  addVATPostingSetup,
  editStatus,
  editVATPostingSetup,
  deleteStatus,
  deleteVATPostingSetup,
  postingSetups,
  postingGroups,
  accounts,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    setFetchLock(false);
    fetchVATPostingSetups();
  }, [fetchVATPostingSetups, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching VAT Posting Setups");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added VAT Posting Setup");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited VAT Posting Setup");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted VAT Posting Setup");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addVATPostingSetup = (data) => {
    setAddLock(false);
    const requestBody = {
      partner_vat: data.partnerVat ? data.partnerVat : "",
      item_vat: data.itemVat ? data.itemVat : "",
      vat_receivable_account: data.vatReceivableAccount
        ? data.vatReceivableAccount
        : "",
      vat_payable_account: data.vatPayableAccount ? data.vatPayableAccount : "",
    };

    addVATPostingSetup(requestBody);
  };

  const _editVATPostingSetup = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id ? data.id : "",
      partner_vat: data.partnerVat ? data.partnerVat : "",
      item_vat: data.itemVat ? data.itemVat : "",
      vat_receivable_account: data.vatReceivableAccount
        ? data.vatReceivableAccount
        : "",
      vat_payable_account: data.vatPayableAccount ? data.vatPayableAccount : "",
    };

    editVATPostingSetup(requestBody);
  };

  const _deleteVATPostingSetup = (id) => {
    setDeleteLock(false);
    deleteVATPostingSetup(id);
  };
  return (
    <VATPostingSetup
      postingSetups={postingSetups}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addVATPostingSetup={_addVATPostingSetup}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editVATPostingSetup={_editVATPostingSetup}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteVATPostingSetup={_deleteVATPostingSetup}
      postingGroups={postingGroups}
      accounts={accounts}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  postingSetups: selectVATPostingSetups(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  postingGroups: selectVATPostingGroups(state),
  accounts: selectChartOfAccounts(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchVATPostingSetups: () => dispatch(Fetch()),
  addVATPostingSetup: (data) => dispatch(Add(data)),
  editVATPostingSetup: (data) => dispatch(Edit(data)),
  deleteVATPostingSetup: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
