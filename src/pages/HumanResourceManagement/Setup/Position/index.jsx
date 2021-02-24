import React, { useState, useEffect, useContext } from "react";
import Position from "./Position";
import {
  selectFetchStatus,
  selectAddStatus,
  selectPositions,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/HR/Setup/Position";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";
import { SearchContext, MainContext } from "../../../../context";
import { assignFilterComponent } from "../../../../context/Main/States/search";
import { FilterByName } from "../../../../helpers/Filter";
import { Input } from "reactstrap";
import { selectDepartments } from "store/HR/Setup/Department";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchPosition,
  addPosition,
  editStatus,
  editPosition,
  deleteStatus,
  deletePosition,
  positions,
  departments,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    setData(positions);
  }, [positions, setData]);

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
    setData(FilterByName(positions, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchPosition();
  }, [fetchPosition, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Positions");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status, errors } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      toast.error(String(Object.values(errors.errors)));
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Position");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status, errors } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      toast.error(String(Object.values(errors.errors)));
      toast.error("Failed editing Position");
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Position");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      toast.error(deleteStatus.errors.errors.detail[0]);
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Position");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addPosition = (data) => {
    setAddLock(false);
    const requestBody = {
      name: data.name,
      code: data.code,
      department: data.department,
      remarks: data.remarks,
    };

    addPosition(requestBody);
  };

  const _editPosition = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      name: data.name,
      code: data.code,
      department: data.department,
      remarks: data.remarks,
    };

    editPosition(requestBody);
  };

  const _deletePosition = (id) => {
    setDeleteLock(false);
    deletePosition(id);
  };

  return (
    <Position
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addPosition={_addPosition}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editPosition={_editPosition}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deletePosition={_deletePosition}
      positions={data}
      departments={departments}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  positions: selectPositions(state),
  departments: selectDepartments(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPosition: () => dispatch(Fetch()),
  addPosition: (data) => dispatch(Add(data)),
  editPosition: (data) => dispatch(Edit(data)),
  deletePosition: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
