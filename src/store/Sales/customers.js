import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "../api";
import endPoints from "../../config/endPoints";

const slice = createSlice({
  name: "customersSales",
  initialState: {
    list: [],
    loading: false,
    status: "initial",
    errors: null,
  },
  reducers: {
    customersRequested: (customers, action) => {
      customers.loading = true;
    },
    customersReceived: (customers, action) => {
      customers.list = action.payload;
      customers.loading = false;
    },
    customersRequestFailed: (customers, action) => {
      customers.loading = false;
      customers.errors = action.payload;
      customers.status = "failed";
    },
    customerUpdated: (customers, action) => {
      customers.loading = false;
      customers.status = "success";
      let index = customers.list.findIndex(
        (customer) => customers.id === action.payload.id
      );
      customers.list[index] = action.payload;
    },
    customerErrorsAndStatusReseted: (customers, action) => {
      customers.errors = null;
      customers.status = "initial";
    },
    customerRemoved: (customers, action) => {
      customers.loading = false;
      customers.status = "success";
      let index = customers.list.findIndex(
        (customer) => customers.id === action.payload.id
      );
      customers.list.splice(index, 1);
    },
    customerAdded: (customers, action) => {
      customers.list.push(action.payload);
      customers.loading = false;
      customers.errors = null;
      customers.status = "success";
    },
  },
});
const {
  customersRequested,
  customersReceived,
  customersRequestFailed,
  customerUpdated,
  customerErrorsAndStatusReseted,
  customerRemoved,
  customerAdded
} = slice.actions;
export default slice.reducer;

//Action creators
// const url = "/customers";

export const loadCustomers = () =>
  apiCallBegan({
    url: endPoints.mocks.customersSales,
    onStart: customersRequested.type,
    onSuccess: customersReceived.type,
    onError: customersRequestFailed.type,
  });

export const updateCustomer = (customer) => {
  const body = { ...customer };
  delete body.id;
  return apiCallBegan({
    url: endPoints.mocks.customersSales + "/" + customer.id,
    method: "put",
    onStart: customersRequested.type,
    onSuccess: customerUpdated.type,
    onError: customersRequestFailed.type,
  });
};

export const addCustomer = (customer) =>
  apiCallBegan({
    url:endPoints.mocks.customersSales,
    method: "post",
    data: customer,
    onStart: customersRequested.type,
    onSuccess: customerAdded.type,
    onError: customersRequestFailed.type,
  });


export const removeCustomer = (customer) =>
  apiCallBegan({
    url: endPoints.mocks.customersSales + "/" + customer.id,
    method: "delete",
    onStart: customersRequested.type,
    onSuccess: customerRemoved.type,
    onError: customersRequestFailed.type,
  });

export const resetErrorsAndStatus = () => customerErrorsAndStatusReseted();

export const getCustomers = createSelector(
  (state) => state.entities.customersSales,
  (customers) => customers.list
);

export const getStatus = createSelector(
  (state) => state.entities.customersSales,
  (customers) => customers.status
);

export const getErrors = createSelector(
  (state) => state.entities.customersSales,
  (customers) => customers.errors
);
