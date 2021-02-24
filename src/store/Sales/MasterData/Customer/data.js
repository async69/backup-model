import uuid from "../../../../helpers/uuid"
/**
 * added fields
 * email
 * 
 */


export const customers = [
  {
    id: uuid(),//
    document_number: uuid(),//
    customer_name: "Some dude",//
    tin_number: "000",//
    currency: "000", //**
    customer_posting_group: "000",//
    credit_limit: "000",//
    remarks: "000",//
    addresses: [
      {
        id: "1",
        country: "Ethiopia",
        region: "Addis Ababa",
        city: "1",
        postal_code: "1",
        is_head_office: "1",
        office_telephone_no: "1",
        remarks: "1",
      },
    ],
    contacts: [
      {
        id: "1",
        name: "1",
        office_telephone_number: "1",
        mob_number: "1",
        email: "1",
        remarks: "1",
      },
    ],
  },

  {
    id: uuid(),
    document_number: uuid(),
    customer_name: "Some Guy",
    tin_number: "111",
    currency: "000",
    customer_posting_group: "000",
    credit_limit: "000",
    remarks: "000",
    addresses: [
      {
        id: "1",
        country: "Kenya",
        region: "Mufasa",
        city: "1",
        postal_code: "1",
        is_head_office: "1",
        office_telephone_no: "1",
        remarks: "1",
      },
    ],
    contacts: [
      {
        id: "1",
        name: "1",
        office_telephone_number: "1",
        mob_number: "1",
        email: "1",
        remarks: "1",
      },
    ],
  },
];
