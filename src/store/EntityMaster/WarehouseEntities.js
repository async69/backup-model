import {
  stateName as uom,
  reducer as UOMReducer,
} from "../Inventory/Setup/UOM";
import {
  stateName as warehouse_uom,
  reducer as WarehouseUOMReducer,
} from "../Inventory/Setup/UOM/Warehouse";
import {
  stateName as warehouse_item,
  reducer as WarehouseItemReducer,
} from "../Inventory/Setup/Item/Inventory_Item";
import {
  stateName as item_masterdata,
  reducer as ItemMasterDataReducer,
} from "../Inventory/MasterData/items";
import {
  stateName as item_categories,
  reducer as ItemCategoriesReducer,
} from "../Inventory/MasterData/itemCategories";
import { stateName as bins, reducer as BinResolver } from "../Inventory/Bin/";
import {
  stateName as item_location,
  reducer as ItemLocationReducer,
} from "../Inventory/Setup/Item/Item_Location/";

import {
  stateName as item_reclassification_journal,
  reducer as ItemReclassificationJournalReducer,
} from "../Inventory/InventoryControl/ItemReclassificationJournal/";
import {
  stateName as physical_inventory_journal,
  reducer as PhysicalInventoryJournalReducer,
} from "../Inventory/InventoryControl/PhysicalInventoryJournal/";
import {
  stateName as stock_movement,
  reducer as StockMovementReducer,
} from "../Inventory/StockManagement";
import {
  stateName as stock_movement_by_location,
  reducer as StockMovementByLocationReducer,
} from "../Inventory/StockManagement";

//Warehouse common
import {
  stateName as good_receiving_notes,
  reducer as goodReceivingNotesReducer,
} from "../Inventory/Common/GoodReceivingNotes/";
import {
  stateName as store_issue_vouchers,
  reducer as storeIssueVouchersReducer,
} from "../Inventory/Common/StoreIssueVouchers";
import {
  stateName as purchase_returns,
  reducer as purchaseReturnsReducer,
} from "../Inventory/Common/PurchaseReturn";
import {
  stateName as sales_returns,
  reducer as salesReturnsReducer,
} from "../Inventory/Common/SalesRetrun";
import {
  stateName as disposals,
  reducer as disposalsReducer,
} from "../Inventory/Common/Disposal";
import {
  stateName as inventory_item,
  reducer as inventoryItemReducer,
} from "../Inventory/MasterData/inventoryItems";

import transferOrderIssuesReducer from "../Inventory/Common/TransferOrderIssues";
import transferOrderReceivesReducer from "../Inventory/Common/TransferOrderReceives";
import storeRequisitionsReducer from "../Inventory/Common/StoreRequisitions";

export default {
  [uom]: UOMReducer,
  [item_masterdata]: ItemMasterDataReducer,
  [item_categories]: ItemCategoriesReducer,
  [bins]: BinResolver,
  [warehouse_uom]: WarehouseUOMReducer,
  [warehouse_item]: WarehouseItemReducer,
  [item_location]: ItemLocationReducer,

  //Inventory Control
  [item_reclassification_journal]: ItemReclassificationJournalReducer,
  [physical_inventory_journal]: PhysicalInventoryJournalReducer,
  [stock_movement]: StockMovementReducer,
  [stock_movement_by_location]: StockMovementByLocationReducer,

  //warehouse common
  [good_receiving_notes]: goodReceivingNotesReducer,
  [store_issue_vouchers]: storeIssueVouchersReducer,
  [purchase_returns]: purchaseReturnsReducer,
  storeIssueVouchers: storeIssueVouchersReducer,
  storeRequisitions: storeRequisitionsReducer,
  transferOrderIssues: transferOrderIssuesReducer,
  transferOrderReceives: transferOrderReceivesReducer,
  [sales_returns]: salesReturnsReducer,
  [disposals]: disposalsReducer,
  [inventory_item]: inventoryItemReducer,
};
