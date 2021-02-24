import React, { useState, useEffect, useContext } from "react";
import SalesReturn from "./SalesReturn";
import {
  selectFetchStatus,
  selectAddStatus,
  selectSalesReturns,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectPatchStatus,
  Patch,
  selectDeleteStatus,
  Remove,
} from "store/Inventory/Common/SalesRetrun";
import {
  selectFetchStatus as selectSivFetchStatus,
  selectStoreIssueVouchers,
  Fetch as sivFetch,
} from "store/Inventory/Common/StoreIssueVouchers";
import { selectCustomers } from "store/Sales/MasterData/Customer";
import { selectItemMasterDatas } from "store/Inventory/MasterData/items";
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
  fetchSalesReturns,
  addSalesReturn,
  editStatus,
  editSalesReturn,
  patchStatus,
  patchSalesReturn,
  deleteStatus,
  deleteSalesReturn,
  salesReturns,
  items,
  unitMeasurements,
  warehouses,
  bins,
  fetchStoreIssueVouchers,
  storeIssueVouchers,
  customers,
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
    setData(salesReturns);
  }, [salesReturns, setData]);

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
        salesReturns.map((grn) => ({
          ...grn,
          document_number: grn.document_number,
        })),
        filterType,
        searchValue,
        filterType === "document_number"
      );
    } else {
      filteredData = FilterByDate(salesReturns, filterType, startDate, endDate);
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
        fetchSalesReturns([
          { key: "offset", value: offset },
          { key: "limit", value: limit },
        ]);
      }
    } catch (e) {}
  }, [rootState]);

  useEffect(() => {
    setFetchLock(false);
    fetchSalesReturns();
  }, [fetchSalesReturns, setFetchLock]);

  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Sales Returns");
      setFetchLock(true);
    } else {
      setPageValues(rootState, dispatch, response);
    }
  }, [fetchStatus, setFetchLock, setPageValues]);

  useEffect(() => {
    setFetchLock(false);
    fetchStoreIssueVouchers();
  }, [fetchStoreIssueVouchers, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Sales Return");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Sales Return");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status, response } = patchStatus;
    if (status === reduxStatus.failure && !patchLock) {
      setPatchLock(true);
    } else if (status === reduxStatus.success && !patchLock) {
      if (response.status === statusTypes.ISSUED) {
        toast.success(`Sales Return Issued`);
        setPatchLock(true);
      } else if (response.status === statusTypes.SENT_FOR_APPROVAL) {
        toast.success("Sales Return Sent For Approval");
        setPatchLock(true);
      } else if (response.status === statusTypes.REJECTED) {
        toast.success("Sales Return Rejected");
        setPatchLock(true);
      } else if (response.status === statusTypes.APPROVED) {
        toast.success("Sales Return Approved");
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
      toast.success("Deleted Sales Return");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addSalesReturn = (data) => {
    setAddLock(false);

    const requestBody = {
      sales_order_no: data.sales_order_no,
      siv_no: data.siv_no,
      customer: data.customer,
      remarks: data.remarks,
      [saveLineTag]: data[saveLineTag].map((line) => {
        line.quantity_ordered = line.quantity_ordered
          ? line.quantity_ordered
          : 0;
        line.quantity_issued = line.quantity_issued ? line.quantity_issued : 0;
        return line;
      }),
    };

    addSalesReturn(requestBody);
  };

  const _editSalesReturn = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      sales_order_no: data.sales_order_no,
      siv_no: data.siv_no,
      customer: data.customer,
      remarks: data.remarks,
      [saveLineTag]: data[saveLineTag].map((line) => {
        line.quantity_ordered = line.quantity_ordered
          ? line.quantity_ordered
          : 0;
        line.quantity_issued = line.quantity_issued ? line.quantity_issued : 0;
        return line;
      }),
    };

    editSalesReturn(requestBody);
  };

  const _postSalesReturn = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      posting_date: data.posting_date,
      status: statusTypes.POSTED,
    };

    patchSalesReturn(requestBody);
  };
  const _sendForApproval = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.SENT_FOR_APPROVAL,
    };

    patchSalesReturn(requestBody);
  };
  const _approveSalesReturn = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.APPROVED,
    };

    patchSalesReturn(requestBody);
  };
  const _rejectSalesReturn = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.REJECTED,
    };

    patchSalesReturn(requestBody);
  };

  const _deleteSalesReturn = (id) => {
    setDeleteLock(false);
    deleteSalesReturn(id);
  };

  return (
    <SalesReturn
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addSalesReturn={_addSalesReturn}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editSalesReturn={_editSalesReturn}
      donePatch={patchStatus.status === reduxStatus.success && !patchLock}
      postSalesReturn={_postSalesReturn}
      approveSalesReturn={_approveSalesReturn}
      rejectSalesReturn={_rejectSalesReturn}
      sendForApproval={_sendForApproval}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteSalesReturn={_deleteSalesReturn}
      salesReturns={data}
      storeIssueVouchers={storeIssueVouchers}
      items={items}
      unitMeasurements={unitMeasurements}
      warehouses={warehouses}
      bins={bins}
      customers={customers}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  salesReturns: selectSalesReturns(state),
  editStatus: selectEditStatus(state),
  patchStatus: selectPatchStatus(state),
  deleteStatus: selectDeleteStatus(state),
  items: selectItemMasterDatas(state),
  unitMeasurements: selectUOMs(state),
  warehouses: selectWarehouses(state),
  bins: selectBins(state),

  storeIssueVouchers: selectStoreIssueVouchers(state),
  sivFetchStatus: selectSivFetchStatus(state),
  customers: selectCustomers(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchSalesReturns: (data) => dispatch(Fetch(data)),
  addSalesReturn: (data) => dispatch(Add(data)),
  editSalesReturn: (data) => dispatch(Edit(data)),
  patchSalesReturn: (data) => dispatch(Patch(data)),
  deleteSalesReturn: (id) => dispatch(Remove(id)),
  fetchStoreIssueVouchers: () => dispatch(sivFetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
