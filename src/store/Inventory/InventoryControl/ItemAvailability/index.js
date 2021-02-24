import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";

const url = "/item-availabilities";
const ItemAvailability = new StateArrayModel({
  stateName: "item_availabilities",
});

ItemAvailability.createSlice();
ItemAvailability.setURL(url);

export const { reducer, stateName } = ItemAvailability.getEntity();
export const { getLoading } = ItemAvailability;

export const { Add, Fetch, Edit, Remove } = ItemAvailability.getAPIHandles();

// ItemAvailability.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = ItemAvailability.getSelectors();

export { selectData as selectItemAvailabilities };

export default reducer;
