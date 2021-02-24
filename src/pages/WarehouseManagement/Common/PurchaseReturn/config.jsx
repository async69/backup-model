import Joi from "joi-browser";

export const saveLineTag = "purchase_return_lines";

export const apiLineTag = "purchase_return_lines";

export const mainSchema = {
  id: Joi.any().allow("").optional(),
  document_number: Joi.string().allow("").optional(),
  supplier_invoice_no: Joi.number(),
  purchase_order_no: Joi.any(),
  grn_no: Joi.any(),
  vendor: Joi.any(),
  issued_by: Joi.any().allow("").optional(),
  posting_date: Joi.any().allow("").optional(),
  approved_date: Joi.any().allow("").optional(),
  approved_by: Joi.any().allow("").optional(),
  remarks: Joi.string().allow("").optional(),
  status: Joi.string().allow("").optional(),
  [saveLineTag]: Joi.array().items(Joi.object()).min(1),
};

export const initialState = {
  data: {
    id: "",
    document_number: "",
    supplier_invoice_no: "",
    purchase_order_no: "",
    grn_no: "",
    vendor: "",
    issued_by: "1",
    posting_date: "",
    approved_date: "",
    approved_by: "1",
    remarks: "",
    status: "Open",
    [saveLineTag]: [],
  },
  errors: {},
  selectedLine: "",
  lineCounter: 1,
};

export const populateState = (data, lineMapper) => {
  return {
    id: data.id ? data.id : "",
    document_number: data.document_number,
    supplier_invoice_no: data.supplier_invoice_no,
    purchase_order_no: data.purchase_order_no,
    grn_no: data.grn_no,
    vendor: data.vendor,
    issued_by: data.issued_by,
    posting_date: data.posting_date,
    approved_date: data.approved_date,
    approved_by: data.approved_by,
    remarks: data.remarks,
    status: data.status,
    [saveLineTag]: lineMapper(),
  };
};

export const lineContentMapper = (data, lineTag = saveLineTag) => {
  return data[lineTag].map((line) => ({
    _id: line.id,
    remarks: line.remarks,
    item: line.item_detail.id,
    warehouse: line.warehouse_detail.id,
    bin: line.bin_detail.id,
    tax: line.tax,
    amount_excl_vat: line.amount_excl_vat,
    quantity_ordered: line.quantity_ordered,
    remaining_quantity: line.remaining_quantity,
    quantity_issued: line.quantity_issued,
    quantity_received: line.quantity_received,
    unit_price: line.unit_price,
    unit_of_measurement: line.unit_of_measurement_detail.id,
    total_amount: line.total_amount,
  }));
};

export const lineSchema = {
  _id: Joi.any().allow("").optional(),
  quantity_ordered: Joi.number().allow("").optional(),
  quantity_received: Joi.number().allow("").optional(),
  quantity_issued: Joi.number(),
  remaining_quantity: Joi.number().allow("").optional(),
  remarks: Joi.string().allow("").optional(),
  tax: Joi.string(),
  amount_excl_vat: Joi.string().allow("").optional(),
  unit_price: Joi.string().allow("").optional(),
  total_amount: Joi.string().allow("").optional(),
  unit_of_measurement: Joi.string(),
  warehouse: Joi.string(),
  item: Joi.string(),
  bin: Joi.string(),
};

export const getColumns = (props) => {
  const { items, warehouses, bins, unitMeasurements, isView } = props.options;
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

      // case "quantity_issued":
      //   // eslint-disable-next-line no-lone-blocks
      //   {
      //     const { unit_price, tax } = formData;
      //     // prettier-ignore
      //     setValue([
      //       {
      //         name: "total_amount",
      //         value: (
      //           (unit_price * value) +
      //           (value * unit_price * (tax / 100))
      //         ).toFixed(2),
      //       },
      //       { name: "quantity_issued", value },
      //     ]);
      //   }
      //   break;
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
      label: "Unit",
      type: "select",
      options: unitMeasurements,
      optionsFrom: "server",
    },
    {
      tag: "quantity_ordered",
      label: "Quantity Ordered",
      type: "number",
      defaultValue: String(0),
    },
    {
      tag: "quantity_received",
      label: "Quantity Received",
      type: "number",
      defaultValue: String(0),
    },
    {
      tag: "quantity_issued",
      label: "Quantity Issued",
      type: "number",
      callback,
    },
    {
      tag: "remaining_quantity",
      label: "Remaining Quantity",
      type: "number",
      isView: !isView,
    },
    { tag: "tax", label: "Tax", type: "text" },
    {
      tag: "amount_excl_vat",
      label: "Amount Excluding VAT",
      type: "text",
      isView: !isView,
    },
    { tag: "unit_price", label: "UnitPrice", type: "text", disabled: true },
    {
      tag: "total_amount",
      label: "Total Amount",
      type: "text",
      isView: !isView,
    },
    { tag: "remarks", label: "Remarks", type: "text" },
  ];
};
