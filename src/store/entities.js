import { combineReducers } from "redux";
import filterReducer, { stateName as filter } from "./FilterData";
import partnersReducer from "./partners";
import customersReducer from "./customers";
import vendorsReducer from "./vendors";
import accountPayablesReducer from "./accountPayables";
import accountReceivablesReducer from "./accountReceivables";
import fixedAssetCategoriesReducer from "./fixedAssetCategories";
import trialBalanceReducer, {
  name as trialBalance,
} from "./TrialBalance/trialBalance";
import {
  stateName as entryType,
  reducer as EntryTypeReducer,
} from "./Inventory/EntryType";
import fixedAssetesReducer from "./fixedAssets";
import invoicesReducer from "./invoices";
import permissionReducer, { stateName as permissions } from "./Permissions";
import SalesReturnReducer, {
  stateName as SalesReturn,
} from "./Inventory/SalesReturn";
import PurchaseReturnReducer, {
  stateName as PurchaseReturn,
} from "./Inventory/PurchaseReturn";
import TransferOrderReceiveReducer, {
  stateName as TransferOrderReceive,
} from "./Inventory/TransferOrderReceive";
// ============ FINANCE ROUTES ============
import {
  stateName as chartOfAccounts,
  reducer as ChartOfAccountsReducer,
} from "./Finance/MasterData/ChartsOfAccounts/chartOfAccounts";
import {
  stateName as AccountType,
  reducer as AccountTypeReducer,
} from "./GeneralSetup/AccountTypes";
import {
  stateName as Cities,
  reducer as CitiesReducer,
} from "./GeneralSetup/Cities";
import {
  stateName as Countries,
  reducer as CountriesReducer,
} from "./GeneralSetup/Countries";
import {
  stateName as Regions,
  reducer as RegionsReducer,
} from "./GeneralSetup/Regions";
import {
  stateName as companies,
  reducer as CompanyReducer,
} from "./GeneralSetup/Company";
import {
  stateName as currencies,
  reducer as CurrencyReducer,
} from "./GeneralSetup/Currencies";
import {
  stateName as bank,
  reducer as BankReducer,
} from "./Finance/MasterData/Bank";
import {
  stateName as bankAccount,
  reducer as BankAccountReducer,
} from "./Finance/MasterData/BankAccounts";
import {
  stateName as customers,
  reducer as CustomersReducer,
} from "./Finance/SalesProcess/Customers";

import {
  stateName as customer_ledger_entries,
  reducer as CustomerLedgerEntryReducer,
} from "./Finance/LedgerEntries/CustomerLedgerEntries";
import {
  stateName as general_ledger_entries,
  reducer as GeneralLedgerEntryReducer,
} from "./Finance/LedgerEntries/GeneralLedgers";
import {
  stateName as vendor_ledger_entries,
  reducer as VendorLedgerEntryReducer,
} from "./Finance/LedgerEntries/VendorLedgerEntries";
import {
  stateName as purchase_ledger_entries,
  reducer as PurchaseLedgerEntryReducer,
} from "./Finance/LedgerEntries/PurchaseLedgerEntries";
import {
  stateName as inventory_ledger_entries,
  reducer as InventoryLedgerEntryReducer,
} from "./Finance/LedgerEntries/InventoryLedgerEntries";
import {
  stateName as bank_ledger_entries,
  reducer as BankLedgerEntryReducer,
} from "./Finance/LedgerEntries/BankLedgerEntries/";
import {
  stateName as sales_ledger_entries,
  reducer as SalesLedgerEntryReducer,
} from "./Finance/LedgerEntries/SalesLedgerEntries";
import {
  stateName as vendor_posting_setup,
  reducer as VendorPostingSetupReducer,
} from "./GeneralSetup/Posting/VendorBusinessPostingSetup";
import {
  stateName as inventory_posting_group,
  reducer as InventoryPostingSetupReducer,
} from "./GeneralSetup/Posting/InventoryPostingGroups";

// ============ FINANCE ROUTES ============

// ============ INVENTORY ROUTES ============
import {
  stateName as warehouse_unit_of_measurements,
  reducer as WarehouseUOMReducer,
} from "./Inventory/UnitOfMeasurement";
import {
  stateName as unit_of_measurement_conversions,
  reducer as UnitOfMeasurmentConversionReducer,
} from "./Inventory/UnitConversion";
import {
  stateName as warehouses,
  reducer as WarehouseReducer,
} from "./Inventory/Warehouse";
import BinReducer, { stateName as bin } from "./Inventory/Bin";
import ItemAdjJournalReducer, {
  stateName as item_adjustment_journals,
} from "./Inventory/InventoryControl/ItemAdjJournal";

import ItemAvailabilityReducer, {
  stateName as item_availabilities,
} from "./Inventory/InventoryControl/ItemAvailability";

import ItemAvailabilityByLocationReducer, {
  stateName as item_availabilities_by_location,
} from "./Inventory/InventoryControl/ItemAvailabilityByLocation";
import StockManagementReducer, {
  stateName as StockManagement,
} from "./Inventory/StockManagement";
import StockManagementByLocationReducer, {
  stateName as StockManagementByLocation,
} from "./Inventory/StockManagementByLocation";
import ItemReclassificationJournalReducer, {
  stateName as ItemReclassificationJournal,
} from "./Inventory/ItemReclassificationJournal";
import PhysicalInventoryJournalReducer, {
  stateName as PhysicalInventoryJournal,
} from "./Inventory/PhysicalInventoryJournal";
import purchaseReturnsReducer from "./Inventory/purchaseReturns";
import customersSalesReducer from "./Sales/customers";
import PurchaseRequisitionReducer, {
  stateName as PurchaseRequisition,
} from "./Purchase/PurchaseRequisition";
import PurchaserReducer, {
  stateName as Purchaser,
} from "./Purchase/Purchasers";
import vendorTypesReducer from "./Purchase/VendorTypes";

import salesPersonsReducer from "./Sales/salesPersons";
import salesRegionsReducer from "./Sales/salesRegions";
import salesQuotesReducer from "./Sales/salesQuotes";
import salesOrdersReducer from "./Sales/salesOrders";
import {
  stateName as item_categories,
  reducer as ItemCategoryReducer,
} from "./Inventory/Setup/Item/Item_Categories";
import {
  stateName as vendor_posting_group,
  reducer as VendorPostingGroupReducer,
} from "./GeneralSetup/Posting/Vendor_Posting_Group";
import {
  stateName as vat_posting_group,
  reducer as VATPostingGroupReducer,
} from "./GeneralSetup/Posting/VAT_Posting_Group";
import {
  stateName as vat_posting_setup,
  reducer as VATPostingSetupReducer,
} from "./GeneralSetup/Posting/VAT_Posting_Setup";
import {
  stateName as customer_posting_group,
  reducer as CustomerPostingGroupReducer,
} from "./GeneralSetup/Posting/CustomerPostingGroups";
import {
  stateName as vendors_new,
  reducer as VendorReducer,
} from "./Finance/PurchaseProcess/Vendors";
import {
  stateName as general_business_posting_group,
  reducer as GeneralBusinessPostingGroupReducer,
} from "./GeneralSetup/Posting/GeneralBusinessPostingGroup";
import {
  stateName as general_business_posting_setup,
  reducer as GeneralBusinessPostingSetupReducer,
} from "./GeneralSetup/Posting/GeneralBusinessPostingSetup";
import EntitiesMaster from "./EntityMaster";

//Finance>PurchaseProcess
import purchaseInvoicesReducer from "./Finance/PurchaseProcess/purchaseInvoices";
// Finance>Journals
import purchaseJournalsReducer from "./Finance/Journals/purchaseJournals";
import generalJournalsReducer from "./Finance/Journals/generalJournals";
import paymentJournalsReducer from "./Finance/Journals/paymentJournals";
import cashReceiptJournalsReducer from "./Finance/Journals/cashReceiptJournals";
import salesJournalsReducer from "./Finance/Journals/salesJournals";

export default combineReducers({
  [permissions]: permissionReducer,
  partners: partnersReducer,
  [filter]: filterReducer,
  // ================ WAREHOUSE REDUCERS ================
  [warehouse_unit_of_measurements]: WarehouseUOMReducer,
  [unit_of_measurement_conversions]: UnitOfMeasurmentConversionReducer,
  [warehouses]: WarehouseReducer,

  [inventory_posting_group]: InventoryPostingSetupReducer,
  [item_categories]: ItemCategoryReducer,
  [inventory_ledger_entries]: InventoryLedgerEntryReducer,
  [bank_ledger_entries]: BankLedgerEntryReducer,
  [vendor_posting_group]: VendorPostingGroupReducer,
  [vat_posting_group]: VATPostingGroupReducer,
  [vat_posting_setup]: VATPostingSetupReducer,
  [customer_posting_group]: CustomerPostingGroupReducer,
  [general_ledger_entries]: GeneralLedgerEntryReducer,
  [vendors_new]: VendorReducer,
  [customer_ledger_entries]: CustomerLedgerEntryReducer,
  [vendor_ledger_entries]: VendorLedgerEntryReducer,
  [purchase_ledger_entries]: PurchaseLedgerEntryReducer,
  [sales_ledger_entries]: SalesLedgerEntryReducer,
  [chartOfAccounts]: ChartOfAccountsReducer,
  [AccountType]: AccountTypeReducer,
  [Cities]: CitiesReducer,
  [Countries]: CountriesReducer,
  [Regions]: RegionsReducer,
  [companies]: CompanyReducer,
  [currencies]: CurrencyReducer,
  [bank]: BankReducer,
  [bankAccount]: BankAccountReducer,
  [general_business_posting_group]: GeneralBusinessPostingGroupReducer,
  [general_business_posting_setup]: GeneralBusinessPostingSetupReducer,
  [vendor_posting_setup]: VendorPostingSetupReducer,
  [trialBalance]: trialBalanceReducer,
  [entryType]: EntryTypeReducer,
  [bin]: BinReducer,
  [item_adjustment_journals]: ItemAdjJournalReducer,
  [item_availabilities]: ItemAvailabilityReducer,
  [item_availabilities_by_location]: ItemAvailabilityByLocationReducer,
  [StockManagement]: StockManagementReducer,
  [StockManagementByLocation]: StockManagementByLocationReducer,
  [ItemReclassificationJournal]: ItemReclassificationJournalReducer,
  [PhysicalInventoryJournal]: PhysicalInventoryJournalReducer,
  [SalesReturn]: SalesReturnReducer,
  [PurchaseReturn]: PurchaseReturnReducer,
  [TransferOrderReceive]: TransferOrderReceiveReducer,

  customersSales: customersSalesReducer,
  [PurchaseReturn]: PurchaseReturnReducer,
  [TransferOrderReceive]: TransferOrderReceiveReducer,
  [PurchaseRequisition]: PurchaseRequisitionReducer,
  [Purchaser]: PurchaserReducer,
  vendorTypes: vendorTypesReducer,
  customers: customersReducer,
  vendors: vendorsReducer,
  accountPayables: accountPayablesReducer,
  accountReceivables: accountReceivablesReducer,
  fixedAssetCategories: fixedAssetCategoriesReducer,
  fixedAssets: fixedAssetesReducer,
  invoices: invoicesReducer,
  salesPersons: salesPersonsReducer,
  salesRegions: salesRegionsReducer,
  salesQuotes: salesQuotesReducer,
  salesOrders: salesOrdersReducer,
  purchaseReturns: purchaseReturnsReducer,

  //Finance > Journals
  purchaseJournals: purchaseJournalsReducer,
  generalJournals: generalJournalsReducer,
  paymentJournals: paymentJournalsReducer,
  [customers]: CustomersReducer,
  cashReceiptJournals: cashReceiptJournalsReducer,
  salesJournals: salesJournalsReducer,
  //Finace>Purchase Process
  purchaseInvoices: purchaseInvoicesReducer,
  ...EntitiesMaster,
});
