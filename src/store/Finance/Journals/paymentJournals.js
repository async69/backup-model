import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "../../api";

const slice = createSlice({
  name: "paymentJournals",
  initialState: {
    list: [],
    loading: false,
    status: "initial",
    errors: null,
  },
  reducers: {
    paymentJournalsRequested: (paymentJournals, action) => {
      paymentJournals.loading = true;
    },
    paymentJournalsReceived: (paymentJournals, action) => {
      paymentJournals.list = action.payload.results;
      paymentJournals.loading = false;
    },
    paymentJournalsRequestFailed: (paymentJournals, action) => {
      paymentJournals.loading = false;
      paymentJournals.errors = action.payload;
      paymentJournals.status = "failed";
    },
    PaymentJournalUpdated: (paymentJournals, action) => {
      paymentJournals.loading = false;
      paymentJournals.status = "success";
      let index = paymentJournals.list.findIndex(
        (PaymentJournal) => PaymentJournal.id === action.payload.id
      );
      paymentJournals.list[index] = action.payload;
    },
    PaymentJournalAdded: (paymentJournals, action) => {
      paymentJournals.list.push(action.payload);
      paymentJournals.loading = false;
      paymentJournals.status = "success";
    },
    paymentJournalsErrorsAndStatusReseted: (paymentJournals, action) => {
      paymentJournals.errors = null;
      paymentJournals.status = "initial";
    },
    PaymentJournalRemoved: (paymentJournals, action) => {
      paymentJournals.loading = false;
      paymentJournals.status = "success";
      let index = paymentJournals.list.findIndex(
        (PaymentJournal) => PaymentJournal.id === action.payload.id
      );
      paymentJournals.list.splice(index, 1);
    },
    paymentJournalPosted: (paymentJournals, action) => {
      paymentJournals.loading = false;
      paymentJournals.status = "success";
      let index = paymentJournals.list.findIndex(
        (paymentJournal) => paymentJournal.id === action.payload.id
      );
      paymentJournals.list[index] = action.payload;
    },
  },
});

const {
  paymentJournalsRequested,
  paymentJournalsReceived,
  paymentJournalsRequestFailed,
  PaymentJournalUpdated,
  PaymentJournalAdded,
  paymentJournalsErrorsAndStatusReseted,
  PaymentJournalRemoved,
  paymentJournalPosted,
} = slice.actions;
export default slice.reducer;

const url = "/cash-payment-journals";

export const loadPaymentJournals = () =>
  apiCallBegan({
    url,
    onStart: paymentJournalsRequested.type,
    onSuccess: paymentJournalsReceived.type,
    onError: paymentJournalsRequestFailed.type,
  });

export const updatePaymentJournal = (PaymentJournal) => {
  const body = { ...PaymentJournal };
  console.log("asste category update body", body);
  delete body.id;
  return apiCallBegan({
    url: url + PaymentJournal.id + "/",
    method: "put",
    data: body,
    onStart: paymentJournalsRequested.type,
    onSuccess: PaymentJournalUpdated.type,
    onError: paymentJournalsRequestFailed.type,
  });
};

export const postPaymentJournal = (sivId, body) =>
  apiCallBegan({
    url: url + sivId + "/change_status/",
    method: "post",
    data: body,
    onStart: paymentJournalsRequested.type,
    onSuccess: paymentJournalPosted.type,
    onError: paymentJournalsRequestFailed.type,
  });

export const addPaymentJournal = (PaymentJournal) =>
  apiCallBegan({
    url,
    method: "post",
    data: PaymentJournal,
    onStart: paymentJournalsRequested.type,
    onSuccess: PaymentJournalAdded.type,
    onError: paymentJournalsRequestFailed.type,
  });

export const removePaymentJournal = (PaymentJournal) =>
  apiCallBegan({
    url: url + PaymentJournal.id + "/",
    method: "delete",
    onStart: paymentJournalsRequested.type,
    onSuccess: PaymentJournalRemoved.type,
    onError: paymentJournalsRequestFailed.type,
  });
export const resetErrorsAndStatus = () =>
  paymentJournalsErrorsAndStatusReseted();

export const getPaymentJournals = createSelector(
  (state) => state.entities.paymentJournals,
  (paymentJournals) => paymentJournals.list
);

export const getStatus = createSelector(
  (state) => state.entities.paymentJournals,
  (paymentJournals) => paymentJournals.status
);

export const getErrors = createSelector(
  (state) => state.entities.paymentJournals,
  (paymentJournals) => paymentJournals.errors
);

export const getLoading = createSelector(
  (state) => state.entities.paymentJournals,
  (paymentJournals) => paymentJournals.loading
);
