import React, { useState, useEffect, useContext } from "react";
import VendorType from "./VendorType";
import {
  selectFetchStatus,
  selectAddStatus,
  selectVendorTypes,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Purchase/Setup/VendorType/";
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
  fetchVendorTypes,
  addVendorType,
  editStatus,
  editVendorType,
  deleteStatus,
  deleteVendorType,
  vendorTypes,
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
        fetchVendorTypes([
          { key: "offset", value: offset },
          { key: "limit", value: limit },
        ]);
      }
    } catch (e) {}
  }, [getState(rootState)]);

  useEffect(() => {
    setData(vendorTypes);
  }, [vendorTypes, setData]);

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
    setData(FilterByName(vendorTypes, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchVendorTypes();
  }, [fetchVendorTypes, setFetchLock]);

  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Vendor Types");
      setFetchLock(true);
    } else {
      if (activeTab === activeTabs.VENDOR_TYPE) {
        setPageValues(rootState, dispatch, response, "", activeTab);
      }
    }
  }, [fetchStatus, setFetchLock, activeTab]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Vendor Type");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Vendor Type");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Vendor Type");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addVendorType = (data) => {
    setAddLock(false);
    const requestBody = {
      name: data.name,
      code: data.code,
      remarks: data.remarks,
    };

    addVendorType(requestBody);
  };

  const _editVendorType = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      name: data.name,
      code: data.code,
      remarks: data.remarks,
    };

    editVendorType(requestBody);
  };

  const _deleteVendorType = (id) => {
    setDeleteLock(false);
    deleteVendorType(id);
  };

  return (
    <VendorType
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addVendorType={_addVendorType}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editVendorType={_editVendorType}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteVendorType={_deleteVendorType}
      vendorTypes={data}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  vendorTypes: selectVendorTypes(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchVendorTypes: (data = null) => dispatch(Fetch(data)),
  addVendorType: (data) => dispatch(Add(data)),
  editVendorType: (data) => dispatch(Edit(data)),
  deleteVendorType: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
