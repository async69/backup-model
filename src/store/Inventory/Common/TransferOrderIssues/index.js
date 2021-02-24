import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "../../../api";

const slice = createSlice({
  name: "transferOrderIssues",
  initialState: {
    list: [],
    loading: false,
    status: "initial",
    errors: null,
  },
  reducers: {
    transferOrderIssuesRequested: (transferOrderIssues, action) => {
      transferOrderIssues.loading = true;
    },
    transferOrderIssuesReceived: (transferOrderIssues, action) => {
      transferOrderIssues.list = action.payload;
      transferOrderIssues.loading = false;
    },
    transferOrderIssuesRequestFailed: (transferOrderIssues, action) => {
      transferOrderIssues.loading = false;
      transferOrderIssues.errors = action.payload;
      transferOrderIssues.status = "failed";
    },
    TransferOrderIssueUpdated: (transferOrderIssues, action) => {
      transferOrderIssues.loading = false;
      transferOrderIssues.status = "success";
      let index = transferOrderIssues.list.findIndex(
        (TransferOrderIssue) => TransferOrderIssue.id === action.payload.id
      );
      transferOrderIssues.list[index] = action.payload;
    },
    TransferOrderIssueAdded: (transferOrderIssues, action) => {
      transferOrderIssues.list.push(action.payload);
      transferOrderIssues.loading = false;
      transferOrderIssues.status = "success";
    },
    transferOrderIssuesErrorsAndStatusReseted: (
      transferOrderIssues,
      action
    ) => {
      transferOrderIssues.errors = null;
      transferOrderIssues.status = "initial";
    },
    TransferOrderIssueRemoved: (transferOrderIssues, action) => {
      transferOrderIssues.loading = false;
      transferOrderIssues.status = "success";
      let index = transferOrderIssues.list.findIndex(
        (TransferOrderIssue) => TransferOrderIssue.id === action.payload.id
      );
      transferOrderIssues.list.splice(index, 1);
    },
    transferOrderIssuePosted: (transferOrderIssues, action) => {
      transferOrderIssues.loading = false;
      transferOrderIssues.status = "success";
      let index = transferOrderIssues.list.findIndex(
        (transferOrderIssue) => transferOrderIssue.id === action.payload.id
      );
      transferOrderIssues.list[index] = action.payload;
    },
  },
});

const {
  transferOrderIssuesRequested,
  transferOrderIssuesReceived,
  transferOrderIssuesRequestFailed,
  TransferOrderIssueUpdated,
  TransferOrderIssueAdded,
  transferOrderIssuesErrorsAndStatusReseted,
  TransferOrderIssueRemoved,
  transferOrderIssuePosted,
} = slice.actions;
export default slice.reducer;

const url = "/transfer-order-issues";

export const loadTransferOrderIssues = () =>
  apiCallBegan({
    url,
    onStart: transferOrderIssuesRequested.type,
    onSuccess: transferOrderIssuesReceived.type,
    onError: transferOrderIssuesRequestFailed.type,
  });

export const updateTransferOrderIssue = (TransferOrderIssue, partial) => {
  const body = { ...TransferOrderIssue };
  console.log("asste category update body", body);
  delete body.id;
  return apiCallBegan({
    url: url + "/" + TransferOrderIssue.id,
    method: partial ? "patch" : "put",
    data: body,
    onStart: transferOrderIssuesRequested.type,
    onSuccess: TransferOrderIssueUpdated.type,
    onError: transferOrderIssuesRequestFailed.type,
  });
};

export const postTransferOrderIssue = (sivId, body) =>
  apiCallBegan({
    url: url + sivId + "/change_status/",
    method: "post",
    data: body,
    onStart: transferOrderIssuesRequested.type,
    onSuccess: transferOrderIssuePosted.type,
    onError: transferOrderIssuesRequestFailed.type,
  });

export const addTransferOrderIssue = (TransferOrderIssue) =>
  apiCallBegan({
    url,
    method: "post",
    data: TransferOrderIssue,
    onStart: transferOrderIssuesRequested.type,
    onSuccess: TransferOrderIssueAdded.type,
    onError: transferOrderIssuesRequestFailed.type,
  });

export const removeTransferOrderIssue = (TransferOrderIssue) =>
  apiCallBegan({
    url: url + "/" + TransferOrderIssue.id,
    method: "delete",
    onStart: transferOrderIssuesRequested.type,
    onSuccess: TransferOrderIssueRemoved.type,
    onError: transferOrderIssuesRequestFailed.type,
  });
export const resetErrorsAndStatus = () =>
  transferOrderIssuesErrorsAndStatusReseted();

export const getTransferOrderIssues = createSelector(
  (state) => state.entities.transferOrderIssues,
  (transferOrderIssues) => transferOrderIssues.list
);

export const getStatus = createSelector(
  (state) => state.entities.transferOrderIssues,
  (transferOrderIssues) => transferOrderIssues.status
);

export const getErrors = createSelector(
  (state) => state.entities.transferOrderIssues,
  (transferOrderIssues) => transferOrderIssues.errors
);

export const getLoading = createSelector(
  (state) => state.entities.transferOrderIssues,
  (transferOrderIssues) => transferOrderIssues.loading
);
