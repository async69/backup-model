import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";
import { simulateLogic } from "./logic";

const Employee = new StateArrayModel({ stateName: "employee" });

Employee.createSlice();

export const { stateName, reducer } = Employee.getEntity();

export const { Add, Fetch, Edit, Remove, Patch } = Employee.getAPIHandles();

Employee.enableCustomAct((dispatch, action) => {
  const response = Employee.getAPICallType(action.payload.onSuccess);
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
} = Employee.getSelectors();

export { selectData as selectEmployees };
