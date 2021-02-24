import React, { useState, useEffect, useContext } from "react";
import Vendor from "./Vendor";
import {
  selectFetchStatus,
  selectAddStatus,
  selectVendors,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Purchase/MasterData/Vendor";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { SearchContext, MainContext } from "../../../../context";
import {
  assignFilterComponent,
  setLockComponent,
} from "../../../../context/Main/States/search";
import { selectCountries } from "store/GeneralSetup/Countries";
import { selectRegions } from "store/GeneralSetup/Regions";
import { selectCities } from "store/GeneralSetup/Cities";
import { selectCurrencies } from "store/GeneralSetup/Currencies";
import { selectVATPostingGroups } from "store/GeneralSetup/Posting/VAT_Posting_Group";
import { selectVendorPostingGroup } from "store/GeneralSetup/Posting/Vendor_Posting_Group";
import { selectCompany } from "store/GeneralSetup/Company/";
import { selectVendorTypes } from "store/Purchase/Setup/VendorType";
import { FilterByName, FilterByProperty } from "../../../../helpers/Filter";
import { Input } from "reactstrap";
import {
  setPageValues,
  getState,
} from "../../../../context/Main/States/Pagination";
import { activeTabs } from "../../PurchaseMasterData";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchVendors,
  addVendor,
  editStatus,
  editVendor,
  deleteStatus,
  deleteVendor,
  vendors,
  activeTab,
  countries,
  cities,
  regions,
  vatPostingGroups,
  vendorPostingGroups,
  currencies,
  vendorTypes,
  companyID,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("document_number");

  const { rootState, dispatch } = useContext(MainContext);

  useEffect(() => {
    try {
      const {
        options: { offset, limit, onClick },
      } = getState(rootState);
      if (onClick) {
        fetchVendors([
          { key: "offset", value: offset },
          { key: "limit", value: limit },
        ]);
      }
    } catch (e) {}
  }, [getState(rootState)]);

  useEffect(() => {
    setData(vendors);
  }, [vendors, setData]);

  const FilterTypes = () => {
    const [selectedFilter, setFilter] = useState(filterType);

    useEffect(() => setFilterType(selectedFilter), [selectedFilter]);

    return (
      <>
        <Input
          type="select"
          onChange={({ currentTarget: { value } }) => setFilter(value)}
        >
          <option value="document_number">By Vendor Number</option>
          <option value="vendor_name">Vendor Name</option>
          <option value="tin_number">Tin Number</option>
          <option value="vendor_type">Vendor Type</option>
          <option value="contact_name">Contact Name</option>
        </Input>
      </>
    );
  };
  useEffect(() => {
    setLockComponent({}, dispatch, false);
    assignFilterComponent({}, dispatch, FilterTypes);
  }, [dispatch]);

  const { searchValue } = useContext(SearchContext);
  useEffect(() => {
    let filteredData = [];
    if (filterType === "contact_name") {
      filteredData = FilterByProperty(vendors, "name", searchValue, "contacts");
    } else {
      filteredData = FilterByName(
        vendors.map((item) => ({
          ...item,
          vendor_type: item.vendor_type_detail.name,
        })),
        filterType,
        searchValue,
        filterType === "document_number"
      );
    }
    setData(filteredData);
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchVendors();
  }, [fetchVendors, setFetchLock]);

  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching vendors");
      setFetchLock(true);
    } else {
      if (activeTab === activeTabs.VENDOR) {
        setPageValues(rootState, dispatch, response, "", activeTab);
      }
    }
  }, [fetchStatus, setFetchLock, activeTab]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Vendor");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Vendor");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Vendor");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock, deleteLock]);

  const _addVendor = (data) => {
    setAddLock(false);
    const requestBody = {
      name: data.name,
      tin_number: data.tin_number,
      currency: data.currency,
      vendor_posting_group: data.vendor_posting_group,
      vat_posting_group: data.vat_posting_group,
      vendor_type: data.vendor_type,
      remarks: data.remarks,
      contacts: data.contacts,
      addresses: data.addresses,
      company: companyID,
    };

    addVendor(requestBody);
  };

  const _editVendor = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      name: data.name,
      tin_number: data.tin_number,
      currency: data.currency,
      vendor_posting_group: data.vendor_posting_group,
      vat_posting_group: data.vat_posting_group,
      vendor_type: data.vendor_type,
      remarks: data.remarks,
      contacts: data.contacts,
      addresses: data.addresses,
      company: companyID,
    };

    editVendor(requestBody);
  };

  const _deleteVendor = (id) => {
    setDeleteLock(false);
    deleteVendor(id);
  };

  return (
    <Vendor
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addVendor={_addVendor}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editVendor={_editVendor}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteVendor={_deleteVendor}
      vendors={data}
      countries={countries}
      cities={cities}
      regions={regions}
      vatPostingGroups={vatPostingGroups}
      vendorPostingGroups={vendorPostingGroups}
      currencies={currencies}
      vendorTypes={vendorTypes}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  vendors: selectVendors(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  countries: selectCountries(state),
  cities: selectCities(state),
  regions: selectRegions(state),
  vatPostingGroups: selectVATPostingGroups(state),
  vendorPostingGroups: selectVendorPostingGroup(state),
  currencies: selectCurrencies(state),
  vendorTypes: selectVendorTypes(state),
  companyID: selectCompany(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchVendors: (data = null) => dispatch(Fetch(data)),
  addVendor: (data) => dispatch(Add(data)),
  editVendor: (data) => dispatch(Edit(data)),
  deleteVendor: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
