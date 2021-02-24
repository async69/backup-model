import { generateArray, types, tags, metaTags } from "../../../../helpers/Generator/"

const props = {
  id: {
    type: types.string, tag: tags.id
  },
  document_number: {
    type: types.string, tag: tags.id
  },
  vendor_name: { // name
    type: types.string, tag: tags.name
  },
  tin_number: {
    type: types.number, digit: 5 // (toString)
  },
  currency: {
    type: types.string, tag: tags.id // (to detailed object )
  },
  vendor_posting_group_detail: { // vendor_posting_group
    type: types.object_detail
  },
  vat_posting_group_detail: { // vat_posting_group
    type: types.object_detail
  },
  vendor_type_detail: {
    type: types.object_detail // (vender_type should be detailed)
  },
  general_business_posting_group_detail: {
    type: types.object_detail // this should be removed 
  },
  remarks: {
    type: types.string, tag: tags.name
  },
  addresses: { // vendor_address_lines
    type: types.array,
    length: 4,
    props: {
      id: { type: types.string, tag: tags.id },
      country: { type: types.string, tag: tags.id },
      region: { type: types.string, tag: tags.id },
      city: { type: types.string, tag: tags.id },
      postal_code: { type: types.string, tag: tags.name },
      is_head_office: { type: types.boolean },
      office_telephone_no: { type: types.string, tag: tags.name },
      remarks: { type: types.string, tag: tags.name },
    }
  },
  contacts: { // vendor_contact_lines
    type: types.array,
    length: 3,
    props: {
      id: { type: types.string, tag: tags.id },
      name: { type: types.string, tag: tags.name },
      office_telephone_number: { type: types.string, tag: tags.name },
      mob_number: { type: types.string, tag: tags.name }, //mobile_phone_number
      email: { type: types.string, tag: tags.name, metaTag: metaTags.email },
      remarks: { type: types.string, tag: tags.name },
    }
  },
}

export const customers = () => {
  const fetchedData = generateArray(16, props)
  return {
    count: fetchedData.length,
    results: fetchedData.slice(0, 5)
  }
}