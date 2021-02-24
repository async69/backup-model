import StateArrayModel from "../../../wrappers/StateModels/StateArrayModel";

const url = "/warehouse-unit-of-measurements";
const UOM = new StateArrayModel({
  stateName: "warehouse_unit_of_measurements",
});

UOM.createSlice();
UOM.setURL(url);

export const { reducer, stateName } = UOM.getEntity();
export const { getLoading } = UOM;

export const { Add, Fetch, FetchAll, Edit, Remove } = UOM.getAPIHandles();

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = UOM.getSelectors();

export { selectData as selectUOMs };

export default reducer;
