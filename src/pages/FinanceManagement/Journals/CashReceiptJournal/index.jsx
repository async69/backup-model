import React, { useState, useEffect, useContext } from "react";
import CashReceiptJournal from "./CashReceiptJournal";
import {
  selectFetchStatus,
  selectAddStatus,
  selectCashReceiptJournals,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectPatchStatus,
  Patch,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Finance/Journals/CashReceipt/";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { selectChartOfAccounts } from "../../../../store/Finance/MasterData/ChartsOfAccounts/chartOfAccounts";
import { saveLineTag } from "./config";
import statusTypes from "../../../../config/statusTypes";
import { today } from "../../.././../helpers/date";
import { MainContext, SearchContext } from "../../../../context/";
import {
  assignFilterComponent,
  setLockComponent,
} from "../../../../context/Main/States/search";
import { Input } from "reactstrap";
import { FilterByName } from "../../../../helpers/Filter";

const Loader = ({
  cashReceiptJournals,
  fetchStatus,
  addStatus,
  fetchCashReceiptJournals,
  addCashReceiptJournal,
  editStatus,
  editCashReceiptJournal,
  patchStatus,
  patchCashReceiptJournal,
  deleteStatus,
  deleteCashReceiptJournal,
  COAs,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [patchLock, setPatchLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    if (cashReceiptJournals.length > 0) {
      setData(cashReceiptJournals);
    }
  }, [cashReceiptJournals]);

  const [filterType, setFilterType] = useState("document_number");
  const [data, setData] = useState([]);
  const { dispatch } = useContext(MainContext);
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
      cashReceiptJournals,
      filterType,
      searchValue,
      filterType === "document_number"
    );
    setData(filteredData);
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchCashReceiptJournals();
  }, [fetchCashReceiptJournals, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching Cash Receipt Journal");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Saved Cash Receipt Journal");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Cash Receipt Journal");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status, response } = patchStatus;
    if (status === reduxStatus.failure && !patchLock) {
      setPatchLock(true);
    } else if (status === reduxStatus.success && !patchLock) {
      toast.success(`${response.status} Cash Receipt Journal`);
      setPatchLock(true);
    }
  }, [patchStatus, setPatchLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Cash Receipt Journal");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addCashReceiptJournal = () => {
    setAddLock(false);
    const requestBody = {};

    addCashReceiptJournal(requestBody);
  };

  const _editCashReceiptJournal = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      date: data.date,
      document_number: data.document_number,
      description: data.description,
      remarks: data.remarks,
      customer: data.customer,
      invoice: data.invoice,
      [saveLineTag]: data[saveLineTag].map((line) => ({
        debit: line.debit,
        credit: line.credit,
        description: line.description,
        account_balance: line.account_balance,
        account: line.account,
        remarks: line.remarks,
      })),
    };

    editCashReceiptJournal(requestBody);
  };

  const _postCashReceiptJournal = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.POSTED,
      posting_date: data.posting_date ? data.posting_date : "",
    };
    patchCashReceiptJournal(requestBody);
  };

  const _approveCashReceiptJournal = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.APPROVED,
      approved_date: today,
    };
    patchCashReceiptJournal(requestBody);
  };

  const _deleteCashReceiptJournal = (id) => {
    setDeleteLock(false);
    deleteCashReceiptJournal(id);
  };

  return (
    <CashReceiptJournal
      cashReceiptJournals={data}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addCashReceiptJournal={_addCashReceiptJournal}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editCashReceiptJournal={_editCashReceiptJournal}
      donePatch={patchStatus.status === reduxStatus.success && !patchLock}
      postCashReceiptJournal={_postCashReceiptJournal}
      approveCashReceiptJournal={_approveCashReceiptJournal}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteCashReceiptJournal={_deleteCashReceiptJournal}
      COAs={COAs}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  patchStatus: selectPatchStatus(state),
  deleteStatus: selectDeleteStatus(state),
  cashReceiptJournals: selectCashReceiptJournals(state),
  COAs: selectChartOfAccounts(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCashReceiptJournals: () => dispatch(Fetch()),
  addCashReceiptJournal: (data) => dispatch(Add(data)),
  editCashReceiptJournal: (data) => dispatch(Edit(data)),
  patchCashReceiptJournal: (data) => dispatch(Patch(data)),
  deleteCashReceiptJournal: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
