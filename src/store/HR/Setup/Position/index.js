import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const Postion = new StateArrayModel({
  stateName: "position",
});
Postion.setURL("/positions");

Postion.createSlice();

export const { stateName, reducer } = Postion.getEntity();
export const { getLoading } = Postion;

Postion.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = Postion.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = Postion.getAPIHandles();

export { selectData as selectPositions };
