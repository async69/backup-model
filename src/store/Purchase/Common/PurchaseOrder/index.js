import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel"
import { simulateLogic } from "./logic"

const PurchaseOrder = new StateArrayModel({ stateName: "new_purchase_orders" })
PurchaseOrder.setURL("/purchase-orders")

const defaultMapper = (data) => ({
  ...data,
  vendor_detail: data.vendor,
  requestor_department_detail: { name: data.requester_department },
  purchase_type_detail: data.purchase_type,
  purchase_requisition_detail: data.purchase_requestion,
  purchaser: String(data.purchaser),
  request_purpose: data.requested_purpose,
  requested_by: String(data.requested_by),
  prepared_by: String(data.prepared_by),
  request_date: data.requested_date,
  approved_by: String(data.approved_by),
  approved_request_date: data.approval_requested_date,
  purchase_order_lines: data.purchase_order_lines.map(line => ({
    ...line,
    unit_measure: line.unit_of_measurement.id,
    unit_price: Number(line.unit_price),
    total_amount: Number(line.total),
    currency: line.currency? line.currency.id : ""
  }))
})

const defaultRequest = (data) => ({
  ...data,
  "purchase_order_lines": data.purchase_order_lines.map(line => ({
    ...line,
    "unit_of_measurement": line.unit_measure,
    "currency": line.currency,
    "discount_method": line.discount_type,
    "discount": line.discount_amount
  })),
  "requested_date": data.request_date,
  "approval_requested_date": "2021-03-03",
  "requested_purpose": data.request_purpose,
  "requester_department": data.requestor_department,
  "remarks": data.remarks,
  "vendor": data.vendor,
  "purchase_requestion": data.purchase_requisition,
  "order_date": data.order_date,
  "purchaser": data.purchaser,
})

PurchaseOrder.setAPIResponses({
  Fetch: (response) => response.map(data => defaultMapper(data)),
  Add: response => defaultMapper(response),
  Edit: response => defaultMapper(response),
})

PurchaseOrder.setAPICalls({
  Add: (data) => defaultRequest(data),
  Edit: (data) => defaultRequest(data),
})

PurchaseOrder.createSlice()

PurchaseOrder.enableCustomAct((dispatch, action) => {
  const response = PurchaseOrder.getAPICallType(action.payload.onSuccess)
  if (response) {
    const { type, apiType } = response
    simulateLogic({
      type,
      apiType,
      dispatch,
      action
    })
  }
})

PurchaseOrder.toggleCustomAct(false)

export const { Add, Fetch, Edit, Remove, Patch } = PurchaseOrder.getAPICalls()
export const { stateName, reducer } = PurchaseOrder.getEntity()

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectPatchStatus,
  selectData,
} = PurchaseOrder.getSelectors()

export { selectData as selectPurchaseOrders }

export const { getLoading } = PurchaseOrder