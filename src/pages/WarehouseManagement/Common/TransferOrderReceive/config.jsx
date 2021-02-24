import Joi from "joi-browser";

export const saveLineTag = "good_receiving_note_lines";

export const apiLineTag = "tor_lines";

export const mainSchema = {
  id: Joi.any().allow("").optional(),
  transferOrderIssueNumber: Joi.string().required().label("transferOrderIssueNumber"),
  postingDate: Joi.string().required().label("postingDate"),
  remark: Joi.any().allow("").optional(),
  good_receiving_note_lines: Joi.array().items(Joi.object()).min(1),
};

export const initialState = {
  data: {
    id: "",
    transferOrderIssueNumber: "",
    postingDate: "",
    remark: "",
    good_receiving_note_lines: [],
  },
  errors: {},
  selectedLine: "",
  lineCounter: 1,
};

export const populateState = (data, lineMapper) => {
  return {
    id: data.id ? data.id : "",
    transferOrderIssueNumber: String(data.transfer_order_issue_detail.id),
    postingDate: data.posting_date,
    remark: data.remarks,
    [saveLineTag]: lineMapper(),
  };
};

export const lineContentMapper = (data, lineTag = saveLineTag) => {
  return data[lineTag].map((line) => ({
    id: line.id,
    remaining_quantity: line.remaining_quantity,
    remark: line.remarks,
    item: line.item_detail.id,
    fromWarehouse: line.from_warehouse_detail.id,
    fromBin: line.from_bin_detail.id,
    toWarehouse: line.to_warehouse_detail.id,
    toBin: line.to_bin_detail.id,
    quantity_requested: line.quantity_requested,
    quantityReceived: line.quantity_received,
    unit_of_measurement: line.unit_of_measurement_detail.id,
  }));
};

export const lineSchema = {
  _id: Joi.any().allow("").optional(),
  item: Joi.string(),
  fromWarehouse: Joi.string(),
  fromBin: Joi.string(),
  toWarehouse: Joi.string(),
  toBin: Joi.string(),
  remaining_quantity: Joi.number(),
  quantity_requested: Joi.number(),
  quantityReceived: Joi.number(),
  unit_of_measurement: Joi.string(),
  remark: Joi.string().allow("").optional(),
};

export const getColumns = (data) => {
  const { itemMasterDatas, UOMs, bins, itemLocations } = data;
  return [
    {
      tag: "item",
      label: "Item Name",
      type: "select",
      options: itemMasterDatas,
      optionsFrom: "server",
    },
    {
      tag: "fromWarehouse",
      label: "From Warehouse",
      type: "select",
      options: itemLocations,
      optionsFrom: "server",
    },
    {
      tag: "fromBin",
      label: "Bin",
      type: "select",
      options: bins,
      optionsFrom: "server",
    },
    {
      tag: "toWarehouse",
      label: "To Warehouse",
      type: "select",
      options: itemLocations,
      optionsFrom: "server",
    },
    {
      tag: "toBin",
      label: "To Bin",
      type: "select",
      options: bins,
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
    {
      tag: "quantityReceived",
      label: "Quantity Received",
      type: "number",
    },
    {
      tag: "unit_of_measurement",
      label: "Unit of Measurement",
      type: "select",
      options: UOMs,
      optionsFrom: "server",
    },
    { tag: "remark", label: "Remarks", type: "text" },
  ];
};
