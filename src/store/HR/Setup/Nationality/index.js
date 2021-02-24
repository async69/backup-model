import entryTypeNames from "constants/entryTypeNames";
import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const Nationality = new StateArrayModel({
  stateName: "nationality",
});

Nationality.setURL(`/entry-types?type=${entryTypeNames.Nationality}`);

Nationality.createSlice();

export const { stateName, reducer } = Nationality.getEntity();
export const { getLoading } = Nationality;

Nationality.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = Nationality.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = Nationality.getAPIHandles();

export { selectData as selectNationalities };
