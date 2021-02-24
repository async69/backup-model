import React, { useState, useEffect } from "react";
import InventorySetup from "./InventoryPostingSetup";
import {
  selectFetchStatus,
  selectAddStatus,
  selectInventoryPostingSetups,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/GeneralSetup/Posting/InventoryPostingSetups";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { selectInventoryPostingGroups } from "../../../../store/GeneralSetup/Posting/InventoryPostingGroups";
import { selectChartOfAccounts } from "../../../../store/Finance/MasterData/ChartsOfAccounts/chartOfAccounts";
import { selectItemLocations } from "../../../../store/Inventory/Setup/Item/Item_Location";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchInventoryPostingSetups,
  addInventoryPostingSetup,
  editStatus,
  editInventoryPostingSetup,
  deleteStatus,
  deleteInventoryPostingSetup,
  postingSetups,
  postingGroups,
  accounts,
  itemLocations,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    setFetchLock(false);
    fetchInventoryPostingSetups();
  }, [fetchInventoryPostingSetups, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching Inventory Posting Setups");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Inventory Posting Setup");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Inventory Posting Setup");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Inventory Posting Setup");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addInventoryPostingSetup = (data) => {
    setAddLock(false);
    const requestBody = {
      item_location: data.itemLocation ? data.itemLocation : "",
      item_posting_group: data.itemPostingGroup ? data.itemPostingGroup : "",
      inventory_account: data.inventoryAccount ? data.inventoryAccount : "",
      cogs_account: data.cogs_account ? data.cogs_account : "",
    };

    addInventoryPostingSetup(requestBody);
  };

  const _editInventoryPostingSetup = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id ? data.id : "",
      item_location: data.itemLocation ? data.itemLocation : "",
      item_posting_group: data.itemPostingGroup ? data.itemPostingGroup : "",
      inventory_account: data.inventoryAccount ? data.inventoryAccount : "",
      cogs_account: data.cogs_account ? data.cogs_account : "",
    };

    editInventoryPostingSetup(requestBody);
  };

  const _deleteInventoryPostingSetup = (id) => {
    setDeleteLock(false);
    deleteInventoryPostingSetup(id);
  };
  return (
    <InventorySetup
      postingSetups={postingSetups}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addInventoryPostingSetup={_addInventoryPostingSetup}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editInventoryPostingSetup={_editInventoryPostingSetup}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteInventoryPostingSetup={_deleteInventoryPostingSetup}
      postingGroups={postingGroups}
      accounts={accounts}
      itemLocations={itemLocations}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  postingSetups: selectInventoryPostingSetups(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  postingGroups: selectInventoryPostingGroups(state),
  accounts: selectChartOfAccounts(state),
  itemLocations: selectItemLocations(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchInventoryPostingSetups: () => dispatch(Fetch()),
  addInventoryPostingSetup: (data) => dispatch(Add(data)),
  editInventoryPostingSetup: (data) => dispatch(Edit(data)),
  deleteInventoryPostingSetup: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
