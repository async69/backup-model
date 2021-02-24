import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const PayrollProcess = new StateArrayModel({
  stateName: "payroll_process",
});
PayrollProcess.setURL("/employee-payroll");

PayrollProcess.createSlice();

export const { stateName, reducer } = PayrollProcess.getEntity();
export const { getLoading } = PayrollProcess;

// PayrollProcess.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = PayrollProcess.getSelectors();

export const {
  Add,
  Fetch,
  Edit,
  Patch,
  Remove,
} = PayrollProcess.getAPIHandles();

export { selectData as selectPayrollProcesss };
