// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "../api";
import endpoints from "../../config/endPoints";

const slice = createSlice({
  name: "salesRegions",
  initialState: {
    list: [],
    loading: false,
    status: "initial",
    errors: null,
  },
  reducers: {
    salesRegionsRequested: (salesRegions, action) => {
      salesRegions.loading = true;
    },
    salesRegionsReceived: (salesRegions, action) => {
      salesRegions.list = action.payload;
      salesRegions.loading = false;
    },
    salesRegionsRequestFailed: (salesRegions, action) => {
      salesRegions.loading = false;
      salesRegions.errors = action.payload;
      salesRegions.status = "failed";
    },
    salesRegionUpdated: (salesRegions, action) => {
      salesRegions.loading = false;
      salesRegions.status = "success";
      let index = salesRegions.list.findIndex((salesRegion) => salesRegion.id === action.payload.id);
      salesRegions.list[index] = action.payload;
    },
    salesRegionAdded: (salesRegions, action) => {
      salesRegions.list.push(action.payload);
      salesRegions.loading = false;
      salesRegions.status = "success";
    },
    salesRegionsErrorsAndStatusReseted: (salesRegions, action) => {
      salesRegions.errors = null;
      salesRegions.status = "initial";
    },
    salesRegionRemoved: (salesRegions, action) => {
      salesRegions.loading = false;
      salesRegions.status = "success";
      let index = salesRegions.list.findIndex((salesRegion) => salesRegion.id === action.payload.id);
      salesRegions.list.splice(index, 1);
    },
  },
});

const {
  salesRegionsRequested,
  salesRegionsReceived,
  salesRegionsRequestFailed,
  salesRegionUpdated,
  salesRegionAdded,
  salesRegionsErrorsAndStatusReseted,
  salesRegionRemoved,
} = slice.actions;
export default slice.reducer;

const url = endpoints.mocks.salesRegion;

export const loadSalesRegions = () =>
  apiCallBegan({
    url,
    onStart: salesRegionsRequested.type,
    onSuccess: salesRegionsReceived.type,
    onError: salesRegionsRequestFailed.type,
  });

export const updateSalesRegion = (salesRegion) => {
  const body = { ...salesRegion };
  console.log("asset category update body", body);
  delete body.id;
  return apiCallBegan({
    url: url + "/" + salesRegion.id + "/",
    method: "put",
    data: body,
    onStart: salesRegionsRequested.type,
    onSuccess: salesRegionUpdated.type,
    onError: salesRegionsRequestFailed.type,
  });
};

export const addSalesRegion = (salesRegion) =>
  apiCallBegan({
    url,
    method: "post",
    data: salesRegion,
    onStart: salesRegionsRequested.type,
    onSuccess: salesRegionAdded.type,
    onError: salesRegionsRequestFailed.type,
  });

export const removeSalesRegion = (salesRegion) =>
  apiCallBegan({
    url: url + "/" + salesRegion.id + "/",
    method: "delete",
    onStart: salesRegionsRequested.type,
    onSuccess: salesRegionRemoved.type,
    onError: salesRegionsRequestFailed.type,
  });
export const resetErrorsAndStatus = () => salesRegionsErrorsAndStatusReseted();

export const getSalesRegions = createSelector(
  (state) => state.entities.salesRegions,
  (salesRegions) => salesRegions.list
);

export const getStatus = createSelector(
  (state) => state.entities.salesRegions,
  (salesRegions) => salesRegions.status
);

export const getErrors = createSelector(
  (state) => state.entities.salesRegions,
  (salesRegions) => salesRegions.errors
);

export const getLoading = createSelector(
  (state) => state.entities.salesRegions,
  (salesRegions) => salesRegions.loading
);
