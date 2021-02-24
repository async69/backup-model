import Joi from "joi-browser";

export const saveLineTag = "lines";

export const apiLineTag = "lines";

export const mainSchema = {
  id: Joi.any().allow("").optional(),
  firstName: Joi.string().required().label("firstName"),
  lastName: Joi.string().required().label("lastName"),
  department: Joi.string().required().label("department"),
  [saveLineTag]: Joi.array().items(Joi.object()).min(1),
};

export const initialState = {
  data: {
    firstName: "",
    lastName: "",
    department: "",
    [saveLineTag]: [],
  },
  errors: {},
  selectedLine: "",
  lineCounter: 1,
};

export const populateState = (data, lineMapper, claims) => {
  return {
    id: data.id ? data.id : "",
    firstName: String(data.firstName),
    lastName: String(data.lastName),
    department: String(data.department),
    [saveLineTag]: lineMapper(claims),
  };
};

export const lineContentMapper = (data, lineTag = saveLineTag, context) => {
  const columns = Object.keys(context.permissions);
  const values = Object.values(context.permissions);
  return values.map((value, idx) => ({
    _id: String(idx),
    resource: columns[idx],
    create: value.create,
    read: value.read,
    update: value.update,
    delete: value.delete,
  }));
};

export const lineSchema = {
  _id: Joi.any().allow("").optional(),
  resource: Joi.string().required().label("resource"),
  create: Joi.boolean().required().label("create"),
  read: Joi.boolean().required().label("read"),
  update: Joi.boolean().required().label("update"),
  delete: Joi.boolean().required().label("delete"),
};

export const getColumns = (data) => {
  const options = [
    { id: true, name: "Yes" },
    { id: false, name: "No" },
  ];
  return [
    { tag: "resource", label: "Resource", noEdit: true },
    {
      tag: "create",
      label: "Create",
      type: "select",
      options,
      optionsFrom: "server",
    },
    {
      tag: "read",
      label: "Read",
      type: "select",
      options,
      optionsFrom: "server",
    },
    {
      tag: "update",
      label: "Update",
      type: "select",
      options,
      optionsFrom: "server",
    },
    {
      tag: "delete",
      label: "Delete",
      type: "select",
      options,
      optionsFrom: "server",
    },
  ];
};
