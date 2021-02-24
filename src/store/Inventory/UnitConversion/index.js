import StateArrayModel from "../../../wrappers/StateModels/StateArrayModel";

const url = "/unit-of-measurement-conversions";
const UOMConversion = new StateArrayModel({
  stateName: "unit_of_measurement_conversions",
});

UOMConversion.createSlice();
UOMConversion.setURL(url);

export const { reducer, stateName } = UOMConversion.getEntity();
export const { getLoading } = UOMConversion;

export const {
  Add,
  Fetch,
  FetchAll,
  Edit,
  Remove,
} = UOMConversion.getAPIHandles();

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = UOMConversion.getSelectors();

export { selectData as selectUOMConversions };

export default reducer;
