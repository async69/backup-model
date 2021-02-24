import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const Employee = new StateArrayModel({
  stateName: "employee",
});
Employee.setURL("/employees");

Employee.createSlice();

export const { stateName, reducer } = Employee.getEntity();
export const { getLoading } = Employee;

Employee.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = Employee.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = Employee.getAPIHandles();

export { selectData as selectEmployees };
