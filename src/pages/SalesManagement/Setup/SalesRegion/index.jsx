import React, { useState, useEffect, useContext } from "react";
import SalesRegion from "./SalesRegion";
import {
  selectFetchStatus,
  selectAddStatus,
  selectSalesRegions,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Sales/Setup/SalesRegion/";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { SearchContext, MainContext } from "../../../../context/";
import { assignFilterComponent } from "../../../../context/Main/States/search";
import { FilterByName } from "../../../../helpers/Filter";
import { Input } from "reactstrap";
import {
  setPageValues,
  getState,
} from "../../../../context/Main/States/Pagination";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchSalesRegions,
  addSalesRegion,
  editStatus,
  editSalesRegion,
  deleteStatus,
  deleteSalesRegion,
  salesRegions,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  const { rootState, dispatch } = useContext(MainContext);

  useEffect(() => {
    try {
      const {
        options: { offset, limit, onClick },
      } = getState(rootState);
      if (onClick) {
        fetchSalesRegions([
          { key: "offset", value: offset },
          { key: "limit", value: limit },
        ]);
      }
    } catch (e) {}
  }, [getState(rootState)]);

  useEffect(() => {
    setData(salesRegions);
  }, [salesRegions, setData]);

  const { searchValue } = useContext(SearchContext);

  const FilterTypes = () => (
    <Input
      type="select"
      onChange={({ currentTarget: { value } }) => setFilterType(value)}
    >
      <option value="name">By Name</option>
      <option value="code">By Code</option>
    </Input>
  );
  useEffect(() => {
    assignFilterComponent({}, dispatch, FilterTypes);
  }, [dispatch]);

  useEffect(() => {
    setData(FilterByName(salesRegions, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchSalesRegions();
  }, [fetchSalesRegions, setFetchLock]);

  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Sales Region");
      setFetchLock(true);
    } else {
      setPageValues(rootState, dispatch, response);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Sales Region");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      toast.error("Failed editing Sales Region");
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Sales Region");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Sales Region");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addSalesRegion = (data) => {
    setAddLock(false);
    const requestBody = {
      name: data.name,
      code: data.code,
      remarks: data.remarks,
    };

    addSalesRegion(requestBody);
  };

  const _editSalesRegion = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      name: data.name,
      code: data.code,
      remarks: data.remarks,
    };

    editSalesRegion(requestBody);
  };

  const _deleteSalesRegion = (id) => {
    setDeleteLock(false);
    deleteSalesRegion(id);
  };

  return (
    <SalesRegion
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addSalesRegion={_addSalesRegion}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editSalesRegion={_editSalesRegion}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteSalesRegion={_deleteSalesRegion}
      salesRegions={data}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  salesRegions: selectSalesRegions(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchSalesRegions: (data = null) => dispatch(Fetch(data)),
  addSalesRegion: (data) => dispatch(Add(data)),
  editSalesRegion: (data) => dispatch(Edit(data)),
  deleteSalesRegion: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
