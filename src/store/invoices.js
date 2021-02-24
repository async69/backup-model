import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "invoices",
  initialState: {
    list: [],
    loading: false,
    status: "initial",
    errors: null,
  },
  reducers: {
    invoicesRequested: (invoices, action) => {
      invoices.loading = true;
    },
    invoicesReceived: (invoices, action) => {
      invoices.list = action.payload;
      invoices.loading = false;
    },
    invoicesRequestFailed: (invoices, action) => {
      invoices.loading = false;
      invoices.errors = action.payload;
      invoices.status = "failed";
    },
    invoiceUpdated: (invoices, action) => {
      invoices.loading = false;
      invoices.status = "success";
      let index = invoices.list.findIndex(
        (invoice) => invoices.id === action.payload.id
      );
      invoices.list[index] = action.payload;
    },
    invoiceAdded: (invoices, action) => {
      invoices.loading = false;
      invoices.status = "success";
      invoices.list.push(action.payload);
    },
    invoiceErrorsAndStatusReseted: (invoices, action) => {
      invoices.errors = null;
      invoices.status = "initial";
    },
    invoiceRemoved: (invoices, action) => {
      invoices.loading = false;
      invoices.status = "success";
      let index = invoices.list.findIndex(
        (invoice) => invoices.id === action.payload.id
      );
      invoices.list.splice(index, 1);
    },
  },
});
const {
  invoicesRequested,
  invoicesReceived,
  invoicesRequestFailed,
  invoiceUpdated,
  invoiceErrorsAndStatusReseted,
  invoiceRemoved,
  invoiceAdded,
} = slice.actions;
export default slice.reducer;

//Action creators
const url = "/invoices";

export const loadInvoices = () =>
  apiCallBegan({
    url,
    onStart: invoicesRequested.type,
    onSuccess: invoicesReceived.type,
    onError: invoicesRequestFailed.type,
  });

export const updateInvoice = (invoice) => {
  const body = { ...invoice };
  delete body.id;
  return apiCallBegan({
    url: url + "/" + invoice.id,
    method: "put",
    onStart: invoicesRequested.type,
    onSuccess: invoiceUpdated.type,
    onError: invoicesRequestFailed.type,
  });
};

export const addInvoice = (invoice) =>
  apiCallBegan({
    url,
    method: "post",
    data: invoice,
    onStart: invoicesRequested.type,
    onSuccess: invoiceAdded.type,
    onError: invoicesRequestFailed.type,
  });

export const removeInvoice = (invoice) =>
  apiCallBegan({
    url: url + "/" + invoice.id,
    method: "delete",
    onStart: invoicesRequested.type,
    onSuccess: invoiceRemoved.type,
    onError: invoicesRequestFailed.type,
  });

export const resetErrorsAndStatus = () => invoiceErrorsAndStatusReseted();

export const getCustomerInvoices = createSelector(
  (state) => state.entities.invoices,
  (invoices) =>
    invoices.list.map((invoice) => ({
      ...invoice,
      partner: { id: invoice.partner, name: "Partner Name" },
    }))
);

export const getSupplierInvoices = createSelector(
  (state) => state.entities.invoices,
  (invoices) =>
    invoices.list.map((invoice) => ({
      ...invoice,
      partner: { id: invoice.partner, name: "Partner Name" },
    }))
);

export const getStatus = createSelector(
  (state) => state.entities.invoices,
  (invoices) => invoices.status
);

export const getErrors = createSelector(
  (state) => state.entities.invoices,
  (invoices) => invoices.errors
);

export const getLoading = createSelector(
  (state) => state.entities.invoices,
  (invoices) => invoices.loading
);
