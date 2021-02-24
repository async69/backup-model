import React, { useState, useEffect, useContext } from "react";
import Experience from "./Experience";
import {
  selectFetchStatus,
  selectAddStatus,
  selectExperiences,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/HR/ResourceManagement/Experience";
import { selectCities } from "store/GeneralSetup/Cities";
import { selectCountries } from "store/GeneralSetup/Countries";

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
  fetchExperience,
  addExperience,
  editStatus,
  editExperience,
  deleteStatus,
  deleteExperience,
  experiences,
  countries,
  cities,
  employee,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    setData(experiences);
  }, [experiences, setData]);

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
    setData(FilterByName(experiences, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchExperience();
  }, [fetchExperience, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Experiences");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status, errors } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      toast.error(String(Object.values(errors.errors)));
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Experience");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status, errors } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      toast.error(String(Object.values(errors.errors)));
      toast.error("Failed editing Experience");
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Experience");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      toast.error(deleteStatus.errors.errors.detail[0]);
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Experience");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addExperience = (data) => {
    setAddLock(false);
    addExperience(data);
  };

  const _editExperience = (data) => {
    setEditLock(false);
    editExperience(data);
  };

  const _deleteExperience = (id) => {
    setDeleteLock(false);
    deleteExperience(id);
  };

  return (
    <Experience
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addExperience={_addExperience}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editExperience={_editExperience}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteExperience={_deleteExperience}
      experiences={data}
      options={{ countries, cities, selectedEmployee: employee }}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  experiences: selectExperiences(state),
  countries: selectCountries(state),
  cities: selectCities(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchExperience: () => dispatch(Fetch()),
  addExperience: (data) => dispatch(Add(data)),
  editExperience: (data) => dispatch(Edit(data)),
  deleteExperience: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
