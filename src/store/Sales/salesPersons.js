// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "../api";
import endpoints from "../../config/endPoints";

const slice = createSlice({
  name: "salesPersons",
  initialState: {
    list: [],
    loading: false,
    status: "initial",
    errors: null,
  },
  reducers: {
    salesPersonsRequested: (salesPersons, action) => {
      salesPersons.loading = true;
    },
    salesPersonsReceived: (salesPersons, action) => {
      salesPersons.list = action.payload;
      salesPersons.loading = false;
    },
    salesPersonsRequestFailed: (salesPersons, action) => {
      salesPersons.loading = false;
      salesPersons.errors = action.payload;
      salesPersons.status = "failed";
    },
    salesPersonUpdated: (salesPersons, action) => {
      salesPersons.loading = false;
      salesPersons.status = "success";
      let index = salesPersons.list.findIndex((salesPerson) => salesPerson.id === action.payload.id);
      salesPersons.list[index] = action.payload;
    },
    salesPersonAdded: (salesPersons, action) => {
      salesPersons.list.push(action.payload);
      salesPersons.loading = false;
      salesPersons.status = "success";
    },
    salesPersonsErrorsAndStatusReseted: (salesPersons, action) => {
      salesPersons.errors = null;
      salesPersons.status = "initial";
    },
    salesPersonRemoved: (salesPersons, action) => {
      salesPersons.loading = false;
      salesPersons.status = "success";
      let index = salesPersons.list.findIndex((salesPerson) => salesPerson.id === action.payload.id);
      salesPersons.list.splice(index, 1);
    },
  },
});

const {
  salesPersonsRequested,
  salesPersonsReceived,
  salesPersonsRequestFailed,
  salesPersonUpdated,
  salesPersonAdded,
  salesPersonsErrorsAndStatusReseted,
  salesPersonRemoved,
} = slice.actions;
export default slice.reducer;

const url = endpoints.mocks.salesPerson;

export const loadSalesPersons = () =>
  apiCallBegan({
    url,
    onStart: salesPersonsRequested.type,
    onSuccess: salesPersonsReceived.type,
    onError: salesPersonsRequestFailed.type,
  });

export const updateSalesPerson = (salesPerson) => {
  const body = { ...salesPerson };
  console.log("asset category update body", body);
  delete body.id;
  return apiCallBegan({
    url: url + "/" + salesPerson.id + "/",
    method: "put",
    data: body,
    onStart: salesPersonsRequested.type,
    onSuccess: salesPersonUpdated.type,
    onError: salesPersonsRequestFailed.type,
  });
};

export const addSalesPerson = (salesPerson) =>
  apiCallBegan({
    url,
    method: "post",
    data: salesPerson,
    onStart: salesPersonsRequested.type,
    onSuccess: salesPersonAdded.type,
    onError: salesPersonsRequestFailed.type,
  });

export const removeSalesPerson = (salesPerson) =>
  apiCallBegan({
    url: url + "/" + salesPerson.id + "/",
    method: "delete",
    onStart: salesPersonsRequested.type,
    onSuccess: salesPersonRemoved.type,
    onError: salesPersonsRequestFailed.type,
  });
export const resetErrorsAndStatus = () => salesPersonsErrorsAndStatusReseted();

export const getSalesPersons = createSelector(
  (state) => state.entities.salesPersons,
  (salesPersons) => salesPersons.list
);

export const getStatus = createSelector(
  (state) => state.entities.salesPersons,
  (salesPersons) => salesPersons.status
);

export const getErrors = createSelector(
  (state) => state.entities.salesPersons,
  (salesPersons) => salesPersons.errors
);

export const getLoading = createSelector(
  (state) => state.entities.salesPersons,
  (salesPersons) => salesPersons.loading
);
