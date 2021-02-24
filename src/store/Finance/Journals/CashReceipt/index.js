import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";

const CashReceiptJournal = new StateArrayModel({
  stateName: "new_cash_receipt_journals",
});
CashReceiptJournal.setURL("/cash-receipt-journals");

CashReceiptJournal.createSlice();

export const { stateName, reducer } = CashReceiptJournal.getEntity();

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = CashReceiptJournal.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = CashReceiptJournal.getAPIHandles();

export { selectData as selectCashReceiptJournals };