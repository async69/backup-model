import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "../api";

const slice = createSlice({
  name: "transferOrderReceives",
  initialState: {
    list: [],
    loading: false,
    status: "initial",
    errors: null,
  },
  reducers: {
    transferOrderReceivesRequested: (transferOrderReceives, action) => {
      transferOrderReceives.loading = true;
    },
    transferOrderReceivesReceived: (transferOrderReceives, action) => {
      transferOrderReceives.list = action.payload.results;
      transferOrderReceives.loading = false;
    },
    transferOrderReceivesRequestFailed: (transferOrderReceives, action) => {
      transferOrderReceives.loading = false;
      transferOrderReceives.errors = action.payload;
      transferOrderReceives.status = "failed";
    },
    TransferOrderReceiveUpdated: (transferOrderReceives, action) => {
      transferOrderReceives.loading = false;
      transferOrderReceives.status = "success";
      let index = transferOrderReceives.list.findIndex(
        (TransferOrderReceive) => TransferOrderReceive.id === action.payload.id
      );
      transferOrderReceives.list[index] = action.payload;
    },
    TransferOrderReceiveAdded: (transferOrderReceives, action) => {
      transferOrderReceives.list.push(action.payload);
      transferOrderReceives.loading = false;
      transferOrderReceives.status = "success";
    },
    transferOrderReceivesErrorsAndStatusReseted: (
      transferOrderReceives,
      action
    ) => {
      transferOrderReceives.errors = null;
      transferOrderReceives.status = "initial";
    },
    TransferOrderReceiveRemoved: (transferOrderReceives, action) => {
      transferOrderReceives.loading = false;
      transferOrderReceives.status = "success";
      let index = transferOrderReceives.list.findIndex(
        (TransferOrderReceive) => TransferOrderReceive.id === action.payload.id
      );
      transferOrderReceives.list.splice(index, 1);
    },
    transferOrderReceivePosted: (transferOrderReceives, action) => {
      transferOrderReceives.loading = false;
      transferOrderReceives.status = "success";
      let index = transferOrderReceives.list.findIndex(
        (transferOrderReceive) => transferOrderReceive.id === action.payload.id
      );
      transferOrderReceives.list[index] = action.payload;
    },
  },
});

const {
  transferOrderReceivesRequested,
  transferOrderReceivesReceived,
  transferOrderReceivesRequestFailed,
  TransferOrderReceiveUpdated,
  TransferOrderReceiveAdded,
  transferOrderReceivesErrorsAndStatusReseted,
  TransferOrderReceiveRemoved,
  transferOrderReceivePosted,
} = slice.actions;
export default slice.reducer;

const url = "/inventory/common/transfer-order-receive/";

export const loadTransferOrderReceives = () =>
  apiCallBegan({
    url,
    onStart: transferOrderReceivesRequested.type,
    onSuccess: transferOrderReceivesReceived.type,
    onError: transferOrderReceivesRequestFailed.type,
  });

export const updateTransferOrderReceive = (TransferOrderReceive) => {
  const body = { ...TransferOrderReceive };
  console.log("asste category update body", body);
  delete body.id;
  return apiCallBegan({
    url: url + TransferOrderReceive.id + "/",
    method: "put",
    data: body,
    onStart: transferOrderReceivesRequested.type,
    onSuccess: TransferOrderReceiveUpdated.type,
    onError: transferOrderReceivesRequestFailed.type,
  });
};

export const postTransferOrderReceive = (sivId, body) =>
  apiCallBegan({
    url: url + sivId + "/change_status/",
    method: "post",
    data: body,
    onStart: transferOrderReceivesRequested.type,
    onSuccess: transferOrderReceivePosted.type,
    onError: transferOrderReceivesRequestFailed.type,
  });

export const addTransferOrderReceive = (TransferOrderReceive) =>
  apiCallBegan({
    url,
    method: "post",
    data: TransferOrderReceive,
    onStart: transferOrderReceivesRequested.type,
    onSuccess: TransferOrderReceiveAdded.type,
    onError: transferOrderReceivesRequestFailed.type,
  });

export const removeTransferOrderReceive = (TransferOrderReceive) =>
  apiCallBegan({
    url: url + TransferOrderReceive.id + "/",
    method: "delete",
    onStart: transferOrderReceivesRequested.type,
    onSuccess: TransferOrderReceiveRemoved.type,
    onError: transferOrderReceivesRequestFailed.type,
  });
export const resetErrorsAndStatus = () =>
  transferOrderReceivesErrorsAndStatusReseted();

export const getTransferOrderReceives = createSelector(
  (state) => state.entities.transferOrderReceives,
  (transferOrderReceives) => transferOrderReceives.list
);

export const getStatus = createSelector(
  (state) => state.entities.transferOrderReceives,
  (transferOrderReceives) => transferOrderReceives.status
);

export const getErrors = createSelector(
  (state) => state.entities.transferOrderReceives,
  (transferOrderReceives) => transferOrderReceives.errors
);

export const getLoading = createSelector(
  (state) => state.entities.transferOrderReceives,
  (transferOrderReceives) => transferOrderReceives.loading
);
