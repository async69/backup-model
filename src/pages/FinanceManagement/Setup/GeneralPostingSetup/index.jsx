import React, { useState, useEffect } from "react";
import GeneralPostingSetup from "./GeneralPostingSetup";
import {
  selectFetchStatus,
  selectAddStatus,
  selectGeneralBusinessPostingSetups,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/GeneralSetup/Posting/GeneralBusinessPostingSetup";
import { selectCustomerPostingGroups } from "../../../../store/GeneralSetup/Posting/CustomerPostingGroups/";
import { selectItemCategories } from "../../../../store/Inventory/Setup/Item/Item_Categories";
import { selectChartOfAccounts } from "../../../../store/Finance/MasterData/ChartsOfAccounts/chartOfAccounts";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";

const Loader = ({
  fetchStatus,
  addStatus,
  postingSetups,
  fetchGeneralBusinessPostingSetups,
  addGeneralBusinessPostingSetup,
  editStatus,
  editGeneralBusinessPostingSetup,
  deleteStatus,
  deleteGeneralBusinessPostingSetup,
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
    fetchGeneralBusinessPostingSetups();
  }, [fetchGeneralBusinessPostingSetups, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching General Posting Setups");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added General Posting Setup");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited General Posting Setup");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted General Posting Setup");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addGeneralBusinessPostingSetup = (data) => {
    setAddLock(false);
    const requestBody = {
      partner_group: data.partnerGroup ? data.partnerGroup : "",
      item_group: data.itemGroup ? data.itemGroup : "",
      purchase_account: data.purchaseAccount ? data.purchaseAccount : "",
      sales_account: data.salesAccount ? data.salesAccount : "",
      cost_of_goods_sold_account: data.costOfGoodsSoldAcc
        ? data.costOfGoodsSoldAcc
        : "",
      cash_account: data.cashAccount ? data.cashAccount : "",
    };

    addGeneralBusinessPostingSetup(requestBody);
  };

  const _editGeneralBusinessPostingSetup = (data) => {
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

    editGeneralBusinessPostingSetup(requestBody);
  };

  const _deleteGeneralBusinessPostingSetup = (id) => {
    setDeleteLock(false);
    deleteGeneralBusinessPostingSetup(id);
  };
  return (
    <GeneralPostingSetup
      postingSetups={postingSetups}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addGeneralBusinessPostingSetup={_addGeneralBusinessPostingSetup}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editGeneralBusinessPostingSetup={_editGeneralBusinessPostingSetup}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteGeneralBusinessPostingSetup={_deleteGeneralBusinessPostingSetup}
      postingGroups={postingGroups}
      itemCategories={itemCategories}
      accounts={accounts}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  postingSetups: selectGeneralBusinessPostingSetups(state),
  postingGroups: selectCustomerPostingGroups(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  itemCategories: selectItemCategories(state),
  accounts: selectChartOfAccounts(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchGeneralBusinessPostingSetups: () => dispatch(Fetch()),
  addGeneralBusinessPostingSetup: (data) => dispatch(Add(data)),
  editGeneralBusinessPostingSetup: (data) => dispatch(Edit(data)),
  deleteGeneralBusinessPostingSetup: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
