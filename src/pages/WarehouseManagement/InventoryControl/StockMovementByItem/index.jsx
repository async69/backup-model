import React, { useState, useEffect, useContext } from "react";
import StockMovementByItem from "./StockMovementByItem";
import {
  selectFetchStatus,
  selectItemLedgerEntries,
  Fetch,
} from "store/Finance/LedgerEntries/ItemLedgerEntries";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import customStatus from "../../../../config/customStatus";
import { Input } from "reactstrap";
import { selectInventoryItems } from "../../../../store/Inventory/MasterData/inventoryItems";
import {
  assignFilterComponent,
  setLockComponent,
} from "context/Main/States/search";
import { SearchContext, MainContext } from "context/";
import { FilterByName } from "helpers/Filter";
import { thisYear, nextYear } from "helpers/date";
import Label from "reactstrap/lib/Label";

const Loader = ({ fetchStatus, stocks, fetchStocks, items }) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [data, setData] = useState([]);

  const { searchValue } = useContext(SearchContext);
  const { dispatch } = useContext(MainContext);

  const [filterType, setFilterType] = useState("posting_date");
  const [startDate, setStartDate] = useState(thisYear);
  const [endDate, setEndDate] = useState(nextYear);
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    setData(stocks);
  }, [stocks, setData]);

  // Filtering component by document_number and posting date
  const FilterTypes = () => {
    const [selectedFilter, setSelectedFilter] = useState(filterType);
    const [item, setItem] = useState({});
    const [start, setStart] = useState(thisYear);
    const [end, setEnd] = useState(nextYear);

    useEffect(() => setStartDate(start), [start, setStartDate]);
    useEffect(() => setEndDate(end), [end, setEndDate]);
    useEffect(() => setFilterType(selectedFilter), [selectedFilter]);
    useEffect(() => setSelectedItem(item), [item, setSelectedItem]);

    return (
      <>
        <Input
          type="select"
          onChange={({ currentTarget: { value } }) => setSelectedFilter(value)}
        >
          <option value="posting_date">Date Range</option>
          <option value="item_number">By Item Number</option>
          <option value="item">By Item Name</option>
        </Input>
        {selectedFilter === "posting_date" ? (
          <>
            <Label className="ml-1 mr-1">Item</Label>
            <Input
              type="select"
              onChange={({ currentTarget: { value } }) => setItem(value)}
            >
              <option value="" />
              {items.map((option) => (
                <option key={option.id} value={option.item.number}>
                  {option.item.number}
                </option>
              ))}
            </Input>
            <Label className="ml-1 mr-1">Start Date </Label>
            <Input
              type="date"
              value={start}
              onChange={({ currentTarget: { value } }) => setStart(value)}
            />
            <Label className="ml-1 mr-1">End Date</Label>
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

  useEffect(() => {
    setFetchLock(false);
    fetchStocks([
      { key: "start_date", value: startDate },
      { key: "end_date", value: endDate },
      { key: "item_number", value: selectedItem },
    ]);
    // console.log("start date", startDate);
    // console.log("end date", endDate);
  }, [fetchStocks, setFetchLock, startDate, endDate, selectedItem]);

  //Do filtering based on filter type

  useEffect(() => {
    setData(FilterByName(stocks, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === customStatus.failed && !fetchLock) {
      toast.error("Failed fetching stocks");
      setFetchLock(true);
    }
    // else {
    //   setPageValues(rootState, dispatch, response);
    // }
  }, [fetchStatus, setFetchLock]);

  return <StockMovementByItem stocks={data} />;
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  stocks: selectItemLedgerEntries(state),
  items: selectInventoryItems(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchStocks: (data) => dispatch(Fetch(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
