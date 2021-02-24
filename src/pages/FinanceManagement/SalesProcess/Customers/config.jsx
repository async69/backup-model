import Joi from "joi-browser";

export const addressSaveLineTag = "customer_address_lines";
export const contactSaveLineTag = "customer_contact_lines";

export const mainSchema = {
  id: Joi.string().allow("").optional(),
  number: Joi.string().allow("").optional(),
  name: Joi.string(),
  tin_number: Joi.string(),
  currency: Joi.string(),
  customer_posting_group: Joi.string(),
  credit_limit: Joi.number(),
  remarks: Joi.string().allow("").optional(),
  [addressSaveLineTag]: Joi.array().items(Joi.object()).min(1),
  [contactSaveLineTag]: Joi.array().items(Joi.object()).min(1),
};

export const initialState = {
  data: {
    id: "",
    number: "",
    name: "",
    tin_number: "",
    currency: "",
    customer_posting_group: "",
    credit_limit: "",
    remarks: "",
    [contactSaveLineTag]: [],
    [addressSaveLineTag]: [],
  },
  lineCounter: 1,
  errors: {},
};

export const populateState = (data) => {
  return {
    id: data.id ? data.id : "",
    number: data.document_number,
    name: data.name,
    tin_number: data.tin_number,
    currency: data.currency,
    customer_posting_group: data.customer_posting_group.id,
    credit_limit: data.credit_limit,
    remarks: data.remarks,
    [addressSaveLineTag]: addressLineMapper(data),
    [contactSaveLineTag]: contactLineMapper(data)
  };
};

export const addressLineMapper = (data) => {
  console.log("some", data)
  const returnedData = data[addressSaveLineTag].map((line) => ({
    country: line.country,
    region: line.region,
    city: line.city,
    p_o_box: line.p_o_box,
    is_head_office: line.is_head_office? "Yes": "No",
    office_telephone_no: line.office_telephone_no,
    remarks: line.remarks
  }));
  return returnedData
};

export const contactLineMapper = (data) => {
  return data[contactSaveLineTag].map(line => ({
    _id: line.id,
    name: line.name,
    office_telephone_number: line.office_telephone_number,
    mob_number: line.mob_number,
    email: line.email,
    remarks: line.remarks,
  }))
}

export const addressLineSchema = {
  _id: Joi.any().allow("").optional(),
  country: Joi.string(),
  region: Joi.string(),
  city: Joi.string(),
  p_o_box: Joi.string(),
  is_head_office: Joi.string(),
  office_telephone_no: Joi.string(),
  remarks: Joi.string().allow("").optional(),
};

export const getAddressColumns = (data) => {
  const { countries, regions, cities } = data;

  return [
    {
      tag: "country",
      label: "Country",
      type: "select",
      options: countries,
      optionsFrom: "server",
    },
    {
      tag: "region",
      label: "Region",
      type: "select",
      options: regions,
      optionsFrom: "server",
    },
    {
      tag: "city",
      label: "Cities",
      type: "select",
      options: cities,
      optionsFrom: "server",
    },
    { tag: "p_o_box", label: "Postal Code", type: "text" },
    {
      tag: "is_head_office",
      label: "Is Head Office",
      type: "select",
      options: ["Yes", "No"],
    },
    {
      tag: "office_telephone_no",
      label: "Office Telephone Number",
      type: "text",
    },
    { tag: "remarks", label: "Remarks", type: "text" },
  ];
};

export const contactLineSchema = {
  _id: Joi.any().allow("").optional(),
  name: Joi.string(),
  office_telephone_number: Joi.string(),
  mob_number: Joi.string(),
  email: Joi.string(),
  remarks: Joi.string().allow("").optional(),
};

export const getContactColumns = () => {
  return [
    {
      tag: "name",
      label: "Name",
      type: "text",
    },
    {
      tag: "office_telephone_number",
      label: "Office Telephone Number",
      type: "text",
    },
    {
      tag: "mob_number",
      label: "Mobile Number",
      type: "text",
    },
    { tag: "email", label: "Email", type: "text" },
    { tag: "remarks", label: "Remarks", type: "text" },
  ];
};
