import React, { useState, useEffect, useContext } from "react";
import Item from "./Item";
import {
  selectFetchStatus,
  selectAddStatus,
  selectItemMasterDatas,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "store/Inventory/MasterData/items";
import { selectItemCategories } from "store/Inventory/MasterData/itemCategories";
import { selectUOMs } from "store/Inventory/UnitOfMeasurement";
import { selectWarehouses } from "store/Inventory/Warehouse";
import { selectBins } from "store/Inventory/Bin";
import { selectCostingMethods } from "store/GeneralSetup/CostingMethods";
import { selectVATPostingGroups } from "store/GeneralSetup/Posting/VAT_Posting_Group";
import { selectInventoryPostingGroups } from "store/GeneralSetup/Posting/InventoryPostingGroups";
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
  fetchItems,
  addItem,
  editStatus,
  editItem,
  deleteStatus,
  deleteItem,
  items,
  itemCategories,
  unitMeasurements,
  warehouses,
  bins,
  costingMethods,
  vatPostingGroups,
  inventoryPostingGroups,
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
    setData(items);
  }, [items, setData]);

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
        items.map((grn) => ({
          ...grn,
          document_number: grn.document_number,
        })),
        filterType,
        searchValue,
        filterType === "document_number"
      );
    } else {
      filteredData = FilterByDate(items, filterType, startDate, endDate);
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
        fetchItems([
          { key: "offset", value: offset },
          { key: "limit", value: limit },
        ]);
      }
    } catch (e) {}
  }, [rootState]);

  useEffect(() => {
    setFetchLock(false);
    fetchItems();
  }, [fetchItems, setFetchLock]);

  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Items");
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
      toast.success("Added Item");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Item");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Item");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addItem = (data) => {
    setAddLock(false);
    const requestBody = {
      name: data.name,
      price: data.price,
      is_blocked: data.is_blocked,
      unit_cost: data.unit_cost,
      remarks: data.remarks,
      warehouse: data.warehouse,
      bin: data.bin,
      category: data.category,
      basic_unit_of_measurement: data.basic_unit_of_measurement,
      costing_method: data.costing_method,
      general_product_posting_group: data.general_product_posting_group,
      vat_product_posting_group: data.vat_product_posting_group,
      inventory_posting_group: data.inventory_posting_group,
      can_be_purchased: data.can_be_purchased,
      can_be_sold: data.can_be_sold,
    };
    addItem(requestBody);
  };

  const _editItem = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      name: data.name,
      price: data.price,
      is_blocked: data.is_blocked,
      unit_cost: data.unit_cost,
      remarks: data.remarks,
      warehouse: data.warehouse,
      bin: data.bin,
      category: data.category,
      basic_unit_of_measurement: data.basic_unit_of_measurement,
      costing_method: data.costing_method,
      general_product_posting_group: data.general_product_posting_group,
      vat_product_posting_group: data.vat_product_posting_group,
      inventory_posting_group: data.inventory_posting_group,
      can_be_purchased: data.can_be_purchased,
      can_be_sold: data.can_be_sold,
    };
    editItem(requestBody);
  };

  const _deleteItem = (id) => {
    setDeleteLock(false);
    deleteItem(id);
  };

  return (
    <Item
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addItem={_addItem}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editItem={_editItem}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteItem={_deleteItem}
      items={data.map((item) => ({
        ...item,
        is_blocked: String(item.is_blocked),
      }))}
      itemCategories={itemCategories}
      unitMeasurements={unitMeasurements}
      warehouses={warehouses}
      bins={bins}
      costingMethods={costingMethods}
      vatPostingGroups={vatPostingGroups}
      inventoryPostingGroups={inventoryPostingGroups}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  items: selectItemMasterDatas(state),

  itemCategories: selectItemCategories(state),
  unitMeasurements: selectUOMs(state),
  warehouses: selectWarehouses(state),
  bins: selectBins(state),
  costingMethods: selectCostingMethods(state),
  vatPostingGroups: selectVATPostingGroups(state),
  inventoryPostingGroups: selectInventoryPostingGroups(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchItems: () => dispatch(Fetch()),
  addItem: (data) => dispatch(Add(data)),
  editItem: (data) => dispatch(Edit(data)),
  deleteItem: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
