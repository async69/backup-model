import React, { useState, useEffect } from "react";
import VendorPostingGroupForm from "./VendorPostingGroup";
import {
  selectFetchStatus,
  selectAddStatus,
  selectVendorPostingGroup,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/GeneralSetup/Posting/Vendor_Posting_Group";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { selectChartOfAccounts } from "../../../../store/Finance/MasterData/ChartsOfAccounts/chartOfAccounts";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchVendorPostingGroups,
  addVendorPostingGroup,
  editStatus,
  editVendorPostingGroup,
  deleteStatus,
  deleteVendorPostingGroup,
  postingGroups,
  accounts,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    setFetchLock(false);
    fetchVendorPostingGroups();
  }, [fetchVendorPostingGroups, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching Vendor Posting Groups");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Vendor Posting Group");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Vendor Posting Group");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Vendor Posting Group");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addVendorPostingGroup = (data) => {
    setAddLock(false);
    const requestBody = {
      name: data.name ? data.name : "",
      code: data.code ? data.code : "",
      payable_account: data.payable_account ? data.payable_account : "",
      withholding_tax_account: data.withholding_tax_account
        ? data.withholding_tax_account
        : "",
    };

    addVendorPostingGroup(requestBody);
  };

  const _editVendorPostingGroup = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id ? data.id : "",
      name: data.name ? data.name : "",
      code: data.code ? data.code : "",
      payable_account: data.payable_account ? data.payable_account : "",
      withholding_tax_account: data.withholding_tax_account
        ? data.withholding_tax_account
        : "",
    };

    editVendorPostingGroup(requestBody);
  };

  const _deleteVendorPostingGroup = (id) => {
    setDeleteLock(false);
    deleteVendorPostingGroup(id);
  };
  return (
    <VendorPostingGroupForm
      postingGroups={postingGroups}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addVendorPostingGroup={_addVendorPostingGroup}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editVendorPostingGroup={_editVendorPostingGroup}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteVendorPostingGroup={_deleteVendorPostingGroup}
      accounts={accounts}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  postingGroups: selectVendorPostingGroup(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  accounts: selectChartOfAccounts(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchVendorPostingGroups: () => dispatch(Fetch()),
  addVendorPostingGroup: (data) => dispatch(Add(data)),
  editVendorPostingGroup: (data) => dispatch(Edit(data)),
  deleteVendorPostingGroup: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
