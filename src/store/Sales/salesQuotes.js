import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "../api";
import endpoints from "../../config/endPoints";

const slice = createSlice({
  name: "salesQuotes",
  initialState: {
    list: [],
    loading: false,
    status: "initial",
    errors: null,
  },
  reducers: {
    salesQuotesRequested: (salesQuotes, action) => {
      salesQuotes.loading = true;
    },
    salesQuotesReceived: (salesQuotes, action) => {
      salesQuotes.list = action.payload;
      salesQuotes.loading = false;
    },
    salesQuotesRequestFailed: (salesQuotes, action) => {
      salesQuotes.loading = false;
      salesQuotes.errors = action.payload;
      salesQuotes.status = "failed";
    },
    SalesQuoteUpdated: (salesQuotes, action) => {
      salesQuotes.loading = false;
      salesQuotes.status = "success";
      let index = salesQuotes.list.findIndex(
        (SalesQuote) => SalesQuote.id === action.payload.id
      );
      salesQuotes.list[index] = action.payload;
    },
    SalesQuoteAdded: (salesQuotes, action) => {
      salesQuotes.list.push(action.payload);
      salesQuotes.loading = false;
      salesQuotes.status = "success";
    },
    salesQuotesErrorsAndStatusReseted: (salesQuotes, action) => {
      salesQuotes.errors = null;
      salesQuotes.status = "initial";
    },
    SalesQuoteRemoved: (salesQuotes, action) => {
      salesQuotes.loading = false;
      salesQuotes.status = "success";
      let index = salesQuotes.list.findIndex(
        (SalesQuote) => SalesQuote.id === action.payload.id
      );
      salesQuotes.list.splice(index, 1);
    },
  },
});

const {
  salesQuotesRequested,
  salesQuotesReceived,
  salesQuotesRequestFailed,
  SalesQuoteUpdated,
  SalesQuoteAdded,
  salesQuotesErrorsAndStatusReseted,
  SalesQuoteRemoved,
} = slice.actions;
export default slice.reducer;

const url = endpoints.mocks.salesQuotes;

export const loadSalesQuotes = () =>
  apiCallBegan({
    url,
    onStart: salesQuotesRequested.type,
    onSuccess: salesQuotesReceived.type,
    onError: salesQuotesRequestFailed.type,
  });

export const updateSalesQuote = (SalesQuote) => {
  const body = { ...SalesQuote };
  console.log("asste category update body", body);
  delete body.id;
  return apiCallBegan({
    url: url + "/" + SalesQuote.id + "/",
    method: "put",
    data: body,
    onStart: salesQuotesRequested.type,
    onSuccess: SalesQuoteUpdated.type,
    onError: salesQuotesRequestFailed.type,
  });
};

export const addSalesQuote = (SalesQuote) =>
  apiCallBegan({
    url,
    method: "post",
    data: SalesQuote,
    onStart: salesQuotesRequested.type,
    onSuccess: SalesQuoteAdded.type,
    onError: salesQuotesRequestFailed.type,
  });

export const removeSalesQuote = (SalesQuote) =>
  apiCallBegan({
    url: url + "/" + SalesQuote.id + "/",
    method: "delete",
    onStart: salesQuotesRequested.type,
    onSuccess: SalesQuoteRemoved.type,
    onError: salesQuotesRequestFailed.type,
  });
export const resetErrorsAndStatus = () =>
  salesQuotesErrorsAndStatusReseted();

export const getSalesQuotes = createSelector(
  (state) => state.entities.salesQuotes,
  (salesQuotes) => salesQuotes.list
);

export const getStatus = createSelector(
  (state) => state.entities.salesQuotes,
  (salesQuotes) => salesQuotes.status
);

export const getErrors = createSelector(
  (state) => state.entities.salesQuotes,
  (salesQuotes) => salesQuotes.errors
);

export const getLoading = createSelector(
  (state) => state.entities.salesQuotes,
  (salesQuotes) => salesQuotes.loading
);
