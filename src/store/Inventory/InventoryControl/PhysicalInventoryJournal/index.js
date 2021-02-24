import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";

const url = "/physical-inventory-journals";
const PhysicalInventoryJournal = new StateArrayModel({
  stateName: "updated_inventory_journals",
});

PhysicalInventoryJournal.createSlice();
PhysicalInventoryJournal.setURL(url);

export const { reducer, stateName } = PhysicalInventoryJournal.getEntity();
export const { getLoading } = PhysicalInventoryJournal;

export const {
  Add,
  Fetch,
  Edit,
  Patch,
  Remove,
} = PhysicalInventoryJournal.getAPIHandles();

// PhysicalInventoryJournal.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectPatchStatus,
  selectData,
} = PhysicalInventoryJournal.getSelectors();

export { selectData as selectPhysicalInventoryJournals };

export default reducer;
