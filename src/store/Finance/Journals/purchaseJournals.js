import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "../../api";

const slice = createSlice({
  name: "purchaseJournals",
  initialState: {
    list: [],
    loading: false,
    status: "initial",
    errors: null,
  },
  reducers: {
    purchaseJournalsRequested: (purchaseJournals, action) => {
      purchaseJournals.loading = true;
    },
    purchaseJournalsReceived: (purchaseJournals, action) => {
      purchaseJournals.list = action.payload.results;
      purchaseJournals.loading = false;
    },
    purchaseJournalsRequestFailed: (purchaseJournals, action) => {
      purchaseJournals.loading = false;
      purchaseJournals.errors = action.payload;
      purchaseJournals.status = "failed";
    },
    PurchaseJournalUpdated: (purchaseJournals, action) => {
      purchaseJournals.loading = false;
      purchaseJournals.status = "success";
      let index = purchaseJournals.list.findIndex(
        (PurchaseJournal) => PurchaseJournal.id === action.payload.id
      );
      purchaseJournals.list[index] = action.payload;
    },
    PurchaseJournalAdded: (purchaseJournals, action) => {
      purchaseJournals.list.push(action.payload);
      purchaseJournals.loading = false;
      purchaseJournals.status = "success";
    },
    purchaseJournalsErrorsAndStatusReseted: (purchaseJournals, action) => {
      purchaseJournals.errors = null;
      purchaseJournals.status = "initial";
    },
    PurchaseJournalRemoved: (purchaseJournals, action) => {
      purchaseJournals.loading = false;
      purchaseJournals.status = "success";
      let index = purchaseJournals.list.findIndex(
        (PurchaseJournal) => PurchaseJournal.id === action.payload.id
      );
      purchaseJournals.list.splice(index, 1);
    },
    purchaseJournalPosted: (purchaseJournals, action) => {
      purchaseJournals.loading = false;
      purchaseJournals.status = "success";
      let index = purchaseJournals.list.findIndex(
        (purchaseJournal) => purchaseJournal.id === action.payload.id
      );
      purchaseJournals.list[index] = action.payload;
    },
  },
});

const {
  purchaseJournalsRequested,
  purchaseJournalsReceived,
  purchaseJournalsRequestFailed,
  PurchaseJournalUpdated,
  PurchaseJournalAdded,
  purchaseJournalsErrorsAndStatusReseted,
  PurchaseJournalRemoved,
  purchaseJournalPosted,
} = slice.actions;
export default slice.reducer;

const url = "/purchase-journals";

export const loadPurchaseJournals = () =>
  apiCallBegan({
    url,
    onStart: purchaseJournalsRequested.type,
    onSuccess: purchaseJournalsReceived.type,
    onError: purchaseJournalsRequestFailed.type,
  });

export const updatePurchaseJournal = (PurchaseJournal) => {
  const body = { ...PurchaseJournal };
  console.log("asste category update body", body);
  delete body.id;
  return apiCallBegan({
    url: url + PurchaseJournal.id + "/",
    method: "put",
    data: body,
    onStart: purchaseJournalsRequested.type,
    onSuccess: PurchaseJournalUpdated.type,
    onError: purchaseJournalsRequestFailed.type,
  });
};

export const postPurchaseJournal = (sivId, body) =>
  apiCallBegan({
    url: url + sivId + "/change_status/",
    method: "post",
    data: body,
    onStart: purchaseJournalsRequested.type,
    onSuccess: purchaseJournalPosted.type,
    onError: purchaseJournalsRequestFailed.type,
  });

export const addPurchaseJournal = (PurchaseJournal) =>
  apiCallBegan({
    url,
    method: "post",
    data: PurchaseJournal,
    onStart: purchaseJournalsRequested.type,
    onSuccess: PurchaseJournalAdded.type,
    onError: purchaseJournalsRequestFailed.type,
  });

export const removePurchaseJournal = (PurchaseJournal) =>
  apiCallBegan({
    url: url + PurchaseJournal.id + "/",
    method: "delete",
    onStart: purchaseJournalsRequested.type,
    onSuccess: PurchaseJournalRemoved.type,
    onError: purchaseJournalsRequestFailed.type,
  });
export const resetErrorsAndStatus = () =>
  purchaseJournalsErrorsAndStatusReseted();

export const getPurchaseJournals = createSelector(
  (state) => state.entities.purchaseJournals,
  (purchaseJournals) => purchaseJournals.list
);

export const getStatus = createSelector(
  (state) => state.entities.purchaseJournals,
  (purchaseJournals) => purchaseJournals.status
);

export const getErrors = createSelector(
  (state) => state.entities.purchaseJournals,
  (purchaseJournals) => purchaseJournals.errors
);

export const getLoading = createSelector(
  (state) => state.entities.purchaseJournals,
  (purchaseJournals) => purchaseJournals.loading
);
