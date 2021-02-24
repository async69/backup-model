import React, { useState, useEffect } from "react";
import TransferOrderReceive from "./TransferOrderReceive";
import {
  selectFetchStatus,
  selectAddStatus,
  selectTransferOrderReceives,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectPatchStatus,
  Patch,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Inventory/Common/TransferOrderReceive/";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { selectItemMasterDatas } from "../../../../store/Inventory/Setup/Item/Item_MasterData";
import { selectUOMs } from "../../../../store/Inventory/Setup/UOM";
import { selectItemLocations } from "../../../../store/Inventory/Setup/Item/Item_Location";
import {
  selectTransferOrderIssues,
  Fetch as fetchTransferOrderIssues,
  selectFetchStatus as selectTOIFetchStatus,
} from "../../../../store/Inventory/Common/TransferOrderIssues";
import { selectBins } from "../../../../store/Inventory/Bin/";

const Loader = ({
  receivedTransferOrders,
  fetchStatus,
  addStatus,
  fetchTransferOrderReceives,
  addTransferOrderReceive,
  editStatus,
  editTransferOrderReceive,
  patchStatus,
  patchTransferOrderReceive,
  deleteStatus,
  deleteTransferOrderReceive,
  itemLocations,
  itemMasterDatas,
  UOMs,
  transferOrderIssues,
  bins,
  fetchTransferOrderIssues,
  fetchTOIStatus,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [fetchTOILock, setFetchTOILock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [patchLock, setPatchLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    setFetchTOILock(false);
    fetchTransferOrderIssues();
  }, [fetchTransferOrderIssues, setFetchTOILock]);

  useEffect(() => {
    const { status } = fetchTOIStatus;
    if (status === reduxStatus.failure && !fetchTOILock) {
      toast.error("Failed Fetching Transfer Order Issues");
      setFetchLock(true);
    }
  }, [fetchTOIStatus, setFetchTOILock, fetchTOILock]);

  useEffect(() => {
    setFetchLock(false);
    fetchTransferOrderReceives();
  }, [fetchTransferOrderReceives, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching Transfer Order Receives");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching Transfer Order Receives");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      toast.error("Failed Adding Transfer Order Receive");
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Transfer Order Receive");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      toast.error("Failed Editing Transfer Order Receives");
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Transfer Order Receive");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = patchStatus;
    if (status === reduxStatus.failure && !patchLock) {
      toast.error("Failed posting Transfer Order Receive");
      setPatchLock(true);
    } else if (status === reduxStatus.success && !patchLock) {
      toast.success("Posted Transfer Order Receive");
      setPatchLock(true);
    }
  }, [patchStatus, setPatchLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      toast.error(deleteStatus.errors.errors.detail[0]);
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Transfer Order Receive");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addTransferOrderReceive = (data) => {
    setAddLock(false);
    const requestBody = {
      received_by: 1,
      posting_date: data.postingDate,
      transfer_order_issue: data.transferOrderIssueNumber,
      tor_lines: data.good_receiving_note_lines.map((line) => ({
        remaining_quantity: line.remaining_quantity,
        quantity_requested: line.quantity_requested,
        item: line.item,
        unit_of_measurement: line.unit_of_measurement,
        from_warehouse: line.fromWarehouse,
        to_warehouse: line.toWarehouse,
        from_bin: line.fromBin,
        to_bin: line.fromBin,
        remarks: line.remark,
        quantity_received: line.quantityReceived,
      })),
    };

    addTransferOrderReceive(requestBody);
  };

  const _editTransferOrderReceive = (data) => {
    setEditLock(false);
    console.log(data.tor_lines);
    const requestBody = {
      id: data.id,
      received_by: 1,
      posting_date: data.postingDate,
      transfer_order_issue: data.transferOrderIssueNumber,
      tor_lines: data.good_receiving_note_lines.map((line) => ({
        remaining_quantity: line.remaining_quantity,
        quantity_requested: line.quantity_requested,
        item: line.item,
        unit_of_measurement: line.unit_of_measurement,
        from_warehouse: line.fromWarehouse,
        to_warehouse: line.toWarehouse,
        from_bin: line.fromBin,
        to_bin: line.fromBin,
        remarks: line.remark,
        quantity_received: line.quantityReceived,
      })),
    };

    editTransferOrderReceive(requestBody);
  };

  const _patchTransferOrderReceive = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: data.status,
      posting_date: data.posting_date,
    };

    patchTransferOrderReceive(requestBody);
  };

  const _deleteTransferOrderReceive = (id) => {
    setDeleteLock(false);
    deleteTransferOrderReceive(id);
  };

  return (
    <TransferOrderReceive
      receivedTransferOrders={receivedTransferOrders}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addStatus={addStatus}
      addTransferOrderReceive={_addTransferOrderReceive}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editTransferOrderReceive={_editTransferOrderReceive}
      donePatch={patchStatus.status === reduxStatus.success && !patchLock}
      patchTransferOrderReceive={_patchTransferOrderReceive}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteTransferOrderReceive={_deleteTransferOrderReceive}
      itemMasterDatas={itemMasterDatas}
      itemLocations={itemLocations}
      UOMs={UOMs}
      transferOrderIssues={transferOrderIssues}
      bins={bins}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  fetchTOIStatus: selectTOIFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  patchStatus: selectPatchStatus(state),
  deleteStatus: selectDeleteStatus(state),
  receivedTransferOrders: selectTransferOrderReceives(state),
  itemLocations: selectItemLocations(state),
  itemMasterDatas: selectItemMasterDatas(state),
  UOMs: selectUOMs(state),
  transferOrderIssues: selectTransferOrderIssues(state),
  bins: selectBins(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchTransferOrderReceives: () => dispatch(Fetch()),
  addTransferOrderReceive: (data) => dispatch(Add(data)),
  editTransferOrderReceive: (data) => dispatch(Edit(data)),
  deleteTransferOrderReceive: (id) => dispatch(Remove(id)),
  patchTransferOrderReceive: (data) => dispatch(Patch(data)),
  fetchTransferOrderIssues: () => dispatch(fetchTransferOrderIssues()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);