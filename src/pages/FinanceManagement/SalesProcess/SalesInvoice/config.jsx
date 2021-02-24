import Joi from "joi-browser";

export const saveLineTag = "sales_invoice_line";

export const apiLineTag = "sales_invoice_line";

export const mainSchema = {
  id: Joi.any().allow("").optional(),
  sivNumber: Joi.string().required().label("sivNumber"),
  salesOrderNumber: Joi.string().required().label("salesOrderNumber"),
  customerInvoiceNumber: Joi.string().required().label("customerInvoiceNumber"),
  customerName: Joi.string().required().label("customerName"),
  postingDate: Joi.string().required().label("postingDate"),
  status: Joi.string().allow("").optional(""),
  totalAmount: Joi.number().required().label("totalAmount"),
  withholding_tax_type: Joi.string().required().label("postingDate"),
  remark: Joi.string().allow("").optional(),
  [saveLineTag]: Joi.array().items(Joi.object()).min(1),
};

export const initialState = {
  data: {
    sivNumber: "",
    salesOrderNumber: "",
    customerName: "",
    customerInvoiceNumber: "",
    withholding_tax_type: "",
    postingDate: "",
    status: "",
    totalAmount: "",
    remark: "",
    [saveLineTag]: [],
  },
  errors: {},
  selectedLine: "",
  lineCounter: 1,
};

export const populateState = (data, lineMapper) => {
  return {
    id: data.id ? data.id : "",
    sivNumber: String(data.siv_no),
    totalAmount: String(data.total),
    customerInvoiceNumber: String(data.customer_invoice_no),
    salesOrderNumber: String(data.sales_order.id),
    status: String(data.status_update),
    remark: data.remarks,
    customerName: data.customer.id,
    withholding_tax_type: data.withholding_tax_type,
    postingDate: data.posting_date,
    [saveLineTag]: lineMapper(),
  };
};

export const lineContentMapper = (data, lineTag = saveLineTag) => {
  return data[lineTag].map((line) => ({
    _id: line.id,
    unitPrice: Number(line.unit_price),
    remaining_quantity: Number(line.remaining_quantity),
    amount_excl_vat: Number(line.amount_excl_vat),
    VAT: Number(line.vat_amount),
    remark: String(line.remark),
    item: line.item.id,
    currency: line.currency,
    totalAmount: Number(line.total),
    quantity: Number(line.quantity),
    itemCategory: line.catagory.id,
    quantityInvoiced: Number(line.quantity_invoiced),
    unit_of_measurement: line.unit_of_measurement,
  }));
};

export const lineSchema = {
  _id: Joi.any().allow("").optional(),
  item: Joi.string(),
  itemCategory: Joi.string(),
  currency: Joi.string(),
  quantity: Joi.number(),
  unitPrice: Joi.number(),
  quantityInvoiced: Joi.number(),
  remaining_quantity: Joi.number(),
  totalAmount: Joi.number(),
  VAT: Joi.number(),
  amount_excl_vat: Joi.number(),
  unit_of_measurement: Joi.string(),
  remark: Joi.string().allow("").optional(),
};

export const getColumns = (data) => {
  const {
    currencies,
    itemMasterDatas,
    itemCategories,
    UOMs
  } = data;
  return [
    {
      tag: "item",
      label: "Item Name",
      type: "select",
      options: itemMasterDatas,
      optionsFrom: "server",
    },
    {
      tag: 'itemCategory',
      label: 'Item Category',
      type: "select",
      options: itemCategories,
      optionsFrom: "server"
    },
    {
      tag: 'currency',
      label: 'Currency',
      type: "select",
      options: currencies,
      optionsFrom: "server"
    },
    {
      tag: 'quantity',
      label: 'Quantity',
      type: "number",
    },
    {
      tag: 'unitPrice',
      label: 'Unit Price',
      type: "number",
    },
    {
      tag: 'quantityInvoiced',
      label: 'Quantity Invoiced',
      type: "number",
    },
    {
      tag: 'remaining_quantity',
      label: 'Remaining Quantity',
      type: "number",
    },
    {
      tag: 'totalAmount',
      label: 'Total Amount',
      type: "number",
    },
    {
      tag: 'VAT',
      label: 'VAT',
      type: "number",
    },
    {
      tag: 'amount_excl_vat',
      label: 'Amount Excluing VAT',
      type: "number",
    },
    {
      tag: 'unit_of_measurement',
      label: 'Unit of Measurement',
      type: "select",
      options: UOMs,
      optionsFrom: "server",
    },
    { tag: "remark", label: "Remarks", type: "text" },

  ];
};
