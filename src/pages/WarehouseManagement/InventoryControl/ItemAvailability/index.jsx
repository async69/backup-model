import React, { useState, useEffect, useContext } from "react";
import ItemAvailability from "./ItemAvailability";
import {
  selectFetchStatus,
  selectItemAvailabilities,
  Fetch,
} from "../../../../store/Inventory/InventoryControl/ItemAvailability";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { Input } from "reactstrap";
import { getState } from "context/Main/States/Pagination";
import {
  assignFilterComponent,
  setLockComponent,
} from "context/Main/States/search";
import { SearchContext, MainContext } from "context/";
import { FilterByName, FilterByDate } from "helpers/Filter";
import { thisYear, nextYear } from "helpers/date";

const Loader = ({
  fetchStatus,
  ItemAvailabilities,
  fetchItemAvailabilities,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [data, setData] = useState([]);

  const { searchValue } = useContext(SearchContext);
  const { dispatch, rootState } = useContext(MainContext);

  const [filterType, setFilterType] = useState("item_number");
  const [startDate, setStartDate] = useState(thisYear);
  const [endDate, setEndDate] = useState(nextYear);

  useEffect(() => {
    setData(ItemAvailabilities);
  }, [ItemAvailabilities, setData]);

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
          <option value="item_number">By Item Number</option>
          {/* <option value="posting_date">Date Range</option> */}
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
    // alert("In");
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
        ItemAvailabilities.map((grn) => ({
          ...grn,
          document_number: grn.document_number,
        })),
        filterType,
        searchValue,
        filterType === "document_number"
      );
    } else {
      filteredData = FilterByDate(
        ItemAvailabilities,
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
        fetchItemAvailabilities([
          { key: "offset", value: offset },
          { key: "limit", value: limit },
        ]);
      }
    } catch (e) {}
  }, [rootState]);

  useEffect(() => {
    setFetchLock(false);
    fetchItemAvailabilities();
  }, [fetchItemAvailabilities, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching Item Availabilities");
      setFetchLock(true);
    }
    // } else {
    //   setPageValues(rootState, dispatch, response);
    // }
  }, [fetchStatus, setFetchLock]);
  return <ItemAvailability ItemAvailabilities={data} />;
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  ItemAvailabilities: selectItemAvailabilities(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchItemAvailabilities: (data) => dispatch(Fetch(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
