import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";
import { simulateLogic } from "./logic";

const IllnessTypes = new StateArrayModel({ stateName: "illness_type" });
// IllnessTypes.setURL("/illness-type");
IllnessTypes.createSlice();

export const { stateName, reducer } = IllnessTypes.getEntity();

IllnessTypes.enableCustomAct((dispatch, action) => {
  const response = IllnessTypes.getAPICallType(action.payload.onSuccess);
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

IllnessTypes.enableResults({ fetchEnabled: false });

IllnessTypes.toggleCustomAct(true);
export const { Add, Fetch, Edit, Remove, Patch } = IllnessTypes.getAPIHandles();
export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = IllnessTypes.getSelectors();

export { selectData as selectIllnessTypes };
