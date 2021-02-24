import React, { useState, useEffect } from "react";
import VATPostingGroup from "./VatPostingGroup";
import {
  selectFetchStatus,
  selectAddStatus,
  selectVATPostingGroups,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/GeneralSetup/Posting/VAT_Posting_Group";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { selectChartOfAccounts } from "../../../../store/Finance/MasterData/ChartsOfAccounts/chartOfAccounts";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchVATPostingGroups,
  addVATPostingGroup,
  editStatus,
  editVATPostingGroup,
  deleteStatus,
  deleteVATPostingGroup,
  postingGroups,
  coa,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    setFetchLock(false);
    fetchVATPostingGroups();
  }, [fetchVATPostingGroups, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching VAT Posting Groups");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added VAT Posting Group");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited VAT Posting Group");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted VAT Posting Group");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addVATPostingGroup = (data) => {
    setAddLock(false);
    const requestBody = {
      name: data.name ? data.name : "",
      vat: data.vat ? data.vat : "",
      vat_payable_account: data.vat_payable_account
        ? data.vat_payable_account
        : "",
      vat_receivable_account: data.vat_receivable_account
        ? data.vat_receivable_account
        : "",
    };

    addVATPostingGroup(requestBody);
  };

  const _editVATPostingGroup = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id ? data.id : "",
      name: data.name ? data.name : "",
      vat: data.vat ? data.vat : "",
      vat_payable_account: data.vat_payable_account
        ? data.vat_payable_account
        : "",
      vat_receivable_account: data.vat_receivable_account
        ? data.vat_receivable_account
        : "",
    };

    editVATPostingGroup(requestBody);
  };

  const _deleteVATPostingGroup = (id) => {
    setDeleteLock(false);
    deleteVATPostingGroup(id);
  };
  return (
    <VATPostingGroup
      postingGroups={postingGroups}
      coa={coa}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addVATPostingGroup={_addVATPostingGroup}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editVATPostingGroup={_editVATPostingGroup}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteVATPostingGroup={_deleteVATPostingGroup}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  postingGroups: selectVATPostingGroups(state),
  coa: selectChartOfAccounts(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchVATPostingGroups: () => dispatch(Fetch()),
  addVATPostingGroup: (data) => dispatch(Add(data)),
  editVATPostingGroup: (data) => dispatch(Edit(data)),
  deleteVATPostingGroup: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
