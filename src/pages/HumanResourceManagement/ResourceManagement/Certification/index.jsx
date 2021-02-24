import React, { useState, useEffect, useContext } from "react";
import Certification from "./Certification";
import {
  selectFetchStatus,
  selectAddStatus,
  selectCertifications,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/HR/ResourceManagement/Certification";
import { selectCertificationTypes } from "store/HR/Setup/CertificationType";
import { selectEducationTypes } from "store/HR/Setup/EducationType";
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
  fetchCertifications,
  addCertification,
  editStatus,
  editCertification,
  deleteStatus,
  deleteCertification,
  certifications,
  employee,
  certificationTypes,
  educationTypes,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    setData(certifications);
  }, [certifications, setData]);

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
    setData(FilterByName(certifications, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchCertifications();
  }, [fetchCertifications, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Certifications");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Certification");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      toast.error("Failed editing Certification");
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Certification");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      toast.error(deleteStatus.errors.errors.detail[0]);
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Certification");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addCertification = (data) => {
    setAddLock(false);
    const formData = new FormData();
    for (var key in data) {
      formData.append(key, data[key]);
    }
    addCertification(formData);
  };

  const _editCertification = (data) => {
    setEditLock(false);
    const formData = new FormData();
    for (var key in data) {
      formData.append(key, data[key]);
    }
    editCertification(formData);
  };

  const _deleteCertification = (id) => {
    setDeleteLock(false);
    deleteCertification(id);
  };

  return (
    <Certification
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addCertification={_addCertification}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editCertification={_editCertification}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteCertification={_deleteCertification}
      certifications={data}
      options={{
        selectedEmployee: employee,
        certificationTypes,
        educationTypes,
      }}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  certifications: selectCertifications(state),
  certificationTypes: selectCertificationTypes(state),
  educationTypes: selectEducationTypes(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCertifications: () => dispatch(Fetch()),
  addCertification: (data) => dispatch(Add(data)),
  editCertification: (data) => dispatch(Edit(data)),
  deleteCertification: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
