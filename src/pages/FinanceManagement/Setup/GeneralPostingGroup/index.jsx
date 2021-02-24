import React, { useState, useEffect } from "react";
import GeneralPostingGroup from "./GeneralPostingGroup";
import {
  selectFetchStatus,
  selectAddStatus,
  selectGeneralBusinessPostingGroups,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/GeneralSetup/Posting/GeneralBusinessPostingGroup";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchGeneralBusinessPostingGroups,
  addGeneralBusinessPostingGroup,
  editStatus,
  editGeneralBusinessPostingGroup,
  deleteStatus,
  deleteGeneralBusinessPostingGroup,
  postingGroups,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    setFetchLock(false);
    fetchGeneralBusinessPostingGroups();
  }, [fetchGeneralBusinessPostingGroups, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching General Posting Groups");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added General Posting Group");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited General Posting Group");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted General Posting Group");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addGeneralBusinessPostingGroup = (data) => {
    setAddLock(false);
    const requestBody = {
      name: data.name ? data.name : "",
    };

    addGeneralBusinessPostingGroup(requestBody);
  };

  const _editGeneralBusinessPostingGroup = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id ? data.id : "",
      name: data.name ? data.name : "",
    };

    editGeneralBusinessPostingGroup(requestBody);
  };

  const _deleteGeneralBusinessPostingGroup = (id) => {
    setDeleteLock(false);
    deleteGeneralBusinessPostingGroup(id);
  };

  console.log("logs", postingGroups);
  return (
    <GeneralPostingGroup
      postingGroups={postingGroups}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addGeneralBusinessPostingGroup={_addGeneralBusinessPostingGroup}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editGeneralBusinessPostingGroup={_editGeneralBusinessPostingGroup}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteGeneralBusinessPostingGroup={_deleteGeneralBusinessPostingGroup}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  postingGroups: selectGeneralBusinessPostingGroups(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchGeneralBusinessPostingGroups: () => dispatch(Fetch()),
  addGeneralBusinessPostingGroup: (data) => dispatch(Add(data)),
  editGeneralBusinessPostingGroup: (data) => dispatch(Edit(data)),
  deleteGeneralBusinessPostingGroup: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
