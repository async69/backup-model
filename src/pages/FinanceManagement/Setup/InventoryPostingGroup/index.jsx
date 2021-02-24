import React, { useState, useEffect } from "react";
import InventoryPostingGroup from "./InventoryPostingGroup";
import {
  selectFetchStatus,
  selectAddStatus,
  selectInventoryPostingGroups,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/GeneralSetup/Posting/InventoryPostingGroups";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchInventoryPostingGroups,
  addInventoryPostingGroup,
  editStatus,
  editInventoryPostingGroup,
  deleteStatus,
  deleteInventoryPostingGroup,
  postingGroups,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    setFetchLock(false);
    fetchInventoryPostingGroups();
  }, [fetchInventoryPostingGroups, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching Inventory Posting Groups");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Inventory Posting Group");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Inventory Posting Group");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Inventory Posting Group");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addInventoryPostingGroup = (data) => {
    setAddLock(false);
    const requestBody = {
      name: data.name ? data.name : "",
      code: data.code ? data.code : "",

    };

    addInventoryPostingGroup(requestBody);
  };

  const _editInventoryPostingGroup = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id ? data.id : "",
      name: data.name ? data.name : "",
      code: data.code ? data.code : "",

    };

    editInventoryPostingGroup(requestBody);
  };

  const _deleteInventoryPostingGroup = (id) => {
    setDeleteLock(false);
    deleteInventoryPostingGroup(id);
  };
  return (
    <InventoryPostingGroup
      postingGroups={postingGroups}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addInventoryPostingGroup={_addInventoryPostingGroup}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editInventoryPostingGroup={_editInventoryPostingGroup}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteInventoryPostingGroup={_deleteInventoryPostingGroup}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  postingGroups: selectInventoryPostingGroups(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchInventoryPostingGroups: () => dispatch(Fetch()),
  addInventoryPostingGroup: (data) => dispatch(Add(data)),
  editInventoryPostingGroup: (data) => dispatch(Edit(data)),
  deleteInventoryPostingGroup: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
