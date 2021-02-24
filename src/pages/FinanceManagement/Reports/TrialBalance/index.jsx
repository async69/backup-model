import React, { useState, useEffect, useContext } from "react";
import TrialBalance from "./TrialBalance";
import {
  selectFetchStatus,
  selectAddStatus,
  selectTrialBalance,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Finance/Reports/TrialBalance";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { toggle } from "../../../../store/ModalData";
import { MainContext } from "../../../../context/Main";
import {
  setPageValues,
  getState,
} from "../../../../context/Main/States/Pagination";
import { SearchContext } from "../../../../context/";
import { FilterByName } from "../../../../helpers/Filter";
import { activeTabs } from "../../LedgerEntries";
import { Input } from "reactstrap";
import {
  assignFilterComponent,
  setLockComponent,
} from "../../../../context/Main/States/search";

const Loader = ({
  fetchStatus,
  addStatus,
  trialBalance,
  fetchTrialBalance,
  addTrialBalance,
  editStatus,
  editTrialBalance,
  deleteStatus,
  deleteTrialBalance,
  toggle,
  activeTab,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("document_number");
  const [data, setData] = useState([]);
  

  const { rootState, dispatch } = useContext(MainContext);

  useEffect(() => {
    // try {
    //   const {
    //     options: { offset, limit, onClick },
    //   } = getState(rootState);
    //   if (onClick && activeTab === activeTabs.BANK_LEDGER_ENTRY) {
    //     fetchTrialBalance([
    //       { key: "offset", value: offset },
    //       { key: "limit", value: limit },
    //     ]);
    //   }
    // } catch (e) {}
  }, [getState(rootState)]);

  const FilterTypes = () => {
    const [selectedFilter, setFilter] = useState(filterType);

    useEffect(() => setFilterType(selectedFilter), [selectedFilter]);

    return (
      <>
        <Input
          type="select"
          onChange={({ currentTarget: { value } }) => setFilter(value)}
        >
          <option value="account_number">By Account No</option>
          <option value="name">By Chart of Account</option>
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
    setData(trialBalance);
  }, [trialBalance, setData]);

  useEffect(() => {
    setData(FilterByName(trialBalance, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchTrialBalance();
  }, [fetchTrialBalance, setFetchLock]);

  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching Bank Ledger Entries");
      setFetchLock(true);
    } else {
      if (activeTab === activeTabs.BANK_LEDGER_ENTRY) {
        setPageValues(rootState, dispatch, response, "", activeTab);
      }
    }
  }, [fetchStatus, setFetchLock, activeTab]);

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

  const _addTrialBalance = (data) => {
    setAddLock(false);
    const requestBody = {
      bank_account_code: data.TrialBalanceCode ? data.TrialBalanceCode : "",
      branch_name: data.bankBranch ? data.bankBranch : "",
      account_number: data.TrialBalanceNumber
        ? Number(data.TrialBalanceNumber)
        : 0,
      is_active: data.isActive ? Boolean(data.isActive) : "",
      phone_no: data.phoneNumber ? data.phoneNumber : "",
      Postal_code: data.TrialBalanceCode ? data.TrialBalanceCode : "",
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

    addTrialBalance(requestBody);
  };

  const _editTrialBalance = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id ? data.id : "",
      bank_account_code: data.TrialBalanceCode ? data.TrialBalanceCode : "",
      branch_name: data.bankBranch ? data.bankBranch : "",
      account_number: data.TrialBalanceNumber
        ? Number(data.TrialBalanceNumber)
        : 0,
      is_active: data.isActive ? Boolean(data.isActive) : "",
      phone_no: data.phoneNumber ? data.phoneNumber : "",
      Postal_code: data.TrialBalanceCode ? data.TrialBalanceCode : "",
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

    editTrialBalance(requestBody);
  };

  const _deleteTrialBalance = (id) => {
    setDeleteLock(false);
    deleteTrialBalance(id);
  };
  return (
    <TrialBalance
      trialBalance={data}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addTrialBalance={_addTrialBalance}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editTrialBalance={_editTrialBalance}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteTrialBalance={_deleteTrialBalance}
      _toggle={toggle}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  trialBalance: selectTrialBalance(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchTrialBalance: (data = null) => dispatch(Fetch(data)),
  addTrialBalance: (data) => dispatch(Add(data)),
  editTrialBalance: (data) => dispatch(Edit(data)),
  deleteTrialBalance: (id) => dispatch(Remove(id)),
  toggle: (data) => dispatch(toggle(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
