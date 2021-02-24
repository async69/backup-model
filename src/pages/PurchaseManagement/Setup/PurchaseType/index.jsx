import React, { useState, useEffect, useContext } from "react";
import PurchaseType from "./PurchaseType";
import {
  selectFetchStatus,
  selectAddStatus,
  selectPurchaseTypes,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Purchase/Setup/PurchaseType";
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
import { activeTabs } from "../../PurchaseSetup";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchPurchaseTypes,
  addPurchaseType,
  editStatus,
  editPurchaseType,
  deleteStatus,
  deletePurchaseType,
  purchaseTypes,
  activeTab,
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
        fetchPurchaseTypes([
          { key: "offset", value: offset },
          { key: "limit", value: limit },
        ]);
      }
    } catch (e) {}
  }, [getState(rootState)]);

  useEffect(() => {
    setData(purchaseTypes);
  }, [purchaseTypes, setData]);

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
    setData(FilterByName(purchaseTypes, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchPurchaseTypes();
  }, [fetchPurchaseTypes, setFetchLock]);

  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Purchase Types");
      setFetchLock(true);
    } else {
      if (activeTab === activeTabs.PURCHASE_TYPE) {
        setPageValues(rootState, dispatch, response, "", activeTab);
      }
    }
  }, [fetchStatus, setFetchLock, activeTab]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Purchase Type");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Purchase Type");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    console.log("status", deleteStatus);
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Purchase Type");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock, deleteLock]);

  const _addPurchaseType = (data) => {
    setAddLock(false);
    const requestBody = {
      name: data.name,
      code: data.code,
      remarks: data.remarks,
    };

    addPurchaseType(requestBody);
  };

  const _editPurchaseType = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      name: data.name,
      code: data.code,
      remarks: data.remarks,
    };

    editPurchaseType(requestBody);
  };

  const _deletePurchaseType = (id) => {
    setDeleteLock(false);
    console.log("deleted");
    deletePurchaseType(id);
  };

  return (
    <PurchaseType
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addPurchaseType={_addPurchaseType}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editPurchaseType={_editPurchaseType}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deletePurchaseType={_deletePurchaseType}
      purchaseTypes={data}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  purchaseTypes: selectPurchaseTypes(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPurchaseTypes: (data = null) => dispatch(Fetch(data)),
  addPurchaseType: (data) => dispatch(Add(data)),
  editPurchaseType: (data) => dispatch(Edit(data)),
  deletePurchaseType: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
