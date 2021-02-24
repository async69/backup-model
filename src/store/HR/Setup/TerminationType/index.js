import entryTypeNames from "constants/entryTypeNames";
import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const TerminationType = new StateArrayModel({
  stateName: "terminationType",
});

TerminationType.setURL(`/entry-types?type=${entryTypeNames.TerminationType}`);

TerminationType.createSlice();

export const { stateName, reducer } = TerminationType.getEntity();
export const { getLoading } = TerminationType;

TerminationType.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = TerminationType.getSelectors();

export const {
  Add,
  Fetch,
  Edit,
  Patch,
  Remove,
} = TerminationType.getAPIHandles();

export { selectData as selectTerminationTypes };
