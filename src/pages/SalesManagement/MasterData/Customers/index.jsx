import React, { useState, useEffect, useContext } from "react";
import Customer from "./Customer";
import {
  selectFetchStatus,
  selectAddStatus,
  selectCustomers,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Sales/MasterData/Customer/";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { SearchContext, MainContext } from "../../../../context/";
import {
  assignFilterComponent,
  setLockComponent,
} from "../../../../context/Main/States/search";
import {
  setPageValues,
  getState,
} from "../../../../context/Main/States/Pagination";
import { FilterByName, FilterByProperty } from "../../../../helpers/Filter";
import { Input } from "reactstrap";
import { selectCustomerPostingGroups } from "../../../../store/GeneralSetup/Posting/CustomerPostingGroups";
import { selectVATPostingGroups } from "../../../../store/GeneralSetup/Posting/VAT_Posting_Group";
import { selectCurrencies } from "../../../../store/GeneralSetup/Currencies";
import { selectCountries } from "../../../../store/GeneralSetup/Countries";
import { selectRegions } from "../../../../store/GeneralSetup/Regions";
import { selectCities } from "../../../../store/GeneralSetup/Cities";
import { selectCompany } from "../../../../store/GeneralSetup/Company";
import { addressSaveLineTag, contactSaveLineTag } from "./config";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchCustomers,
  addCustomer,
  editStatus,
  editCustomer,
  deleteStatus,
  deleteCustomer,
  customers,
  postingGroups,
  vatPostingGroups,
  currencies,
  countries,
  regions,
  cities,
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
        fetchCustomers([
          { key: "offset", value: offset },
          { key: "limit", value: limit },
        ]);
      }
    } catch (e) {}
  }, [getState(rootState)]);

  useEffect(() => {
    setData(customers);
  }, [customers, setData]);

  const FilterTypes = () => {
    const [selectedFilter, setFilter] = useState(filterType);

    useEffect(() => setFilterType(selectedFilter), [selectedFilter]);

    return (
      <>
        <Input
          type="select"
          onChange={({ currentTarget: { value } }) => setFilter(value)}
        >
          <option value="document_number">By Customer Number</option>
          <option value="name">Customer Name</option>
          <option value="tin_number">Tin Number</option>
          <option value="region">Region</option>
          <option value="country">Country</option>
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
    if (filterType === "country" || filterType === "region") {
      filteredData = FilterByProperty(
        customers.map((prop) => ({
          ...prop,
          [addressSaveLineTag]: prop[addressSaveLineTag].map((item) => ({
            ...item,
            country: item.city.country_name,
            region: item.city.region_name,
          })),
        })),
        filterType,
        searchValue,
        addressSaveLineTag
      );
    } else {
      filteredData = FilterByName(
        customers,
        filterType,
        searchValue,
        filterType === "document_number"
      );
    }
    setData(filteredData);
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchCustomers();
  }, [fetchCustomers, setFetchLock]);

  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching customers");
      setFetchLock(true);
    } else {
      setPageValues(rootState, dispatch, response);
    }
  }, [fetchStatus, setFetchLock, dispatch]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Customer");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Customer");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Customer");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addCustomer = (data) => {
    setAddLock(false);
    const requestBody = {
      id: data.id,
      name: data.name,
      tin_number: data.tin_number,
      currency: data.currency,
      customer_posting_group: data.customer_posting_group,
      vat_posting_group: data.vat_posting_group,
      credit_limit: data.credit_limit,
      remarks: data.remarks,
      company: companyID,
      [contactSaveLineTag]: data[contactSaveLineTag],
      [addressSaveLineTag]: data[addressSaveLineTag].map((item) => ({
        ...item,
        is_head_office: item.is_head_office === "Yes",
      })),
    };

    addCustomer(requestBody);
  };

  const _editCustomer = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      name: data.name,
      tin_number: data.tin_number,
      currency: data.currency,
      customer_posting_group: data.customer_posting_group,
      vat_posting_group: data.vat_posting_group,
      credit_limit: data.credit_limit,
      remarks: data.remarks,
      company: companyID,
      [contactSaveLineTag]: data[contactSaveLineTag],
      [addressSaveLineTag]: data[addressSaveLineTag].map((item) => ({
        ...item,
        is_head_office: item.is_head_office === "Yes",
      })),
    };

    editCustomer(requestBody);
  };

  const _deleteCustomer = (id) => {
    setDeleteLock(false);
    deleteCustomer(id);
  };

  return (
    <Customer
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addCustomer={_addCustomer}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editCustomer={_editCustomer}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteCustomer={_deleteCustomer}
      customers={data}
      postingGroups={postingGroups}
      currencies={currencies}
      countries={countries}
      cities={cities}
      regions={regions}
      vatPostingGroups={vatPostingGroups}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  customers: selectCustomers(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  postingGroups: selectCustomerPostingGroups(state),
  vatPostingGroups: selectVATPostingGroups(state),
  currencies: selectCurrencies(state),
  countries: selectCountries(state),
  regions: selectRegions(state),
  cities: selectCities(state),
  companyID: selectCompany(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCustomers: (data = null) => dispatch(Fetch(data)),
  addCustomer: (data) => dispatch(Add(data)),
  editCustomer: (data) => dispatch(Edit(data)),
  deleteCustomer: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
