import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const Department = new StateArrayModel({
  stateName: "department",
});
Department.setURL("/departments");

Department.createSlice();

export const { stateName, reducer } = Department.getEntity();
export const { getLoading } = Department;

Department.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = Department.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = Department.getAPIHandles();

export { selectData as selectDepartments };
