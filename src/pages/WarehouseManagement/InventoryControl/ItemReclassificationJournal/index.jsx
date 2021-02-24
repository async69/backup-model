import React, { useState, useEffect } from "react";
import ItemReclassificationJournal from "./ItemReclassificationJournal";
import {
  selectFetchStatus,
  selectAddStatus,
  selectItemReclassificationJournals,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Inventory/InventoryControl/ItemReclassificationJournal";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { selectItemMasterDatas } from "../../../../store/Inventory/Setup/Item/Item_MasterData/";
import { selectWarehouses } from "../../../../store/Inventory/Warehouse/";
import { selectUOMs } from "../../../../store/Inventory/Setup/UOM/Warehouse/";
import { selectBins } from "../../../../store/Inventory/Bin/";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchItemReclassificationJournals,
  addItemReclassificationJournal,
  editStatus,
  editItemReclassificationJournal,
  deleteStatus,
  deleteItemReclassificationJournal,
  itemReclassificationJournals,
  items,
  warehouses,
  UOMs,
  bins,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    setFetchLock(false);
    fetchItemReclassificationJournals();
  }, [fetchItemReclassificationJournals, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Number Series");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status, errors } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Number Series");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Number Series");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Number Series");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addItemReclassificationJournal = (data) => {
    setAddLock(false);
    const requestBody = {
      quantity: data.quantity,
      remark: data.remarks,
      posting_date: data.posting_date,
      item: data.item,
      warehouse: data.warehouse,
      unit_of_measurement: data.unit_of_measurement,
      from_bin: data.from_bin,
      to_bin: data.to_bin,
    };

    addItemReclassificationJournal(requestBody);
  };

  const _editItemReclassificationJournal = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      quantity: data.quantity,
      remark: data.remarks,
      posting_date: data.posting_date,
      item: data.item,
      warehouse: data.warehouse,
      unit_of_measurement: data.unit_of_measurement,
      from_bin: data.from_bin,
      to_bin: data.to_bin,
    };

    editItemReclassificationJournal(requestBody);
  };

  const _deleteItemReclassificationJournal = (id) => {
    setDeleteLock(false);
    deleteItemReclassificationJournal(id);
  };

  return (
    <ItemReclassificationJournal
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addItemReclassificationJournal={_addItemReclassificationJournal}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editItemReclassificationJournal={_editItemReclassificationJournal}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteItemReclassificationJournal={_deleteItemReclassificationJournal}
      itemReclassificationJournals={itemReclassificationJournals}
      items={items}
      warehouses={warehouses}
      UOMs={UOMs}
      bins={bins}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  itemReclassificationJournals: selectItemReclassificationJournals(state),
  items: selectItemMasterDatas(state),
  warehouses: selectWarehouses(state),
  UOMs: selectUOMs(state),
  bins: selectBins(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchItemReclassificationJournals: () => dispatch(Fetch()),
  addItemReclassificationJournal: (data) => dispatch(Add(data)),
  editItemReclassificationJournal: (data) => dispatch(Edit(data)),
  deleteItemReclassificationJournal: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
