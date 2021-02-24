import React, { useState, useEffect, useContext } from "react";
import Language from "./Language";
import {
  selectFetchStatus,
  selectAddStatus,
  selectLanguages,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/HR/Setup/Language";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { SearchContext, MainContext } from "../../../../context/";
import { assignFilterComponent } from "../../../../context/Main/States/search";
import { FilterByName } from "../../../../helpers/Filter";
import { Input } from "reactstrap";
import entryTypeNames from "constants/entryTypeNames";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchLanguages,
  addLanguage,
  editStatus,
  editLanguage,
  deleteStatus,
  deleteLanguage,
  languages,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    setData(languages);
  }, [languages, setData]);

  const { searchValue } = useContext(SearchContext);

  const { dispatch } = useContext(MainContext);
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
    setData(FilterByName(languages, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchLanguages();
  }, [fetchLanguages, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Languages");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Language");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Language");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Language");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addLanguage = (data) => {
    setAddLock(false);
    const requestBody = {
      name: data.name,
      code: data.code,
      type: entryTypeNames.Language,
      remarks: data.remarks,
    };

    addLanguage(requestBody);
  };

  const _editLanguage = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      name: data.name,
      code: data.code,
      type: entryTypeNames.Language,
      remarks: data.remarks,
    };

    editLanguage(requestBody);
  };

  const _deleteLanguage = (id) => {
    setDeleteLock(false);
    deleteLanguage(id);
  };

  return (
    <Language
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addLanguage={_addLanguage}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editLanguage={_editLanguage}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteLanguage={_deleteLanguage}
      languages={data}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  languages: selectLanguages(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchLanguages: () => dispatch(Fetch()),
  addLanguage: (data) => dispatch(Add(data)),
  editLanguage: (data) => dispatch(Edit(data)),
  deleteLanguage: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
