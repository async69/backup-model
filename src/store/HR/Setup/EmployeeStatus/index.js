import entryTypeNames from "constants/entryTypeNames";
import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const EmployeeStatus = new StateArrayModel({
  stateName: "employee_status",
});

EmployeeStatus.setURL(`/entry-types?type=${entryTypeNames.EmployeStatus}`);

EmployeeStatus.createSlice();

export const { stateName, reducer } = EmployeeStatus.getEntity();
export const { getLoading } = EmployeeStatus;

EmployeeStatus.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = EmployeeStatus.getSelectors();

export const {
  Add,
  Fetch,
  Edit,
  Patch,
  Remove,
} = EmployeeStatus.getAPIHandles();

export { selectData as selectEmployeeStatuses };
