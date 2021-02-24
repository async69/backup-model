import { FetchAll as fetchItemMasterDatas } from "../store/Inventory/MasterData/items";
import { FetchAll as fetchInventoryItems } from "../store/Inventory/MasterData/inventoryItems";
import { Fetch as fetchWarehouseItemMasterDatas } from "../store/Inventory/Setup/Item/Inventory_Item";
import { Fetch as fetchWarehouseUOM } from "../store/Inventory/Setup/UOM/Warehouse";
import { Fetch as fetchUOMs } from "../store/Inventory/UnitOfMeasurement";
import { Fetch as fetchUOMConversions } from "../store/Inventory/UnitConversion";
import { FetchAll as Warehouses } from "../store/Inventory/Warehouse";
import { FetchAll as Bins } from "../store/Inventory/Bin";
import { Fetch as fetchItemLocations } from "../store/Inventory/Setup/Item/Item_Location/";
import { FetchAll as fetchItemCategories } from "store/Inventory/MasterData/itemCategories";
import { loadStoreRequisitions } from "../store/Inventory/Common/StoreRequisitions/";

export default () => (dispatch) => {
  dispatch(fetchItemLocations());
  dispatch(fetchItemMasterDatas());
  dispatch(fetchItemCategories());
  dispatch(fetchUOMs());
  dispatch(fetchUOMConversions());
  dispatch(Warehouses());
  dispatch(Bins());
  dispatch(fetchWarehouseItemMasterDatas());
  dispatch(fetchWarehouseUOM());
  dispatch(loadStoreRequisitions());
  dispatch(fetchInventoryItems());
};
