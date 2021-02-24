import React, { useState, useEffect, useContext } from "react";
import TerminationType from "./TerminationType";
import {
  selectFetchStatus,
  selectAddStatus,
  selectTerminationTypes,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/HR/Setup/TerminationType";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { SearchContext, MainContext } from "../../../../context/";
import { assignFilterComponent } from "../../../../context/Main/States/search";
import { FilterByName } from "../../../../helpers/Filter";
import { Input } from "reactstrap";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchTerminationTypes,
  addTerminationType,
  editStatus,
  editTerminationType,
  deleteStatus,
  deleteTerminationType,
  terminationTypes,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    setData(terminationTypes);
  }, [terminationTypes, setData]);

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
    setData(FilterByName(terminationTypes, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchTerminationTypes();
  }, [fetchTerminationTypes, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Termination Types");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status, errors } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      toast.error(String(Object.values(errors.errors)));
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Termination Type");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status, errors } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      toast.error(String(Object.values(errors.errors)));
      toast.error("Failed editing Termination Type");
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Termination Type");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      toast.error(deleteStatus.errors.errors.detail[0]);
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Termination Type");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addTerminationType = (data) => {
    setAddLock(false);
    const requestBody = {
      name: data.name,
      code: data.code,
      remarks: data.remarks,
    };

    addTerminationType(requestBody);
  };

  const _editTerminationType = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      name: data.name,
      code: data.code,
      remarks: data.remarks,
    };

    editTerminationType(requestBody);
  };

  const _deleteTerminationType = (id) => {
    setDeleteLock(false);
    deleteTerminationType(id);
  };

  return (
    <TerminationType
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addTerminationType={_addTerminationType}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editTerminationType={_editTerminationType}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteTerminationType={_deleteTerminationType}
      terminationTypes={data}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  terminationTypes: selectTerminationTypes(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchTerminationTypes: () => dispatch(Fetch()),
  addTerminationType: (data) => dispatch(Add(data)),
  editTerminationType: (data) => dispatch(Edit(data)),
  deleteTerminationType: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
