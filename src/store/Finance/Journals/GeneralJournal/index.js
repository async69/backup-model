import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";

const GeneralJournal = new StateArrayModel({
  stateName: "new_updated_general_journals",
});
GeneralJournal.setURL("/general-journal");

GeneralJournal.createSlice();

export const { stateName, reducer } = GeneralJournal.getEntity();

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = GeneralJournal.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = GeneralJournal.getAPIHandles();

export { selectData as selectGeneralJournals };