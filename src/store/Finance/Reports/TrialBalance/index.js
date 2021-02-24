import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";

const TrialBalance = new StateArrayModel({ stateName: "trial_balance" });

TrialBalance.createSlice();
TrialBalance.setURL("/trial-balance");

export const { reducer, stateName } = TrialBalance.getEntity();

export const { Add, Fetch, Edit, Remove } = TrialBalance.getAPIHandles();

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = TrialBalance.getSelectors();

export { selectData as selectTrialBalance };
