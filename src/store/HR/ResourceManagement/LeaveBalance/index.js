import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const LeaveBalance = new StateArrayModel({
  stateName: "leave_balances",
});
LeaveBalance.setURL("/leave-balances");

LeaveBalance.createSlice();

export const { stateName, reducer } = LeaveBalance.getEntity();
export const { getLoading } = LeaveBalance;

LeaveBalance.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = LeaveBalance.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = LeaveBalance.getAPIHandles();

export { selectData as selectLeaveBalances };
