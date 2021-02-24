import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";

const BalanceSheet = new StateArrayModel({ stateName: "balance_sheet" });

BalanceSheet.createSlice();
BalanceSheet.setURL("/balance-sheet");

export const { reducer, stateName } = BalanceSheet.getEntity();

export const { Add, Fetch, Edit, Remove } = BalanceSheet.getAPIHandles();

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = BalanceSheet.getSelectors();

export { selectData as selectBalanceSheet };
