import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const SalaryIncomeTax = new StateArrayModel({
  stateName: "salary_income_taxes",
});
SalaryIncomeTax.setURL("/salary-income-taxes");

SalaryIncomeTax.createSlice();

export const { stateName, reducer } = SalaryIncomeTax.getEntity();
export const { getLoading } = SalaryIncomeTax;

SalaryIncomeTax.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = SalaryIncomeTax.getSelectors();

export const {
  Add,
  Fetch,
  Edit,
  Patch,
  Remove,
} = SalaryIncomeTax.getAPIHandles();

export { selectData as selectSalaryIncomeTaxes };
