import entryTypeNames from "constants/entryTypeNames";
import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const CertificationType = new StateArrayModel({
  stateName: "certification_type",
});

CertificationType.setURL(
  `/entry-types?type=${entryTypeNames.CertificationType}`
);

CertificationType.createSlice();

export const { stateName, reducer } = CertificationType.getEntity();
export const { getLoading } = CertificationType;

CertificationType.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = CertificationType.getSelectors();

export const {
  Add,
  Fetch,
  Edit,
  Patch,
  Remove,
} = CertificationType.getAPIHandles();

export { selectData as selectCertificationTypes };
