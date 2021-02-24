import React, { useState, useEffect } from "react";
import WithholdingTax from "./WithholdingTax";
import {
  selectFetchStatus,
  selectAddStatus,
  selectWithHoldingTaxes,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Finance/Setup/WithholdingTax";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchWithholdingTaxes,
  addWithholdingTax,
  editStatus,
  editWithholdingTax,
  deleteStatus,
  deleteWithholdingTax,
  taxes,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    setFetchLock(false);
    fetchWithholdingTaxes();
  }, [fetchWithholdingTaxes, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching taxes");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Withholding Tax");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Withholding Tax");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Withholding Tax");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addWithholdingTax = (data) => {
    setAddLock(false);
    const requestBody = {
      item_type: data.item_type,
      min_amount: data.min_amount,
      max_amount: data.max_amount,
      withholding_value: data.withholding_value,
    };

    addWithholdingTax(requestBody);
  };

  const _editWithholdingTax = (data) => {
    setEditLock(false);
    const requestBody = {
      id: data.id ? data.id : "",
      item_type: data.item_type,
      min_amount: data.min_amount,
      max_amount: data.max_amount,
      withholding_value: data.withholding_value,
    };

    editWithholdingTax(requestBody);
  };

  const _deleteWithholdingTax = (id) => {
    setDeleteLock(false);
    deleteWithholdingTax(id);
  };
  return (
    <WithholdingTax
      taxes={taxes}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addWithholdingTax={_addWithholdingTax}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editWithholdingTax={_editWithholdingTax}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteWithholdingTax={_deleteWithholdingTax}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  taxes: selectWithHoldingTaxes(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchWithholdingTaxes: () => dispatch(Fetch()),
  addWithholdingTax: (data) => dispatch(Add(data)),
  editWithholdingTax: (data) => dispatch(Edit(data)),
  deleteWithholdingTax: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
