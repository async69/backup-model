import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import endPoints from "../config/endPoints";

const slice = createSlice({
  name: "accountPayables",
  initialState: {
    list: [],
    loading: false,
    status: "initial",
    errors: null,
  },
  reducers: {
    accountPayablesRequested: (accountPayables, action) => {
      accountPayables.loading = true;
    },
    accountPayablesReceived: (accountPayables, action) => {
      accountPayables.list = action.payload;
      accountPayables.loading = false;
    },
    accountPayablesRequestFailed: (accountPayables, action) => {
      accountPayables.loading = false;
      accountPayables.errors = action.payload;
      accountPayables.status = "failed";
    },
  },
});
const {
  accountPayablesRequested,
  accountPayablesReceived,
  accountPayablesRequestFailed,
} = slice.actions;
export default slice.reducer;

export const loadAccountPayables = () =>
  apiCallBegan({
    url: endPoints.mocks.accountPayable,
    onStart: accountPayablesRequested.type,
    onSuccess: accountPayablesReceived.type,
    onError: accountPayablesRequestFailed.type,
  });

export const getVendorBalanceSummary = createSelector(
  (state) => state.entities.accountPayables,
  (accountPayables) =>
    accountPayables.list.map(
      (accountPayable) => accountPayable.vendor_balance_summary
    )
);

export const getOrdersAwaitingPayment = createSelector(
  (state) => state.entities.accountPayables,
  (accountPayables) =>
    accountPayables.list.map(
      (accountPayable) => accountPayable.orders_awaiting_payment
    )
);

export const getSuppliesAwaitingPayment = createSelector(
  (state) => state.entities.accountPayables,
  (accountPayables) =>
    accountPayables.list.map(
      (accountPayable) => accountPayable.supplies_awaiting_payment
    )
);
