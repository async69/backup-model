import Joi from "joi-browser";

export const saveLineTag = "cash_receipt_journal_lines";

export const apiLineTag = "cash_receipt_journal_lines";

export const mainSchema = {
  id: Joi.any().allow("").optional(),
  status: Joi.string().required().label("Enter this one"),
  date: Joi.string().required().label("Enter this one"),
  document_number: Joi.string().required().label("Enter this one"),
  description: Joi.string().required().label("Enter this one"),
  remarks: Joi.string().allow("").optional(),
  customer: Joi.string().required().label("Enter this one"),
  invoice: Joi.string().required().label("Enter this one"),
  [saveLineTag]: Joi.array().items(Joi.object()).min(1),
};

export const initialState = {
  data: {
    id: "",
    status: "",
    date: "",
    document_number: "",
    description: "",
    remarks: null,
    customer: "",
    invoice: "",
    [saveLineTag]: [],
  },
  errors: {},
  selectedLine: "",
  lineCounter: 1,
};

export const populateState = (data, lineMapper) => {
  return {
    id: data.id,
    status: data.status,
    date: data.date,
    document_number: data.document_number,
    description: data.description,
    remarks: String(data.remarks) !== "null" ? data.remarks : "",
    customer: data.customer.id,
    invoice: data.invoice.id,
    [saveLineTag]: lineMapper(),
  };
};

export const lineContentMapper = (data, lineTag = saveLineTag) => {
  return data[lineTag].map((line) => ({
    _id: line.id,
    debit: Number(line.debit),
    credit: Number(line.credit),
    description: line.description,
    account_balance: Number(line.account_balance),
    account: line.account.id,
    remarks: line.remarks,
  }));
};

export const lineSchema = {
  _id: Joi.any().allow("").optional(),
  debit: Joi.number().required().label("Field is required"),
  credit: Joi.number().required().label("Field is required"),
  description: Joi.number().required().label("Field is required"),
  account_balance: Joi.number().required().label("Field is required"),
  account: Joi.number().required().label("Field is required"),
  remarks: Joi.number().allow("").optional()
};

export const getColumns = (data) => {
  const {
    COAs
  } = data;
  return [
    {
      tag: "debit",
      label: "Debit",
      type: "number",
    },
    {
      tag: "credit",
      label: "Credit",
      type: "number",
    },
    {
      tag: "description",
      label: "Description",
    },
    {
      tag: "account",
      label: "Account",
      type: "select",
      options: COAs,
      optionsFrom: "server"
    },
    
    { tag: "remarks", label: "Remarks" },
  ];
};
