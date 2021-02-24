import Joi from "joi-browser";

export const addressSaveLineTag = "addresses";
export const contactSaveLineTag = "contacts"

export const apiLineTag = "addresses";

export const mainSchema = {
  id: Joi.string().allow("").optional(),
  number: Joi.string().allow("").optional(),
  name: Joi.string(),
  tin_number: Joi.string(),
  currency: Joi.string(),
  vendor_posting_group: Joi.string(),
  vat_posting_group: Joi.string(),
  vendor_type: Joi.string(),
  remarks: Joi.string().allow("").optional(),
  [contactSaveLineTag]: Joi.array().items(Joi.object()).min(0),
  [addressSaveLineTag]: Joi.array().items(Joi.object()).min(1),
};

export const initialState = {
  data: {
    id: "",
    number: "",
    name: "",
    tin_number: "",
    currency: "",
    vendor_posting_group: "",
    vat_posting_group: "",
    vendor_type: "",
    remarks: "",
    [addressSaveLineTag]: [],
    [contactSaveLineTag]: []
  },
  lineCounter: 1,
  errors: {},
};

export const populateState = (data, addressLineMapper) => {
  console.log("data", data)
  return {
    id: data.id ? data.id : "",
    number: data.document_number,
    name: data.vendor_name,
    tin_number: data.tin_number,
    currency: data.currency,
    vendor_posting_group: data.vendor_posting_group_detail.id,
    vat_posting_group: data.vat_posting_group.id,
    vendor_type: data.vender_type.id,
    remarks: data.remarks,
    [addressSaveLineTag]: addressLineMapper(),
    [contactSaveLineTag]: customerLineMapper(data)
  };
};

export const lineContentMapper = (data, addressLineTag = addressSaveLineTag) => {
  const returnedData = data[addressLineTag].map((line) => ({
    country: line.country.id,
    region: line.region.id,
    city: line.city.id,
    postal_code: line.postal_code,
    is_head_office: line.is_head_office? "Yes" : "No",
    office_telephone_no: line.office_telephone_no,
    remarks: line.remarks
  }));
  return returnedData
};

export const customerLineMapper = (data) => {
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
  postal_code: Joi.string(),
  is_head_office: Joi.string(),
  office_telephone_no: Joi.string(),
  remarks: Joi.string().allow("").optional(),
};

export const getAddressColumns = (data) => {
  const {
    countries,
    cities,
    regions,
  } = data
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
    { tag: "postal_code", label: "Postal Code", type: "text" },
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
