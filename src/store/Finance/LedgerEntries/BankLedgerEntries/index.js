import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";

const BankLedgerEntries = new StateArrayModel({
  stateName: "bank_ledger_entries",
});
BankLedgerEntries.setURL("/bank-ledgers");

BankLedgerEntries.createSlice();

export const { stateName, reducer } = BankLedgerEntries.getEntity();

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = BankLedgerEntries.getSelectors();

export const { Add, Fetch, Edit, Remove } = BankLedgerEntries.getAPIHandles();

export { selectData as selectBankLedgerEntries };
