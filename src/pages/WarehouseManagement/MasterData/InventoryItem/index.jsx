import React, { useState, useEffect, useContext } from "react";
import InventoryItem from "./InventoryItem";
import {
  selectFetchStatus,
  selectAddStatus,
  selectInventoryItems,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "store/Inventory/MasterData/inventoryItems";
import { selectItemCategories } from "store/Inventory/MasterData/itemCategories";
import { selectItemMasterDatas } from "store/Inventory/MasterData/items";
import { selectUOMs } from "store/Inventory/UnitOfMeasurement";
import { selectWarehouses } from "store/Inventory/Warehouse";

import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
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
  fetchInventoryItems,
  addInventoryItem,
  editStatus,
  editInventoryItem,
  deleteStatus,
  deleteInventoryItem,
  inventoryItems,
  items,
  itemCategories,
  unitMeasurements,
  warehouses,
  activeTab,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  const { searchValue } = useContext(SearchContext);
  const { dispatch, rootState } = useContext(MainContext);

  const [filterType, setFilterType] = useState("document_number");
  const [startDate, setStartDate] = useState(thisYear);
  const [endDate, setEndDate] = useState(nextYear);

  useEffect(() => {
    setData(inventoryItems);
  }, [inventoryItems, setData]);

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
          <option value="name">By Name</option>
          <option value="code">By Code</option>
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
        inventoryItems.map((grn) => ({
          ...grn,
          document_number: grn.item.number,
          name: grn.item.name,
          code: grn.item.code,
        })),
        filterType,
        searchValue,
        filterType === "document_number"
      );
    } else {
      filteredData = FilterByDate(
        inventoryItems,
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
        fetchInventoryItems([
          { key: "offset", value: offset },
          { key: "limit", value: limit },
        ]);
      }
    } catch (e) {}
  }, [rootState]);

  useEffect(() => {
    setFetchLock(false);
    fetchInventoryItems();
  }, [fetchInventoryItems, setFetchLock]);

  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Inventory Items");
      setFetchLock(true);
    } else {
      setPageValues(rootState, dispatch, response);
    }
  }, [fetchStatus, setFetchLock, setPageValues, activeTab]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Inventory Item");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Inventory Item");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Inventory Item");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addInventoryItem = (data) => {
    setAddLock(false);
    addInventoryItem(data);
  };

  const _editInventoryItem = (data) => {
    setEditLock(false);
    editInventoryItem(data);
  };

  const _deleteInventoryItem = (id) => {
    setDeleteLock(false);
    deleteInventoryItem(id);
  };

  return (
    <InventoryItem
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addInventoryItem={_addInventoryItem}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editInventoryItem={_editInventoryItem}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteInventoryItem={_deleteInventoryItem}
      inventoryItems={data}
      itemCategories={itemCategories}
      unitMeasurements={unitMeasurements}
      warehouses={warehouses}
      items={items}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  inventoryItems: selectInventoryItems(state),

  itemCategories: selectItemCategories(state),
  unitMeasurements: selectUOMs(state),
  warehouses: selectWarehouses(state),
  items: selectItemMasterDatas(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchInventoryItems: () => dispatch(Fetch()),
  addInventoryItem: (data) => dispatch(Add(data)),
  editInventoryItem: (data) => dispatch(Edit(data)),
  deleteInventoryItem: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
