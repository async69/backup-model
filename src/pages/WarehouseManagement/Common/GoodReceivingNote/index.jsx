import React, { useState, useEffect, useContext } from "react";
import GoodReceivingNote from "./GoodReceivingNote";
import {
  selectFetchStatus,
  selectAddStatus,
  selectGoodReceivingNotes,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectPatchStatus,
  Patch,
  selectDeleteStatus,
  Remove,
} from "store/Inventory/Common/GoodReceivingNotes";
import { selectItemMasterDatas } from "../../../../store/Inventory/Setup/Item/Item_MasterData";
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
import { selectPurchaseTypes } from "store/Purchase/Setup/PurchaseType";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchGoodReceivingNotes,
  addGoodReceivingNote,
  editStatus,
  editGoodReceivingNote,
  patchStatus,
  patchGoodReceivingNote,
  deleteStatus,
  deleteGoodReceivingNote,
  goodReceivingNotes,
  items,
  unitMeasurements,
  warehouses,
  bins,
  purchaseTypes,
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
    setData(goodReceivingNotes);
  }, [goodReceivingNotes, setData]);

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
        goodReceivingNotes.map((grn) => ({
          ...grn,
          document_number: grn.document_number,
        })),
        filterType,
        searchValue,
        filterType === "document_number"
      );
    } else {
      filteredData = FilterByDate(
        goodReceivingNotes,
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
        fetchGoodReceivingNotes([
          { key: "offset", value: offset },
          { key: "limit", value: limit },
        ]);
      }
    } catch (e) {}
  }, [rootState]);

  useEffect(() => {
    setFetchLock(false);
    fetchGoodReceivingNotes();
  }, [fetchGoodReceivingNotes, setFetchLock]);

  // set page value for the pagination based on fetch response
  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Good Receiving Notes");
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
      toast.success("Added Good Receiving Note");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Good Receiving Note");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status, response } = patchStatus;
    if (status === reduxStatus.failure && !patchLock) {
      setPatchLock(true);
    } else if (status === reduxStatus.success && !patchLock) {
      if (response.status === statusTypes.RECEIVED) {
        toast.success(`Good Receiving Note ${response.status}`);
        setPatchLock(true);
      } else if (response.status === statusTypes.OPEN_SIV) {
        toast.success("Good Receiving Note Approved");
        setPatchLock(true);
      } else if (response.status === statusTypes.REJECTED) {
        toast.success("Good Receiving Note Rejected");
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
      toast.success("Deleted Good Receiving Note");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addGoodReceivingNote = (data) => {
    setAddLock(false);

    const requestBody = {
      vendor_shipment_no: data.vendor_shipment_no,
      remarks: data.remarks,
      grn_lines: data.grn_lines,
    };

    addGoodReceivingNote(requestBody);
  };

  const _editGoodReceivingNote = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      vendor_shipment_no: data.vendor_shipment_no,
      remarks: data.remarks,
      grn_lines: data.grn_lines,
    };

    editGoodReceivingNote(requestBody);
  };

  const _receiveGoodReceivingNote = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      posting_date: data.posting_date,
      status: statusTypes.RECEIVED,
    };

    patchGoodReceivingNote(requestBody);
  };

  const _deleteGoodReceivingNote = (id) => {
    setDeleteLock(false);
    deleteGoodReceivingNote(id);
  };

  console.log("PPPPPPPPPPP");
  console.log(goodReceivingNotes);
  console.log("====================================");

  return (
    <GoodReceivingNote
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addGoodReceivingNote={_addGoodReceivingNote}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editGoodReceivingNote={_editGoodReceivingNote}
      donePatch={patchStatus.status === reduxStatus.success && !patchLock}
      receiveGoodReceivingNote={_receiveGoodReceivingNote}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteGoodReceivingNote={_deleteGoodReceivingNote}
      goodReceivingNotes={data}
      items={items}
      unitMeasurements={unitMeasurements}
      warehouses={warehouses}
      bins={bins}
      purchaseTypes={purchaseTypes}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  goodReceivingNotes: selectGoodReceivingNotes(state),
  editStatus: selectEditStatus(state),
  patchStatus: selectPatchStatus(state),
  deleteStatus: selectDeleteStatus(state),
  items: selectItemMasterDatas(state),
  unitMeasurements: selectUOMs(state),
  warehouses: selectWarehouses(state),
  bins: selectBins(state),
  purchaseTypes: selectPurchaseTypes(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchGoodReceivingNotes: (data) => dispatch(Fetch(data)),
  addGoodReceivingNote: (data) => dispatch(Add(data)),
  editGoodReceivingNote: (data) => dispatch(Edit(data)),
  patchGoodReceivingNote: (data) => dispatch(Patch(data)),
  deleteGoodReceivingNote: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
