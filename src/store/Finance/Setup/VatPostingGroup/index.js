import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const VatPostingGroup = new StateArrayModel({
  stateName: "vat-posting-group",
});

VatPostingGroup.setInitialState();
VatPostingGroup.createSlice();
VatPostingGroup.setURL("/vat-posting-setups");
VatPostingGroup.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = VatPostingGroup.getSelectors();

export const { stateName, reducer } = VatPostingGroup.getEntity();

export { selectData as selectVatPostingGroups };

export const { Add, Edit, Fetch, Remove } = VatPostingGroup.getAPIHandles();
