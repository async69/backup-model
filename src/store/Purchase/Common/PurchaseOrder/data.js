import { generateArray, types, tags, metaTags } from "../../../../helpers/Generator/"

const props = { 
  id: {
    type: types.string, tag: tags.id
  },
  document_number: {
    type: types.string, tag: tags.id
  },
  purchase_requisition_detail: {
    type: types.object_detail
  },
  order_date: {
    type: types.timestamp
  },
  vendor_detail: {
    type: types.object_detail
  },
  requestor_department_detail: {
    type: types.object_detail
  },
  purchase_type_detail: {
    type: types.object_detail
  },
  expected_delivery_date: {
    type: types.date
  },
  purchaser: {
    type: types.string, tag: tags.name, metaTag: metaTags.fullName
  },
  posting_date: {
    type: types.date
  },
  approved_by: {
    type: types.string, tag: tags.name
  },
  approved_date: {
    type: types.date
  },
  status: {
    type: types.status
  },
  remarks: {
    type: types.string
  },
  created_at:  {
    type: types.timestamp
  },
  updated_at:  {
    type: types.timestamp
  },
  total: {
    type: types.number
  },
  purchase_order_lines: {
    type: types.array,
    length: 5,
    props: {
      item: {
        type: types.string, tag: tags.id
      },
      quantity: {
        type: types.number
      },
      unit_measure: {
        type: types.string, tag: tags.id
      },
      unit_price: {
        type: types.number
      },
      discount_type: {
        type: types.string
      },
      discount_amount: {
        type: types.number
      },
      amount_excluding_vat: {
        type: types.number
      },
      vat: {
        type: types.number
      },
      total_amount: {
        type: types.number
      },
      currency: {
        type: types.string, tag: tags.id
      },
      remarks: {
        type: types.string
      },
    }
  },
}

export default () => {
  const data = generateArray(10, props)
  return {
    count: data.length,
    results: data.slice(0, 5)
  }
}
