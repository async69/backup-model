import Joi from "joi-browser";

export const saveLineTag = "sales_return_lines";

export const apiLineTag = "sales_return_lines";

export const mainSchema = {
  id: Joi.any().allow("").optional(),
  document_number: Joi.string().allow("").optional(),
  sales_order_no: Joi.any(),
  siv_no: Joi.any(),
  customer: Joi.any(),
  received_by: Joi.any().allow("").optional(),
  posting_date: Joi.any().allow("").optional(),
  approved_date: Joi.any().allow("").optional(),
  approved_by: Joi.any().allow("").optional(),
  remarks: Joi.string().allow("").optional(),
  status: Joi.string().allow("").optional(),
  sales_return_lines: Joi.array().items(Joi.object()).min(1),
};

export const initialState = {
  data: {
    sales_order_no: 0,
    siv_no: "",
    customer: "",
    received_by: "1",
    posting_date: "",
    approved_date: "",
    approved_by: "1",
    remarks: "",
    status: "Open",
    sales_return_lines: [],
  },
  errors: {},
  selectedLine: "",
  lineCounter: 1,
};

export const populateState = (salesReturn, lineMapper) => {
  return {
    id: salesReturn.id,
    sales_order_no: salesReturn.sales_order_no,
    siv_no: salesReturn.siv_no,
    customer: salesReturn.customer,
    received_by: salesReturn.received_by,
    posting_date: salesReturn.posting_date,
    approved_date: salesReturn.approved_date,
    approved_by: salesReturn.approved_by,
    remarks: salesReturn.remarks,
    status: salesReturn.status,
    [saveLineTag]: lineMapper(),
  };
};

export const lineContentMapper = (data, lineTag = saveLineTag) => {
  return data[lineTag].map((line) => ({
    _id: line.id,
    quantity_ordered: line.quantity_ordered,
    quantity_received: line.quantity_received,
    quantity_issued: line.quantity_issued,
    remarks: line.remarks,
    tax: line.tax,
    unit_of_measurement: line.unit_of_measurement_detail.id,
    warehouse: line.warehouse_detail.id,
    item: line.item_detail.id,
    bin: line.bin_detail.id,
    unit_price: line.unit_price,
    total_amount: line.total_amount,
    amount_excl_vat: line.amount_excl_vat,
  }));
};

export const lineSchema = {
  _id: Joi.any().allow("").optional(),
  quantity_ordered: Joi.number().allow("").optional(),
  quantity_received: Joi.number(),
  quantity_issued: Joi.number().allow("").optional(),
  remarks: Joi.string().allow("").optional(),
  tax: Joi.string(),
  amount_excl_vat: Joi.string().allow("").optional(),
  unit_price: Joi.any().allow("").optional(),
  total_amount: Joi.any().allow("").optional(),
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
      label: "Unit of Measurement",
      type: "select",
      options: unitMeasurements,
      optionsFrom: "server",
    },

    {
      tag: "quantity_ordered",
      label: "Ordered Quantity (optional)",
      type: "number",
      defaultValue: String(0),
    },
    {
      tag: "quantity_received",
      label: "Quantity Received",
      type: "number",
    },
    {
      tag: "quantity_issued",
      label: "Quantity Issued (optional)",
      type: "number",
      defaultValue: String(0),
    },
    {
      tag: "tax",
      label: "Tax",
      type: "text",
    },
    {
      tag: "amount_excl_vat",
      label: "Amount Excluding VAT",
      type: "text",
      isView: !isView,
    },
    { tag: "unit_price", label: "UnitPrice", type: "text", disabled: true },
    { tag: "remarks", label: "Remarks", type: "text" },
    { tag: "unit_price", label: "UnitPrice", type: "text", disabled: true },
    {
      tag: "total_amount",
      label: "Total Amount",
      type: "text",
      isView: !isView,
    },
  ];
};
