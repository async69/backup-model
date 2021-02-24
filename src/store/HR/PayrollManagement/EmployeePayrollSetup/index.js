import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const EmployeePayrollSetup = new StateArrayModel({
  stateName: "employee_payrol_setup",
});
EmployeePayrollSetup.setURL("/employee-salaries");

EmployeePayrollSetup.createSlice();

export const { stateName, reducer } = EmployeePayrollSetup.getEntity();
export const { getLoading } = EmployeePayrollSetup;

EmployeePayrollSetup.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = EmployeePayrollSetup.getSelectors();

export const {
  Add,
  Fetch,
  Edit,
  Patch,
  Remove,
} = EmployeePayrollSetup.getAPIHandles();

export { selectData as selectEmployeePayrollSetups };
