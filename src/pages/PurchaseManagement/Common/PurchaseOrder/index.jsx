import React, { useState, useEffect, useContext } from "react";
import PurchaseOrder from "./PurchaseOrder";
import {
  selectFetchStatus,
  selectAddStatus,
  selectPurchaseOrders,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectPatchStatus,
  Patch,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Purchase/Common/PurchaseOrder";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import statusTypes from "../../../../config/statusTypes";
import { saveLineTag } from "./config";
import { SearchContext, MainContext } from "../../../../context/";
import { assignFilterComponent } from "../../../../context/Main/States/search";
import { FilterByName, FilterByDate } from "../../../../helpers/Filter";
import { Input } from "reactstrap";
import { thisYear, nextYear } from "../../../../helpers/date";
import { purchaseStatusTypes } from "../../../../config/statusTypes";
import {
  setPageValues,
  getState,
} from "../../../../context/Main/States/Pagination";
import { selectPurchaseRequisitions } from "store/Purchase/Common/PurchaseRequisition";
import { selectItemMasterDatas } from "store/Inventory/Setup/Item/Item_MasterData";
import { selectItemCategories } from "store/Inventory/Setup/Item/Item_Categories";
import { selectUOMs } from "store/Inventory/UnitOfMeasurement/";
import { selectVendors } from "store/Purchase/MasterData/Vendor";
import { selectPurchaseTypes } from "store/Purchase/Setup/PurchaseType";
import { selectCurrencies } from "store/GeneralSetup/Currencies";
import { activeTabs } from "../../PurchaseCommon";
import { selectDepartments } from "store/HR/Setup/Department";
import { selectEmployees } from "store/HR/ResourceManagement/Employee";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchPurchaseOrders,
  addPurchaseOrder,
  editStatus,
  editPurchaseOrder,
  patchStatus,
  patchPurchaseOrder,
  deleteStatus,
  deletePurchaseOrder,
  purchaseOrders,
  activeTab,
  itemMasterDatas,
  UOMs,
  vendors,
  itemCategories,
  currencies,
  purchaseTypes,
  purchaseRequisitions,
  departments,
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
  const [orderStatus, setOrderStatus] = useState(statusTypes.OPEN);

  const { rootState, dispatch } = useContext(MainContext);

  useEffect(() => {
    try {
      const {
        options: { offset, limit, onClick },
      } = getState(rootState);
      if (onClick) {
        fetchPurchaseOrders([
          { key: "offset", value: offset },
          { key: "limit", value: limit },
        ]);
      }
    } catch (e) {}
  }, [getState(rootState)]);

  useEffect(() => {
    setData(purchaseOrders);
  }, [purchaseOrders, setData]);

  const { searchValue } = useContext(SearchContext);

  const FilterTypes = () => {
    const [selectedFilter, setFilter] = useState(filterType);
    const [start, setStart] = useState(startDate);
    const [end, setEnd] = useState(nextYear);
    const [status, setStatus] = useState(orderStatus);

    useEffect(() => setStartDate(start), [start, setStartDate]);
    useEffect(() => setEndDate(end), [end, setEndDate]);
    useEffect(() => setFilterType(selectedFilter), [selectedFilter]);
    useEffect(() => setOrderStatus(status), [status]);

    return (
      <>
        <Input
          type="select"
          onChange={({ currentTarget: { value } }) => setFilter(value)}
        >
          <option value="document_number">By Document Number</option>
          <option value="order_date">Order Date Range</option>
          <option value="posting_date">Posting Date Range</option>
          <option value="vendor_number">Vendor No.</option>
          <option value="vendor_name">Vendor Name</option>
          <option value="purchase_type">Purchase Type</option>
          <option value="purchaser">Purchaser</option>
          <option value="status">Status</option>
        </Input>
        {selectedFilter === "posting_date" ||
        selectedFilter === "order_date" ? (
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
        {selectedFilter === "status" ? (
          <>
            <Input
              type="select"
              onChange={({ currentTarget: { value } }) => setStatus(value)}
              style={{ marginLeft: 10 }}
            >
              {Object.values(purchaseStatusTypes).map((status) => (
                <option>{status}</option>
              ))}
            </Input>
          </>
        ) : (
          <></>
        )}
      </>
    );
  };
  useEffect(() => {
    assignFilterComponent({}, dispatch, FilterTypes);
  }, [dispatch]);

  useEffect(() => {
    let filteredData = [];
    if (filterType === "status") {
      filteredData = FilterByName(
        purchaseOrders.map((item) => ({
          ...item,
          vendor_number: item.vendor_detail.number,
          vendor_name: item.vendor_detail.name,
          purchase_type: item.purchase_type_detail.name,
        })),
        filterType,
        orderStatus
      );
    } else if (filterType !== "posting_date") {
      setStartDate("");
      setEndDate("");
      filteredData = FilterByName(
        purchaseOrders.map((item) => ({
          ...item,
          vendor_number: item.vendor_detail.number,
          vendor_name: item.vendor_detail.name,
          purchase_type: item.purchase_type_detail.name,
        })),
        filterType,
        searchValue,
        filterType === "document_number"
      );
    } else {
      filteredData = FilterByDate(
        purchaseOrders,
        filterType,
        startDate,
        endDate
      );
    }
    setData(filteredData);
  }, [
    searchValue,
    setData,
    filterType,
    startDate,
    endDate,
    purchaseOrders,
    orderStatus,
  ]);

  useEffect(() => {
    setFetchLock(false);
    fetchPurchaseOrders();
  }, [fetchPurchaseOrders, setFetchLock]);

  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Purchase Orders");
      setFetchLock(true);
    } else {
      if (activeTab === activeTabs.PURCHASE_ORDER) {
        setPageValues(rootState, dispatch, response, "", activeTab);
      }
    }
  }, [fetchStatus, setFetchLock, activeTab]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Purchase Order");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Purchase Order");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status, response } = patchStatus;
    if (status === reduxStatus.failure && !patchLock) {
      setPatchLock(true);
    } else if (status === reduxStatus.success && !patchLock) {
      if (response.status === statusTypes.SENT_FOR_APPROVAL) {
        toast.success(`Purchase Order ${response.status}`);
      } else if (response.status === statusTypes.APPROVED) {
        toast.success("Purchase Order Approved");
      } else if (response.status === statusTypes.REJECTED) {
        toast.success("Purchase Order Rejected");
      } else if (response.status === statusTypes.INVOICING) {
        toast.success("Purchase Order Invoiced");
      }
      setPatchLock(true);
    }
  }, [patchStatus, setPatchLock, patchLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Purchase Order");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addPurchaseOrder = (data) => {
    setAddLock(false);
    const requestBody = {
      document_number: data.document_number,
      order_date: data.order_date,
      purchase_requisition: data.purchase_requisition,
      vendor: data.vendor,
      requestor_department: data.requestor_department,
      purchase_type: data.purchase_type,
      expected_delivery_date: data.expected_delivery_date,
      remarks: data.remarks,
      status: "Open",
      [saveLineTag]: data[saveLineTag],
    };

    addPurchaseOrder(requestBody);
  };

  const _editPurchaseOrder = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      document_number: data.document_number,
      order_date: data.order_date,
      purchase_requisition: data.purchase_requisition,
      vendor: data.vendor,
      requestor_department: data.requestor_department,
      purchase_type: data.purchase_type,
      purchaser: data.purchaser,
      expected_delivery_date: data.expected_delivery_date,
      approved_by: data.approved_by,
      status: data.status,
      remarks: data.remarks,
      [saveLineTag]: data[saveLineTag],
    };

    editPurchaseOrder(requestBody);
  };

  const _sendForApproval = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.SENT_FOR_APPROVAL,
    };

    patchPurchaseOrder(requestBody);
  };

  const _approvePurchaseOrder = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.OPEN_GRN,
    };

    patchPurchaseOrder(requestBody);
  };

  const _invoicePurchaseOrder = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.INVOICING,
    };
    patchPurchaseOrder(requestBody);
  };

  const _rejectPurchaseOrder = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.REJECTED,
    };

    patchPurchaseOrder(requestBody);
  };

  const _deletePurchaseOrder = (id) => {
    setDeleteLock(false);
    deletePurchaseOrder(id);
  };

  return (
    <PurchaseOrder
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addPurchaseOrder={_addPurchaseOrder}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editPurchaseOrder={_editPurchaseOrder}
      donePatch={patchStatus.status === reduxStatus.success && !patchLock}
      sendForApproval={_sendForApproval}
      approvePurchaseOrder={_approvePurchaseOrder}
      rejectPurchaseOrder={_rejectPurchaseOrder}
      invoicePurchaseOrder={_invoicePurchaseOrder}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deletePurchaseOrder={_deletePurchaseOrder}
      purchaseOrders={data}
      itemMasterDatas={itemMasterDatas}
      UOMs={UOMs}
      vendors={vendors}
      itemCategories={itemCategories}
      currencies={currencies}
      purchaseTypes={purchaseTypes}
      purchaseRequisitions={purchaseRequisitions}
      departments={departments}
      employees={employees}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  purchaseOrders: selectPurchaseOrders(state),
  editStatus: selectEditStatus(state),
  patchStatus: selectPatchStatus(state),
  deleteStatus: selectDeleteStatus(state),
  itemMasterDatas: selectItemMasterDatas(state),
  UOMs: selectUOMs(state),
  vendors: selectVendors(state),
  itemCategories: selectItemCategories(state),
  currencies: selectCurrencies(state),
  purchaseTypes: selectPurchaseTypes(state),
  purchaseRequisitions: selectPurchaseRequisitions(state),
  departments: selectDepartments(state),
  employees: selectEmployees(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPurchaseOrders: (data = null) => dispatch(Fetch(data)),
  addPurchaseOrder: (data) => dispatch(Add(data)),
  editPurchaseOrder: (data) => dispatch(Edit(data)),
  patchPurchaseOrder: (data) => dispatch(Patch(data)),
  deletePurchaseOrder: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
