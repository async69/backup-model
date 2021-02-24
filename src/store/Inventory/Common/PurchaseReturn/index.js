import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";

const PurchaseReturn = new StateArrayModel({
  stateName: "purchase-returns",
});
PurchaseReturn.setURL("/purchase-returns");

PurchaseReturn.createSlice();

export const { stateName, reducer } = PurchaseReturn.getEntity();
export const { getLoading } = PurchaseReturn;

// PurchaseReturn.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = PurchaseReturn.getSelectors();

export const {
  Add,
  Fetch,
  Edit,
  Patch,
  Remove,
} = PurchaseReturn.getAPIHandles();

export { selectData as selectPurchaseReturns };
