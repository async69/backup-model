import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "../api";
import endpoints from "../../config/endPoints";

const slice = createSlice({
  name: "salesOrders",
  initialState: {
    list: [],
    loading: false,
    status: "initial",
    errors: null,
  },
  reducers: {
    salesOrdersRequested: (salesOrders, action) => {
      salesOrders.loading = true;
    },
    salesOrdersReceived: (salesOrders, action) => {
      salesOrders.list = action.payload;
      salesOrders.loading = false;
    },
    salesOrdersRequestFailed: (salesOrders, action) => {
      salesOrders.loading = false;
      salesOrders.errors = action.payload;
      salesOrders.status = "failed";
    },
    SalesOrderUpdated: (salesOrders, action) => {
      salesOrders.loading = false;
      salesOrders.status = "success";
      let index = salesOrders.list.findIndex(
        (SalesOrder) => SalesOrder.id === action.payload.id
      );
      salesOrders.list[index] = action.payload;
    },
    SalesOrderAdded: (salesOrders, action) => {
      salesOrders.list.push(action.payload);
      salesOrders.loading = false;
      salesOrders.status = "success";
    },
    salesOrdersErrorsAndStatusReseted: (salesOrders, action) => {
      salesOrders.errors = null;
      salesOrders.status = "initial";
    },
    SalesOrderRemoved: (salesOrders, action) => {
      salesOrders.loading = false;
      salesOrders.status = "success";
      let index = salesOrders.list.findIndex(
        (SalesOrder) => SalesOrder.id === action.payload.id
      );
      salesOrders.list.splice(index, 1);
    },
  },
});

const {
  salesOrdersRequested,
  salesOrdersReceived,
  salesOrdersRequestFailed,
  SalesOrderUpdated,
  SalesOrderAdded,
  salesOrdersErrorsAndStatusReseted,
  SalesOrderRemoved,
} = slice.actions;
export default slice.reducer;

const url = endpoints.mocks.salesOrders;

export const loadSalesOrders = () =>
  apiCallBegan({
    url,
    onStart: salesOrdersRequested.type,
    onSuccess: salesOrdersReceived.type,
    onError: salesOrdersRequestFailed.type,
  });

export const updateSalesOrder = (SalesOrder) => {
  const body = { ...SalesOrder };
  console.log("asste category update body", body);
  delete body.id;
  return apiCallBegan({
    url: url + "/" + SalesOrder.id + "/",
    method: "put",
    data: body,
    onStart: salesOrdersRequested.type,
    onSuccess: SalesOrderUpdated.type,
    onError: salesOrdersRequestFailed.type,
  });
};

export const addSalesOrder = (SalesOrder) =>
  apiCallBegan({
    url,
    method: "post",
    data: SalesOrder,
    onStart: salesOrdersRequested.type,
    onSuccess: SalesOrderAdded.type,
    onError: salesOrdersRequestFailed.type,
  });

export const removeSalesOrder = (SalesOrder) =>
  apiCallBegan({
    url: url + "/" + SalesOrder.id + "/",
    method: "delete",
    onStart: salesOrdersRequested.type,
    onSuccess: SalesOrderRemoved.type,
    onError: salesOrdersRequestFailed.type,
  });
export const resetErrorsAndStatus = () =>
  salesOrdersErrorsAndStatusReseted();

export const getSalesOrders = createSelector(
  (state) => state.entities.salesOrders,
  (salesOrders) => salesOrders.list
);

export const getStatus = createSelector(
  (state) => state.entities.salesOrders,
  (salesOrders) => salesOrders.status
);

export const getErrors = createSelector(
  (state) => state.entities.salesOrders,
  (salesOrders) => salesOrders.errors
);

export const getLoading = createSelector(
  (state) => state.entities.salesOrders,
  (salesOrders) => salesOrders.loading
);
