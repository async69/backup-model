import React, { useState, useEffect, useContext } from "react";
import GoalType from "./GoalType";
import {
  selectFetchStatus,
  selectAddStatus,
  selectGoalTypes,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/HR/Setup/GoalType";
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
  fetchGoalTypes,
  addGoalType,
  editStatus,
  editGoalType,
  deleteStatus,
  deleteGoalType,
  goalTypes,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    setData(goalTypes);
  }, [goalTypes, setData]);

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
    setData(FilterByName(goalTypes, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchGoalTypes();
  }, [fetchGoalTypes, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Goal Types");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status, errors } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      toast.error(String(Object.values(errors.errors)));
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Goal Type");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status, errors } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      toast.error(String(Object.values(errors.errors)));
      toast.error("Failed editing Goal Type");
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Goal Type");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      toast.error(deleteStatus.errors.errors.detail[0]);
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Goal Type");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addGoalType = (data) => {
    setAddLock(false);
    const requestBody = {
      name: data.name,
      code: data.code,
      remarks: data.remarks,
    };

    addGoalType(requestBody);
  };

  const _editGoalType = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      name: data.name,
      code: data.code,
      remarks: data.remarks,
    };

    editGoalType(requestBody);
  };

  const _deleteGoalType = (id) => {
    setDeleteLock(false);
    deleteGoalType(id);
  };

  return (
    <GoalType
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addGoalType={_addGoalType}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editGoalType={_editGoalType}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteGoalType={_deleteGoalType}
      goalTypes={data}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  goalTypes: selectGoalTypes(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchGoalTypes: () => dispatch(Fetch()),
  addGoalType: (data) => dispatch(Add(data)),
  editGoalType: (data) => dispatch(Edit(data)),
  deleteGoalType: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
