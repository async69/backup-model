import Joi from "joi-browser";

export const saveLineTag = "general_journal_lines";

export const apiLineTag = "general_journal_lines";

export const mainSchema = {
  id: Joi.any().allow("").optional(),
  status: Joi.string().required().label("Enter this one"),
  date: Joi.string().required().label("Enter this one"),
  document_number: Joi.string().required().label("Enter this one"),
  description: Joi.string().required().label("Enter this one"),
  remarks: Joi.string().allow("").optional(),
  document_type: Joi.string().required().label("Enter this one"),
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
    document_type: "",
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
    date: new Date(data.date).toISOString(),
    document_number: data.document_number,
    description: data.description,
    remarks: String(data.remarks) !== "null" ? data.remarks : "",
    document_type: data.document_type,
    [saveLineTag]: lineMapper(),
  };
};

export const lineContentMapper = (data, lineTag = saveLineTag) => {
  return data[lineTag].map((line) => ({
    _id: line.id,
    debit: Number(line.debit),
    credit: Number(line.credit),
    description: line.description,
    account: line.account_detail.id,
    remarks: line.remarks,
  }));
};

export const lineSchema = {
  _id: Joi.any().allow("").optional(),
  debit: Joi.number().required().label("Debit is required"),
  credit: Joi.number().required().label("Credit is required"),
  description: Joi.string().required().label("Description is required"),
  account: Joi.string().required().label("Account is required"),
  remarks: Joi.string().allow("").optional(),
};

export const getColumns = (data) => {
  const { COAs } = data;
  return [
    {
      tag: "account",
      label: "Account",
      type: "select",
      options: COAs,
      optionsFrom: "server",
    },
    // {
    //   tag: "description",
    //   label: "Description",
    // },
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
  ];
};
