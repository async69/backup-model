import Joi from "joi-browser";

export const saveLineTag = "purchase_journal_lines";

export const apiLineTag = "purchase_journal_lines";

export const mainSchema = {
  id: Joi.any().allow("").optional(),
  partner_name: Joi.string().required(),
  partner_number: Joi.string().required(),
  invoice_id: Joi.string().required(),
  reference_number: Joi.string().required(),
  order_number: Joi.string().required(),
  [saveLineTag]: Joi.array().items(Joi.object()).min(1),
};

export const initialState = {
  data: {
    id: "",
    partner_name: "",
    partner_number: "",
    invoice_id: "",
    reference_number: "",
    order_number: "",
    [saveLineTag]: [],
  },
  errors: {},
  selectedLine: "",
  lineCounter: 1,
};

export const populateState = (data, lineMapper) => {
  return {
    id: data.id,
    partner_name: data.vendor.name,
    partner_number: data.vendor.document_number,
    invoice_id: data.invoice.id,
    reference_number: data.document_number,
    order_number: data.purchase_order.order_number,
    [saveLineTag]: lineMapper(),
  };
};

export const lineContentMapper = (data, lineTag = saveLineTag) => {
  return data[lineTag].map((line) => ({
    _id: line.id,
    description: line.description,
    credit: line.credit,
    debit: line.debit,
    account_number: line.account.account_number,
    account_name: line.account.name,
    account_balance: line.account.balance,
    sub_account_type: line.account.sub_account_type,
  }));
};

export const lineSchema = {
  _id: Joi.any().allow("").optional(),
  description: Joi.string().required(),
  credit: Joi.string().required(),
  debit: Joi.string().required(),
  account_number: Joi.string().required(),
  account_name: Joi.string().required(),
  account_balance: Joi.string().required(),
};

export const getColumns = () => {
  return [
    {
      tag: "account_number",
      label: "Account Number",
    },
    {
      tag: "account_name",
      label: "Account Name",
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
    // {
    //   tag: "sub_account_type",
    //   label: "Sub Account Type",
    // },
  ];
};
