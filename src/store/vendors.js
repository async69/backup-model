import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import endPoints from "../config/endPoints";

const slice = createSlice({
  name: "vendors",
  initialState: {
    list: [],
    loading: false,
    status: "initial",
    errors: null,
  },
  reducers: {
    vendorsRequested: (vendors, action) => {
      vendors.loading = true;
    },
    vendorsReceived: (vendors, action) => {
      vendors.list = action.payload;
      vendors.loading = false;
    },
    vendorsRequestFailed: (vendors, action) => {
      vendors.loading = false;
      vendors.errors = action.payload;
      vendors.status = "failed";
    },
    vendorUpdated: (vendors, action) => {
      vendors.loading = false;
      vendors.status = "success";
      let index = vendors.list.findIndex(
        (vendor) => vendors.id === action.payload.id
      );
      vendors.list[index] = action.payload;
    },
    vendorErrorsAndStatusReseted: (vendors, action) => {
      vendors.errors = null;
      vendors.status = "initial";
    },
    vendorRemoved: (vendors, action) => {
      vendors.loading = false;
      vendors.status = "success";
      let index = vendors.list.findIndex(
        (vendor) => vendors.id === action.payload.id
      );
      vendors.list.splice(index, 1);
    },
  },
});
const {
  vendorsRequested,
  vendorsReceived,
  vendorsRequestFailed,
  vendorUpdated,
  vendorErrorsAndStatusReseted,
  vendorRemoved,
} = slice.actions;
export default slice.reducer;

//Action creators
// const url = "/vendors";

export const loadVendors = () =>
  apiCallBegan({
    url: endPoints.mocks.vendor,
    onStart: vendorsRequested.type,
    onSuccess: vendorsReceived.type,
    onError: vendorsRequestFailed.type,
  });

export const updateVendor = (vendor) => {
  const body = { ...vendor };
  delete body.id;
  return apiCallBegan({
    url: endPoints.mocks.vendor + "/" + vendor.id,
    method: "put",
    onStart: vendorsRequested.type,
    onSuccess: vendorUpdated.type,
    onError: vendorsRequestFailed.type,
  });
};

export const removeVendor = (vendor) =>
  apiCallBegan({
    url: endPoints.mocks.vendor + "/" + vendor.id,
    method: "delete",
    onStart: vendorsRequested.type,
    onSuccess: vendorRemoved.type,
    onError: vendorsRequestFailed.type,
  });

export const resetErrorsAndStatus = () => vendorErrorsAndStatusReseted();

export const getVendors = createSelector(
  (state) => state.entities.vendors,
  (vendors) => vendors.list
);

export const getStatus = createSelector(
  (state) => state.entities.vendors,
  (vendors) => vendors.status
);

export const getErrors = createSelector(
  (state) => state.entities.vendors,
  (vendors) => vendors.errors
);
