import StateArrayModel from "../../../wrappers/StateModels/StateArrayModel";

const url = "/inventory/setup/entry-type/";
const EntryType = new StateArrayModel({ stateName: "entry_types" });

EntryType.createSlice();
EntryType.setURL(url);

export const { reducer, stateName } = EntryType.getEntity();

export const { Add, Fetch, Edit, Remove } = EntryType.getAPIHandles();
export const { getLoading } = EntryType;

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = EntryType.getSelectors();

export { selectData as selectEntryTypes };

export default reducer;
