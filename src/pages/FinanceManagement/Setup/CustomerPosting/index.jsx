import React, { useState, useEffect } from "react";
import CustomerPostingGroupForm from "./CustomerPostingGroup";
import {
  selectFetchStatus,
  selectAddStatus,
  selectCustomerPostingGroups,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/GeneralSetup/Posting/CustomerPostingGroups";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { selectChartOfAccounts } from "../../../../store/Finance/MasterData/ChartsOfAccounts/chartOfAccounts";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchCustomerPostingGroups,
  addCustomerPostingGroup,
  editStatus,
  editCustomerPostingGroup,
  deleteStatus,
  deleteCustomerPostingGroup,
  postingGroups,
  accounts,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    setFetchLock(false);
    fetchCustomerPostingGroups();
  }, [fetchCustomerPostingGroups, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching Customer Posting Groups");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Customer Posting Group");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Customer Posting Group");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Customer Posting Group");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addCustomerPostingGroup = (data) => {
    setAddLock(false);
    const requestBody = {
      name: data.name ? data.name : "",
      code: data.code ? data.code : "",
      receivable_account: data.receivable_account
        ? data.receivable_account
        : "",
      withholding_tax_receivable_account: data.withholding_tax_receivable_account
        ? data.withholding_tax_receivable_account
        : "",
    };

    addCustomerPostingGroup(requestBody);
  };

  const _editCustomerPostingGroup = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id ? data.id : "",
      name: data.name ? data.name : "",
      code: data.code ? data.code : "",
      receivable_account: data.receivable_account
        ? data.receivable_account
        : "",
      withholding_tax_receivable_account: data.withholding_tax_receivable_account
        ? data.withholding_tax_receivable_account
        : "",
    };

    editCustomerPostingGroup(requestBody);
  };

  const _deleteCustomerPostingGroup = (id) => {
    setDeleteLock(false);
    deleteCustomerPostingGroup(id);
  };
  return (
    <CustomerPostingGroupForm
      postingGroups={postingGroups}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addCustomerPostingGroup={_addCustomerPostingGroup}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editCustomerPostingGroup={_editCustomerPostingGroup}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteCustomerPostingGroup={_deleteCustomerPostingGroup}
      accounts={accounts}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  postingGroups: selectCustomerPostingGroups(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  accounts: selectChartOfAccounts(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCustomerPostingGroups: () => dispatch(Fetch()),
  addCustomerPostingGroup: (data) => dispatch(Add(data)),
  editCustomerPostingGroup: (data) => dispatch(Edit(data)),
  deleteCustomerPostingGroup: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
