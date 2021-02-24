import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "../api";

const slice = createSlice({
  name: "purchaseReturns",
  initialState: {
    list: [],
    loading: false,
    status: "initial",
    errors: null,
  },
  reducers: {
    purchaseReturnsRequested: (purchaseReturns, action) => {
      purchaseReturns.loading = true;
    },
    purchaseReturnsReceived: (purchaseReturns, action) => {
      purchaseReturns.list = action.payload.results;
      purchaseReturns.loading = false;
    },
    purchaseReturnsRequestFailed: (purchaseReturns, action) => {
      purchaseReturns.loading = false;
      purchaseReturns.errors = action.payload;
      purchaseReturns.status = "failed";
    },
    PurchaseReturnUpdated: (purchaseReturns, action) => {
      purchaseReturns.loading = false;
      purchaseReturns.status = "success";
      let index = purchaseReturns.list.findIndex(
        (PurchaseReturn) => PurchaseReturn.id === action.payload.id
      );
      purchaseReturns.list[index] = action.payload;
    },
    PurchaseReturnAdded: (purchaseReturns, action) => {
      purchaseReturns.list.push(action.payload);
      purchaseReturns.loading = false;
      purchaseReturns.status = "success";
    },
    purchaseReturnsErrorsAndStatusReseted: (purchaseReturns, action) => {
      purchaseReturns.errors = null;
      purchaseReturns.status = "initial";
    },
    PurchaseReturnRemoved: (purchaseReturns, action) => {
      purchaseReturns.loading = false;
      purchaseReturns.status = "success";
      let index = purchaseReturns.list.findIndex(
        (PurchaseReturn) => PurchaseReturn.id === action.payload.id
      );
      purchaseReturns.list.splice(index, 1);
    },
    purchaseReturnPosted: (purchaseReturns, action) => {
      purchaseReturns.loading = false;
      purchaseReturns.status = "success";
      let index = purchaseReturns.list.findIndex(
        (purchaseReturn) => purchaseReturn.id === action.payload.id
      );
      purchaseReturns.list[index] = action.payload;
    },
  },
});

const {
  purchaseReturnsRequested,
  purchaseReturnsReceived,
  purchaseReturnsRequestFailed,
  PurchaseReturnUpdated,
  PurchaseReturnAdded,
  purchaseReturnsErrorsAndStatusReseted,
  PurchaseReturnRemoved,
  purchaseReturnPosted,
} = slice.actions;
export default slice.reducer;

const url = "/inventory/common/purchase-return/";

export const loadPurchaseReturns = () =>
  apiCallBegan({
    url,
    onStart: purchaseReturnsRequested.type,
    onSuccess: purchaseReturnsReceived.type,
    onError: purchaseReturnsRequestFailed.type,
  });

export const updatePurchaseReturn = (PurchaseReturn) => {
  const body = { ...PurchaseReturn };
  console.log("asste category update body", body);
  delete body.id;
  return apiCallBegan({
    url: url + PurchaseReturn.id + "/",
    method: "put",
    data: body,
    onStart: purchaseReturnsRequested.type,
    onSuccess: PurchaseReturnUpdated.type,
    onError: purchaseReturnsRequestFailed.type,
  });
};

export const postPurchaseReturn = (sivId, body) =>
  apiCallBegan({
    url: url + sivId + "/change_status/",
    method: "post",
    data: body,
    onStart: purchaseReturnsRequested.type,
    onSuccess: purchaseReturnPosted.type,
    onError: purchaseReturnsRequestFailed.type,
  });

export const addPurchaseReturn = (PurchaseReturn) =>
  apiCallBegan({
    url,
    method: "post",
    data: PurchaseReturn,
    onStart: purchaseReturnsRequested.type,
    onSuccess: PurchaseReturnAdded.type,
    onError: purchaseReturnsRequestFailed.type,
  });

export const removePurchaseReturn = (PurchaseReturn) =>
  apiCallBegan({
    url: url + PurchaseReturn.id + "/",
    method: "delete",
    onStart: purchaseReturnsRequested.type,
    onSuccess: PurchaseReturnRemoved.type,
    onError: purchaseReturnsRequestFailed.type,
  });
export const resetErrorsAndStatus = () =>
  purchaseReturnsErrorsAndStatusReseted();

export const getPurchaseReturns = createSelector(
  (state) => state.entities.purchaseReturns,
  (purchaseReturns) => purchaseReturns.list
);

export const getStatus = createSelector(
  (state) => state.entities.purchaseReturns,
  (purchaseReturns) => purchaseReturns.status
);

export const getErrors = createSelector(
  (state) => state.entities.purchaseReturns,
  (purchaseReturns) => purchaseReturns.errors
);

export const getLoading = createSelector(
  (state) => state.entities.purchaseReturns,
  (purchaseReturns) => purchaseReturns.loading
);
