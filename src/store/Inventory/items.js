// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "../api";

const slice = createSlice({
  name: "items",
  initialState: {
    list: [],
    loading: false,
    status: "initial",
    errors: null,
  },
  reducers: {
    itemsRequested: (items, action) => {
      items.loading = true;
    },
    itemsReceived: (items, action) => {
      items.list = action.payload.results;
      items.loading = false;
    },
    itemsRequestFailed: (items, action) => {
      items.loading = false;
      items.errors = action.payload;
      items.status = "failed";
    },
    itemUpdated: (items, action) => {
      items.loading = false;
      items.status = "success";
      let index = items.list.findIndex((item) => item.id === action.payload.id);
      items.list[index] = action.payload;
    },
    itemAdded: (items, action) => {
      items.list.push(action.payload);
      items.loading = false;
      items.status = "success";
    },
    itemsErrorsAndStatusReseted: (items, action) => {
      items.errors = null;
      items.status = "initial";
    },
    itemRemoved: (items, action) => {
      items.loading = false;
      items.status = "success";
      let index = items.list.findIndex((item) => item.id === action.payload.id);
      items.list.splice(index, 1);
    },
  },
});

const {
  itemsRequested,
  itemsReceived,
  itemsRequestFailed,
  itemUpdated,
  itemAdded,
  itemsErrorsAndStatusReseted,
  itemRemoved,
} = slice.actions;

export default slice.reducer;

const url = "/inventory/item/";

export const loaditems = () =>
  apiCallBegan({
    url,
    onStart: itemsRequested.type,
    onSuccess: itemsReceived.type,
    onError: itemsRequestFailed.type,
  });

export const updateItem = (item) => {
  const body = { ...item };
  console.log("asset category update body", body);
  delete body.id;
  return apiCallBegan({
    url: url + item.id + "/",
    method: "patch",
    data: body,
    onStart: itemsRequested.type,
    onSuccess: itemUpdated.type,
    onError: itemsRequestFailed.type,
  });
};

export const addItem = (item) =>
  apiCallBegan({
    url,
    method: "post",
    data: item,
    onStart: itemsRequested.type,
    onSuccess: itemAdded.type,
    onError: itemsRequestFailed.type,
  });

export const removeItem = (item) =>
  apiCallBegan({
    url: url + item.id + "/",
    method: "delete",
    onStart: itemsRequested.type,
    onSuccess: itemRemoved.type,
    onError: itemsRequestFailed.type,
  });
export const resetErrorsAndStatus = () => itemsErrorsAndStatusReseted();

export const getItems = createSelector(
  (state) => state.entities.items,
  (items) => items.list
);

export const getStatus = createSelector(
  (state) => state.entities.items,
  (items) => items.status
);

export const getErrors = createSelector(
  (state) => state.entities.items,
  (items) => items.errors
);

export const getLoading = createSelector(
  (state) => state.entities.items,
  (items) => items.loading
);
