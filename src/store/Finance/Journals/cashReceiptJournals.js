import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "../../api";

const slice = createSlice({
  name: "cashReceiptJournals",
  initialState: {
    list: [],
    loading: false,
    status: "initial",
    errors: null,
  },
  reducers: {
    cashReceiptJournalsRequested: (cashReceiptJournals, action) => {
      cashReceiptJournals.loading = true;
    },
    cashReceiptJournalsReceived: (cashReceiptJournals, action) => {
      cashReceiptJournals.list = action.payload.results;
      cashReceiptJournals.loading = false;
    },
    cashReceiptJournalsRequestFailed: (cashReceiptJournals, action) => {
      cashReceiptJournals.loading = false;
      cashReceiptJournals.errors = action.payload;
      cashReceiptJournals.status = "failed";
    },
    CashReceiptJournalUpdated: (cashReceiptJournals, action) => {
      cashReceiptJournals.loading = false;
      cashReceiptJournals.status = "success";
      let index = cashReceiptJournals.list.findIndex(
        (CashReceiptJournal) => CashReceiptJournal.id === action.payload.id
      );
      cashReceiptJournals.list[index] = action.payload;
    },
    CashReceiptJournalAdded: (cashReceiptJournals, action) => {
      cashReceiptJournals.list.push(action.payload);
      cashReceiptJournals.loading = false;
      cashReceiptJournals.status = "success";
    },
    cashReceiptJournalsErrorsAndStatusReseted: (
      cashReceiptJournals,
      action
    ) => {
      cashReceiptJournals.errors = null;
      cashReceiptJournals.status = "initial";
    },
    CashReceiptJournalRemoved: (cashReceiptJournals, action) => {
      cashReceiptJournals.loading = false;
      cashReceiptJournals.status = "success";
      let index = cashReceiptJournals.list.findIndex(
        (CashReceiptJournal) => CashReceiptJournal.id === action.payload.id
      );
      cashReceiptJournals.list.splice(index, 1);
    },
    cashReceiptJournalPosted: (cashReceiptJournals, action) => {
      cashReceiptJournals.loading = false;
      cashReceiptJournals.status = "success";
      let index = cashReceiptJournals.list.findIndex(
        (cashReceiptJournal) => cashReceiptJournal.id === action.payload.id
      );
      cashReceiptJournals.list[index] = action.payload;
    },
  },
});

const {
  cashReceiptJournalsRequested,
  cashReceiptJournalsReceived,
  cashReceiptJournalsRequestFailed,
  CashReceiptJournalUpdated,
  CashReceiptJournalAdded,
  cashReceiptJournalsErrorsAndStatusReseted,
  CashReceiptJournalRemoved,
  cashReceiptJournalPosted,
} = slice.actions;
export default slice.reducer;

const url = "/cash-receipt-journals";

export const loadCashReceiptJournals = () =>
  apiCallBegan({
    url,
    onStart: cashReceiptJournalsRequested.type,
    onSuccess: cashReceiptJournalsReceived.type,
    onError: cashReceiptJournalsRequestFailed.type,
  });

export const updateCashReceiptJournal = (CashReceiptJournal) => {
  const body = { ...CashReceiptJournal };
  console.log("asste category update body", body);
  delete body.id;
  return apiCallBegan({
    url: url + CashReceiptJournal.id + "/",
    method: "put",
    data: body,
    onStart: cashReceiptJournalsRequested.type,
    onSuccess: CashReceiptJournalUpdated.type,
    onError: cashReceiptJournalsRequestFailed.type,
  });
};

export const postCashReceiptJournal = (sivId, body) =>
  apiCallBegan({
    url: url + sivId + "/change_status/",
    method: "post",
    data: body,
    onStart: cashReceiptJournalsRequested.type,
    onSuccess: cashReceiptJournalPosted.type,
    onError: cashReceiptJournalsRequestFailed.type,
  });

export const addCashReceiptJournal = (CashReceiptJournal) =>
  apiCallBegan({
    url,
    method: "post",
    data: CashReceiptJournal,
    onStart: cashReceiptJournalsRequested.type,
    onSuccess: CashReceiptJournalAdded.type,
    onError: cashReceiptJournalsRequestFailed.type,
  });

export const removeCashReceiptJournal = (CashReceiptJournal) =>
  apiCallBegan({
    url: url + CashReceiptJournal.id + "/",
    method: "delete",
    onStart: cashReceiptJournalsRequested.type,
    onSuccess: CashReceiptJournalRemoved.type,
    onError: cashReceiptJournalsRequestFailed.type,
  });
export const resetErrorsAndStatus = () =>
  cashReceiptJournalsErrorsAndStatusReseted();

export const getCashReceiptJournals = createSelector(
  (state) => state.entities.cashReceiptJournals,
  (cashReceiptJournals) => cashReceiptJournals.list
);

export const getStatus = createSelector(
  (state) => state.entities.cashReceiptJournals,
  (cashReceiptJournals) => cashReceiptJournals.status
);

export const getErrors = createSelector(
  (state) => state.entities.cashReceiptJournals,
  (cashReceiptJournals) => cashReceiptJournals.errors
);

export const getLoading = createSelector(
  (state) => state.entities.cashReceiptJournals,
  (cashReceiptJournals) => cashReceiptJournals.loading
);
