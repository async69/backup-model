import React, { useState, useEffect, useContext } from "react";
import Training from "./Training";
import {
  selectFetchStatus,
  selectAddStatus,
  selectTrainings,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/HR/ResourceManagement/Training";
import { selectTrainingTypes } from "store/HR/Setup/TrainingType";
import { selectInstitutions } from "store/HR/Setup/Institution";
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
  fetchTrainings,
  addTraining,
  editStatus,
  editTraining,
  deleteStatus,
  deleteTraining,
  trainings,
  employee,
  trainingTypes,
  institutions,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    setData(trainings);
  }, [trainings, setData]);

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
    setData(FilterByName(trainings, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchTrainings();
  }, [fetchTrainings, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Trainings");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status, errors } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      toast.error(String(Object.values(errors.errors)));
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Training");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status, errors } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      toast.error(String(Object.values(errors.errors)));
      toast.error("Failed editing Training");
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Training");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      toast.error(deleteStatus.errors.errors.detail[0]);
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Training");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addTraining = (data) => {
    setAddLock(false);
    addTraining(data);
  };

  const _editTraining = (data) => {
    setEditLock(false);
    editTraining(data);
  };

  const _deleteTraining = (id) => {
    setDeleteLock(false);
    deleteTraining(id);
  };

  return (
    <Training
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addTraining={_addTraining}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editTraining={_editTraining}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteTraining={_deleteTraining}
      trainings={data}
      options={{ selectedEmployee: employee, trainingTypes, institutions }}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  trainings: selectTrainings(state),
  trainingTypes: selectTrainingTypes(state),
  institutions: selectInstitutions(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchTrainings: () => dispatch(Fetch()),
  addTraining: (data) => dispatch(Add(data)),
  editTraining: (data) => dispatch(Edit(data)),
  deleteTraining: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
