import React, { useState, useEffect, useContext } from "react";
import Consignment from "./Consignment";
import {
  selectFetchStatus,
  selectAddStatus,
  selectConsignments,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/HR/ResourceManagement/Consignment";
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
  fetchConsignment,
  addConsignment,
  editStatus,
  editConsignment,
  deleteStatus,
  deleteConsignment,
  consignments,
  employee,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    setData(consignments);
  }, [consignments, setData]);

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
    setData(FilterByName(consignments, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchConsignment();
  }, [fetchConsignment, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Consignments");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status, errors } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      toast.error(String(Object.values(errors.errors)));
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Consignment");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status, errors } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      toast.error(String(Object.values(errors.errors)));
      toast.error("Failed editing Consignment");
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Consignment");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      toast.error(deleteStatus.errors.errors.detail[0]);
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Consignment");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addConsignment = (data) => {
    setAddLock(false);
    addConsignment(data);
  };

  const _editConsignment = (data) => {
    setEditLock(false);
    editConsignment(data);
  };

  const _deleteConsignment = (id) => {
    setDeleteLock(false);
    deleteConsignment(id);
  };

  return (
    <Consignment
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addConsignment={_addConsignment}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editConsignment={_editConsignment}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteConsignment={_deleteConsignment}
      consignments={data}
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
  consignments: selectConsignments(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchConsignment: () => dispatch(Fetch()),
  addConsignment: (data) => dispatch(Add(data)),
  editConsignment: (data) => dispatch(Edit(data)),
  deleteConsignment: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
