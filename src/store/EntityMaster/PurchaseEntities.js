import { stateName as vendors, reducer as VendorReducer } from "../Purchase/MasterData/Vendor"
import { stateName as vendor_type, reducer as VendorTypeReducer } from "../Purchase/Setup/VendorType/"
import { stateName as purchase_type, reducer as PurchaseTypeReducer } from "../Purchase/Setup/PurchaseType"
import { stateName as purchase_order, reducer as PurchaseOrderReducer } from "../Purchase/Common/PurchaseOrder"
import { stateName as purchase_requisition, reducer as PurchaseRequisitionReducer } from "../Purchase/Common/PurchaseRequisition"

export default {
    [vendors]: VendorReducer,
    [vendor_type]: VendorTypeReducer,
    [purchase_type]: PurchaseTypeReducer,
    [purchase_order]: PurchaseOrderReducer,
    [purchase_requisition]: PurchaseRequisitionReducer
}