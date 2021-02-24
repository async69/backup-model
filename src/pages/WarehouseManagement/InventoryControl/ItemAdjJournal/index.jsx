import React, { useState, useEffect, useContext } from "react";
import ItemAdjustmentJournal from "./ItemAdjJournal";
import {
  selectFetchStatus,
  selectAddStatus,
  selectItemAdjustmentJournals,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
  selectPatchStatus,
  Patch,
} from "../../../../store/Inventory/InventoryControl/ItemAdjJournal";
import { selectWarehouses } from "../../../../store/Inventory/Warehouse";
import { selectBins } from "../../../../store/Inventory/Bin";
import { selectUOMs } from "../../../../store/Inventory/UnitOfMeasurement";
import { selectItemMasterDatas } from "../../../../store/Inventory/MasterData/items";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import statusTypes from "../../../../config/statusTypes";
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
  ItemAdjustmentJournals,
  fetchItemAdjustmentJournals,
  addItemAdjustmentJournal,
  editStatus,
  editItemAdjustmentJournal,
  deleteStatus,
  deleteItemAdjustmentJournal,
  patchStatus,
  patchItemAdjustmentJournal,
  items,
  warehouses,
  unitMeasurements,
  bins,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [patchLock, setPatchLock] = useState(true);
  const [data, setData] = useState([]);

  const { searchValue } = useContext(SearchContext);
  const { dispatch, rootState } = useContext(MainContext);

  const [filterType, setFilterType] = useState("document_number");
  const [startDate, setStartDate] = useState(thisYear);
  const [endDate, setEndDate] = useState(nextYear);

  useEffect(() => {
    setData(ItemAdjustmentJournals);
  }, [ItemAdjustmentJournals, setData]);

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
        ItemAdjustmentJournals.map((grn) => ({
          ...grn,
          document_number: grn.document_number,
        })),
        filterType,
        searchValue,
        filterType === "document_number"
      );
    } else {
      filteredData = FilterByDate(
        ItemAdjustmentJournals,
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
        fetchItemAdjustmentJournals([
          { key: "offset", value: offset },
          { key: "limit", value: limit },
        ]);
      }
    } catch (e) {}
  }, [rootState]);

  useEffect(() => {
    setFetchLock(false);
    fetchItemAdjustmentJournals();
  }, [fetchItemAdjustmentJournals, setFetchLock]);

  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Item Adjustment Journals");
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
      toast.success("Added Item Adjustment Journal");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Item Adjustment Journal");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status, response } = patchStatus;
    if (status === reduxStatus.failure && !patchLock) {
      setPatchLock(true);
    } else if (status === reduxStatus.success && !patchLock) {
      if (response.status === statusTypes.ISSUED) {
        toast.success(`Item Adjustment Journal Issued`);
        setPatchLock(true);
      } else if (response.status === statusTypes.SENT_FOR_APPROVAL) {
        toast.success("Item Adjustment Journal Sent For Approval");
        setPatchLock(true);
      } else if (response.status === statusTypes.REJECTED) {
        toast.success("Item Adjustment Journal Rejected");
        setPatchLock(true);
      } else if (response.status === statusTypes.APPROVED) {
        toast.success("Item Adjustment Journal Approved");
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
      toast.success("Deleted Item Adjustment Journal");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addItemAdjustmentJournal = (data) => {
    setAddLock(false);
    const requestBody = {
      posting_date: data.posting_date,
      entry_type: data.entry_type,
      quantity: data.quantity,
      remarks: data.remarks,
      item: data.item,
      warehouse: data.warehouse,
      bin: data.bin,
      unit_of_measurement: data.unit_of_measurement,
    };

    addItemAdjustmentJournal(requestBody);
  };

  const _editItemAdjustmentJournal = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      posting_date: data.posting_date,
      entry_type: data.entry_type,
      quantity: data.quantity,
      remarks: data.remarks,
      item: data.item,
      warehouse: data.warehouse,
      bin: data.bin,
      unit_of_measurement: data.unit_of_measurement,
    };
    editItemAdjustmentJournal(requestBody);
  };
  const _rejectItemAdjustmentJournal = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.REJECTED,
    };

    patchItemAdjustmentJournal(requestBody);
  };
  const _postItemAdjustmentJournal = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      posting_date: data.posting_date,
      status: statusTypes.POSTED,
    };

    patchItemAdjustmentJournal(requestBody);
  };
  const _sendForApproval = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.SENT_FOR_APPROVAL,
    };

    patchItemAdjustmentJournal(requestBody);
  };
  const _approveItemAdjustmentJournal = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.APPROVED,
    };

    patchItemAdjustmentJournal(requestBody);
  };

  const _deleteItemAdjustmentJournal = (id) => {
    setDeleteLock(false);
    deleteItemAdjustmentJournal(id);
  };

  return (
    <ItemAdjustmentJournal
      ItemAdjustmentJournals={data}
      warehouses={warehouses}
      bins={bins}
      items={items}
      unitMeasurements={unitMeasurements}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addItemAdjustmentJournal={_addItemAdjustmentJournal}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editItemAdjustmentJournal={_editItemAdjustmentJournal}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteItemAdjustmentJournal={_deleteItemAdjustmentJournal}
      postItemAdjustmentJournal={_postItemAdjustmentJournal}
      approveItemAdjustmentJournal={_approveItemAdjustmentJournal}
      rejectItemAdjustmentJournal={_rejectItemAdjustmentJournal}
      sendForApproval={_sendForApproval}
      donePatch={patchStatus.status === reduxStatus.success && !patchLock}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  ItemAdjustmentJournals: selectItemAdjustmentJournals(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  warehouses: selectWarehouses(state),
  unitMeasurements: selectUOMs(state),
  items: selectItemMasterDatas(state),
  bins: selectBins(state),
  patchStatus: selectPatchStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchItemAdjustmentJournals: (data) => dispatch(Fetch(data)),
  addItemAdjustmentJournal: (data) => dispatch(Add(data)),
  editItemAdjustmentJournal: (data) => dispatch(Edit(data)),
  deleteItemAdjustmentJournal: (id) => dispatch(Remove(id)),
  patchItemAdjustmentJournal: (data) => dispatch(Patch(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
