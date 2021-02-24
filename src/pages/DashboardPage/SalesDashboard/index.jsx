import React, { useState, useEffect } from "react";
import SalesDashboard from "./SalesDashboard";
import {
  selectFetchStatus,
  selectSalesOrders,
  Fetch,
  Add,
  Edit,
  Patch,
  Remove,
} from "../../../store/Sales/Common/SalesOrder/";
import {
  selectCustomers,
  Fetch as fetchCustomers,
} from "../../../store/Sales/MasterData/Customer";
import {
  selectSalesRegions,
  Fetch as fetchSalesRegions,
} from "../../../store/Sales/Setup/SalesRegion/";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { reduxStatus } from "../../../constants/reduxStatus";

const Loader = ({
  fetchStatus,
  salesOrders,
  fetchSalesOrders,
  salesRegions,
  customers,
}) => {
  const [fetchLock, setFetchLock] = useState(true);
  useEffect(() => {
    setFetchLock(false);
    fetchSalesOrders();
    fetchCustomers();
    fetchSalesRegions();
  }, [fetchSalesOrders, setFetchLock, fetchCustomers]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Sales Orders");
      setFetchLock(false);
    } else {
    }
  }, [fetchStatus, setFetchLock]);

  return (
    <SalesDashboard
      salesOrders={salesOrders}
      salesRegions={salesRegions}
      customers={customers}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchStatus: selectFetchStatus(state),
  salesOrders: selectSalesOrders(state),
  salesRegions: selectSalesRegions(state),
  customers: selectCustomers(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchSalesOrders: (data = null) => dispatch(Fetch(data)),
  addSalesOrder: (data) => dispatch(Add(data)),
  editSalesOrder: (data) => dispatch(Edit(data)),
  patchSalesOrder: (data) => dispatch(Patch(data)),
  deleteSalesOrder: (id) => dispatch(Remove(id)),
  fetchCustomers: () => dispatch(fetchCustomers()),
  fetchSalesRegions: () => dispatch(fetchSalesRegions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
