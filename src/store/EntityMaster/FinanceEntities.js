import {
  stateName as sales_invoice,
  reducer as SalesInvoiceReducer,
} from "../Finance/SalesProcess/SalesInvoice/";
import {
  stateName as fiscal_year,
  reducer as FiscalYearReducer,
} from "../Finance/Setup/FiscalYear/";
import {
  stateName as period,
  reducer as PeriodReducer,
} from "../Finance/Setup/Period/";
import {
  stateName as withholding_tax,
  reducer as WithHoldingTaxReducer,
} from "../Finance/Setup/WithholdingTax";
import {
  stateName as cash_payment,
  reducer as CashPaymentReducer,
} from "../Finance/CashManagement/CashPayment";
import {
  stateName as cash_receipt,
  reducer as CashReceiptReducer,
} from "../Finance/CashManagement/CashReceipts";
import {
  stateName as purchase_invoice,
  reducer as PurchaseInvoiceReducer,
} from "../Finance/PurchaseProcess/PurchaseInvoice/";
// import {
//   stateName as finance_item,
//   reducer as FinanceItemReducer,
// } from "../Finance/Setup/FinanceItem/";
import {
  stateName as finance_stock_movements,
  reducer as FinanceStockMovementReducer,
} from "../Finance/InventoryContent/StockMovement/";
import {
  stateName as item_ledger_entries,
  reducer as ItemLedgerEntriesReducer,
} from "../Finance/LedgerEntries/ItemLedgerEntries/";
import {
  stateName as cash_receipt_journal,
  reducer as CashReceiptJournalReducer,
} from "../Finance/Journals/CashReceipt/";
import {
  stateName as cash_payment_journal,
  reducer as CashPaymentJournalReducer,
} from "../Finance/Journals/CashPayment/";
import {
  stateName as banks,
  reducer as BanksReducer,
} from "../Finance/MasterData/Bank";
import {
  stateName as general_journal_new,
  reducer as GeneralJournalReducer,
} from "../Finance/Journals/GeneralJournal/";
import {
  stateName as balance_sheet,
  reducer as BalanceSheetReducer,
} from "../Finance/Reports/BalanceSheet";
import {
  stateName as trial_balance,
  reducer as TrialBalanceReducer,
} from "../Finance/Reports/TrialBalance";

import {
  stateName as income_statement,
  reducer as IncomeStatementReducer,
} from "../Finance/Reports/IncomeStatement";

export default {
  [sales_invoice]: SalesInvoiceReducer,
  [fiscal_year]: FiscalYearReducer,
  [period]: PeriodReducer,
  [withholding_tax]: WithHoldingTaxReducer,
  [cash_payment]: CashPaymentReducer,
  [cash_receipt]: CashReceiptReducer,
  [purchase_invoice]: PurchaseInvoiceReducer,
  // [finance_item]: FinanceItemReducer,
  [finance_stock_movements]: FinanceStockMovementReducer,
  [item_ledger_entries]: ItemLedgerEntriesReducer,

  // Journals
  [cash_receipt_journal]: CashReceiptJournalReducer,
  [cash_payment_journal]: CashPaymentJournalReducer,
  [general_journal_new]: GeneralJournalReducer,

  //Setups
  [banks]: BanksReducer,
  [balance_sheet]: BalanceSheetReducer,

  //Reports
  [trial_balance]: TrialBalanceReducer,
  [income_statement]: IncomeStatementReducer,
};
