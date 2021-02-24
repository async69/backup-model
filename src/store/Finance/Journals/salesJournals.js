import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "../../api";

const slice = createSlice({
  name: "salesJournals",
  initialState: {
    list: [],
    loading: false,
    status: "initial",
    errors: null,
  },
  reducers: {
    salesJournalsRequested: (salesJournals, action) => {
      salesJournals.loading = true;
    },
    salesJournalsReceived: (salesJournals, action) => {
      salesJournals.list = action.payload.results;
      salesJournals.loading = false;
    },
    salesJournalsRequestFailed: (salesJournals, action) => {
      salesJournals.loading = false;
      salesJournals.errors = action.payload;
      salesJournals.status = "failed";
    },
    SalesJournalUpdated: (salesJournals, action) => {
      salesJournals.loading = false;
      salesJournals.status = "success";
      let index = salesJournals.list.findIndex(
        (SalesJournal) => SalesJournal.id === action.payload.id
      );
      salesJournals.list[index] = action.payload;
    },
    SalesJournalAdded: (salesJournals, action) => {
      salesJournals.list.push(action.payload);
      salesJournals.loading = false;
      salesJournals.status = "success";
    },
    salesJournalsErrorsAndStatusReseted: (
      salesJournals,
      action
    ) => {
      salesJournals.errors = null;
      salesJournals.status = "initial";
    },
    SalesJournalRemoved: (salesJournals, action) => {
      salesJournals.loading = false;
      salesJournals.status = "success";
      let index = salesJournals.list.findIndex(
        (SalesJournal) => SalesJournal.id === action.payload.id
      );
      salesJournals.list.splice(index, 1);
    },
    salesJournalPosted: (salesJournals, action) => {
      salesJournals.loading = false;
      salesJournals.status = "success";
      let index = salesJournals.list.findIndex(
        (salesJournal) => salesJournal.id === action.payload.id
      );
      salesJournals.list[index] = action.payload;
    },
  },
});

const {
  salesJournalsRequested,
  salesJournalsReceived,
  salesJournalsRequestFailed,
  SalesJournalUpdated,
  SalesJournalAdded,
  salesJournalsErrorsAndStatusReseted,
  SalesJournalRemoved,
  salesJournalPosted,
} = slice.actions;
export default slice.reducer;

const url = "/sales-journals";

export const loadSalesJournals = () =>
  apiCallBegan({
    url,
    onStart: salesJournalsRequested.type,
    onSuccess: salesJournalsReceived.type,
    onError: salesJournalsRequestFailed.type,
  });

export const updateSalesJournal = (SalesJournal) => {
  const body = { ...SalesJournal };
  console.log("asste category update body", body);
  delete body.id;
  return apiCallBegan({
    url: url + SalesJournal.id + "/",
    method: "put",
    data: body,
    onStart: salesJournalsRequested.type,
    onSuccess: SalesJournalUpdated.type,
    onError: salesJournalsRequestFailed.type,
  });
};

export const postSalesJournal = (sivId, body) =>
  apiCallBegan({
    url: url + sivId + "/change_status/",
    method: "post",
    data: body,
    onStart: salesJournalsRequested.type,
    onSuccess: salesJournalPosted.type,
    onError: salesJournalsRequestFailed.type,
  });

export const addSalesJournal = (SalesJournal) =>
  apiCallBegan({
    url,
    method: "post",
    data: SalesJournal,
    onStart: salesJournalsRequested.type,
    onSuccess: SalesJournalAdded.type,
    onError: salesJournalsRequestFailed.type,
  });

export const removeSalesJournal = (SalesJournal) =>
  apiCallBegan({
    url: url + SalesJournal.id + "/",
    method: "delete",
    onStart: salesJournalsRequested.type,
    onSuccess: SalesJournalRemoved.type,
    onError: salesJournalsRequestFailed.type,
  });
export const resetErrorsAndStatus = () =>
  salesJournalsErrorsAndStatusReseted();

export const getSalesJournals = createSelector(
  (state) => state.entities.salesJournals,
  (salesJournals) => salesJournals.list
);

export const getStatus = createSelector(
  (state) => state.entities.salesJournals,
  (salesJournals) => salesJournals.status
);

export const getErrors = createSelector(
  (state) => state.entities.salesJournals,
  (salesJournals) => salesJournals.errors
);

export const getLoading = createSelector(
  (state) => state.entities.salesJournals,
  (salesJournals) => salesJournals.loading
);
