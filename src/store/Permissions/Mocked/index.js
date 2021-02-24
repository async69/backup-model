import StateArrayModel from "../../../wrappers/StateModels/StateObjectModel";
import { fetchPermissions } from '../../../helpers/binaryConvertor'
import { simulateLogic } from "./logic";

const url = "/it-employees";
const Permissions = new StateArrayModel({ stateName: "new_permissions" });

Permissions.createSlice();
Permissions.setURL(url);

export const { reducer, stateName } = Permissions.getEntity();

export const { Fetch, Edit } = Permissions.getAPIHandles();

Permissions.enableCustomAct((dispatch, action) => {
  const response = Permissions.getAPICallType(action.payload.onSuccess);
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
  selectData,
} = Permissions.getSelectors();

export { selectData as selectPermissions };

export const getPermissions = (state) => {
  const data = selectData(state)
  let objectSet = {}
  for (var prop in data) {
    objectSet[prop] = fetchPermissions(data[prop])
  }
  return data
}