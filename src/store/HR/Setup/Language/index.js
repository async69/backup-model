import entryTypeNames from "constants/entryTypeNames";
import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const Language = new StateArrayModel({
  stateName: "language",
});

Language.setURL(`/entry-types?type=${entryTypeNames.Language}`);

Language.createSlice();

export const { stateName, reducer } = Language.getEntity();
export const { getLoading } = Language;

Language.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = Language.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = Language.getAPIHandles();

export { selectData as selectLanguages };
