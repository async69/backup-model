import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const SavePayrollProcess = new StateArrayModel({
  stateName: "save_payroll_process",
});
SavePayrollProcess.setURL("/employee-payrolls");

SavePayrollProcess.createSlice();

export const { stateName, reducer } = SavePayrollProcess.getEntity();
export const { getLoading } = SavePayrollProcess;

SavePayrollProcess.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = SavePayrollProcess.getSelectors();

export const {
  Add,
  Fetch,
  Edit,
  Patch,
  Remove,
} = SavePayrollProcess.getAPIHandles();

export { selectData as selectSavePayrollProcesss };
