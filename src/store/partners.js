import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "partners",
  initialState: {
    list: [],
    loading: false,
    status: "initial",
    errors: null,
  },
  reducers: {
    partnersRequested: (partners, action) => {
      partners.loading = true;
    },
    partnerAdded: (partners, action) => {
      partners.list.push(action.payload);
      partners.loading = false;
      partners.errors = null;
      partners.status = "success";
    },
    partnersRequestFailed: (partners, action) => {
      partners.loading = false;
      partners.errors = action.payload;
      partners.status = "failed";
    },
    partnersErrorsAndStatusReseted: (partners, action) => {
      partners.errors = null;
      partners.status = "initial";
    },
    partnersReceived: (partners, action) => {
      partners.list = action.payload;
      partners.loading = false;
    },
    partnerRemoved: (partners, action) => {
      partners.loading = false;
      partners.status = "success";
      let index = partners.list.findIndex(
        (partner) => partner.id === action.payload.id
      );
      partners.list.splice(index, 1);
    },
    partnerUpdated: (partners, action) => {
      partners.loading = false;
      partners.status = "success";
      let index = partners.list.findIndex(
        (partner) => partner.id === action.payload.id
      );
      partners.list[index] = action.payload;
    },
  },
});
const {
  partnersRequested,
  partnerAdded,
  partnersRequestFailed,
  partnersErrorsAndStatusReseted,
  partnersReceived,
  partnerRemoved,
  partnerUpdated,
} = slice.actions;
export default slice.reducer;

//Action creators
const url = "/partners/";

export const addPartner = (partner) =>
  apiCallBegan({
    url,
    method: "post",
    data: partner,
    onStart: partnersRequested.type,
    onSuccess: partnerAdded.type,
    onError: partnersRequestFailed.type,
  });

export const resetErrorsAndStatus = () => partnersErrorsAndStatusReseted();

export const loadPartners = () =>
  apiCallBegan({
    url,
    onStart: partnersRequested.type,
    onSuccess: partnersReceived.type,
    onError: partnersRequestFailed.type,
  });

export const removePartner = (partner) =>
  apiCallBegan({
    url: url + partner.id,
    method: "delete",
    onStart: partnersRequested.type,
    onSuccess: partnerRemoved.type,
    onError: partnersRequestFailed.type,
  });

export const updatePartner = (partner) => {
  const body = { ...partner };
  delete body.id;
  return apiCallBegan({
    url: url + partner.id,
    method: "put",
    data: body,
    onStart: partnersRequested.type,
    onSuccess: partnerUpdated.type,
    onError: partnersRequestFailed.type,
  });
};

export const getStatus = createSelector(
  (state) => state.entities.partners,
  (partners) => partners.status
);

export const getErrors = createSelector(
  (state) => state.entities.partners,
  (partners) => partners.errors
);

export const getLoading = createSelector(
  (state) => state.entities.partners,
  (partners) => partners.loading
);

export const getCustomers = createSelector(
  (state) => state.entities.partners,
  (partners) =>
    partners.list.filter((partner) => partner.partner === "Customer")
);

export const getSuppliers = createSelector(
  (state) => state.entities.partners,
  (partners) =>
    partners.list.filter((partner) => partner.partner === "Supplier")
);
