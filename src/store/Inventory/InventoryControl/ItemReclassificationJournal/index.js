import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";

const url = "/item-reclassification-journals";
const ItemReclassificationJournal = new StateArrayModel({
  stateName: "updated_bin_journals",
});

ItemReclassificationJournal.createSlice();
ItemReclassificationJournal.setURL(url);

export const { reducer, stateName } = ItemReclassificationJournal.getEntity();
export const { getLoading } = ItemReclassificationJournal;

export const {
  Add,
  Fetch,
  Edit,
  Remove,
} = ItemReclassificationJournal.getAPIHandles();

// ItemReclassificationJournal.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = ItemReclassificationJournal.getSelectors();

export { selectData as selectItemReclassificationJournals };

export default reducer;
