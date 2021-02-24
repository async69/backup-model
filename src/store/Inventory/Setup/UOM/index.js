import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel/";

const UnitOfMeasurement = new StateArrayModel({
  stateName: "new_unit_of_measurements",
});

UnitOfMeasurement.setInitialState();
UnitOfMeasurement.createSlice();
UnitOfMeasurement.setURL("/warehouse-unit-of-measurements");

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = UnitOfMeasurement.getSelectors();

export const { stateName, reducer } = UnitOfMeasurement.getEntity();

export { selectData as selectUOMs };

export const { Add, Edit, Fetch, Remove } = UnitOfMeasurement.getAPIHandles();
