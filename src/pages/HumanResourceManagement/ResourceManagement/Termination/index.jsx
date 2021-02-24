import React, { useState, useEffect, useContext } from "react";
import Termination from "./Termination";
import {
  selectFetchStatus,
  selectAddStatus,
  selectTerminations,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/HR/ResourceManagement/Termination";
import { selectTerminationTypes } from "store/HR/Setup/TerminationType";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { SearchContext, MainContext } from "../../../../context";
import { assignFilterComponent } from "../../../../context/Main/States/search";
import { FilterByName } from "../../../../helpers/Filter";
import { Input } from "reactstrap";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchTerminations,
  addTermination,
  editStatus,
  editTermination,
  deleteStatus,
  deleteTermination,
  terminations,
  employee,
  terminationTypes,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    setData(terminations);
  }, [terminations, setData]);

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
    setData(FilterByName(terminations, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchTerminations();
  }, [fetchTerminations, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Terminations");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status, errors } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      toast.error(String(Object.values(errors.errors)));
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Termination");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status, errors } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      toast.error(String(Object.values(errors.errors)));
      toast.error("Failed editing Termination");
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Termination");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      toast.error(deleteStatus.errors.errors.detail[0]);
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Termination");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addTermination = (data) => {
    setAddLock(false);
    addTermination(data);
  };

  const _editTermination = (data) => {
    setEditLock(false);
    editTermination(data);
  };

  const _deleteTermination = (id) => {
    setDeleteLock(false);
    deleteTermination(id);
  };

  return (
    <Termination
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addTermination={_addTermination}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editTermination={_editTermination}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteTermination={_deleteTermination}
      terminations={data}
      options={{ terminationTypes, selectedEmployee: employee }}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  terminations: selectTerminations(state),
  terminationTypes: selectTerminationTypes(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchTerminations: () => dispatch(Fetch()),
  addTermination: (data) => dispatch(Add(data)),
  editTermination: (data) => dispatch(Edit(data)),
  deleteTermination: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
