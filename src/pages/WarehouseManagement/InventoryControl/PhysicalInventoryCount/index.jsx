import React, { useState, useEffect, useContext } from "react";
import PhysicalInventoryJournal from "./PhysicalInventoryCount";
import {
  selectFetchStatus,
  selectAddStatus,
  selectPhysicalInventoryJournals,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
  Patch,
  selectPatchStatus,
} from "../../../../store/Inventory/InventoryControl/PhysicalInventoryJournal";
import { selectInventoryItems } from "store/Inventory/MasterData/inventoryItems";

import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { selectItemMasterDatas } from "../../../../store/Inventory/Setup/Item/Item_MasterData";
import { selectWarehouses } from "../../../../store/Inventory/Warehouse";
import { selectUOMs } from "../../../../store/Inventory/Setup/UOM/Warehouse";
import { selectBins } from "../../../../store/Inventory/Bin";
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
  fetchPhysicalInventoryJournals,
  addPhysicalInventoryJournal,
  editStatus,
  editPhysicalInventoryJournal,
  deleteStatus,
  deletePhysicalInventoryJournal,
  physicalInventoryJournals,
  patchPhysicalInventoryJournal,
  items,
  warehouses,
  UOMs,
  bins,
  patchStatus,
  inventoryItems,
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
    setData(physicalInventoryJournals);
  }, [physicalInventoryJournals, setData]);

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
          <option value="document_number">By Item Number</option>
          {/* <option value="posting_date">Posting Date Range</option> */}
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
        physicalInventoryJournals.map((grn) => ({
          ...grn,
          document_number: grn.item_detail.item_number,
        })),
        filterType,
        searchValue,
        filterType === "document_number"
      );
    } else {
      filteredData = FilterByDate(
        physicalInventoryJournals,
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
        fetchPhysicalInventoryJournals([
          { key: "offset", value: offset },
          { key: "limit", value: limit },
        ]);
      }
    } catch (e) {}
  }, [rootState]);

  useEffect(() => {
    setFetchLock(false);
    fetchPhysicalInventoryJournals();
  }, [fetchPhysicalInventoryJournals, setFetchLock]);

  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Physical Inventory Count");
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
      toast.success("Added Physical Inventory Count");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Physical Inventory  Count");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status, response } = patchStatus;
    if (status === reduxStatus.failure && !patchLock) {
      setPatchLock(true);
    } else if (status === reduxStatus.success && !patchLock) {
      if (response.status === statusTypes.ISSUED) {
        toast.success(`Item Physical Inventory Count Adjusted`);
        setPatchLock(true);
      } else if (response.status === statusTypes.PROCESS) {
        toast.success("Item Physical Inventory Count Processed");
        setPatchLock(true);
      } else if (response.status === statusTypes.SENT_FOR_APPROVAL) {
        toast.success("Item Physical Inventory Count Sent For Approval");
        setPatchLock(true);
      } else if (response.status === statusTypes.REJECTED) {
        toast.success("Item Physical Inventory Count Rejected");
        setPatchLock(true);
      } else if (response.status === statusTypes.APPROVED) {
        toast.success("Item Physical Inventory Count Approved");
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
      toast.success("Deleted Physical Inventory Journal");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addPhysicalInventoryJournal = (data) => {
    setAddLock(false);
    const requestBody = {
      inventory_quantity: data.inventory_quantity,
      physical_counted_quantity: data.physical_counted_quantity,
      remarks: data.remarks,
      item: data.item,
      warehouse: data.warehouse,
      basic_unit_of_measurement: data.basic_unit_of_measurement,
      unit_price: data.unit_price,
    };

    addPhysicalInventoryJournal(requestBody);
  };

  const _editPhysicalInventoryJournal = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      inventory_quantity: data.inventory_quantity,
      physical_counted_quantity: data.physical_counted_quantity,
      remarks: data.remarks,
      item: data.item,
      warehouse: data.warehouse,
      basic_unit_of_measurement: data.basic_unit_of_measurement,
      unit_price: data.unit_price,
    };

    editPhysicalInventoryJournal(requestBody);
  };
  const _rejectPhysicalInventoryJournal = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.REJECTED,
    };

    patchPhysicalInventoryJournal(requestBody);
  };
  const _adjustPhysicalInventoryJournal = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      posting_date: data.posting_date,
      status: statusTypes.ADJUSTED,
    };

    patchPhysicalInventoryJournal(requestBody);
  };
  const _processPhysicalInventoryJournal = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      posting_date: data.posting_date,
      status: statusTypes.PROCESS,
    };

    patchPhysicalInventoryJournal(requestBody);
  };
  const _sendForApproval = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.SENT_FOR_APPROVAL,
    };

    patchPhysicalInventoryJournal(requestBody);
  };
  const _approvePhysicalInventoryJournal = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.APPROVED,
    };

    patchPhysicalInventoryJournal(requestBody);
  };

  const _deletePhysicalInventoryJournal = (id) => {
    setDeleteLock(false);
    deletePhysicalInventoryJournal(id);
  };

  return (
    <PhysicalInventoryJournal
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addPhysicalInventoryJournal={_addPhysicalInventoryJournal}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editPhysicalInventoryJournal={_editPhysicalInventoryJournal}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deletePhysicalInventoryJournal={_deletePhysicalInventoryJournal}
      physicalInventoryJournals={data}
      items={items}
      warehouses={warehouses}
      UOMs={UOMs}
      bins={bins}
      inventoryItems={inventoryItems}
      donePatch={patchStatus.status === reduxStatus.success && !patchLock}
      adjustPhysicalInventoryJournal={_adjustPhysicalInventoryJournal}
      approvePhysicalInventoryJournal={_approvePhysicalInventoryJournal}
      rejectPhysicalInventoryJournal={_rejectPhysicalInventoryJournal}
      sendForApproval={_sendForApproval}
      processPhysicalInventoryJournal={_processPhysicalInventoryJournal}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  patchStatus: selectPatchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  physicalInventoryJournals: selectPhysicalInventoryJournals(state),
  items: selectItemMasterDatas(state),
  warehouses: selectWarehouses(state),
  UOMs: selectUOMs(state),
  bins: selectBins(state),
  inventoryItems: selectInventoryItems(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPhysicalInventoryJournals: (data) => dispatch(Fetch(data)),
  addPhysicalInventoryJournal: (data) => dispatch(Add(data)),
  editPhysicalInventoryJournal: (data) => dispatch(Edit(data)),
  deletePhysicalInventoryJournal: (id) => dispatch(Remove(id)),
  patchPhysicalInventoryJournal: (data) => dispatch(Patch(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
