import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";
import { simulateLogic } from "./logic";

const UnitOfDuration = new StateArrayModel({
  stateName: "unit_of_duration",
});
UnitOfDuration.setURL("/unit-of-duration");
UnitOfDuration.createSlice();

export const { stateName, reducer } = UnitOfDuration.getEntity();

UnitOfDuration.enableCustomAct((dispatch, action) => {
  const response = UnitOfDuration.getAPICallType(action.payload.onSuccess);
  if (response) {
    const { type, apiType } = response;
    simulateLogic({
      type,
      apiType,
      dispatch,
      action,
    });
  }
});

UnitOfDuration.enableResults({ fetchEnabled: false });

UnitOfDuration.toggleCustomAct(true);
export const {
  Add,
  Fetch,
  Edit,
  Remove,
  Patch,
} = UnitOfDuration.getAPIHandles();
export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = UnitOfDuration.getSelectors();

export { selectData as selectUnitOfDurations };
