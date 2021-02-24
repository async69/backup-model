import Joi from "joi-browser";
import itemTypes from "static/assets/options/itemTypes.json";

export const saveLineTag = "siv_lines";

export const apiLineTag = "siv_lines";

export const mainSchema = {
  id: Joi.string().allow("").optional(),
  document_number: Joi.string().allow("").optional(),
  issued_by: Joi.any().allow("").optional(),
  posting_date: Joi.any().allow("").optional(),
  approved_date: Joi.any().allow("").optional(),
  approved_by: Joi.any().allow("").optional(),
  sales_order_number: Joi.any().allow("").optional(),
  remarks: Joi.string().allow("").optional(),
  status: Joi.string().valid([
    "Open",
    "Approved",
    "Rejected",
    "Posted",
    "Pending",
  ]),
  siv_lines: Joi.array().items(Joi.object()).min(1),
};

export const initialState = {
  data: {
    document_number: "",
    issued_by: "1",
    posting_date: "",
    approved_date: "",
    approved_by: "1",
    remarks: "",
    status: "Open",
    sales_order_number: "",
    siv_lines: [],
  },
  errors: {},
  selectedLine: "",
  lineCounter: 1,
};

export const populateState = (storeIssueVoucher, lineMapper) => {
  return {
    id: storeIssueVoucher.id,
    document_number: storeIssueVoucher.document_number,
    issued_by: storeIssueVoucher.issued_by,
    posting_date: storeIssueVoucher.posting_date,
    approved_date: storeIssueVoucher.approved_date,
    approved_by: storeIssueVoucher.approved_by,
    sales_order_number: storeIssueVoucher.sales_order_number,
    remarks: storeIssueVoucher.remarks,
    status: storeIssueVoucher.status,
    [saveLineTag]: lineMapper(),
  };
};

export const lineContentMapper = (data, lineTag = saveLineTag) => {
  return data[lineTag].map((line) => ({
    _id: line.id,
    remaining_quantity: line.remaining_quantity,
    quantity_requested: line.quantity_requested,
    quantity_issued: line.quantity_issued,
    remarks: line.remarks,
    unit_price: line.unit_price,
    total_amount: line.total_amount,
    item_type: line.item_type,
    unit_of_measurement: line.unit_of_measurement_detail.id,
    warehouse: line.warehouse_detail.id,
    item: line.item_detail.id,
    bin: line.bin_detail.id,
  }));
};

export const lineSchema = {
  _id: Joi.any().allow("").optional(),
  remaining_quantity: Joi.number().integer().allow("").optional(),
  quantity_requested: Joi.number().integer().allow("").optional(),
  quantity_issued: Joi.number().integer(),
  remarks: Joi.string().allow("").optional(),
  unit_price: Joi.string().allow("").optional(),
  total_amount: Joi.string().allow("").optional(),
  item_type: Joi.string().allow("").optional(),
  unit_of_measurement: Joi.string(),
  warehouse: Joi.string(),
  item: Joi.string(),
  bin: Joi.string(),
};

export const getColumns = (props) => {
  const { items, unitMeasurements, bins, warehouses, isView } = props.options;
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

      case "quantity_issued":
        // eslint-disable-next-line no-lone-blocks
        {
          const { unit_price } = formData;
          setValue([
            { name: "total_amount", value: (unit_price * value).toFixed(2) },
            { name: "quantity_issued", value },
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
      tag: "remaining_quantity",
      label: "Remaining Quantity",
      type: "number",
      isView: !isView,
    },
    {
      tag: "quantity_requested",
      label: "Quantity Requested",
      type: "number",
    },
    {
      tag: "quantity_issued",
      label: "Quantity Issued",
      type: "number",
      callback,
    },
    {
      tag: "item_type",
      label: "Item Type",
      type: "select",
      options: itemTypes,
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
    { tag: "remarks", label: "Remarks(optional)", type: "text" },
  ];
};
