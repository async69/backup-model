/* eslint-disable default-case */
import Joi from "joi-browser";

export const saveLineTag = "sales_order_lines";

export const apiLineTag = "sales_order_lines";

export const mainSchema = {
  id: Joi.string().allow("").optional(),
  document_number: Joi.string().allow("").optional(),
  order_date: Joi.string().required().label("order_date"),
  customer_number: Joi.string().required().label("Customer Number"),
  customer: Joi.string().required().label("customer"),
  sales_region: Joi.string().required().label("sales_region"),
  sales_region_code: Joi.string().required().label("sales_region_code"),
  sales_person: Joi.string().required().label("sales_person"),
  due_date: Joi.string().required().label("due_date"),
  posting_date: Joi.string().allow("").optional(),
  approved_by: Joi.string().allow("").optional(),
  approved_date: Joi.string().allow("").optional(),
  status: Joi.string().allow("").optional(),
  remarks: Joi.string().allow("").optional(),
  lines: Joi.array().items(Joi.object()).min(1),
  [saveLineTag]: Joi.array().items(Joi.object()).min(1),
};

export const initialState = {
  data: {
    id: "",
    document_number: "",
    order_date: "",
    customer_number: "",
    customer: "",
    sales_region: "",
    sales_person: "",
    due_date: "",
    approved_by: "",
    approved_date: "",
    status: "",
    remarks: "",
    posting_date: "",
    sales_region_code: "",
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
    customer_number: data.customer.customer_number,
    customer: data.customer.id,
    sales_region: data.sales_region.id,
    sales_region_code: data.sales_region.code,
    sales_person: String(data.sales_person),
    due_date: data.due_date,
    approved_by: String(data.approved_by),
    approved_date: data.approved_date,
    posting_date: data.posting_date ? data.posting_date : "",
    status: data.status,
    remarks: data.remarks,
    [saveLineTag]: lineMapper(),
  };
};

export const lineContentMapper = (data, lineTag = saveLineTag) => {
  return data[lineTag].map((line) => ({
    _id: line.id,
    item_category: "",
    item_no: line.item.document_number,
    item: line.item.id,
    quantity: Number(line.quantity),
    unit_measure: line.unit_of_measurement.id,
    unit_price: Number(line.unit_price),
    discount_type: line.discount_method,
    discount_amount: Number(line.discount),
    vat: Number(line.vat_amount),
    total_amount: Number(line.total),
    currency: line.currency? line.currency.id : "",
    remarks: line.remarks,
  }));
};

export const lineSchema = {
  _id: Joi.any().allow("").optional(),
  item_category: Joi.string().allow("").optional(),
  item_no: Joi.string().allow("").optional(),
  item: Joi.string(),
  quantity: Joi.number(),
  unit_measure: Joi.string(),
  unit_price: Joi.number(),
  calculated_amount: Joi.number().allow("").optional(),
  discount_type: Joi.string().allow("").optional(),
  discount_amount: Joi.number(),
  total_amount: Joi.number(),
  currency: Joi.string(),
  remarks: Joi.string().allow("").optional(),
};

export const getColumns = (props) => {
  const discountTypes = { PERCENT: "Percent", AMOUNT: "Amount" };
  const { itemCategories, items, UOMs, currencies } = props.options;
  const callback = ({ name, value, setOptions, setValue, formData }) => {
    switch (name) {
      case "item_category": {
        const foundItems = items.filter(
          (item) => String(item.category_detail.id) === String(value)
        );
        if (foundItems) {
          setOptions(
            "item_no",
            foundItems.map((item) => item.document_number)
          );
        }
        break;
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
      default:
        return null
    }
  };

  return [
    {
      tag: "item_category",
      label: "Item Category",
      type: "select",
      options: itemCategories,
      optionsFrom: "server",
      isView: Boolean(props.isView),
      callback,
    },
    {
      tag: "item_no",
      label: "Item Number",
      type: "select",
      options: items.map((item) => item.document_number),
      isView: Boolean(props.isView),
      callback,
    },
    {
      tag: "item",
      label: "Item Name",
      type: "select",
      options: items,
      optionsFrom: "server",
      disabled: true,
    },
    { tag: "quantity", label: "Quantity", type: "number", callback },
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
      disabled: true,
      callback
    },
    {
      tag: "discount_type",
      label: "Discount Type",
      type: "select",
      options: Object.values(discountTypes),
      defaultValue: discountTypes.AMOUNT
    },
    {
      tag: "discount_amount",
      label: "Discount Amount",
      type: "number",
      defaultValue: "0",
      callback
    },
    {
      tag: "total_amount",
      label: "Total Amount",
      type: "number",
      disabled: true,
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
