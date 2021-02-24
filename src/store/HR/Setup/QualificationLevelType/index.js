import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";
import { simulateLogic } from "./logic";

const QualificationLevelType = new StateArrayModel({
  stateName: "qualification_level_type",
});
QualificationLevelType.setURL("/qualification-level-type");
QualificationLevelType.createSlice();

export const { stateName, reducer } = QualificationLevelType.getEntity();

QualificationLevelType.enableCustomAct((dispatch, action) => {
  const response = QualificationLevelType.getAPICallType(
    action.payload.onSuccess
  );
  if (response) {
    const { type, apiType } = response;
    simulateLogic({
      type,
      apiType,
      dispatch,
      action,
    });
  }
});

QualificationLevelType.enableResults({ fetchEnabled: false });

QualificationLevelType.toggleCustomAct(true);
export const {
  Add,
  Fetch,
  Edit,
  Remove,
  Patch,
} = QualificationLevelType.getAPIHandles();
export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = QualificationLevelType.getSelectors();

export { selectData as selectQualificationLevelTypes };
