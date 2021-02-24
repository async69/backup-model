import { HRRoutes } from "./HRRoutes";
import { PurchaseRoutes } from "./PurchaseRoutes";
import { DashboardRoutes } from "./DashboardRoutes";
import { SalesRoutes } from "./SalesRoutes";
import { WarehouseRoutes } from "./WarehouseRoutes";
import { FinanceRoutes } from "./FinanceRoutes";

export default {
  ...HRRoutes,
  ...DashboardRoutes,
  ...SalesRoutes,
  ...WarehouseRoutes,
  ...FinanceRoutes,
  ...PurchaseRoutes,

  homePage: "/",
};
