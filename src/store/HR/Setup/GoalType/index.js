import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";
import { simulateLogic } from "./logic";

const GoalType = new StateArrayModel({
  stateName: "goal_type",
});
GoalType.setURL("/goal-type");
GoalType.createSlice();

export const { stateName, reducer } = GoalType.getEntity();

GoalType.enableCustomAct((dispatch, action) => {
  const response = GoalType.getAPICallType(action.payload.onSuccess);
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

GoalType.enableResults({ fetchEnabled: false });

GoalType.toggleCustomAct(true);
export const { Add, Fetch, Edit, Remove, Patch } = GoalType.getAPIHandles();
export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = GoalType.getSelectors();

export { selectData as selectGoalTypes };
