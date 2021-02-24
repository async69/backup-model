import React, { useState, useEffect, useContext } from "react";
import ConsignmentType from "./ConsignmentType";
import {
  selectFetchStatus,
  selectAddStatus,
  selectConsignmentTypes,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/HR/Setup/ConsignmentType";
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
  fetchConsignmentTypes,
  addConsignmentType,
  editStatus,
  editConsignmentType,
  deleteStatus,
  deleteConsignmentType,
  consignmentTypes,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    setData(consignmentTypes);
  }, [consignmentTypes, setData]);

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
    setData(FilterByName(consignmentTypes, filterType, searchValue));
  }, [searchValue, setData, filterType]);

  useEffect(() => {
    setFetchLock(false);
    fetchConsignmentTypes();
  }, [fetchConsignmentTypes, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Consignment Types");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status, errors } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      toast.error(String(Object.values(errors.errors)));
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Consignment Type");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status, errors } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      toast.error(String(Object.values(errors.errors)));
      toast.error("Failed editing Consignment Type");
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Consignment Type");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      toast.error(deleteStatus.errors.errors.detail[0]);
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Consignment Type");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addConsignmentType = (data) => {
    setAddLock(false);
    const requestBody = {
      name: data.name,
      code: data.code,
      remarks: data.remarks,
    };

    addConsignmentType(requestBody);
  };

  const _editConsignmentType = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id,
      name: data.name,
      code: data.code,
      remarks: data.remarks,
    };

    editConsignmentType(requestBody);
  };

  const _deleteConsignmentType = (id) => {
    setDeleteLock(false);
    deleteConsignmentType(id);
  };

  return (
    <ConsignmentType
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addConsignmentType={_addConsignmentType}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editConsignmentType={_editConsignmentType}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteConsignmentType={_deleteConsignmentType}
      consignmentTypes={data}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  consignmentTypes: selectConsignmentTypes(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchConsignmentTypes: () => dispatch(Fetch()),
  addConsignmentType: (data) => dispatch(Add(data)),
  editConsignmentType: (data) => dispatch(Edit(data)),
  deleteConsignmentType: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
