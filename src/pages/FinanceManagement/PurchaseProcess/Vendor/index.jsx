import React, { useState, useEffect } from "react";
import Vendor from "./Vendor";
import {
  selectFetchStatus,
  selectAddStatus,
  selectVendors,
  Fetch,
  Add,
  selectEditStatus,
  Edit,
  selectDeleteStatus,
  Remove,
} from "../../../../store/Finance/PurchaseProcess/Vendors";
import { selectCurrencies } from "../../../../store/GeneralSetup/Currencies";
import { selectVATPostingGroups } from "../../../../store/GeneralSetup/Posting/VAT_Posting_Group";
import { selectVendorPostingGroup } from "../../../../store/GeneralSetup/Posting/Vendor_Posting_Group";
import { selectGeneralBusinessPostingGroups } from "../../../../store/GeneralSetup/Posting/GeneralBusinessPostingGroup";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../../constants/reduxStatus";

const Loader = ({
  fetchStatus,
  addStatus,
  vendors,
  fetchVendors,
  addVendor,
  editStatus,
  editVendor,
  deleteStatus,
  deleteVendor,
  currencies,
  VAT_Posting_Groups,
  Vendor_Posting_Groups,
  General_Business_Posting_Groups,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);
  useEffect(() => {
    setFetchLock(false);
    fetchVendors();
  }, [fetchVendors, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed Fetching Vendors");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Vendor");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Vendor");
      setEditLock(true);
    }
  }, [editStatus, setEditLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Vendor");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock]);

  const _addVendor = (data) => {
    setAddLock(false);
    const requestBody = {
      ...data,
    };

    addVendor(requestBody);
  };

  const _editVendor = (data) => {
    setEditLock(false);
    const requestBody = {
      ...data,
    };

    editVendor(requestBody);
  };

  const _deleteVendor = (id) => {
    setDeleteLock(false);
    deleteVendor(id);
  };

  return (
    <Vendor
      vendors={vendors}
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addVendor={_addVendor}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editVendor={_editVendor}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteVendor={_deleteVendor}
      currencies={currencies}
      VAT_Posting_Groups={VAT_Posting_Groups}
      Vendor_Posting_Groups={Vendor_Posting_Groups}
      General_Business_Posting_Groups={General_Business_Posting_Groups}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  vendors: selectVendors(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  currencies: selectCurrencies(state),
  VAT_Posting_Groups: selectVATPostingGroups(state),
  Vendor_Posting_Groups: selectVendorPostingGroup(state),
  General_Business_Posting_Groups: selectGeneralBusinessPostingGroups(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchVendors: () => dispatch(Fetch()),
  addVendor: (data) => dispatch(Add(data)),
  editVendor: (data) => dispatch(Edit(data)),
  deleteVendor: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
