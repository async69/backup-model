import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "fixedAssetCategories",
  initialState: {
    list: [],
    loading: false,
    status: "initial",
    errors: null,
  },
  reducers: {
    fixedAssetCategoriesRequested: (fixedAssetCategories, action) => {
      fixedAssetCategories.loading = true;
    },
    fixedAssetCategoriesReceived: (fixedAssetCategories, action) => {
      fixedAssetCategories.list = action.payload;
      fixedAssetCategories.loading = false;
    },
    fixedAssetCategoriesRequestFailed: (fixedAssetCategories, action) => {
      fixedAssetCategories.loading = false;
      fixedAssetCategories.errors = action.payload;
      fixedAssetCategories.status = "failed";
    },
    fixedAssetCategoryUpdated: (fixedAssetCategories, action) => {
      fixedAssetCategories.loading = false;
      fixedAssetCategories.status = "success";
      let index = fixedAssetCategories.list.findIndex(
        (fixedAssetCategory) => fixedAssetCategory.id === action.payload.id
      );
      fixedAssetCategories.list[index] = action.payload;
    },
    fixedAssetCategoryAdded: (fixedAssetCategories, action) => {
      fixedAssetCategories.list.push(action.payload);
      fixedAssetCategories.loading = false;
      fixedAssetCategories.status = "success";
    },
    fixedAssetCategoriesErrorsAndStatusReseted: (
      fixedAssetCategories,
      action
    ) => {
      fixedAssetCategories.errors = null;
      fixedAssetCategories.status = "initial";
    },
    fixedAssetCategoryRemoved: (fixedAssetCategories, action) => {
      fixedAssetCategories.loading = false;
      fixedAssetCategories.status = "success";
      let index = fixedAssetCategories.list.findIndex(
        (fixedAssetCategory) => fixedAssetCategory.id === action.payload.id
      );
      fixedAssetCategories.list.splice(index, 1);
    },
  },
});

const {
  fixedAssetCategoriesRequested,
  fixedAssetCategoriesReceived,
  fixedAssetCategoriesRequestFailed,
  fixedAssetCategoryUpdated,
  fixedAssetCategoryAdded,
  fixedAssetCategoriesErrorsAndStatusReseted,
  fixedAssetCategoryRemoved,
} = slice.actions;
export default slice.reducer;

const url = "/asset-categories";

export const loadFixedAssetCategories = () =>
  apiCallBegan({
    url,
    onStart: fixedAssetCategoriesRequested.type,
    onSuccess: fixedAssetCategoriesReceived.type,
    onError: fixedAssetCategoriesRequestFailed.type,
  });

export const updateFixedAssetCategory = (fixedAssetCategory) => {
  const body = { ...fixedAssetCategory };
  console.log("asste category update body", body);
  delete body.id;
  return apiCallBegan({
    url: url + "/" + fixedAssetCategory.id + "/",
    method: "put",
    data: body,
    onStart: fixedAssetCategoriesRequested.type,
    onSuccess: fixedAssetCategoryUpdated.type,
    onError: fixedAssetCategoriesRequestFailed.type,
  });
};

export const addFixedAssetCategory = (fixedAssetCategory) =>
  apiCallBegan({
    url,
    method: "post",
    data: fixedAssetCategory,
    onStart: fixedAssetCategoriesRequested.type,
    onSuccess: fixedAssetCategoryAdded.type,
    onError: fixedAssetCategoriesRequestFailed.type,
  });

export const removeFixedAssetCategory = (fixedAssetCategory) =>
  apiCallBegan({
    url: url + "/" + fixedAssetCategory.id + "/",
    method: "delete",
    onStart: fixedAssetCategoriesRequested.type,
    onSuccess: fixedAssetCategoryRemoved.type,
    onError: fixedAssetCategoriesRequestFailed.type,
  });
export const resetErrorsAndStatus = () =>
  fixedAssetCategoriesErrorsAndStatusReseted();

export const getFixedAssetCategories = createSelector(
  (state) => state.entities.fixedAssetCategories,
  (fixedAssetCategories) => fixedAssetCategories.list
);

export const getStatus = createSelector(
  (state) => state.entities.fixedAssetCategories,
  (fixedAssetCategories) => fixedAssetCategories.status
);

export const getErrors = createSelector(
  (state) => state.entities.fixedAssetCategories,
  (fixedAssetCategories) => fixedAssetCategories.errors
);
