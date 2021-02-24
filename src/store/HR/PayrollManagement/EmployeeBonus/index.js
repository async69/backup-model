import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const EmployeeBonus = new StateArrayModel({
  stateName: "employee_bonuses",
});
EmployeeBonus.setURL("/employee-bonus");

EmployeeBonus.createSlice();

export const { stateName, reducer } = EmployeeBonus.getEntity();
export const { getLoading } = EmployeeBonus;

EmployeeBonus.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = EmployeeBonus.getSelectors();

export const {
  Add,
  Fetch,
  Edit,
  Patch,
  Remove,
} = EmployeeBonus.getAPIHandles();

export { selectData as selectEmployeeBonuss };
