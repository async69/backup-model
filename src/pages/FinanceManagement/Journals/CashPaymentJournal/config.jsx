import Joi from "joi-browser";

export const saveLineTag = "cash_payment_journal_lines";

export const apiLineTag = "cash_payment_journal_lines";

export const mainSchema = {
  id: Joi.any().allow("").optional(),
  status: Joi.string().required().label("Enter Status"),
  date: Joi.string().required().label("Enter this one"),
  document_number: Joi.string().required().label("Enter this one"),
  description: Joi.string().required().label("Enter this one"),
  remarks: Joi.string().allow("").optional(),
  vendor: Joi.string().required().label("Enter this one"),
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
    vendor: "",
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
    remarks: data.remarks,
    vendor: data.vendor,
    invoice: data.invoice,
    [saveLineTag]: lineMapper(),
  };
};

export const lineContentMapper = (data, lineTag = saveLineTag) => {
  return data[lineTag].map((line) => ({
    _id: line.id,
    debit: Number(line.debit),
    credit: Number(line.credit),
    description: line.description,
    account_balance: Number(line.account ? line.account.balance : 0),
    account: line.account ? line.account.name : "",
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
  remarks: Joi.number().allow("").optional(),
};

export const getColumns = (data) => {
  // const { COAs } = data;
  return [
    {
      tag: "account",
      label: "Account",
      type: "text",
    },
    {
      tag: "description",
      label: "Description",
    },
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
      tag: "account_balance",
      label: "Account Balance",
      type: "number",
    },
  ];
};
