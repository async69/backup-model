import React, { useState, useEffect, useContext } from "react";
import SalesLedgerEntries from "./PurchaseLedgerEntries";
import {
  selectFetchStatus,
  selectAddStatus,
  selectPurchaseLedgerEntries,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Finance/LedgerEntries/PurchaseLedgerEntries";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import {
  setPageValues,
  getState,
} from "../../../../context/Main/States/Pagination";
import { MainContext, SearchContext } from "../../../../context";
import {
  assignFilterComponent,
  setLockComponent,
} from "../../../../context/Main/States/search";
import { Input } from "reactstrap";
import { FilterByName } from "../../../../helpers/Filter";
import { activeTabs } from "../../LedgerEntries";

const Loader = ({
  fetchStatus,
  addStatus,
  salesLedgerEntries,
  fetchSalesLedgerEntries,
  addBankAccount,
  editStatus,
  editBankAccount,
  deleteStatus,
  deleteBankAccount,
  activeTab,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [, setData] = useState([]);

  useEffect(() => {
    if (salesLedgerEntries.length > 0) {
      const response = salesLedgerEntries;
      setData(response);
    }
  }, [salesLedgerEntries, setData]);

  const { rootState, dispatch } = useContext(MainContext);

  const [filterType, setFilterType] = useState("document_number");
  const { searchValue } = useContext(SearchContext);

  const FilterTypes = () => {
    const [selectedFilter, setFilter] = useState(filterType);

    useEffect(() => setFilterType(selectedFilter), [selectedFilter]);

    return (
      <>
        <Input
          type="select"
          onChange={({ currentTarget: { value } }) => setFilter(value)}
        >
          <option value="document_number">By Document Number</option>
          <option value="account_name">By Account Name</option>
          <option value="account_number">By Account Number</option>
          <option value="order_number">By Order Number</option>
          <option value="partner_number">By Customer Number</option>
          <option value="reference_number">By Reference Number</option>
        </Input>
      </>
    );
  };
  useEffect(() => {
    setLockComponent({}, dispatch, false);
    assignFilterComponent({}, dispatch, FilterTypes);
  }, [dispatch]);

  useEffect(() => {
    let filteredData = [];
    filteredData = FilterByName(
      salesLedgerEntries,
      filterType,
      searchValue,
      true
    );
    setData(filteredData);
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    try {
      const {
        options: { offset, limit, onClick },
      } = getState(rootState);
      if (onClick && activeTab === activeTabs.SALES_LEDGER_ENTRY) {
        fetchSalesLedgerEntries([
          { key: "offset", value: offset },
          { key: "limit", value: limit },
        ]);
      }
    } catch (e) {}
  }, [rootState, activeTab]);

  useEffect(() => {
    setFetchLock(false);
    fetchSalesLedgerEntries();
  }, [fetchSalesLedgerEntries, setFetchLock]);

  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching Sales Ledger Entries");
      setFetchLock(true);
    } else {
      if (activeTab === activeTabs.SALES_LEDGER_ENTRY) {
        setPageValues(rootState, dispatch, response, "", activeTab);
      }
    }
  }, [fetchStatus, setFetchLock, activeTab, setPageValues]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Sales Ledger Entrie");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Sales Ledger Entrie");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Sales Ledger Entrie");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addBankAccount = (data) => {
    setAddLock(false);
    const requestBody = {
      bank_account_code: data.bankAccountCode ? data.bankAccountCode : "",
      branch_name: data.bankBranch ? data.bankBranch : "",
      account_number: data.bankAccountNumber
        ? Number(data.bankAccountNumber)
        : 0,
      is_active: data.isActive ? Boolean(data.isActive) : "",
      phone_no: data.phoneNumber ? data.phoneNumber : "",
      Postal_code: data.bankAccountCode ? data.bankAccountCode : "",
      fax_no: data.faxNumber ? data.faxNumber : "",
      email: data.emailAdress ? data.emailAdress : "",
      remarks: data.remarks ? data.remarks : "",
      bank: data.bankName ? data.bankName : "",
      charts_of_account: data.chartsOfAccountNumber
        ? data.chartsOfAccountNumber
        : "",
      currency: data.currency ? data.currency : "",
      region: data.region ? data.region : "",
      city: data.city ? data.city : "",
    };

    addBankAccount(requestBody);
  };

  const _editBankAccount = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id ? data.id : "",
      bank_account_code: data.bankAccountCode ? data.bankAccountCode : "",
      branch_name: data.bankBranch ? data.bankBranch : "",
      account_number: data.bankAccountNumber
        ? Number(data.bankAccountNumber)
        : 0,
      is_active: data.isActive ? Boolean(data.isActive) : "",
      phone_no: data.phoneNumber ? data.phoneNumber : "",
      Postal_code: data.bankAccountCode ? data.bankAccountCode : "",
      fax_no: data.faxNumber ? data.faxNumber : "",
      email: data.emailAdress ? data.emailAdress : "",
      remarks: data.remarks ? data.remarks : "",
      bank: data.bankName ? data.bankName : "",
      charts_of_account: data.chartsOfAccountNumber
        ? data.chartsOfAccountNumber
        : "",
      currency: data.currency ? data.currency : "",
      region: data.region ? data.region : "",
      city: data.city ? data.city : "",
    };

    editBankAccount(requestBody);
  };

  const _deleteBankAccount = (id) => {
    setDeleteLock(false);
    deleteBankAccount(id);
  };

  return (
    <SalesLedgerEntries
      salesLedgerEntries={salesLedgerEntries}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addBankAccount={_addBankAccount}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editBankAccount={_editBankAccount}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteBankAccount={_deleteBankAccount}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  salesLedgerEntries: selectPurchaseLedgerEntries(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchSalesLedgerEntries: (data = null) => dispatch(Fetch(data)),
  addBankAccount: (data) => dispatch(Add(data)),
  editBankAccount: (data) => dispatch(Edit(data)),
  deleteBankAccount: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
