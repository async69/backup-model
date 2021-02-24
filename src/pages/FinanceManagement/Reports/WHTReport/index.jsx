import React, { useState, useEffect, useContext } from "react";
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
import { activeTabs } from "../../LedgerEntries";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchTrialBalance,
  editStatus,
  deleteStatus,
  activeTab,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

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

  useEffect(() => {
    setFetchLock(false);
    fetchTrialBalance();
  }, [fetchTrialBalance, setFetchLock]);

  useEffect(() => {
    const { status, response } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching WHT Report");
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
      toast.success("Added WHT Report");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited WHT Report");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted WHT Report");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  return (
    <h1>Witholding Tax Report</h1>
    // <TrialBalance
    //   trialBalance={trialBalance}
    //   doneAdd={addStatus.status === reduxStatus.success && !addLock}
    //   addTrialBalance={_addTrialBalance}
    //   doneEdit={editStatus.status === reduxStatus.success && !editLock}
    //   editTrialBalance={_editTrialBalance}
    //   doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
    //   deleteTrialBalance={_deleteTrialBalance}
    //   _toggle={toggle}
    // />
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
