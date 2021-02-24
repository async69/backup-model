import React, { useState, useEffect, useContext } from "react";
import StoreIssueVoucher from "./StoreIssueVoucher";
import {
  selectFetchStatus,
  selectAddStatus,
  selectStoreIssueVouchers,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectPatchStatus,
  Patch,
  selectDeleteStatus,
  Remove,
} from "store/Inventory/Common/StoreIssueVouchers";
import { selectItemMasterDatas } from "store/Inventory/MasterData/items";
import { selectInventoryItems } from "store/Inventory/MasterData/inventoryItems";
import { selectUOMs } from "store/Inventory/UnitOfMeasurement";
import { selectWarehouses } from "store/Inventory/Warehouse";
import { selectBins } from "store/Inventory/Bin";
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
  fetchStoreIssueVouchers,
  addStoreIssueVoucher,
  editStatus,
  editStoreIssueVoucher,
  patchStatus,
  patchStoreIssueVoucher,
  deleteStatus,
  deleteStoreIssueVoucher,
  storeIssueVouchers,
  items,
  unitMeasurements,
  warehouses,
  bins,
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
    setData(storeIssueVouchers);
  }, [storeIssueVouchers, setData]);

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
        storeIssueVouchers.map((grn) => ({
          ...grn,
          document_number: grn.document_number,
        })),
        filterType,
        searchValue,
        filterType === "document_number"
      );
    } else {
      filteredData = FilterByDate(
        storeIssueVouchers,
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
        fetchStoreIssueVouchers([
          { key: "offset", value: offset },
          { key: "limit", value: limit },
        ]);
      }
    } catch (e) {}
  }, [rootState]);

  useEffect(() => {
    setFetchLock(false);
    fetchStoreIssueVouchers();
  }, [fetchStoreIssueVouchers, setFetchLock]);

  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching store Issue Vouchers");
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
      toast.success("Added Store Issue Voucher");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Store Issue Voucher");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status, response } = patchStatus;
    if (status === reduxStatus.failure && !patchLock) {
      setPatchLock(true);
    } else if (status === reduxStatus.success && !patchLock) {
      if (response.status === statusTypes.ISSUED) {
        toast.success(`Store Issue Voucher Issued`);
        setPatchLock(true);
      } else if (response.status === statusTypes.SENT_FOR_APPROVAL) {
        toast.success("Store Issue Voucher Sent For Approval");
        setPatchLock(true);
      } else if (response.status === statusTypes.REJECTED) {
        toast.success("Store Issue Voucher Rejected");
        setPatchLock(true);
      } else if (response.status === statusTypes.APPROVED) {
        toast.success("Store Issue Voucher Approved");
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
      toast.success("Deleted Store Issue Voucher");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addStoreIssueVoucher = (data) => {
    setAddLock(false);

    const requestBody = {
      remarks: data.remarks,
      siv_lines: data.siv_lines,
    };

    addStoreIssueVoucher(requestBody);
  };

  const _editStoreIssueVoucher = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      remarks: data.remarks,
      siv_lines: data.siv_lines,
    };

    editStoreIssueVoucher(requestBody);
  };

  const _issueStoreIssueVoucher = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      posting_date: data.posting_date,
      status: statusTypes.ISSUED,
    };

    patchStoreIssueVoucher(requestBody);
  };
  const _sendForApproval = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.SENT_FOR_APPROVAL,
    };

    patchStoreIssueVoucher(requestBody);
  };
  const _approveStoreIssueVoucher = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.APPROVED,
    };

    patchStoreIssueVoucher(requestBody);
  };
  const _rejectStoreIssueVoucher = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.REJECTED,
    };

    patchStoreIssueVoucher(requestBody);
  };

  const _deleteStoreIssueVoucher = (id) => {
    setDeleteLock(false);
    deleteStoreIssueVoucher(id);
  };

  return (
    <StoreIssueVoucher
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addStoreIssueVoucher={_addStoreIssueVoucher}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editStoreIssueVoucher={_editStoreIssueVoucher}
      donePatch={patchStatus.status === reduxStatus.success && !patchLock}
      issueStoreIssueVoucher={_issueStoreIssueVoucher}
      approveStoreIssueVoucher={_approveStoreIssueVoucher}
      rejectStoreIssueVoucher={_rejectStoreIssueVoucher}
      sendForApproval={_sendForApproval}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteStoreIssueVoucher={_deleteStoreIssueVoucher}
      storeIssueVouchers={data}
      items={items.filter((prop) => {
        const index = inventoryItems.findIndex(
          (item) => item.item.id === prop.id
        );
        return index >= 0;
      })}
      unitMeasurements={unitMeasurements}
      warehouses={warehouses}
      bins={bins}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  storeIssueVouchers: selectStoreIssueVouchers(state),
  editStatus: selectEditStatus(state),
  patchStatus: selectPatchStatus(state),
  deleteStatus: selectDeleteStatus(state),
  items: selectItemMasterDatas(state),
  inventoryItems: selectInventoryItems(state),
  unitMeasurements: selectUOMs(state),
  warehouses: selectWarehouses(state),
  bins: selectBins(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchStoreIssueVouchers: (data) => dispatch(Fetch(data)),
  addStoreIssueVoucher: (data) => dispatch(Add(data)),
  editStoreIssueVoucher: (data) => dispatch(Edit(data)),
  patchStoreIssueVoucher: (data) => dispatch(Patch(data)),
  deleteStoreIssueVoucher: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
