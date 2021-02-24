import React, { useState, useEffect, useContext } from "react";
import PurchaseReturn from "./PurchaseReturn";
import {
  selectFetchStatus,
  selectAddStatus,
  selectPurchaseReturns,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectPatchStatus,
  Patch,
  selectDeleteStatus,
  Remove,
} from "store/Inventory/Common/PurchaseReturn";
import {
  Fetch as fetchGoodReceivingNotes,
  selectGoodReceivingNotes,
} from "store/Inventory/Common/GoodReceivingNotes";
import { selectVendors } from "store/Purchase/MasterData/Vendor";
import { selectItemMasterDatas } from "store/Inventory/MasterData/items";
import { selectInventoryItems } from "store/Inventory/MasterData/inventoryItems";
import { selectUOMs } from "store/Inventory/UnitOfMeasurement";
import { selectWarehouses } from "store/Inventory/Warehouse";
import { selectBins } from "store/Inventory/Bin";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import statusTypes from "../../../../config/statusTypes";
import { saveLineTag } from "./config";
import { Input } from "reactstrap";

import { setPageValues, getState } from "context/Main/States/Pagination";
import {
  assignFilterComponent,
  setLockComponent,
} from "context/Main/States/search";
import { SearchContext, MainContext } from "context/";
import { FilterByName, FilterByDate } from "helpers/Filter";
import { thisYear, nextYear } from "helpers/date";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchPurchaseReturns,
  addPurchaseReturn,
  editStatus,
  editPurchaseReturn,
  patchStatus,
  patchPurchaseReturn,
  deleteStatus,
  deletePurchaseReturn,
  purchaseReturns,
  items,
  unitMeasurements,
  warehouses,
  bins,
  goodReceivingNotes,
  vendors,
  inventoryItems,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [patchLock, setPatchLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [data, setData] = useState([]);

  const { searchValue } = useContext(SearchContext);
  const { dispatch, rootState } = useContext(MainContext);

  const [filterType, setFilterType] = useState("document_number");
  const [startDate, setStartDate] = useState(thisYear);
  const [endDate, setEndDate] = useState(nextYear);

  useEffect(() => {
    setData(purchaseReturns);
  }, [purchaseReturns, setData]);

  // Filtering component by document_number and posting date
  const FilterTypes = () => {
    const [selectedFilter, setSelectedFilter] = useState(filterType);
    const [start, setStart] = useState(startDate);
    const [end, setEnd] = useState(nextYear);

    useEffect(() => setStartDate(start), [start, setStartDate]);
    useEffect(() => setEndDate(end), [end, setEndDate]);
    useEffect(() => setFilterType(selectedFilter), [selectedFilter]);

    return (
      <>
        <Input
          type="select"
          onChange={({ currentTarget: { value } }) => setSelectedFilter(value)}
        >
          <option value="document_number">By Document Number</option>
          <option value="posting_date">Posting Date Range</option>
        </Input>
        {selectedFilter === "posting_date" ? (
          <>
            Start Date{" "}
            <Input
              type="date"
              value={start}
              onChange={({ currentTarget: { value } }) => setStart(value)}
            />
            End Date
            <Input
              type="date"
              value={end}
              onChange={({ currentTarget: { value } }) => setEnd(value)}
            />
          </>
        ) : (
          <></>
        )}
      </>
    );
  };

  //Assign filter commponent based on active tab
  useEffect(() => {
    // alert("In");
    setLockComponent({}, dispatch, false);
    assignFilterComponent({}, dispatch, FilterTypes);
  }, [dispatch]);

  //Do filtering based on filter type

  useEffect(() => {
    let filteredData = [];
    if (filterType !== "posting_date") {
      setStartDate("");
      setEndDate("");
      filteredData = FilterByName(
        purchaseReturns.map((pr) => ({
          ...pr,
          document_number: pr.document_number,
        })),
        filterType,
        searchValue,
        filterType === "document_number"
      );
    } else {
      filteredData = FilterByDate(
        purchaseReturns,
        filterType,
        startDate,
        endDate
      );
    }
    setData(filteredData);
  }, [searchValue, setData, filterType, startDate, endDate]);

  // Pagenation
  useEffect(() => {
    try {
      const {
        options: { offset, limit, onClick },
      } = getState(rootState);
      if (onClick) {
        fetchPurchaseReturns([
          { key: "offset", value: offset },
          { key: "limit", value: limit },
        ]);
      }
    } catch (e) {}
  }, [rootState]);

  useEffect(() => {
    setFetchLock(false);
    fetchGoodReceivingNotes();
  }, [fetchGoodReceivingNotes, setFetchLock]);

  useEffect(() => {
    setFetchLock(false);
    fetchPurchaseReturns();
  }, [fetchPurchaseReturns, setFetchLock]);

  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching purchase Returns");
      setFetchLock(true);
    } else {
      setPageValues(rootState, dispatch, response);
    }
  }, [fetchStatus, setFetchLock, setPageValues]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Purchase Return");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Purchase Return");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status, response } = patchStatus;
    if (status === reduxStatus.failure && !patchLock) {
      setPatchLock(true);
    } else if (status === reduxStatus.success && !patchLock) {
      if (response.status === statusTypes.ISSUED) {
        toast.success(`Purchase Return Issued`);
        setPatchLock(true);
      } else if (response.status === statusTypes.SENT_FOR_APPROVAL) {
        toast.success("Purchase Return Sent For Approval");
        setPatchLock(true);
      } else if (response.status === statusTypes.REJECTED) {
        toast.success("Purchase Return Rejected");
        setPatchLock(true);
      } else if (response.status === statusTypes.APPROVED) {
        toast.success("Purchase Return Approved");
        setPatchLock(true);
      }

      setPatchLock(true);
    }
  }, [patchStatus, setPatchLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Purchase Return");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addPurchaseReturn = (data) => {
    setAddLock(false);

    const requestBody = {
      supplier_invoice_no: data.supplier_invoice_no,
      purchase_order_no: data.purchase_order_no,
      grn_no: data.grn_no,
      vendor: data.vendor,
      remarks: data.remarks,
      [saveLineTag]: data[saveLineTag],
    };

    addPurchaseReturn(requestBody);
  };

  const _editPurchaseReturn = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      supplier_invoice_no: data.supplier_invoice_no,
      purchase_order_no: data.purchase_order_no,
      grn_no: data.grn_no,
      vendor: data.vendor,
      remarks: data.remarks,
      [saveLineTag]: data[saveLineTag],
    };

    editPurchaseReturn(requestBody);
  };

  const _postPurchaseReturn = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      posting_date: data.posting_date,
      status: statusTypes.POSTED,
    };

    patchPurchaseReturn(requestBody);
  };
  const _sendForApproval = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.SENT_FOR_APPROVAL,
    };

    patchPurchaseReturn(requestBody);
  };
  const _approvePurchaseReturn = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.APPROVED,
    };

    patchPurchaseReturn(requestBody);
  };
  const _rejectPurchaseReturn = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.REJECTED,
    };

    patchPurchaseReturn(requestBody);
  };

  const _deletePurchaseReturn = (id) => {
    setDeleteLock(false);
    deletePurchaseReturn(id);
  };

  return (
    <PurchaseReturn
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addPurchaseReturn={_addPurchaseReturn}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editPurchaseReturn={_editPurchaseReturn}
      donePatch={patchStatus.status === reduxStatus.success && !patchLock}
      postPurchaseReturn={_postPurchaseReturn}
      approvePurchaseReturn={_approvePurchaseReturn}
      rejectPurchaseReturn={_rejectPurchaseReturn}
      sendForApproval={_sendForApproval}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deletePurchaseReturn={_deletePurchaseReturn}
      purchaseReturns={data}
      items={items.filter(function (item) {
        return (
          inventoryItems.filter(function (inventoryItem) {
            return inventoryItem.item.id === item.id;
          }).length > 0
        );
      })}
      unitMeasurements={unitMeasurements}
      warehouses={warehouses}
      bins={bins}
      goodReceivingNotes={goodReceivingNotes}
      vendors={vendors}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  purchaseReturns: selectPurchaseReturns(state),
  editStatus: selectEditStatus(state),
  patchStatus: selectPatchStatus(state),
  deleteStatus: selectDeleteStatus(state),
  items: selectItemMasterDatas(state),
  unitMeasurements: selectUOMs(state),
  warehouses: selectWarehouses(state),
  bins: selectBins(state),
  goodReceivingNotes: selectGoodReceivingNotes(state),
  vendors: selectVendors(state),
  inventoryItems: selectInventoryItems(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPurchaseReturns: (data) => dispatch(Fetch(data)),
  addPurchaseReturn: (data) => dispatch(Add(data)),
  editPurchaseReturn: (data) => dispatch(Edit(data)),
  patchPurchaseReturn: (data) => dispatch(Patch(data)),
  deletePurchaseReturn: (id) => dispatch(Remove(id)),
  fetchGoodReceivingNotes: () => dispatch(fetchGoodReceivingNotes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
