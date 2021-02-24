import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";

const WithHoldingTax = new StateArrayModel({
  stateName: "new_withholding_tax",
});

WithHoldingTax.createSlice();
WithHoldingTax.setURL("/withholding-vat-setups");

export const { reducer, stateName } = WithHoldingTax.getEntity();

export const { Add, Fetch, Edit, Remove } = WithHoldingTax.getAPIHandles();

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = WithHoldingTax.getSelectors();

export { selectData as selectWithHoldingTaxes };

export default reducer;
