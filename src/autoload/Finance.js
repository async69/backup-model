import { Fetch as fetchCustomers } from "../store/Finance/SalesProcess/Customers/";
import { Fetch as fetchFiscalYears } from "../store/Finance/Setup/FiscalYear/";
// import { Fetch as fetchPeriods } from "../store/Finance/Setup/Period";
// import { Fetch as fetchFinanceItems } from "../store/Finance/Setup/FinanceItem/";
import { FetchAll as fetchBankAccounts } from "../store/Finance/MasterData/BankAccounts";
import { Fetch as fetchBanks } from "store/Finance/MasterData/Bank";
import { FetchAll as fetchChartOfAccounts } from "store/Finance/MasterData/ChartsOfAccounts/chartOfAccounts";
import { Fetch as fetchTrialBalances } from "store/Finance/Reports/TrialBalance";

export default () => (dispatch) => {
  dispatch(fetchCustomers());
  dispatch(fetchFiscalYears());
  // dispatch(fetchPeriods());
  dispatch(fetchBankAccounts());
  dispatch(fetchBanks());
  dispatch(fetchChartOfAccounts());
  dispatch(fetchTrialBalances());
};
