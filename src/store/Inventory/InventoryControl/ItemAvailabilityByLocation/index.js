import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";

const url = "/item-availability-by-location";
const ItemAvailabilityByLocation = new StateArrayModel({
  stateName: "item_availabilities_by_location",
});

ItemAvailabilityByLocation.createSlice();
ItemAvailabilityByLocation.setURL(url);

export const { reducer, stateName } = ItemAvailabilityByLocation.getEntity();
export const { getLoading } = ItemAvailabilityByLocation;

export const {
  Add,
  Fetch,
  Edit,
  Remove,
} = ItemAvailabilityByLocation.getAPIHandles();

// ItemAvailabilityByLocation.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = ItemAvailabilityByLocation.getSelectors();

export { selectData as selectItemAvailabilityByLocations };

export default reducer;
