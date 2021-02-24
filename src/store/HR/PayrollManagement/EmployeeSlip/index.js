import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const EmployeeSlip = new StateArrayModel({
  stateName: "employee_slip",
});
EmployeeSlip.setURL("/employee-slip");

EmployeeSlip.createSlice();

export const { stateName, reducer } = EmployeeSlip.getEntity();
export const { getLoading } = EmployeeSlip;

// EmployeeSlip.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = EmployeeSlip.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = EmployeeSlip.getAPIHandles();

export { selectData as selectEmployeeSlips };
