import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "../../../api";

const slice = createSlice({
  name: "storeRequisitions",
  initialState: {
    list: [],
    loading: false,
    status: "initial",
    errors: null,
  },
  reducers: {
    storeRequisitionsRequested: (storeRequisitions, action) => {
      storeRequisitions.loading = true;
    },
    storeRequisitionsReceived: (storeRequisitions, action) => {
      console.log("store requestion recived reducer", action);
      storeRequisitions.list = action.payload;
      storeRequisitions.loading = false;
    },
    storeRequisitionsRequestFailed: (storeRequisitions, action) => {
      storeRequisitions.loading = false;
      storeRequisitions.errors = action.payload;
      storeRequisitions.status = "failed";
    },
    StoreRequisitionUpdated: (storeRequisitions, action) => {
      storeRequisitions.loading = false;
      storeRequisitions.status = "success";
      let index = storeRequisitions.list.findIndex(
        (StoreRequisition) => StoreRequisition.id === action.payload.id
      );
      storeRequisitions.list[index] = action.payload;
    },
    StoreRequisitionAdded: (storeRequisitions, action) => {
      storeRequisitions.list.push(action.payload);
      storeRequisitions.loading = false;
      storeRequisitions.status = "success";
    },
    storeRequisitionsErrorsAndStatusReseted: (storeRequisitions, action) => {
      storeRequisitions.errors = null;
      storeRequisitions.status = "initial";
    },
    StoreRequisitionRemoved: (storeRequisitions, action) => {
      storeRequisitions.loading = false;
      storeRequisitions.status = "success";
      let index = storeRequisitions.list.findIndex(
        (StoreRequisition) => StoreRequisition.id === action.payload.id
      );
      storeRequisitions.list.splice(index, 1);
    },
    storeRequisitionPosted: (storeRequisitions, action) => {
      storeRequisitions.loading = false;
      storeRequisitions.status = "success";
      let index = storeRequisitions.list.findIndex(
        (storeRequisition) => storeRequisition.id === action.payload.id
      );
      storeRequisitions.list[index] = action.payload;
    },
  },
});

const {
  storeRequisitionsRequested,
  storeRequisitionsReceived,
  storeRequisitionsRequestFailed,
  StoreRequisitionUpdated,
  StoreRequisitionAdded,
  storeRequisitionsErrorsAndStatusReseted,
  StoreRequisitionRemoved,
  storeRequisitionPosted,
} = slice.actions;
export default slice.reducer;

const url = "/store-requisitions";

export const loadStoreRequisitions = () =>
  apiCallBegan({
    url,
    onStart: storeRequisitionsRequested.type,
    onSuccess: storeRequisitionsReceived.type,
    onError: storeRequisitionsRequestFailed.type,
  });

export const updateStoreRequisition = (StoreRequisition, partial) => {
  const body = { ...StoreRequisition };
  console.log("asste category update body", body);
  delete body.id;
  return apiCallBegan({
    url: url + "/" + StoreRequisition.id,
    method: partial ? "patch" : "put",
    data: body,
    onStart: storeRequisitionsRequested.type,
    onSuccess: StoreRequisitionUpdated.type,
    onError: storeRequisitionsRequestFailed.type,
  });
};

export const postStoreRequisition = (srId, body) =>
  apiCallBegan({
    url: url + srId + "/change_status/",
    method: "post",
    data: body,
    onStart: storeRequisitionsRequested.type,
    onSuccess: storeRequisitionPosted.type,
    onError: storeRequisitionsRequestFailed.type,
  });

export const addStoreRequisition = (StoreRequisition) =>
  apiCallBegan({
    url,
    method: "post",
    data: StoreRequisition,
    onStart: storeRequisitionsRequested.type,
    onSuccess: StoreRequisitionAdded.type,
    onError: storeRequisitionsRequestFailed.type,
  });

export const removeStoreRequisition = (StoreRequisition) =>
  apiCallBegan({
    url: url + "/" + StoreRequisition.id,
    method: "delete",
    onStart: storeRequisitionsRequested.type,
    onSuccess: StoreRequisitionRemoved.type,
    onError: storeRequisitionsRequestFailed.type,
  });
export const resetErrorsAndStatus = () =>
  storeRequisitionsErrorsAndStatusReseted();

export const getStoreRequisitions = createSelector(
  (state) => state.entities.storeRequisitions,
  (storeRequisitions) => storeRequisitions.list
);

export const getStatus = createSelector(
  (state) => state.entities.storeRequisitions,
  (storeRequisitions) => storeRequisitions.status
);

export const getErrors = createSelector(
  (state) => state.entities.storeRequisitions,
  (storeRequisitions) => storeRequisitions.errors
);

export const getLoading = createSelector(
  (state) => state.entities.storeRequisitions,
  (storeRequisitions) => storeRequisitions.loading
);
