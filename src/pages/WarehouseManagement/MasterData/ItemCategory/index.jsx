import React, { useState, useEffect, useContext } from "react";
import ItemCategory from "./ItemCategory";
import {
  selectFetchStatus,
  selectAddStatus,
  selectItemCategories,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "store/Inventory/MasterData/itemCategories";
import { selectChartOfAccounts } from "store/Finance/MasterData/ChartsOfAccounts/chartOfAccounts";
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
  fetchItemCategorys,
  addItemCategory,
  editStatus,
  editItemCategory,
  deleteStatus,
  deleteItemCategory,
  itemCategorys,
  chartOfAccounts,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  const { searchValue } = useContext(SearchContext);
  const { dispatch, rootState } = useContext(MainContext);

  const [filterType, setFilterType] = useState("name");
  const [startDate, setStartDate] = useState(thisYear);
  const [endDate, setEndDate] = useState(nextYear);

  useEffect(() => {
    setData(itemCategorys);
  }, [itemCategorys, setData]);

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
        itemCategorys.map((grn) => ({
          ...grn,
          name: grn.name,
          code: grn.code,
        })),
        filterType,
        searchValue,
        filterType === "document_number"
      );
    } else {
      filteredData = FilterByDate(
        itemCategorys,
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
        fetchItemCategorys([
          { key: "offset", value: offset },
          { key: "limit", value: limit },
        ]);
      }
    } catch (e) {}
  }, [rootState]);

  useEffect(() => {
    setFetchLock(false);
    fetchItemCategorys();
  }, [fetchItemCategorys, setFetchLock]);

  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Item Categorys");
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
      toast.success("Added ItemCategory");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Item Category");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Item Category");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addItemCategory = (data) => {
    setAddLock(false);
    addItemCategory(data);
  };

  const _editItemCategory = (data) => {
    setEditLock(false);
    editItemCategory(data);
  };

  const _deleteItemCategory = (id) => {
    setDeleteLock(false);
    deleteItemCategory(id);
  };

  return (
    <ItemCategory
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addItemCategory={_addItemCategory}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editItemCategory={_editItemCategory}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteItemCategory={_deleteItemCategory}
      itemCategorys={data}
      options={{ chartOfAccounts }}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  itemCategorys: selectItemCategories(state),
  chartOfAccounts: selectChartOfAccounts(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchItemCategorys: () => dispatch(Fetch()),
  addItemCategory: (data) => dispatch(Add(data)),
  editItemCategory: (data) => dispatch(Edit(data)),
  deleteItemCategory: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
