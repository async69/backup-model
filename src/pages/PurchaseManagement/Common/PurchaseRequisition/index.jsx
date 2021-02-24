import React, { useState, useEffect, useContext } from "react";
import PurchaseRequisitions from "./PurchaseRequisition";
import {
  selectFetchStatus,
  selectAddStatus,
  selectPurchaseRequisitions,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectPatchStatus,
  Patch,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Purchase/Common/PurchaseRequisition";
import { selectItemMasterDatas } from "store/Inventory/Setup/Item/Item_MasterData";
import { selectItemCategories } from "store/Inventory/Setup/Item/Item_Categories";
import { selectUOMs } from "store/Inventory/UnitOfMeasurement/";
import { selectVendors } from "store/Purchase/MasterData/Vendor";
import { selectPurchaseTypes } from "store/Purchase/Setup/PurchaseType";
import { selectCurrencies } from "store/GeneralSetup/Currencies";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import statusTypes from "../../../../config/statusTypes";
import { saveLineTag } from "./config";
import { SearchContext, MainContext } from "../../../../context/";
import { assignFilterComponent } from "../../../../context/Main/States/search";
import { FilterByName, FilterByDate } from "../../../../helpers/Filter";
import { Input } from "reactstrap";
import { thisYear, nextYear, getDateFormat } from "../../../../helpers/date";
import { purchaseStatusTypes } from "../../../../config/statusTypes";
import {
  setPageValues,
  getState,
} from "../../../../context/Main/States/Pagination";
import { activeTabs } from "../../PurchaseCommon";
import { selectDepartments } from "store/HR/Setup/Department";
import { selectEmployees } from "store/HR/ResourceManagement/Employee";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchPurchaseRequisitions,
  addPurchaseRequisition,
  editStatus,
  editPurchaseRequisition,
  patchStatus,
  patchPurchaseRequisitions,
  deleteStatus,
  deletePurchaseRequisitions,
  purchaseRequisitions,
  activeTab,
  itemMasterDatas,
  UOMs,
  vendors,
  itemCategories,
  currencies,
  purchaseTypes,
  employees,
  departments,
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
        fetchPurchaseRequisitions([
          { key: "offset", value: offset },
          { key: "limit", value: limit },
        ]);
      }
    } catch (e) {}
  }, [getState(rootState)]);

  useEffect(() => {
    setData(purchaseRequisitions);
  }, [purchaseRequisitions, setData]);

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
          <option value="request_date">Request Date Range</option>
          <option value="posting_date">Posting Date Range</option>
          <option value="vendor_number">Vendor No.</option>
          <option value="vendor_name">Vendor Name</option>
          <option value="purchase_type">Purchase Type</option>
          <option value="purchaser">Purchaser</option>
          <option value="status">Status</option>
        </Input>
        {selectedFilter === "posting_date" ||
        selectedFilter === "request_date" ? (
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
        purchaseRequisitions.map((item) => ({
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
        purchaseRequisitions.map((item) => ({
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
        purchaseRequisitions,
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
    purchaseRequisitions,
    orderStatus,
  ]);

  useEffect(() => {
    setFetchLock(false);
    fetchPurchaseRequisitions();
  }, [fetchPurchaseRequisitions, setFetchLock]);

  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Purchase Requisitions");
      setFetchLock(true);
    } else {
      if (activeTab === activeTabs.PURCHASE_REQUISITION) {
        setPageValues(rootState, dispatch, response, "", activeTab);
      }
    }
  }, [fetchStatus, setFetchLock, activeTab]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Purchase Requisition");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Purchase Requisition");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status, response } = patchStatus;
    if (status === reduxStatus.failure && !patchLock) {
      setPatchLock(true);
    } else if (status === reduxStatus.success && !patchLock) {
      if (response.status === statusTypes.SENT_FOR_APPROVAL) {
        toast.success(`Purchase Requisition ${response.status}`);
      } else if (response.status === statusTypes.OPEN_SIV) {
        toast.success("Purchase Requisition Approved");
      } else if (response.status === statusTypes.REJECTED) {
        toast.success("Purchase Requisition Rejected");
      }
      setPatchLock(true);
    }
  }, [patchStatus, setPatchLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Purchase Requisition");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addPurchaseRequisition = (data) => {
    setAddLock(false);
    const requestBody = {
      purchase_requisition: data.purchase_requisition,
      vendor: data.vendor,
      requestor_department: data.requestor_department,
      purchase_type: data.purchase_type,
      requested_by: 1,
      request_purpose: data.request_purpose,
      request_date: data.request_date,
      withholding_tax_type: data.withholding_tax_type,
      expected_delivery_date: data.expected_delivery_date,
      remarks: data.remarks,
      status: "Open",
      [saveLineTag]: data[saveLineTag],
    };

    addPurchaseRequisition(requestBody);
  };

  const _editPurchaseRequisition = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      document_number: data.document_number,
      purchase_requisition: data.purchase_requisition,
      vendor: data.vendor,
      requestor_department: data.requestor_department,
      purchase_type: data.purchase_type,
      request_purpose: data.request_purpose,
      requested_by: 1,
      request_date: data.request_date,
      withholding_tax_type: data.withholding_tax_type,
      expected_delivery_date: data.expected_delivery_date,
      remarks: data.remarks,
      [saveLineTag]: data[saveLineTag],
    };

    editPurchaseRequisition(requestBody);
  };

  const _sendForApproval = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.SENT_FOR_APPROVAL,
    };

    patchPurchaseRequisitions(requestBody);
  };

  const _approvePurchaseRequisition = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.APPROVED,
      approved_date: getDateFormat(new Date()),
    };

    patchPurchaseRequisitions(requestBody);
  };

  const _rejectPurchaseRequisition = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.REJECTED,
    };

    patchPurchaseRequisitions(requestBody);
  };

  const _deletePurchaseRequisition = (id) => {
    setDeleteLock(false);
    deletePurchaseRequisitions(id);
  };

  return (
    <PurchaseRequisitions
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addPurchaseRequisition={_addPurchaseRequisition}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editPurchaseRequisition={_editPurchaseRequisition}
      donePatch={patchStatus.status === reduxStatus.success && !patchLock}
      sendForApproval={_sendForApproval}
      approvePurchaseRequisition={_approvePurchaseRequisition}
      rejectPurchaseRequisition={_rejectPurchaseRequisition}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deletePurchaseRequisition={_deletePurchaseRequisition}
      purchaseRequisitions={data}
      itemMasterDatas={itemMasterDatas}
      UOMs={UOMs}
      vendors={vendors}
      itemCategories={itemCategories}
      currencies={currencies}
      purchaseTypes={purchaseTypes}
      employees={employees}
      departments={departments}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  purchaseRequisitions: selectPurchaseRequisitions(state),
  editStatus: selectEditStatus(state),
  patchStatus: selectPatchStatus(state),
  deleteStatus: selectDeleteStatus(state),
  itemMasterDatas: selectItemMasterDatas(state),
  UOMs: selectUOMs(state),
  vendors: selectVendors(state),
  itemCategories: selectItemCategories(state),
  currencies: selectCurrencies(state),
  purchaseTypes: selectPurchaseTypes(state),
  employees: selectEmployees(state),
  departments: selectDepartments(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPurchaseRequisitions: (data = null) => dispatch(Fetch(data)),
  addPurchaseRequisition: (data) => dispatch(Add(data)),
  editPurchaseRequisition: (data) => dispatch(Edit(data)),
  patchPurchaseRequisitions: (data) => dispatch(Patch(data)),
  deletePurchaseRequisitions: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
