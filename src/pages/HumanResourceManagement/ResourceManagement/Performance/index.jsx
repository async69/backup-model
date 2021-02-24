import React, { useState, useEffect, useContext } from "react";
import Performance from "./Performance";
import {
  selectFetchStatus,
  selectAddStatus,
  selectPerformances,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/HR/ResourceManagement/Performance";
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
  fetchPerformance,
  addPerformance,
  editStatus,
  editPerformance,
  deleteStatus,
  deletePerformance,
  performances,
  employee,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    setData(performances);
  }, [performances, setData]);

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
    setData(FilterByName(performances, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchPerformance();
  }, [fetchPerformance, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Performances");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status, errors } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      toast.error(String(Object.values(errors.errors)));
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Performance");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status, errors } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      toast.error(String(Object.values(errors.errors)));
      toast.error("Failed editing Performance");
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Performance");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      toast.error(deleteStatus.errors.errors.detail[0]);
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Performance");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addPerformance = (data) => {
    setAddLock(false);
    addPerformance(data);
  };

  const _editPerformance = (data) => {
    setEditLock(false);
    editPerformance(data);
  };

  const _deletePerformance = (id) => {
    setDeleteLock(false);
    deletePerformance(id);
  };

  return (
    <Performance
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addPerformance={_addPerformance}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editPerformance={_editPerformance}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deletePerformance={_deletePerformance}
      performances={data}
      options={{ selectedEmployee: employee }}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  performances: selectPerformances(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPerformance: () => dispatch(Fetch()),
  addPerformance: (data) => dispatch(Add(data)),
  editPerformance: (data) => dispatch(Edit(data)),
  deletePerformance: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
