import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const EntryTypeName = new StateArrayModel({
  stateName: "entry_type_name",
});
EntryTypeName.setURL("/entry-type-names");

EntryTypeName.createSlice();

export const { stateName, reducer } = EntryTypeName.getEntity();
export const { getLoading } = EntryTypeName;

EntryTypeName.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = EntryTypeName.getSelectors();

export const {
  Add,
  Fetch,
  Edit,
  Patch,
  Remove,
} = EntryTypeName.getAPIHandles();

export { selectData as selectEntryTypeNames };
