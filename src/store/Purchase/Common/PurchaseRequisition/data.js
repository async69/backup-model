import { generateArray, types, tags } from "../../../../helpers/Generator/";

const props = {
  id: {
    type: types.string,
    tag: tags.id,
  },
  document_number: { //
    type: types.string, tag: tags.id
  },
  vendor_detail: { // to vendor
    type: types.object_detail
  },
  requestor_department_detail: { // to string of requester_department
    type: types.object_detail
  },
  purchase_type_detail: { // to purchase_type
    type: types.object_detail
  },
  expected_delivery_date: { // to expected_delivery_date
    type: types.date
  },
  purchaser: {
    type: types.string, tag: tags.name // probably null but tag=purchaser
  },
  request_purpose: { // to requested_purpose
    type: types.string
  },
  requested_by: { // probably null but tag=requested_by
    type: types.string
  },
  prepared_by: { // probably null but tag=prepared_by
    type: types.string
  },
  request_date: { type: types.date }, // to requested_date
  posting_date: { type: types.timestamp }, //
  approved_by: { type: types.string },  // probably null but tag=approved_by
  approved_date: { type: types.timestamp }, //
  approved_request_date: { type: types.timestamp }, // to approval_requested_date
  status: { type: types.status }, //
  remarks: { //
    type: types.string
  },
  created_at: { type: types.timestamp },
  updated_at: { type: types.timestamp },
  purchase_requisition_lines: {
    type: types.array,
    length: 6,
    props: {
      item: { type: types.string, tag: tags.id }, // to detailed object item
      quantity: { type: types.number }, //
      unit_measure: { type: types.string, tag: tags.id }, // to detailed object unit_of_measurement
      unit_price: { type: types.number }, // but needs to be changed to number
      total_amount: { type: types.number }, // to total and needs to be changed to number
      currency: { type: types.string, tag: tags.id }, // to detailed object currency
      remarks: { type: types.string },
    },
  },
};

export default () => {
  const fetchedData = generateArray(21, props);
  return {
    count: fetchedData.length,
    results: fetchedData.slice(0, 5),
  };
};
