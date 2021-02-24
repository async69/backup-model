import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";
import { simulateLogic } from "./logic";

const Illness = new StateArrayModel({ stateName: "illness" });

Illness.createSlice();

export const { stateName, reducer } = Illness.getEntity();

export const { Add, Fetch, Edit, Remove, Patch } = Illness.getAPIHandles();

Illness.enableCustomAct((dispatch, action) => {
  const response = Illness.getAPICallType(action.payload.onSuccess);
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

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectPatchStatus,
  selectData,
} = Illness.getSelectors();

export { selectData as selectIllness };
