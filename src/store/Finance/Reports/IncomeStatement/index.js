import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";

const IncomeStatement = new StateArrayModel({ stateName: "income_statement" });

IncomeStatement.createSlice();
IncomeStatement.setURL("/income-statement");

export const { reducer, stateName } = IncomeStatement.getEntity();

export const { Add, Fetch, Edit, Remove } = IncomeStatement.getAPIHandles();

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = IncomeStatement.getSelectors();

export { selectData as selectIncomeStatements };
