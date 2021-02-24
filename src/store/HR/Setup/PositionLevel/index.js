import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const PositionLevel = new StateArrayModel({
  stateName: "position_levels",
});
PositionLevel.setURL("/position-levels");

PositionLevel.createSlice();

export const { stateName, reducer } = PositionLevel.getEntity();
export const { getLoading } = PositionLevel;

PositionLevel.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = PositionLevel.getSelectors();

export const {
  Add,
  Fetch,
  Edit,
  Patch,
  Remove,
} = PositionLevel.getAPIHandles();

export { selectData as selectPositionLevels };
