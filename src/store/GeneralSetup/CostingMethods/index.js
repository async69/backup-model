import StateArrayModel from "../../../wrappers/StateModels/StateArrayModel";

const url = "/costing-methods";
const CostingMethod = new StateArrayModel({ stateName: "costing_method" });

CostingMethod.createSlice();
CostingMethod.setURL(url);

// CostingMethod.enableResults({ fetchEnabled: false });

export const { reducer, stateName } = CostingMethod.getEntity();

export const { Add, Fetch, Edit, Remove } = CostingMethod.getAPIHandles();

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = CostingMethod.getSelectors();

export { selectData as selectCostingMethods };
