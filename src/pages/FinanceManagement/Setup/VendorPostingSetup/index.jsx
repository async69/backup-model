import React, { useState, useEffect } from "react";
import VendorPostingSetup from "./VendorPostingSetup";
import {
  selectFetchStatus,
  selectAddStatus,
  selectVendorPostingSetups,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/GeneralSetup/Posting/VendorBusinessPostingSetup";
import { selectVendorPostingGroup } from "../../../../store/GeneralSetup/Posting/Vendor_Posting_Group";
import { selectItemCategories } from "../../../../store/Inventory/Setup/Item/Item_Categories";
import { selectChartOfAccounts } from "../../../../store/Finance/MasterData/ChartsOfAccounts/chartOfAccounts";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";

const Loader = ({
  fetchStatus,
  addStatus,
  postingSetups,
  fetchVendorPostingSetups,
  addVendorPostingSetup,
  editStatus,
  editVendorPostingSetup,
  deleteStatus,
  deleteVendorPostingSetup,
  postingGroups,
  itemCategories,
  accounts,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    setFetchLock(false);
    fetchVendorPostingSetups();
  }, [fetchVendorPostingSetups, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching Vendor Posting Setups");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Vendor Posting Setup");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Vendor Posting Setup");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Vendor Posting Setup");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addVendorPostingSetup = (data) => {
    setAddLock(false);
    const requestBody = {
      partner_group: data.partnerGroup ? data.partnerGroup : "",
      item_group: data.itemGroup ? data.itemGroup : "",
      purchase_account: data.itemGroup ? data.itemGroup : "",
      sales_account: data.partnerGroup ? data.partnerGroup : "",
      cost_of_goods_sold_account: data.costOfGoodsSoldAcc
        ? data.costOfGoodsSoldAcc
        : "",
      cash_account: data.cashAccount ? data.cashAccount : "",
    };

    addVendorPostingSetup(requestBody);
  };

  const _editVendorPostingSetup = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id ? data.id : "",
      partner_group: data.partnerGroup ? data.partnerGroup : "",
      item_group: data.itemGroup ? data.itemGroup : "",
      purchase_account: data.itemGroup ? data.itemGroup : "",
      sales_account: data.partnerGroup ? data.partnerGroup : "",
      cost_of_goods_sold_account: data.costOfGoodsSoldAcc
        ? data.costOfGoodsSoldAcc
        : "",
      cash_account: data.cashAccount ? data.cashAccount : "",
    };

    editVendorPostingSetup(requestBody);
  };

  const _deleteVendorPostingSetup = (id) => {
    setDeleteLock(false);
    deleteVendorPostingSetup(id);
  };
  return (
    <VendorPostingSetup
      postingSetups={postingSetups}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addVendorPostingSetup={_addVendorPostingSetup}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editVendorPostingSetup={_editVendorPostingSetup}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteVendorPostingSetup={_deleteVendorPostingSetup}
      postingGroups={postingGroups}
      itemCategories={itemCategories}
      accounts={accounts}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  postingSetups: selectVendorPostingSetups(state),
  postingGroups: selectVendorPostingGroup(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  itemCategories: selectItemCategories(state),
  accounts: selectChartOfAccounts(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchVendorPostingSetups: () => dispatch(Fetch()),
  addVendorPostingSetup: (data) => dispatch(Add(data)),
  editVendorPostingSetup: (data) => dispatch(Edit(data)),
  deleteVendorPostingSetup: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
