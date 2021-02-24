import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "../../api";
// import endpoints from "../../config/endPoints";

const slice = createSlice({
  name: "vendorTypes",
  initialState: {
    list: [],
    loading: false,
    status: "initial",
    errors: null,
  },
  reducers: {
    vendorTypesRequested: (vendorTypes, action) => {
      vendorTypes.loading = true;
    },
    vendorTypesReceived: (vendorTypes, action) => {
      vendorTypes.list = action.payload;
      vendorTypes.loading = false;
    },
    vendorTypesRequestFailed: (vendorTypes, action) => {
      vendorTypes.loading = false;
      vendorTypes.errors = action.payload;
      vendorTypes.status = "failed";
    },
    VendorTypeUpdated: (vendorTypes, action) => {
      vendorTypes.loading = false;
      vendorTypes.status = "success";
      let index = vendorTypes.list.findIndex(
        (VendorType) => VendorType.id === action.payload.id
      );
      vendorTypes.list[index] = action.payload;
    },
    VendorTypeAdded: (vendorTypes, action) => {
      vendorTypes.list.push(action.payload);
      vendorTypes.loading = false;
      vendorTypes.status = "success";
    },
    vendorTypesErrorsAndStatusReseted: (vendorTypes, action) => {
      vendorTypes.errors = null;
      vendorTypes.status = "initial";
    },
    VendorTypeRemoved: (vendorTypes, action) => {
      vendorTypes.loading = false;
      vendorTypes.status = "success";
      let index = vendorTypes.list.findIndex(
        (VendorType) => VendorType.id === action.payload.id
      );
      vendorTypes.list.splice(index, 1);
    },
    VendorTypePosted: (vendorTypes, action) => {
      vendorTypes.loading = false;
      vendorTypes.status = "success";
      let index = vendorTypes.list.findIndex(
        (VendorType) => VendorType.id === action.payload.id
      );
      vendorTypes.list[index] = action.payload;
    },
  },
});

const {
  vendorTypesRequested,
  vendorTypesReceived,
  vendorTypesRequestFailed,
  VendorTypeUpdated,
  VendorTypeAdded,
  vendorTypesErrorsAndStatusReseted,
  VendorTypeRemoved,
  VendorTypePosted,
} = slice.actions;
export default slice.reducer;

const url = "/vendor-type";

export const loadVendorTypes = () =>
  apiCallBegan({
    url,
    onStart: vendorTypesRequested.type,
    onSuccess: vendorTypesReceived.type,
    onError: vendorTypesRequestFailed.type,
  });

export const updateVendorType = (VendorType, partial) => {
  const body = { ...VendorType };
  console.log("asste category update body", body);
  delete body.id;
  return apiCallBegan({
    url: url + "/" + VendorType.id,
    method: partial ? "patch" : "put",
    data: body,
    onStart: vendorTypesRequested.type,
    onSuccess: VendorTypeUpdated.type,
    onError: vendorTypesRequestFailed.type,
  });
};

export const addVendorType = (VendorType) =>
  apiCallBegan({
    url,
    method: "post",
    data: VendorType,
    onStart: vendorTypesRequested.type,
    onSuccess: VendorTypeAdded.type,
    onError: vendorTypesRequestFailed.type,
  });

export const removeVendorType = (VendorType) =>
  apiCallBegan({
    url: url + "/" + VendorType.id,
    method: "delete",
    onStart: vendorTypesRequested.type,
    onSuccess: VendorTypeRemoved.type,
    onError: vendorTypesRequestFailed.type,
  });
export const postVendorType = (grnId, body) =>
  apiCallBegan({
    url: url + grnId + "/change_status/",
    method: "post",
    data: body,
    onStart: vendorTypesRequested.type,
    onSuccess: VendorTypePosted.type,
    onError: vendorTypesRequestFailed.type,
  });

export const resetErrorsAndStatus = () => vendorTypesErrorsAndStatusReseted();

export const getVendorTypes = createSelector(
  (state) => state.entities.vendorTypes,
  (vendorTypes) => vendorTypes.list
);

export const getStatus = createSelector(
  (state) => state.entities.vendorTypes,
  (vendorTypes) => vendorTypes.status
);

export const getErrors = createSelector(
  (state) => state.entities.vendorTypes,
  (vendorTypes) => vendorTypes.errors
);

export const getLoading = createSelector(
  (state) => state.entities.vendorTypes,
  (vendorTypes) => vendorTypes.loading
);
