import Joi from "joi-browser";

export const saveLineTag = "purchase_order_lines";

export const apiLineTag = "purchase_order_lines";

export const mainSchema = {
  id: Joi.string().allow("").optional(),
  document_number: Joi.string().allow("").optional(),
  order_date: Joi.string().required().label("order_date"),
  purchase_requisition: Joi.string()
    .required()
    .label("Purchase Requisition Number"),
  vendor: Joi.string().required().label("Vendor"),
  requestor_department: Joi.string().required().label("Requestor Department"),
  purchase_type: Joi.string().required().label("Purchase Type"),
  purchaser: Joi.string().required().label("Purchaser"),
  expected_delivery_date: Joi.string()
    .required()
    .label("Expected Delivery Date"),
  posting_date: Joi.any().allow("").optional(),
  approved_by: Joi.any().allow("").optional(),
  approved_date: Joi.any().allow("").optional(),
  status: Joi.string().allow("").optional(),
  remarks: Joi.string().allow("").optional(),
  [saveLineTag]: Joi.array().items(Joi.object()).min(1),
};

export const initialState = {
  data: {
    id: "",
    document_number: "",
    order_date: "",
    purchase_requisition: "",
    vendor: "",
    requestor_department: "",
    purchase_type: "",
    purchaser: "",
    expected_delivery_date: "",
    posting_date: "",
    approved_by: "",
    approved_date: "",
    status: "",
    remarks: "",
    [saveLineTag]: [],
  },
  errors: {},
  selectedLine: "",
  lineCounter: 1,
};

export const populateState = (data, lineMapper) => {
  return {
    id: data.id,
    document_number: data.document_number,
    order_date: data.order_date,
    purchase_requisition: data.purchase_requisition_detail.id,
    vendor: data.vendor_detail.id,
    requestor_department: data.requestor_department_detail.name,
    purchase_type: data.purchase_type_detail.id,
    expected_delivery_date: data.expected_delivery_date,
    purchaser: data.purchaser,
    posting_date: data.posting_date,
    approved_by: data.approved_by,
    approved_date: data.approved_date,
    status: data.status,
    remarks: data.remarks,
    [saveLineTag]: lineMapper(),
  };
};

export const lineContentMapper = (data, lineTag = saveLineTag) => {
  return data[lineTag].map((line) => ({
    _id: line.id,
    item_category: line.category ? line.category.id : "",
    item_no: line.item ? line.item.document_number : "",
    item: line.item ? line.item.id : "",
    quantity: line.quantity,
    unit_measure: line.unit_measure,
    unit_price: line.unit_price,
    amount_excluding_vat: line.amount_excluding_vat,
    vat: line.vat,
    total_amount: line.total_amount,
    currency: line.currency,
    remarks: line.remarks,
  }));
};

export const lineSchema = {
  _id: Joi.any().allow("").optional(),
  item_category: Joi.string().required(),
  item_no: Joi.string().required(),
  item: Joi.string().required(),
  quantity: Joi.number().required(),
  unit_measure: Joi.string().required(),
  unit_price: Joi.number().required(),
  discount_type: Joi.string().required(),
  discount_amount: Joi.number().required(),
  vat: Joi.number().required(),
  amount_excluding_vat: Joi.number().required(),
  total_amount: Joi.number().required(),
  currency: Joi.string().required(),
  remarks: Joi.string().allow("").optional(),
};

export const getColumns = (props) => {
  const { itemMasterDatas, UOMs, itemCategories, currencies } = props;
  const items = itemMasterDatas
  const callback = ({ name, value, setOptions, options, setValue }) => {
    switch(name) {
      case "item_category": {
        const foundItems = itemMasterDatas.filter(
          (item) => String(item.category_detail.id) === String(value)
        );
        if (foundItems) {
          setOptions(
            "item_no",
            foundItems.map((item) => item.document_number)
          );
        }
        break
      }

      case "item_no": {
        const foundItem = items.find(
          (item) => String(item.document_number) === String(value)
        );
        if (foundItem) {
          setValue([
            { name: "item", value: foundItem.id },
            { name: "unit_price", value: foundItem.price },
            { name: "total_amount", value: foundItem.price },
            { name: "item_no", value },
            { name: "unit_measure", value: foundItem.basic_unit_of_measurement_detail.id }
          ])
        }
        break;
      }

      default: return null
    }
  };

  return [
    {
      tag: "item_category",
      label: "Item Category",
      type: "select",
      options: itemCategories,
      optionsFrom: "server",
      callback,
      isView: Boolean(props.isView),
    },
    {
      tag: "item_no",
      label: "Item Number",
      type: "select",
      options: itemMasterDatas.map((item) => item.document_number),
      isView: Boolean(props.isView),
      callback
    },
    {
      tag: "item",
      label: "Item",
      type: "select",
      options: itemMasterDatas,
      optionsFrom: "server",
    },
    { tag: "quantity", label: "Quantity", type: "number" },
    {
      tag: "unit_measure",
      label: "Unit Measure",
      type: "select",
      options: UOMs,
      optionsFrom: "server",
    },
    {
      tag: "unit_price",
      label: "Unit Price",
      type: "number",
    },
    {
      tag: "discount_type",
      label: "Discount Type",
      type: "select",
      options: ["Percent", "Amount"],
    },
    {
      tag: "discount_amount",
      label: "Discount Amount",
      type: "number",
    },
    {
      tag: "vat",
      label: "VAT",
      type: "number",
    },
    {
      tag: "amount_excluding_vat",
      label: "Amount Excluding VAT",
      type: "number",
    },
    {
      tag: "total_amount",
      label: "Total Amount",
      type: "number",
    },
    {
      tag: "currency",
      label: "Currency",
      type: "select",
      options: currencies,
      optionsFrom: "server",
    },
    { tag: "remarks", path: "remark", label: "Remarks", type: "text" },
  ];
};
