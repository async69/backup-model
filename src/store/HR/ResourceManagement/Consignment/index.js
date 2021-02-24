import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const Consignment = new StateArrayModel({
  stateName: "consignments",
});
Consignment.setURL("/consignments");

Consignment.createSlice();

export const { stateName, reducer } = Consignment.getEntity();
export const { getLoading } = Consignment;

Consignment.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = Consignment.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = Consignment.getAPIHandles();

export { selectData as selectConsignments };
