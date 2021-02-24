import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";
import { simulateLogic } from "./logic";

const PurchaseRequisition = new StateArrayModel({
  stateName: "new_purchase_requisitions",
});
PurchaseRequisition.setURL("/purchase-requestions");

const defaultMapper = (data) => ({
  ...data,
  vendor_detail: data.vendor,
  requestor_department_detail: { name: data.requester_department },
  purchase_type_detail: data.purchase_type,
  purchaser: String(data.purchaser),
  request_purpose: data.requested_purpose,
  requested_by: String(data.requested_by),
  prepared_by: String(data.prepared_by),
  request_date: data.requested_date,
  approved_by: String(data.approved_by),
  approved_request_date: data.approval_requested_date,
  purchase_requisition_lines: data.purchase_requestion_lines.map((line) => ({
    ...line,
    // unit_measure: line.unit_of_measurement.id,
    // unit_price: Number(line.unit_price),
    // total_amount: Number(line.total),
    // currency: line.currency ? line.currency.id : "",
  })),
});

const defaultRequest = (data) => ({
  ...data,
  purchase_requestion_lines: data.purchase_requisition_lines.map((line) => ({
    ...line,
    total: String(line.total_amount),
    unit_of_measurement: line.unit_measure,
    currency: line.currency,
  })),
  requested_date: data.request_date,
  approval_requested_date: "2021-03-03",
  requested_purpose: data.request_purpose,
  requester_department: data.requestor_department,
  remarks: data.remarks,
  vendor: data.vendor,
  purchaser: data.purchaser,
});

PurchaseRequisition.setAPIResponses({
  Fetch: (response) => response.map((data) => defaultMapper(data)),
  Add: (response) => defaultMapper(response),
  Edit: (response) => defaultMapper(response),
});

PurchaseRequisition.setAPICalls({
  Add: (data) => defaultRequest(data),
  Edit: (data) => defaultRequest(data),
});

PurchaseRequisition.createSlice();

PurchaseRequisition.enableCustomAct((dispatch, action) => {
  const response = PurchaseRequisition.getAPICallType(action.payload.onSuccess);
  if (response) {
    const { type, apiType } = response;
    simulateLogic({
      type,
      apiType,
      dispatch,
      action,
    });
  }
});

PurchaseRequisition.toggleCustomAct(false);

export const { stateName, reducer } = PurchaseRequisition.getEntity();

export const {
  Add,
  Fetch,
  Edit,
  Remove,
  Patch,
} = PurchaseRequisition.getAPICalls();

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectPatchStatus,
  selectData,
} = PurchaseRequisition.getSelectors();

export { selectData as selectPurchaseRequisitions };

export const { getLoading } = PurchaseRequisition;
