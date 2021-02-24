import entryTypeNames from "constants/entryTypeNames";
import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const LeaveType = new StateArrayModel({
  stateName: "leave_type",
});

LeaveType.setURL(`/entry-types?type=${entryTypeNames.LeaveType}`);

LeaveType.createSlice();

export const { stateName, reducer } = LeaveType.getEntity();
export const { getLoading } = LeaveType;

LeaveType.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = LeaveType.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = LeaveType.getAPIHandles();

export { selectData as selectLeaveTypes };
