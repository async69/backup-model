import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "../../api";

const slice = createSlice({
  name: "purchaseInvoices",
  initialState: {
    list: [],
    loading: false,
    status: "initial",
    errors: null,
  },
  reducers: {
    purchaseInvoicesRequested: (purchaseInvoices, action) => {
      purchaseInvoices.loading = true;
    },
    purchaseInvoicesReceived: (purchaseInvoices, action) => {
      purchaseInvoices.list = action.payload.results;
      purchaseInvoices.loading = false;
    },
    purchaseInvoicesRequestFailed: (purchaseInvoices, action) => {
      purchaseInvoices.loading = false;
      purchaseInvoices.errors = action.payload;
      purchaseInvoices.status = "failed";
    },
    PurchaseInvoiceUpdated: (purchaseInvoices, action) => {
      purchaseInvoices.loading = false;
      purchaseInvoices.status = "success";
      let index = purchaseInvoices.list.findIndex(
        (PurchaseInvoice) => PurchaseInvoice.id === action.payload.id
      );
      purchaseInvoices.list[index] = action.payload;
    },
    PurchaseInvoiceAdded: (purchaseInvoices, action) => {
      purchaseInvoices.list.push(action.payload);
      purchaseInvoices.loading = false;
      purchaseInvoices.status = "success";
    },
    purchaseInvoicesErrorsAndStatusReseted: (purchaseInvoices, action) => {
      purchaseInvoices.errors = null;
      purchaseInvoices.status = "initial";
    },
    PurchaseInvoiceRemoved: (purchaseInvoices, action) => {
      purchaseInvoices.loading = false;
      purchaseInvoices.status = "success";
      let index = purchaseInvoices.list.findIndex(
        (PurchaseInvoice) => PurchaseInvoice.id === action.payload.id
      );
      purchaseInvoices.list.splice(index, 1);
    },
    purchaseInvoicePosted: (purchaseInvoices, action) => {
      purchaseInvoices.loading = false;
      purchaseInvoices.status = "success";
      let index = purchaseInvoices.list.findIndex(
        (purchaseInvoice) => purchaseInvoice.id === action.payload.id
      );
      purchaseInvoices.list[index] = action.payload;
    },
  },
});

const {
  purchaseInvoicesRequested,
  purchaseInvoicesReceived,
  purchaseInvoicesRequestFailed,
  PurchaseInvoiceUpdated,
  PurchaseInvoiceAdded,
  purchaseInvoicesErrorsAndStatusReseted,
  PurchaseInvoiceRemoved,
  purchaseInvoicePosted,
} = slice.actions;
export default slice.reducer;

const url = "/purchase-invoices";

export const loadPurchaseInvoices = () =>
  apiCallBegan({
    url,
    onStart: purchaseInvoicesRequested.type,
    onSuccess: purchaseInvoicesReceived.type,
    onError: purchaseInvoicesRequestFailed.type,
  });

export const updatePurchaseInvoice = (PurchaseInvoice, partial = false) => {
  const body = { ...PurchaseInvoice };
  console.log("asste category update body", body);
  delete body.id;
  return apiCallBegan({
    url: url + "/" + PurchaseInvoice.id,
    method: partial ? "patch" : "put",
    data: body,
    onStart: purchaseInvoicesRequested.type,
    onSuccess: PurchaseInvoiceUpdated.type,
    onError: purchaseInvoicesRequestFailed.type,
  });
};

export const postPurchaseInvoice = (sivId, body) =>
  apiCallBegan({
    url: url + sivId + "/change_status/",
    method: "post",
    data: body,
    onStart: purchaseInvoicesRequested.type,
    onSuccess: purchaseInvoicePosted.type,
    onError: purchaseInvoicesRequestFailed.type,
  });

export const addPurchaseInvoice = (PurchaseInvoice) =>
  apiCallBegan({
    url,
    method: "post",
    data: PurchaseInvoice,
    onStart: purchaseInvoicesRequested.type,
    onSuccess: PurchaseInvoiceAdded.type,
    onError: purchaseInvoicesRequestFailed.type,
  });

export const removePurchaseInvoice = (PurchaseInvoice) =>
  apiCallBegan({
    url: url + "/" + PurchaseInvoice.id,
    method: "delete",
    onStart: purchaseInvoicesRequested.type,
    onSuccess: PurchaseInvoiceRemoved.type,
    onError: purchaseInvoicesRequestFailed.type,
  });
export const resetErrorsAndStatus = () =>
  purchaseInvoicesErrorsAndStatusReseted();

export const getPurchaseInvoices = createSelector(
  (state) => state.entities.purchaseInvoices,
  (purchaseInvoices) => purchaseInvoices.list
);

export const getStatus = createSelector(
  (state) => state.entities.purchaseInvoices,
  (purchaseInvoices) => purchaseInvoices.status
);

export const getErrors = createSelector(
  (state) => state.entities.purchaseInvoices,
  (purchaseInvoices) => purchaseInvoices.errors
);

export const getLoading = createSelector(
  (state) => state.entities.purchaseInvoices,
  (purchaseInvoices) => purchaseInvoices.loading
);
