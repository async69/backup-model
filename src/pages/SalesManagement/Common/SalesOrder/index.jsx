import React, { useState, useEffect, useContext } from "react";
import SalesOrder from "./SalesOrder";
import {
  selectFetchStatus,
  selectAddStatus,
  selectSalesOrders,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectPatchStatus,
  Patch,
  selectDeleteStatus,
  Remove,
  patchDelete,
  getLoading
} from "../../../../store/Sales/Common/SalesOrder";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import statusTypes from "../../../../config/statusTypes";
import { saveLineTag } from "./config";
import { SearchContext, MainContext } from "../../../../context/";
import {
  assignFilterComponent,
  setLockComponent,
} from "../../../../context/Main/States/search";
import { FilterByName, FilterByDate } from "../../../../helpers/Filter";
import { Input } from "reactstrap";
import { thisYear, nextYear } from "../../../../helpers/date";
import {
  selectSalesRegions,
  FetchAll as FetchSalesRegions,
} from "../../../../store/Sales/Setup/SalesRegion";
import {
  selectCustomers,
  FetchAll,
} from "../../../../store/Sales/MasterData/Customer";
import { selectItemCategories } from "../../../../store/Inventory/Setup/Item/Item_Categories";
import { selectItemMasterDatas as selectItemInventoryData } from "../../../../store/Inventory/Setup/Item/Inventory_Item";
import { selectItemMasterDatas } from "../../../../store/Inventory/Setup/Item/Item_MasterData";
import { selectUOMs } from "../../../../store/Inventory/Setup/UOM/Warehouse/";
import { selectCurrencies } from "../../../../store/GeneralSetup/Currencies";
import { getDateFormat } from "../../../../helpers/date";
import { displayString } from "../../../../helpers/display";
import {
  setPageValues,
  getState,
} from "../../../../context/Main/States/Pagination";
import { selectEmployees } from "store/HR/ResourceManagement/Employees";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchSalesOrders,
  fetchSalesRegions,
  addSalesOrder,
  editStatus,
  editSalesOrder,
  patchStatus,
  patchSalesOrder,
  deleteStatus,
  deleteSalesOrder,
  salesOrders,
  salesRegions,
  customers,
  itemCategories,
  items,
  itemMasterDatas,
  UOMs,
  currencies,
  fetchCustomers,
  employees,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [patchLock, setPatchLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [data, setData] = useState([]);
  const [filterType, setFilterType] = useState("document_number");
  const [startDate, setStartDate] = useState(thisYear);
  const [endDate, setEndDate] = useState(nextYear);

  useEffect(() => {
    setData(salesOrders);
  }, [salesOrders, setData]);

  const { searchValue } = useContext(SearchContext);

  const { rootState, dispatch } = useContext(MainContext);

  useEffect(() => {
    try {
      const {
        options: { offset, limit, onClick },
      } = getState(rootState);
      if (onClick) {
        fetchSalesOrders([
          { key: "offset", value: offset },
          { key: "limit", value: limit },
        ]);
      }
    } catch (e) {}
  }, [rootState]);

  const FilterTypes = () => {
    const [selectedFilter, setFilter] = useState(filterType);
    const [start, setStart] = useState(startDate);
    const [end, setEnd] = useState(nextYear);

    useEffect(() => setStartDate(start), [start, setStartDate]);
    useEffect(() => setEndDate(end), [end, setEndDate]);
    useEffect(() => setFilterType(selectedFilter), [selectedFilter]);

    return (
      <>
        <Input
          type="select"
          onChange={({ currentTarget: { value } }) => setFilter(value)}
        >
          <option value="document_number">By Document Number</option>
          <option value="posting_date">Posting Date Range</option>
          <option value="customer_number">Customer No.</option>
          <option value="customer_name">Customer Name</option>
          <option value="sales_region_name">Sales Region</option>
          <option value="sales_person">Sales Person</option>
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
  useEffect(() => {
    setLockComponent({}, dispatch, false);
    assignFilterComponent({}, dispatch, FilterTypes);
  }, [dispatch]);

  useEffect(() => {
    let filteredData = [];
    if (filterType !== "posting_date") {
      setStartDate("");
      setEndDate("");
      filteredData = FilterByName(
        salesOrders.map((item) => ({
          ...item,
          customer_number: item.customer.customer_number,
          customer_name: item.customer.name,
          sales_region_name: item.sales_region.name,
        })),
        filterType,
        searchValue,
        filterType === "document_number" || filterType === "customer_number"
      );
    } else {
      filteredData = FilterByDate(salesOrders, filterType, startDate, endDate);
    }
    setData(filteredData);
  }, [searchValue, setData, filterType, startDate, endDate]);

  useEffect(() => {
    setFetchLock(false);
    fetchSalesOrders();
    fetchCustomers();
    fetchSalesRegions();
  }, [fetchSalesOrders, setFetchLock, fetchCustomers]);

  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching salesOrders");
      setFetchLock(false);
    } else {
      setPageValues(rootState, dispatch, response);
    }
  }, [fetchStatus, setFetchLock, setPageValues]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Sales Order");
      setAddLock(true);
    }
  }, [addStatus, setAddLock, addLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Sales Order");
      setEditLock(true);
    }
  }, [editStatus, setEditLock, editLock]);

  useEffect(() => {
    const { status, response } = patchStatus;
    if (response) {
      if (response.status === statusTypes.DELETED && !patchLock) {
        toast.success("Deleted Sales Order");
        setPatchLock(true);
      }
    }
    if (status === reduxStatus.failure && !patchLock) {
      setPatchLock(true);
    } else if (status === reduxStatus.success && !patchLock) {
      if (response.status === statusTypes.SENT_FOR_APPROVAL) {
        toast.success(`Sales Order ${response.status}`);
      } else if (response.status === statusTypes.OPEN_SIV) {
        toast.success("Sales Order Approved");
      } else if (response.status === statusTypes.REJECTED) {
        toast.success("Sales Order Rejected");
      }
      setPatchLock(true);
    }
  }, [patchStatus, setPatchLock, patchLock]);

  useEffect(() => {
    const { status, errors } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      toast.error(displayString(errors.errors));
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Sales Order");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addSalesOrder = (data) => {
    setAddLock(false);
    const requestBody = {
      order_date: data.order_date,
      customer: data.customer,
      sales_region: data.sales_region,
      sales_person: null,
      due_date: data.due_date,
      approved_by: null,
      approved_date: getDateFormat(String(new Date())),
      remarks: data.remarks,
      sales_order_lines: data[saveLineTag].map((line) => ({
        quantity: Math.round(Number(line.quantity)),
        discount_method: line.discount_type,
        item: line.item,
        unit_of_measurement: line.unit_measure,
        discount: line.discount_amount,
      })),
    };

    addSalesOrder(requestBody);
  };

  const _editSalesOrder = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      order_date: data.order_date,
      customer: data.customer,
      sales_region: data.sales_region,
      sales_person: null,
      due_date: data.due_date,
      approved_by: null,
      approved_date: getDateFormat(String(new Date())),
      remarks: data.remarks,
      sales_order_lines: data[saveLineTag].map((line) => ({
        quantity: Math.round(Number(line.quantity)),
        discount_method: line.discount_type,
        item: line.item,
        unit_of_measurement: line.unit_measure,
        discount: line.discount_amount,
      })),
    };

    editSalesOrder(requestBody);
  };

  const _sendForApproval = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.SENT_FOR_APPROVAL,
    };

    patchSalesOrder(requestBody);
  };

  const _approveSalesOrder = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.OPEN_SIV,
    };

    patchSalesOrder(requestBody);
  };

  const _rejectSalesOrder = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.REJECTED,
    };

    patchSalesOrder(requestBody);
  };

  const _invoiceSalesOrder = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.INVOICING,
    };

    patchSalesOrder(requestBody);
  };

  const _deleteSalesOrder = (id) => {
    setPatchLock(false);
    patchSalesOrder(patchDelete(id));
  };

  return (
    <SalesOrder
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addSalesOrder={_addSalesOrder}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editSalesOrder={_editSalesOrder}
      donePatch={patchStatus.status === reduxStatus.success && !patchLock}
      sendForApproval={_sendForApproval}
      approveSalesOrder={_approveSalesOrder}
      rejectSalesOrder={_rejectSalesOrder}
      invoiceSalesOrder={_invoiceSalesOrder}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteSalesOrder={_deleteSalesOrder}
      salesOrders={data}
      salesRegions={salesRegions}
      customers={customers}
      itemCategories={itemCategories}
      items={itemMasterDatas.filter((prop) => {
        const index = items.findIndex((item) => item.item.id === prop.id);
        return index >= 0;
      })}
      UOMs={UOMs}
      currencies={currencies}
      employees={employees}
      status={{
        selectFetchStatus,
        selectAddStatus,
        selectEditStatus,
        selectPatchStatus,
        selectDeleteStatus
      }}
      getLoading={getLoading}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  salesOrders: selectSalesOrders(state),
  editStatus: selectEditStatus(state),
  patchStatus: selectPatchStatus(state),
  deleteStatus: selectDeleteStatus(state),
  salesRegions: selectSalesRegions(state),
  customers: selectCustomers(state),
  itemCategories: selectItemCategories(state),
  items: selectItemInventoryData(state),
  itemMasterDatas: selectItemMasterDatas(state),
  UOMs: selectUOMs(state),
  currencies: selectCurrencies(state),
  employees: selectEmployees(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchSalesOrders: (data = null) => dispatch(Fetch(data)),
  addSalesOrder: (data) => dispatch(Add(data)),
  editSalesOrder: (data) => dispatch(Edit(data)),
  patchSalesOrder: (data) => dispatch(Patch(data)),
  deleteSalesOrder: (id) => dispatch(Remove(id)),
  fetchCustomers: () => dispatch(FetchAll()),
  fetchSalesRegions: () => dispatch(FetchSalesRegions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
