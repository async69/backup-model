import General from "./GeneralEntities";
import Warehouse from "./WarehouseEntities";
import Finance from "./FinanceEntities";
import Sales from "./SalesEntities";
import Purchase from "./PurchaseEntities";
import HR from "./HREntities";
import IT from "./ITEntities";
import { stateName as permissions, reducer as PermissionReducer } from "../Permissions/Mocked/"

export default {
  ...General,
  ...Warehouse,
  ...Finance,
  ...Sales,
  ...Purchase,
  ...HR,
  ...IT,
  [permissions]: PermissionReducer
};
