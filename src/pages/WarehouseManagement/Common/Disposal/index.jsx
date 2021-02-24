import React, { useState, useEffect, useContext } from "react";
import Disposal from "./Disposal";
import {
  selectFetchStatus,
  selectAddStatus,
  selectDisposals,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectPatchStatus,
  Patch,
  selectDeleteStatus,
  Remove,
} from "store/Inventory/Common/Disposal";
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
  fetchDisposals,
  addDisposal,
  editStatus,
  editDisposal,
  patchStatus,
  patchDisposal,
  deleteStatus,
  deleteDisposal,
  disposals,
  items,
  unitMeasurements,
  warehouses,
  bins,
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
    setData(disposals);
  }, [disposals, setData]);

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
        disposals.map((disposal) => ({
          ...disposal,
          document_number: disposal.document_number,
        })),
        filterType,
        searchValue,
        filterType === "document_number"
      );
    } else {
      filteredData = FilterByDate(disposals, filterType, startDate, endDate);
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
        fetchDisposals([
          { key: "offset", value: offset },
          { key: "limit", value: limit },
        ]);
      }
    } catch (e) {}
  }, [rootState]);

  useEffect(() => {
    setFetchLock(false);
    fetchDisposals();
  }, [fetchDisposals, setFetchLock]);

  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching disposal");
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
      toast.success("Added Disposal");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Disposal");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status, response } = patchStatus;
    if (status === reduxStatus.failure && !patchLock) {
      setPatchLock(true);
    } else if (status === reduxStatus.success && !patchLock) {
      if (response.status === statusTypes.ISSUED) {
        toast.success(`Disposal Issued`);
        setPatchLock(true);
      } else if (response.status === statusTypes.SENT_FOR_APPROVAL) {
        toast.success("Disposal Sent For Approval");
        setPatchLock(true);
      } else if (response.status === statusTypes.REJECTED) {
        toast.success("Disposal Rejected");
        setPatchLock(true);
      } else if (response.status === statusTypes.APPROVED) {
        toast.success("Disposal Approved");
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
      toast.success("Deleted Disposal");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addDisposal = (data) => {
    setAddLock(false);

    const requestBody = {
      external_document_no: data.external_document_no,
      remarks: data.remarks,
      [saveLineTag]: data[saveLineTag],
    };

    addDisposal(requestBody);
  };

  const _editDisposal = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      external_document_no: data.external_document_no,
      remarks: data.remarks,
      [saveLineTag]: data[saveLineTag],
    };

    editDisposal(requestBody);
  };

  const _postDisposal = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      posting_date: data.posting_date,
      status: statusTypes.POSTED,
    };

    patchDisposal(requestBody);
  };
  const _sendForApproval = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.SENT_FOR_APPROVAL,
    };

    patchDisposal(requestBody);
  };
  const _approveDisposal = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.APPROVED,
    };

    patchDisposal(requestBody);
  };
  const _rejectDisposal = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.REJECTED,
    };

    patchDisposal(requestBody);
  };

  const _deleteDisposal = (id) => {
    setDeleteLock(false);
    deleteDisposal(id);
  };

  return (
    <Disposal
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addDisposal={_addDisposal}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editDisposal={_editDisposal}
      donePatch={patchStatus.status === reduxStatus.success && !patchLock}
      postDisposal={_postDisposal}
      approveDisposal={_approveDisposal}
      rejectDisposal={_rejectDisposal}
      sendForApproval={_sendForApproval}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteDisposal={_deleteDisposal}
      disposals={data}
      items={items}
      unitMeasurements={unitMeasurements}
      warehouses={warehouses}
      bins={bins}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  disposals: selectDisposals(state),
  editStatus: selectEditStatus(state),
  patchStatus: selectPatchStatus(state),
  deleteStatus: selectDeleteStatus(state),
  items: selectItemMasterDatas(state),
  unitMeasurements: selectUOMs(state),
  warehouses: selectWarehouses(state),
  bins: selectBins(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchDisposals: (data) => dispatch(Fetch(data)),
  addDisposal: (data) => dispatch(Add(data)),
  editDisposal: (data) => dispatch(Edit(data)),
  patchDisposal: (data) => dispatch(Patch(data)),
  deleteDisposal: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
