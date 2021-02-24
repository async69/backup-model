import React, { useState, useEffect, useContext } from "react";
import GeneralJournal from "./GeneralJournal";
import {
  selectFetchStatus,
  selectAddStatus,
  selectGeneralJournals,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectPatchStatus,
  Patch,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Finance/Journals/GeneralJournal";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { selectChartOfAccounts } from "../../../../store/Finance/MasterData/ChartsOfAccounts/chartOfAccounts";
import { selectDocumentTypes }from "store/GeneralSetup/DocumentType"
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
  generalJournals,
  fetchStatus,
  addStatus,
  fetchGeneralJournals,
  addGeneralJournal,
  editStatus,
  editGeneralJournal,
  patchStatus,
  patchGeneralJournal,
  deleteStatus,
  deleteGeneralJournal,
  COAs,
  documentTypes
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [patchLock, setPatchLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    if (generalJournals.length > 0) {
      setData(generalJournals);
    }
  }, [generalJournals]);

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
      generalJournals,
      filterType,
      searchValue,
      filterType === "document_number"
    );
    setData(filteredData);
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchGeneralJournals();
  }, [fetchGeneralJournals, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching General Journal");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Saved General Journal");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited General Journal");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status, response } = patchStatus;
    if (status === reduxStatus.failure && !patchLock) {
      setPatchLock(true);
    } else if (status === reduxStatus.success && !patchLock) {
      toast.success(`${response.status} General Journal`);
      setPatchLock(true);
    }
  }, [patchStatus, setPatchLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted General Journal");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addGeneralJournal = (data) => {
    setAddLock(false);
    const requestBody = {
      ...data
    };

    addGeneralJournal(requestBody);
  };

  const _editGeneralJournal = (data) => {
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

    editGeneralJournal(requestBody);
  };

  const _postGeneralJournal = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.POSTED,
      posting_date: data.posting_date ? data.posting_date : "",
    };
    patchGeneralJournal(requestBody);
  };

  const _approveGeneralJournal = (data) => {
    setPatchLock(false);
    const requestBody = {
      id: data.id,
      status: statusTypes.APPROVED,
      approved_date: today,
    };
    patchGeneralJournal(requestBody);
  };

  const _deleteGeneralJournal = (id) => {
    setDeleteLock(false);
    deleteGeneralJournal(id);
  };

  return (
    <GeneralJournal
      generalJournals={data}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addGeneralJournal={_addGeneralJournal}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editGeneralJournal={_editGeneralJournal}
      donePatch={patchStatus.status === reduxStatus.success && !patchLock}
      postGeneralJournal={_postGeneralJournal}
      approveGeneralJournal={_approveGeneralJournal}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteGeneralJournal={_deleteGeneralJournal}
      COAs={COAs}
      documentTypes={documentTypes}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  patchStatus: selectPatchStatus(state),
  deleteStatus: selectDeleteStatus(state),
  generalJournals: selectGeneralJournals(state),
  COAs: selectChartOfAccounts(state),
  documentTypes: selectDocumentTypes(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchGeneralJournals: () => dispatch(Fetch()),
  addGeneralJournal: (data) => dispatch(Add(data)),
  editGeneralJournal: (data) => dispatch(Edit(data)),
  patchGeneralJournal: (data) => dispatch(Patch(data)),
  deleteGeneralJournal: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
