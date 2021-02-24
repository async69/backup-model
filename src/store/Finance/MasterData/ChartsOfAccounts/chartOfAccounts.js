import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";
const url = "/charts-of-accounts";

const ChartOfAccounts = new StateArrayModel({ stateName: "chart_of_accounts" });

ChartOfAccounts.createSlice();
ChartOfAccounts.setURL(url);

export const { reducer, stateName } = ChartOfAccounts.getEntity();

export const {
  Add,
  Fetch,
  Edit,
  Remove,
  FetchAll,
} = ChartOfAccounts.getAPIHandles();

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = ChartOfAccounts.getSelectors();

export { selectData as selectChartOfAccounts };

export default reducer;
