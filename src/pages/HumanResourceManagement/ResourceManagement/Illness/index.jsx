import React, { useState, useEffect, useContext } from "react";
import Illness from "./Illness";
import {
  selectFetchStatus,
  selectAddStatus,
  selectIllness,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/HR/ResourceManagement/Illness";
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
  fetchIllness,
  addIllness,
  editStatus,
  editIllness,
  deleteStatus,
  deleteIllness,
  illness,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    setData(illness);
  }, [illness, setData]);

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
    setData(FilterByName(illness, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchIllness();
  }, [fetchIllness, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Illness");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status, errors } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      toast.error(String(Object.values(errors.errors)));
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Illness");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status, errors } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      toast.error(String(Object.values(errors.errors)));
      toast.error("Failed editing Illness");
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Illness");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      toast.error(deleteStatus.errors.errors.detail[0]);
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Illness");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addIllness = (data) => {
    setAddLock(false);
    const requestBody = {
      employee_number: data.employee_number,
      employee_name: data.employee_name,
      illness_type: data.illness_type,
      body_part: data.body_part,
      incident_date: data.incident_date,
      case_description: data.case_description,
      case_outcome: data.case_outcome,
      remarks: data.remarks,
    };
    addIllness(requestBody);
  };

  const _editIllness = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      employee_number: data.employee_number,
      employee_name: data.employee_name,
      illness_type: data.illness_type,
      body_part: data.body_part,
      incident_date: data.incident_date,
      case_description: data.case_description,
      case_outcome: data.case_outcome,
      remarks: data.remarks,
    };
    editIllness(requestBody);
  };

  const _deleteIllness = (id) => {
    setDeleteLock(false);
    deleteIllness(id);
  };

  return (
    <Illness
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addIllness={_addIllness}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editIllness={_editIllness}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteIllness={_deleteIllness}
      illness={data}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  illness: selectIllness(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchIllness: () => dispatch(Fetch()),
  addIllness: (data) => dispatch(Add(data)),
  editIllness: (data) => dispatch(Edit(data)),
  deleteIllness: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
