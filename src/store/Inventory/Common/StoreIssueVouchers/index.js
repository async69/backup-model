import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";

const StoreIssueVoucher = new StateArrayModel({
  stateName: "store-issue-vouchers",
});
StoreIssueVoucher.setURL("/store-issue-vouchers");

StoreIssueVoucher.createSlice();

export const { stateName, reducer } = StoreIssueVoucher.getEntity();
export const { getLoading } = StoreIssueVoucher;

// StoreIssueVoucher.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = StoreIssueVoucher.getSelectors();

export const {
  Add,
  Fetch,
  Edit,
  Patch,
  Remove,
} = StoreIssueVoucher.getAPIHandles();

export { selectData as selectStoreIssueVouchers };
