import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";
import { simulateLogic } from "./logic";

const ConsignmentType = new StateArrayModel({
  stateName: "consignment_type",
});
ConsignmentType.setURL("/consignment-type");
ConsignmentType.createSlice();

export const { stateName, reducer } = ConsignmentType.getEntity();

ConsignmentType.enableCustomAct((dispatch, action) => {
  const response = ConsignmentType.getAPICallType(action.payload.onSuccess);
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

ConsignmentType.enableResults({ fetchEnabled: false });

ConsignmentType.toggleCustomAct(true);
export const {
  Add,
  Fetch,
  Edit,
  Remove,
  Patch,
} = ConsignmentType.getAPIHandles();
export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = ConsignmentType.getSelectors();

export { selectData as selectConsignmentTypes };
