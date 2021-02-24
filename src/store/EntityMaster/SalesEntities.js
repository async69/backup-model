import { stateName as customer, reducer as CustomerReducer } from "../Sales/MasterData/Customer/"
import { stateName as sales_order, reducer as SalesOrderReducer } from "../Sales/Common/SalesOrder/"
import { stateName as sales_region, reducer as SalesRegionReducer } from "../Sales/Setup/SalesRegion"

export default {
    [customer]: CustomerReducer,
    [sales_order]: SalesOrderReducer,
    [sales_region]: SalesRegionReducer
}