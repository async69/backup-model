import React, { useState, useEffect } from "react";
import {
  selectFetchStatus,
  selectAddStatus,
  selectPurchasers,
  fetchPurchasers,
  addPurchaser,
} from "../../../../store/Purchase/Purchasers";
import Purchaser from "./Purchaser";
import { toast } from "react-toastify";
import customStatus from "../../../../config/customStatus";
import { connect } from "react-redux";

const Loader = ({
  fetchStatus,
  addStatus,
  purchasers,
  fetchPurchasers,
  addPurchaser,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);

  useEffect(() => {
    setFetchLock(false);
    fetchPurchasers();
  }, [fetchPurchasers, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === customStatus.failed && !fetchLock) {
      toast.error("Failed fetching purchasers");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === customStatus.failed && !addLock) {
      setAddLock(true);
    } else if (status === customStatus.success && !addLock) {
      toast.success("Added Purchaser");
      setAddLock(true);
    }
  }, [addStatus, setAddLock]);

  const _addPurchaser = (data) => {
    setAddLock(false);
    const requestBody = {
      ...data,
    };

    addPurchaser(JSON.stringify(requestBody));
  };

  return (
    <Purchaser
      purchasers={purchasers}
      doneAdd={addStatus.status === customStatus.success && !addLock}
      addPurchaser={_addPurchaser}
    />
  );
};

const mapperAddStatus = () => {
  return {
    loading: false,
    status: customStatus.success,
    errors: null,
  };
};

const mapperFetchStatus = () => {
  return {
    loading: false,
    status: customStatus.success,
    errors: null,
  };
};

const mapperData = () => [];

const mapperAdd = () => {
  console.log("added");
};

const mapperFetch = () => {
  console.log("fetched");
};

const mapStateToProps = (state) => ({
  fetchStatus: mapperFetchStatus(selectFetchStatus(state)),
  addStatus: mapperAddStatus(selectAddStatus(state)),
  purchasers: mapperData(selectPurchasers(state)),
});

export const mapDispatchToProps = (dispatch) => ({
  fetchPurchasers: () => mapperFetch(dispatch(fetchPurchasers())),
  addPurchaser: (data) => mapperAdd(dispatch(addPurchaser(data))),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
