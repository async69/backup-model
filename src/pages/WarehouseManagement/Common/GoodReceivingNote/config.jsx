import Joi from "joi-browser";

export const saveLineTag = "grn_lines";

export const apiLineTag = "grn_lines";

export const mainSchema = {
  id: Joi.any().allow("").optional(),
  purchase_order_no: Joi.any().allow("").optional(),
  vendor_shipment_no: Joi.number().allow("").optional(),
  posting_date: Joi.any().allow("").optional(),
  order_date: Joi.any().allow("").optional(),
  remarks: Joi.string().allow("").optional(),
  purchase_type: Joi.any().allow("").optional(),
  status: Joi.string().valid([
    "Open",
    "Approved",
    "Rejected",
    "Posted",
    "Pending",
  ]),
  is_from_po: Joi.boolean().allow("").optional(),
  grn_lines: Joi.array().items(Joi.object()).min(1),
};

export const initialState = {
  data: {
    purchase_order_no: "",
    vendor_shipment_no: "",
    posting_date: "2021-01-01",
    purchase_type: "",
    order_date: "2021-01-01",
    remarks: "",
    status: "Open",
    is_from_po: false,
    grn_lines: [],
  },
  errors: {},
  selectedLine: "",
  lineCounter: 1,
};

export const populateState = (goodReceivingNote, lineMapper) => {
  return {
    id: goodReceivingNote.id,
    purchase_order_no: goodReceivingNote.purchase_order_no,
    vendor_shipment_no: goodReceivingNote.vendor_shipment_no,
    posting_date: goodReceivingNote.posting_date,
    purchase_type: goodReceivingNote.purchase_type,
    order_date: goodReceivingNote.order_date,
    status: goodReceivingNote.status,
    remarks: goodReceivingNote.remarks,
    [saveLineTag]: lineMapper(),
  };
};

export const lineContentMapper = (data, lineTag = saveLineTag) => {
  return data[lineTag].map((line) => ({
    _id: line.id,
    ordered_qty: line.ordered_qty,
    // remaining_quantity: line.remaining_quantity,
    qty_received: line.qty_received,
    unit_price: line.unit_price,
    total_amount: line.total_amount,
    remarks: line.remarks,
    lot_no: line.lot_no,
    unit_of_measurement: line.unit_of_measurement_detail.id,
    warehouse: line.warehouse_detail.id,
    item: line.item_detail.id,
    bin: line.bin_detail.id,
  }));
};

export const lineSchema = {
  _id: Joi.any().allow("").optional(),
  ordered_qty: Joi.number().integer().allow("").optional(),
  // remaining_quantity: Joi.number().integer().allow("").optional(),
  qty_received: Joi.number().integer(),
  unit_price: Joi.string().allow("").optional(),
  total_amount: Joi.string().allow("").optional(),
  remarks: Joi.string().allow("").optional(),
  lot_no: Joi.number().integer().allow("").optional(),
  item: Joi.string(),
  warehouse: Joi.string(),
  bin: Joi.string(),
  unit_of_measurement: Joi.string(),
};

export const getColumns = (props) => {
  const { items, unitMeasurements, bins, warehouses } = props.options;
  const callback = ({ name, value, setOptions, setValue, formData }) => {
    switch (name) {
      case "warehouse":
        // eslint-disable-next-line no-lone-blocks
        {
          setOptions(
            "bin",
            bins.filter((bin) => value === bin.warehouse_detail.id)
          );
          setValue([
            { name: "bin", value: "" },
            { name: "warehouse", value },
          ]);
        }
        break;
      case "item":
        const selectedItem = items.find((item) => item.id === value);
        const unitPrice = selectedItem ? selectedItem.unit_cost : 0;
        console.log("item ppp", unitPrice);
        setValue([
          { name: "unit_price", value: unitPrice },
          { name: "item", value },
        ]);
        break;

      case "qty_received":
        // eslint-disable-next-line no-lone-blocks
        {
          const { unit_price } = formData;
          setValue([
            { name: "total_amount", value: (unit_price * value).toFixed(2) },
            { name: "qty_received", value },
          ]);
        }
        break;
      default:
        return null;
    }
  };
  return [
    {
      tag: "item",
      label: "Item Name",
      type: "select",
      options: items,
      optionsFrom: "server",
      callback,
    },
    {
      tag: "warehouse",
      label: "Warehouse",
      type: "select",
      options: warehouses,
      optionsFrom: "server",
      callback,
    },
    {
      tag: "bin",
      label: "Bin",
      type: "select",
      options: bins,
      optionsFrom: "server",
    },
    {
      tag: "unit_of_measurement",
      label: "Unit of Measurement",
      type: "select",
      options: unitMeasurements,
      optionsFrom: "server",
    },

    {
      tag: "ordered_qty",
      label: "Ordered Quantity",
      type: "number",
      defaultValue: String(0),
    },
    // {
    //   tag: "remaining_quantity",
    //   label: "Remaining Quantity",
    //   type: "number",
    //   isView: !isView,
    // },
    {
      tag: "qty_received",
      label: "Quantity Received",
      type: "number",
      callback,
    },
    {
      tag: "unit_price",
      label: "Unit Price",
      type: "number",
      disabled: true,
    },
    {
      tag: "total_amount",
      label: "Total Amount",
      type: "number",
      disabled: true,
    },
    {
      tag: "lot_no",
      label: "Lot No. (optional)",
      type: "number",
    },
    { tag: "remarks", label: "Remarks (optional)", type: "text" },
  ];
};
