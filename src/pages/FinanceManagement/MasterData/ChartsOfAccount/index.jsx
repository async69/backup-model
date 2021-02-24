import React, { useState, useEffect, useContext } from "react";
import COA from "./ChartsOfAccount";
import {
  selectFetchStatus,
  selectAddStatus,
  selectChartOfAccounts,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Finance/MasterData/ChartsOfAccounts/chartOfAccounts";
import { selectCompany } from "../../../../store/GeneralSetup/Company";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { toggle } from "../../../../store/ModalData/";
import { selectAccountTypes } from "../../../../store/GeneralSetup/AccountTypes";
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
  accounts,
  fetchCOA,
  addCOA,
  editStatus,
  editCOA,
  deleteStatus,
  deleteCOA,
  accountTypes,
  companyID,
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
        fetchCOA([
          { key: "offset", value: offset },
          { key: "limit", value: limit },
        ]);
      }
    } catch (e) {}
  }, [getState(rootState)]);

  useEffect(() => {
    setData(accounts);
  }, [accounts, setData]);

  const { searchValue } = useContext(SearchContext);
  useEffect(() => {
    setData(FilterByName(accounts, "name", searchValue));
  }, [searchValue, setData]);

  useEffect(() => {
    setFetchLock(false);
    fetchCOA();
  }, [fetchCOA, setFetchLock]);

  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching Chart Of Accounts");
      setFetchLock(true);
    } else {
      if (activeTab === activeTabs.CHART_OF_ACCOUNTS) {
        setPageValues(rootState, dispatch, response, "", activeTab);
      }
    }
  }, [fetchStatus, setFetchLock, dispatch, activeTab]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Chart Of Accounts");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Chart Of Accounts");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Chart Of Account");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addCOA = (data) => {
    setAddLock(false);
    const requestBody = {
      account_number: data.accountNumber,
      name: data.accountName,
      parent: data.chartsOfAccountType,
      report_type: data.reportType,
      sub_account_type: data.subAccountType,
      balance: data.balance,
      has_related_bank: data.hasRelatedBankAccount,
      company: companyID,
    };

    addCOA(requestBody);
  };

  const _editCOA = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      account_number: data.accountNumber,
      name: data.accountName,
      parent: data.chartsOfAccountType,
      report_type: data.reportType,
      sub_account_type: data.subAccountType,
      balance: data.balance,
      has_related_bank: data.hasRelatedBankAccount,
      company: companyID,
    };

    editCOA(requestBody);
  };

  const _deleteCOA = (id) => {
    setDeleteLock(false);
    deleteCOA(id);
  };

  return (
    <COA
      accounts={data}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addCOA={_addCOA}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editCOA={_editCOA}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteCOA={_deleteCOA}
      accountTypes={accountTypes}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  accounts: selectChartOfAccounts(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  accountTypes: selectAccountTypes(state),
  companyID: selectCompany(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCOA: (data = null) => dispatch(Fetch(data)),
  addCOA: (data) => dispatch(Add(data)),
  editCOA: (data) => dispatch(Edit(data)),
  deleteCOA: (id) => dispatch(Remove(id)),
  toggle: (data) => dispatch(toggle(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
