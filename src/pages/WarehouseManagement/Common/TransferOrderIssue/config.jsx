import Joi from "joi-browser";

export const saveLineTag = "toi_lines";

export const apiLineTag = "toi_lines";

export const mainSchema = {
  id: Joi.any().allow("").optional(),
  document_number: Joi.string().allow("").optional(),
  issued_by: Joi.number(),
  posting_date: Joi.date(),
  approved_by: Joi.number(),
  approved_date: Joi.date(),
  remarks: Joi.string(),
  status: Joi.string(),
  store_requisition: Joi.string(),
  toi_lines: Joi.array().items(Joi.object()).min(1),
};

export const initialState = {
  data: {
    document_number: "",
    issued_by: "",
    posting_date: "",
    approved_by: 0,
    approved_date: "",
    remarks: "",
    status: "",
    store_requisition: "",
    toi_lines: [],
  },
  errors: {},
  selectedLine: "",
  lineCounter: 1,
};

export const populateState = (transferOrderIssue, lineMapper) => {
  return {
    id: transferOrderIssue.id,
    document_number: transferOrderIssue.document_number,
    issued_by: transferOrderIssue.issued_by,
    posting_date: transferOrderIssue.posting_date,
    approved_by: transferOrderIssue.approved_by,
    approved_date: transferOrderIssue.approved_date,
    remarks: transferOrderIssue.remarks,
    status: transferOrderIssue.status,
    store_requisition: transferOrderIssue.store_requisition_detail.id,
    [saveLineTag]: lineMapper(),
  };
};

export const lineContentMapper = (data, lineTag = saveLineTag) => {
  return data[lineTag].map((line) => ({
    id: line.id,
    remaining_quantity: line.remaining_quantity,
    quantity_requested: line.quantity_requested,
    quantity_issued: line.quantity_issued,
    remarks: line.remarks,
    item: line.item_detail.id,
    unit_of_measurement: line.unit_of_measurement_detail.id,
    from_warehouse: line.from_warehouse_detail.id,
    to_warehouse: line.to_warehouse_detail.id,
    from_bin: line.from_bin_detail.id,
    to_bin: line.to_bin_detail.id,
  }));
};

export const lineSchema = {
  _id: Joi.any().allow("").optional(),
  remaining_quantity: Joi.string(),
  quantity_requested: Joi.number(),
  quantity_issued: Joi.number(),
  remarks: Joi.string(),
  item: Joi.string(),
  unit_of_measurement: Joi.string(),
  from_warehouse: Joi.string(),
  to_warehouse: Joi.string(),
  from_bin: Joi.string(),
  to_bin: Joi.string(),
};

export const getColumns = (options) => {
  const { items, unitOfMeasurements, bins, warehouses } = options;
  return [
    {
      tag: "item",
      label: "Item Name",
      type: "select",
      options: items,
      optionsFrom: "server",
    },
    {
      tag: "from_bin",
      label: "From Bin",
      type: "select",
      options: bins,
      optionsFrom: "server",
    },
    {
      tag: "to_bin",
      label: "To Bin",
      type: "select",
      options: bins,
      optionsFrom: "server",
    },
    {
      tag: "from_warehouse",
      label: "From Warehouse",
      type: "select",
      options: warehouses,
      optionsFrom: "server",
    },
    {
      tag: "to_warehouse",
      label: "To Warehouse",
      type: "select",
      options: warehouses,
      optionsFrom: "server",
    },
    {
      tag: "unit_of_measurement",
      label: "Unit of Measurement",
      type: "select",
      options: unitOfMeasurements,
      optionsFrom: "server",
    },

    {
      tag: "remaining_quantity",
      label: "Remaining Quantity",
      type: "number",
    },
    {
      tag: "quantity_requested",
      label: "Quantity Requested",
      type: "number",
    },
    { tag: "quantity_issued", label: "Quantity issued", type: "number" },
    { tag: "remarks", label: "Remarks", type: "text" },
  ];
};
