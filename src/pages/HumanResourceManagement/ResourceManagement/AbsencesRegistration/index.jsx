import React, { useState, useEffect, useContext } from "react";
import AbsenceRegistration from "./AbsencesRegistration";
import {
  selectFetchStatus,
  selectAddStatus,
  selectAbsenceRegistrations,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/HR/ResourceManagement/AbsenceRegistration";
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
  fetchAbsenceRegistration,
  addAbsenceRegistration,
  editStatus,
  editAbsenceRegistration,
  deleteStatus,
  deleteAbsenceRegistration,
  absenceRegistrations,
  employee,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    setData(absenceRegistrations);
  }, [absenceRegistrations, setData]);

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
    setData(FilterByName(absenceRegistrations, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchAbsenceRegistration();
  }, [fetchAbsenceRegistration, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Absence Registrations");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status, errors } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      toast.error(String(Object.values(errors.errors)));
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Absence Registration");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status, errors } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      toast.error(String(Object.values(errors.errors)));
      toast.error("Failed editing Absence Registration");
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Absence Registration");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      toast.error(deleteStatus.errors.errors.detail[0]);
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Absence Registration");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addAbsenceRegistration = (data) => {
    setAddLock(false);
    addAbsenceRegistration(data);
  };

  const _editAbsenceRegistration = (data) => {
    setEditLock(false);

    editAbsenceRegistration(data);
  };

  const _deleteAbsenceRegistration = (id) => {
    setDeleteLock(false);
    deleteAbsenceRegistration(id);
  };

  return (
    <AbsenceRegistration
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addAbsenceRegistration={_addAbsenceRegistration}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editAbsenceRegistration={_editAbsenceRegistration}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteAbsenceRegistration={_deleteAbsenceRegistration}
      absenceRegistrations={data}
      options={{ selectedEmployee: employee }}
    />
  );
};

const mapStateToProps = (state, ...ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  absenceRegistrations: selectAbsenceRegistrations(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchAbsenceRegistration: () => dispatch(Fetch()),
  addAbsenceRegistration: (data) => dispatch(Add(data)),
  editAbsenceRegistration: (data) => dispatch(Edit(data)),
  deleteAbsenceRegistration: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
