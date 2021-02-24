import Joi from "joi-browser";

export const saveLineTag = "purchase_requisition_lines";

export const apiLineTag = "purchase_requestion_lines";

export const mainSchema = {
  id: Joi.string().allow("").optional(),
  document_number: Joi.string().allow("").optional(),
  request_date: Joi.string().required(),
  request_purpose: Joi.string().required(),
  withholding_tax_type: Joi.string().required(),
  requested_by: Joi.string().required(),
  vendor: Joi.string().required(),
  prepared_by: Joi.string().required(),
  requestor_department: Joi.string().required(),
  purchase_type: Joi.string().required(),
  purchaser: Joi.string().required(),
  posting_date: Joi.string().allow("").optional(),
  expected_delivery_date: Joi.string().allow("").optional(),
  approved_by: Joi.string().allow("").optional(),
  approved_date: Joi.string().allow("").optional(),
  status: Joi.string().allow("").optional(),
  remarks: Joi.string().allow("").optional(),
  [saveLineTag]: Joi.array().items(Joi.object()).min(1),
};

export const initialState = {
  data: {
    id: "",
    document_number: "",
    request_purpose: "",
    requested_by: "",
    vendor: "",
    prepared_by: "",
    request_date: "",
    requestor_department: "",
    purchase_type: "",
    purchaser: "",
    posting_date: "",
    expected_delivery_date: "",
    approved_by: "",
    approved_date: "",
    status: "",
    remarks: "",
    withholding_tax_type: "",
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
    request_purpose: data.request_purpose,
    request_date: data.request_date,
    requested_by: data.requested_by,
    vendor: data.vendor_detail.id,
    prepared_by: data.prepared_by,
    purchaser: data.purchaser,
    posting_date: data.posting_date,
    expected_delivery_date: data.expected_delivery_date,
    approved_by: data.approved_by,
    approved_date: data.approved_date,
    withholding_tax_type: data.withholding_tax_type,
    status: data.status,
    remarks: data.remarks,
    requestor_department: data.requestor_department_detail.id,
    purchase_type: data.purchase_type_detail.id,
    [saveLineTag]: lineMapper(),
  };
};

export const lineContentMapper = (data, lineTag = saveLineTag) => {
  return data[lineTag].map((line) => ({
    _id: line.id,
    item_category: line.category ? line.category.id : "",
    item_no: line.item.document_number,
    item: line.item.id,
    quantity: Number(line.quantity),
    unit_measure: line.unit_of_measurement.id,
    unit_price: line.unit_price,
    total_amount: line.unit_price,
    currency: line.currency.id,
    remarks: line.remarks ? line.remarks : "",
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
  calculated_amount: Joi.number().allow("").optional(),
  total_amount: Joi.number().required(),
  currency: Joi.string().required(),
  remarks: Joi.string().allow("").optional(),
};

export const getColumns = (props) => {
  const discountTypes = { PERCENT: "Percent", AMOUNT: "Amount" };
  const { itemMasterDatas, UOMs, itemCategories, currencies } = props;
  const callback = ({ name, value, setOptions, setValue, formData }) => {
    switch (name) {
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
        const foundItem = itemMasterDatas.find(
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

      case "quantity": {
        const { calculated_amount, unit_price } = formData
        if (Number(value) > 0) {
          setValue([
            {
              name: 'total_amount',
              value: Number(calculated_amount) > 0? Number(calculated_amount * value) : Number(unit_price * value)
            },
            {
              name: 'calculated_amount',
              value: Number(calculated_amount) > 0? Number(calculated_amount * value) : Number(unit_price * value)
            },
            { name: 'quantity', value: value },
          ])
        } else {
          setValue([
            {
              name: 'total_amount',
              value: Number(calculated_amount) > 0? Number(calculated_amount) : Number(unit_price)
            },
            {
              name: 'calculated_amount',
              value: Number(calculated_amount) > 0? Number(calculated_amount) : Number(unit_price)
            },
            { name: 'quantity', value: value },
          ])
        }
        break
      }

      case "discount_amount": {
        let totalAmount = 0
        const { discount_type, unit_price, quantity, calculated_amount } = formData
        if (Number(value) === 0) {
          setValue([
            { name: 'total_amount', calculated_amount: Number(unit_price * quantity) },
            { name: 'discount_amount', value }
          ])
        } else if (discount_type === discountTypes.AMOUNT) {
          totalAmount = calculated_amount > 0?
            Number(calculated_amount) - Number(value) :
            (Number(unit_price) * Number(quantity)) - Number(value)
          setValue([
            { name: 'total_amount', value: Number(totalAmount).toFixed(2) },
            { name: 'calculated_amount', value: Number(totalAmount).toFixed(2) },
            { name: 'discount_amount', value }
          ])
        } else if (discount_type === discountTypes.PERCENT) {
          totalAmount = calculated_amount > 0?
            Number(calculated_amount) - (calculated_amount * (value / 100)) :
            (Number(unit_price) * Number(quantity)) - (unit_price * (value / 100)) 
          setValue([
            { name: "total_amount", value: Number(totalAmount).toFixed(2) },
            {
              name: "calculated_amount",
              value: Number(totalAmount).toFixed(2),
            },
            { name: "discount_amount", value },
          ]);
        }
        break;
      }

      case "unit_price": {
        let totalAmount = 0
        const { discount_type, quantity } = formData
        if (discount_type === discountTypes.AMOUNT) {
          totalAmount = (Number(value) * Number(quantity))
          setValue([
            { name: 'total_amount', value: Number(totalAmount).toFixed(2) },
            { name: 'calculated_amount', value: Number(totalAmount).toFixed(2) },
            { name: 'unit_price', value }
          ])
        } else if (discount_type === discountTypes.PERCENT) {
          totalAmount = (Number(value) * Number(quantity)) - (1 + Number(100 / value))
          setValue([
            { name: 'total_amount', value: Number(totalAmount).toFixed(2) },
            { name: 'calculated_amount', value: Number(totalAmount).toFixed(2) },
            { name: 'unit_price', value }
          ])
        }
        break
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
    { tag: "quantity", label: "Quantity", type: "number", callback },
    {
      tag: "unit_measure",
      label: "Unit Measure",
      type: "select",
      options: UOMs,
      optionsFrom: "server",
      callback
    },
    {
      tag: "unit_price",
      label: "Estimated Unit Price",
      type: "number",
      callback
    },
    {
      tag: "total_amount",
      label: "Estimated Net Amount",
      type: "number",
      callback
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
