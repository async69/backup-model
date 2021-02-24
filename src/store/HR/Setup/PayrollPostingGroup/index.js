import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const PyrollPostingGroup = new StateArrayModel({
  stateName: "payroll_posting_groups",
});
PyrollPostingGroup.setURL("/payroll-posting-groups");

PyrollPostingGroup.createSlice();

export const { stateName, reducer } = PyrollPostingGroup.getEntity();
export const { getLoading } = PyrollPostingGroup;

PyrollPostingGroup.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = PyrollPostingGroup.getSelectors();

export const {
  Add,
  Fetch,
  Edit,
  Patch,
  Remove,
} = PyrollPostingGroup.getAPIHandles();

export { selectData as selectPyrollPostingGroups };
