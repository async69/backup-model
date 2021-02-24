import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "../../api";

const slice = createSlice({
  name: "generalJournals",
  initialState: {
    list: [],
    loading: false,
    status: "initial",
    errors: null,
  },
  reducers: {
    generalJournalsRequested: (generalJournals, action) => {
      generalJournals.loading = true;
    },
    generalJournalsReceived: (generalJournals, action) => {
      generalJournals.list = action.payload.results;
      generalJournals.loading = false;
    },
    generalJournalsRequestFailed: (generalJournals, action) => {
      generalJournals.loading = false;
      generalJournals.errors = action.payload;
      generalJournals.status = "failed";
    },
    GeneralJournalUpdated: (generalJournals, action) => {
      generalJournals.loading = false;
      generalJournals.status = "success";
      let index = generalJournals.list.findIndex(
        (GeneralJournal) => GeneralJournal.id === action.payload.id
      );
      generalJournals.list[index] = action.payload;
    },
    GeneralJournalAdded: (generalJournals, action) => {
      generalJournals.list.push(action.payload);
      generalJournals.loading = false;
      generalJournals.status = "success";
    },
    generalJournalsErrorsAndStatusReseted: (generalJournals, action) => {
      generalJournals.errors = null;
      generalJournals.status = "initial";
    },
    GeneralJournalRemoved: (generalJournals, action) => {
      generalJournals.loading = false;
      generalJournals.status = "success";
      let index = generalJournals.list.findIndex(
        (GeneralJournal) => GeneralJournal.id === action.payload.id
      );
      generalJournals.list.splice(index, 1);
    },
    generalJournalPosted: (generalJournals, action) => {
      generalJournals.loading = false;
      generalJournals.status = "success";
      let index = generalJournals.list.findIndex(
        (generalJournal) => generalJournal.id === action.payload.id
      );
      generalJournals.list[index] = action.payload;
    },
  },
});

const {
  generalJournalsRequested,
  generalJournalsReceived,
  generalJournalsRequestFailed,
  GeneralJournalUpdated,
  GeneralJournalAdded,
  generalJournalsErrorsAndStatusReseted,
  GeneralJournalRemoved,
  generalJournalPosted,
} = slice.actions;
export default slice.reducer;

const url = "/general-journal";

export const loadGeneralJournals = () =>
  apiCallBegan({
    url,
    onStart: generalJournalsRequested.type,
    onSuccess: generalJournalsReceived.type,
    onError: generalJournalsRequestFailed.type,
  });

export const updateGeneralJournal = (GeneralJournal, partial = false) => {
  const body = { ...GeneralJournal };
  console.log("asste category update body", body);
  delete body.id;
  return apiCallBegan({
    url: url + "/" + GeneralJournal.id,
    method: partial ? "patch" : "put",
    data: body,
    onStart: generalJournalsRequested.type,
    onSuccess: GeneralJournalUpdated.type,
    onError: generalJournalsRequestFailed.type,
  });
};

export const postGeneralJournal = (sivId, body) =>
  apiCallBegan({
    url: url + sivId + "/change_status/",
    method: "post",
    data: body,
    onStart: generalJournalsRequested.type,
    onSuccess: generalJournalPosted.type,
    onError: generalJournalsRequestFailed.type,
  });

export const addGeneralJournal = (GeneralJournal) =>
  apiCallBegan({
    url,
    method: "post",
    data: GeneralJournal,
    onStart: generalJournalsRequested.type,
    onSuccess: GeneralJournalAdded.type,
    onError: generalJournalsRequestFailed.type,
  });

export const removeGeneralJournal = (GeneralJournal) =>
  apiCallBegan({
    url: url + "/" + GeneralJournal.id,
    method: "delete",
    onStart: generalJournalsRequested.type,
    onSuccess: GeneralJournalRemoved.type,
    onError: generalJournalsRequestFailed.type,
  });
export const resetErrorsAndStatus = () =>
  generalJournalsErrorsAndStatusReseted();

export const getGeneralJournals = createSelector(
  (state) => state.entities.generalJournals,
  (generalJournals) => generalJournals.list
);

export const getStatus = createSelector(
  (state) => state.entities.generalJournals,
  (generalJournals) => generalJournals.status
);

export const getErrors = createSelector(
  (state) => state.entities.generalJournals,
  (generalJournals) => generalJournals.errors
);

export const getLoading = createSelector(
  (state) => state.entities.generalJournals,
  (generalJournals) => generalJournals.loading
);
