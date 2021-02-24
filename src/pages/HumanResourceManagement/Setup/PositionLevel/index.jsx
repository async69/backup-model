import React, { useState, useEffect, useContext } from "react";
import PositionLevel from "./PositionLevel";
import {
  selectFetchStatus,
  selectAddStatus,
  selectPositionLevels,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/HR/Setup/PositionLevel";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { SearchContext, MainContext } from "../../../../context";
import { assignFilterComponent } from "../../../../context/Main/States/search";
import { FilterByName } from "../../../../helpers/Filter";
import { Input } from "reactstrap";
import { selectPositions } from "store/HR/Setup/Position";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchPositionLevels,
  addPositionLevel,
  editStatus,
  editPositionLevel,
  deleteStatus,
  deletePositionLevel,
  positionLevels,
  positions,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    setData(positionLevels);
  }, [positionLevels, setData]);

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
    setData(FilterByName(positionLevels, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchPositionLevels();
  }, [fetchPositionLevels, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Position Levels");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status, errors } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      toast.error(String(Object.values(errors.errors)));
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Position Level");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status, errors } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      toast.error(String(Object.values(errors.errors)));
      toast.error("Failed editing Position Level");
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Position Level");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      toast.error(deleteStatus.errors.errors.detail[0]);
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Position Level");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addPositionLevel = (data) => {
    setAddLock(false);
    const requestBody = {
      name: data.name,
      code: data.code,
      position: data.position,
      remarks: data.remarks,
    };

    addPositionLevel(requestBody);
  };

  const _editPositionLevel = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      name: data.name,
      code: data.code,
      position: data.position,
      remarks: data.remarks,
    };

    editPositionLevel(requestBody);
  };

  const _deletePositionLevel = (id) => {
    setDeleteLock(false);
    deletePositionLevel(id);
  };

  return (
    <PositionLevel
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addPositionLevel={_addPositionLevel}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editPositionLevel={_editPositionLevel}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deletePositionLevel={_deletePositionLevel}
      positionLevels={data}
      positions={positions}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  positionLevels: selectPositionLevels(state),
  positions: selectPositions(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPositionLevels: () => dispatch(Fetch()),
  addPositionLevel: (data) => dispatch(Add(data)),
  editPositionLevel: (data) => dispatch(Edit(data)),
  deletePositionLevel: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
