import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";

const CashPayment = new StateArrayModel({
  stateName: "new_cash_payment_journals",
});
CashPayment.setURL("/cash-payment-journals");

CashPayment.createSlice();

export const { stateName, reducer } = CashPayment.getEntity();

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = CashPayment.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = CashPayment.getAPIHandles();

export { selectData as selectCashPaymentJournals };
