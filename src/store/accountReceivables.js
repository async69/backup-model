import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import endPoints from "../config/endPoints";

const slice = createSlice({
  name: "accountReceivables",
  initialState: {
    list: [],
    loading: false,
    status: "initial",
    errors: null,
  },
  reducers: {
    accountReceivablesRequested: (accountReceivables, action) => {
      accountReceivables.loading = true;
    },
    accountReceivablesReceived: (accountReceivables, action) => {
      accountReceivables.list = action.payload;
      accountReceivables.loading = false;
    },
    accountReceivablesRequestFailed: (accountReceivables, action) => {
      accountReceivables.loading = false;
      accountReceivables.errors = action.payload;
      accountReceivables.status = "failed";
    },
  },
});
const {
  accountReceivablesRequested,
  accountReceivablesReceived,
  accountReceivablesRequestFailed,
} = slice.actions;
export default slice.reducer;

export const loadAccountReceivables = () =>
  apiCallBegan({
    url: endPoints.mocks.accountReceivable,
    onStart: accountReceivablesRequested.type,
    onSuccess: accountReceivablesReceived.type,
    onError: accountReceivablesRequestFailed.type,
  });

export const getCustomerBalanceSummary = createSelector(
  (state) => state.entities.accountReceivables,
  (accountReceivables) =>
    accountReceivables.list.map(
      (accountPayable) => accountPayable.customer_balance_summary
    )
);

export const getOrdersAwaitingPayment = createSelector(
  (state) => state.entities.accountReceivables,
  (accountReceivables) =>
    accountReceivables.list.map(
      (accountPayable) => accountPayable.orders_awaiting_payment
    )
);

export const getSuppliesAwaitingPayment = createSelector(
  (state) => state.entities.accountReceivables,
  (accountReceivables) =>
    accountReceivables.list.map(
      (accountPayable) => accountPayable.supplies_awaiting_payment
    )
);
