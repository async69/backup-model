import React, { useState, useEffect, useContext } from "react";
import Nationality from "./Nationality";
import {
  selectFetchStatus,
  selectAddStatus,
  selectNationalities,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/HR/Setup/Nationality";
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
  fetcNationalities,
  addNationality,
  editStatus,
  editNationality,
  deleteStatus,
  deleteNationality,
  nationalities,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    setData(nationalities);
  }, [nationalities, setData]);

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
    setData(FilterByName(nationalities, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetcNationalities();
  }, [fetcNationalities, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Nationalities");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status, errors } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      toast.error(String(Object.values(errors.errors)));
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Nationality");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status, errors } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      toast.error(String(Object.values(errors.errors)));
      toast.error("Failed editing Nationality");
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Nationality");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      toast.error(deleteStatus.errors.errors.detail[0]);
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Nationality");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addNationality = (data) => {
    setAddLock(false);
    const requestBody = {
      name: data.name,
      code: data.code,
      type: entryTypeNames.Nationality,
      remarks: data.remarks,
    };

    addNationality(requestBody);
  };

  const _editNationality = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      name: data.name,
      code: data.code,
      type: entryTypeNames.Nationality,
      remarks: data.remarks,
    };

    editNationality(requestBody);
  };

  const _deleteNationality = (id) => {
    setDeleteLock(false);
    deleteNationality(id);
  };

  return (
    <Nationality
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addNationality={_addNationality}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editNationality={_editNationality}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteNationality={_deleteNationality}
      nationalities={data}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  nationalities: selectNationalities(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetcNationalities: () => dispatch(Fetch()),
  addNationality: (data) => dispatch(Add(data)),
  editNationality: (data) => dispatch(Edit(data)),
  deleteNationality: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
