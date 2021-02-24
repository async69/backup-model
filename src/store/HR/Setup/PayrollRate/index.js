import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const PayrollRate = new StateArrayModel({
  stateName: "payroll_rates",
});
PayrollRate.setURL("/payroll-rates");

PayrollRate.createSlice();

export const { stateName, reducer } = PayrollRate.getEntity();
export const { getLoading } = PayrollRate;

PayrollRate.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = PayrollRate.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = PayrollRate.getAPIHandles();

export { selectData as selectPayrollRates };
