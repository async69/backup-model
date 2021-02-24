import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const EmployeeOvertime = new StateArrayModel({
  stateName: "employee_overtimes",
});
EmployeeOvertime.setURL("/employee-overtimes");

EmployeeOvertime.createSlice();

export const { stateName, reducer } = EmployeeOvertime.getEntity();
export const { getLoading } = EmployeeOvertime;

EmployeeOvertime.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = EmployeeOvertime.getSelectors();

export const {
  Add,
  Fetch,
  Edit,
  Patch,
  Remove,
} = EmployeeOvertime.getAPIHandles();

export { selectData as selectEmployeeOvertimes };
