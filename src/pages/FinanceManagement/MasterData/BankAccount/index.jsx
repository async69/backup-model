import React, { useState, useEffect, useContext } from "react";
import BankAccount from "./BankAccount";
import {
  selectFetchStatus,
  selectAddStatus,
  selectBankAccounts,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Finance/MasterData/BankAccounts";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { toggle } from "../../../../store/ModalData/";
import { selectAccountTypes } from "../../../../store/GeneralSetup/AccountTypes";
import { selectCurrencies } from "../../../../store/GeneralSetup/Currencies";
import { selectRegions } from "../../../../store/GeneralSetup/Regions";
import { selectCities } from "../../../../store/GeneralSetup/Cities";
import { selectBanks } from "../../../../store/Finance/MasterData/Bank";
import { selectChartOfAccounts } from "../../../../store/Finance/MasterData/ChartsOfAccounts/chartOfAccounts";
import { SearchContext } from "../../../../context/";
import { FilterByName } from "../../../../helpers/Filter";
import { MainContext } from "../../../../context/Main";
import {
  setPageValues,
  getState,
} from "../../../../context/Main/States/Pagination";
import { activeTabs } from "../../MasterData";

const Loader = ({
  fetchStatus,
  addStatus,
  bankAccounts,
  fetchBankAccounts,
  addBankAccount,
  editStatus,
  editBankAccount,
  deleteStatus,
  deleteBankAccount,
  toggle,
  accountTypes,
  currencies,
  regions,
  cities,
  banks,
  COAs,
  activeTab,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [data, setData] = useState([]);

  const { rootState, dispatch } = useContext(MainContext);

  useEffect(() => {
    try {
      const {
        options: { offset, limit, onClick },
      } = getState(rootState);
      if (onClick) {
        fetchBankAccounts([
          { key: "offset", value: offset },
          { key: "limit", value: limit },
        ]);
      }
    } catch (e) {}
  }, [getState(rootState)]);

  useEffect(() => {
    setData(bankAccounts);
  }, [bankAccounts, setData]);

  const { searchValue } = useContext(SearchContext);
  useEffect(() => {
    setData(FilterByName(bankAccounts, "name", searchValue));
  }, [searchValue, setData]);

  useEffect(() => {
    setFetchLock(false);
    fetchBankAccounts();
  }, [fetchBankAccounts, setFetchLock]);

  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching Bank Accounts");
      setFetchLock(true);
    } else {
      if (activeTab === activeTabs.BANK_ACCOUNTS) {
        setPageValues(rootState, dispatch, response, "", activeTab);
      }
    }
  }, [fetchStatus, setFetchLock, dispatch, activeTab]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Bank Account");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Bank Account");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Bank Account");
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
      is_active: data.isActive ? Boolean(data.isActive) : false,
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
    <BankAccount
      bankAccounts={data}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addBankAccount={_addBankAccount}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editBankAccount={_editBankAccount}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteBankAccount={_deleteBankAccount}
      _toggle={toggle}
      accountTypes={accountTypes}
      currencies={currencies}
      regions={regions}
      cities={cities}
      banks={banks}
      COAs={COAs}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  bankAccounts: selectBankAccounts(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  accountTypes: selectAccountTypes(state),
  currencies: selectCurrencies(state),
  regions: selectRegions(state),
  cities: selectCities(state),
  banks: selectBanks(state),
  COAs: selectChartOfAccounts(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchBankAccounts: (data = null) => dispatch(Fetch(data)),
  addBankAccount: (data) => dispatch(Add(data)),
  editBankAccount: (data) => dispatch(Edit(data)),
  deleteBankAccount: (id) => dispatch(Remove(id)),
  toggle: (data) => dispatch(toggle(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
