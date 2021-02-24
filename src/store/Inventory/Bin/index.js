import StateArrayModel from "../../../wrappers/StateModels/StateArrayModel";

const url = "/bins";
const Bin = new StateArrayModel({
  stateName: "new_bins",
});

Bin.createSlice();
Bin.setURL(url);

export const { reducer, stateName } = Bin.getEntity();

export const { Add, Fetch, FetchAll, Edit, Remove } = Bin.getAPIHandles();
export const { getLoading } = Bin;

// Bin.enableResults({ fetchEnabled: false })

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = Bin.getSelectors();

export { selectData as selectBins };

export default reducer;
