import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";

const SalesReturn = new StateArrayModel({
  stateName: "sales-returns",
});
SalesReturn.setURL("/sales-returns");

SalesReturn.createSlice();

export const { stateName, reducer } = SalesReturn.getEntity();
export const { getLoading } = SalesReturn;

// SalesReturn.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = SalesReturn.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = SalesReturn.getAPIHandles();

export { selectData as selectSalesReturns };
