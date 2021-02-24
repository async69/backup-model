import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import endPoints from "../config/endPoints";

const slice = createSlice({
  name: "fixedAssets",
  initialState: {
    list: [],
    loading: false,
    status: "initial",
    errors: null,
  },
  reducers: {
    fixedAssetsRequested: (fixedAssets, action) => {
      fixedAssets.loading = true;
    },
    fixedAssetsReceived: (fixedAssets, action) => {
      fixedAssets.list = action.payload;
      fixedAssets.loading = false;
    },
    fixedAssetsRequestFailed: (fixedAssets, action) => {
      fixedAssets.loading = false;
      fixedAssets.errors = action.payload;
      fixedAssets.status = "failed";
    },
    fixedAssetUpdated: (fixedAssets, action) => {
      fixedAssets.loading = false;
      fixedAssets.status = "success";
      let index = fixedAssets.list.findIndex(
        (fixedAsset) => fixedAsset.id === action.payload.id
      );
      fixedAssets.list[index] = action.payload;
    },
    fixedAssetAdded: (fixedAssets, action) => {
      fixedAssets.list.push(action.payload);
      fixedAssets.loading = false;
      fixedAssets.status = "success";
    },
    fixedAssetsErrorsAndStatusReseted: (fixedAssets, action) => {
      fixedAssets.errors = null;
      fixedAssets.status = "initial";
    },
    fixedAssetRemoved: (fixedAssets, action) => {
      fixedAssets.loading = false;
      fixedAssets.status = "success";
      let index = fixedAssets.list.findIndex(
        (fixedAsset) => fixedAsset.id === action.payload.id
      );
      fixedAssets.list.splice(index, 1);
    },
  },
});

const {
  fixedAssetsRequested,
  fixedAssetsReceived,
  fixedAssetsRequestFailed,
  fixedAssetUpdated,
  fixedAssetAdded,
  fixedAssetsErrorsAndStatusReseted,
  fixedAssetRemoved,
} = slice.actions;
export default slice.reducer;

export const loadFixedAssets = () =>
  apiCallBegan({
    url: endPoints.mocks.fixedAsset,
    onStart: fixedAssetsRequested.type,
    onSuccess: fixedAssetsReceived.type,
    onError: fixedAssetsRequestFailed.type,
  });

export const updateFixedAsset = (fixedAsset) => {
  const body = { ...fixedAsset };
  delete body.id;
  return apiCallBegan({
    url: endPoints.mocks.fixedAsset + "/" + fixedAsset.id,
    method: "put",
    data: body,
    onStart: fixedAssetsRequested.type,
    onSuccess: fixedAssetUpdated.type,
    onError: fixedAssetsRequestFailed.type,
  });
};

export const addFixedAsset = (fixedAsset) =>
  apiCallBegan({
    url: endPoints.mocks.fixedAsset,
    method: "post",
    data: fixedAsset,
    onStart: fixedAssetsRequested.type,
    onSuccess: fixedAssetAdded.type,
    onError: fixedAssetsRequestFailed.type,
  });

export const removeFixedAsset = (fixedAsset) =>
  apiCallBegan({
    url: endPoints.mocks.fixedAsset + "/" + fixedAsset.id,
    method: "delete",
    onStart: fixedAssetsRequested.type,
    onSuccess: fixedAssetRemoved.type,
    onError: fixedAssetsRequestFailed.type,
  });
export const resetErrorsAndStatus = () => fixedAssetsErrorsAndStatusReseted();

export const getFixedAssets = createSelector(
  (state) => state.entities.fixedAssets,
  (fixedAssets) => fixedAssets.list
);

export const getStatus = createSelector(
  (state) => state.entities.fixedAssets,
  (fixedAssets) => fixedAssets.status
);

export const getErrors = createSelector(
  (state) => state.entities.fixedAssets,
  (fixedAssets) => fixedAssets.errors
);
