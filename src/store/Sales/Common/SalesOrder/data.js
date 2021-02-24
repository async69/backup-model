import uuid from "../../../../helpers/uuid"
import { getDateFormat } from "../../../../helpers/date"

export const salesOrders = [
    {
      id: uuid(), // 
      document_number: uuid(),//
      order_date: String(new Date()),//
      customer_detail: { id: uuid(), name: 'New Customer', number: uuid() },// as customer
      sales_region_detail: { id: uuid(), name: "Region 1" }, // as sales_region
      sales_person: "Sales Person 1",//
      posting_date: getDateFormat(String(new Date())),//
      due_date: getDateFormat(String(new Date())),//
      approved_by: "000",//
      approved_date: String(new Date()),//
      status: "Open",//
      remarks: "000",//
      created_at: String(new Date()),
      updated_at: String(new Date()),
      sales_order_lines: [
        {
          item: uuid(),//
          quantity: 100,//
          unit_measure: uuid(), // as unit_of_measurement
          unit_price: 100,// needs Number()
          discount_type: 100, // not needed
          discount_amount: 100, // as discount needs Number()
          vat: 100, // as vat_amount needs Number()
          total_amount: 100, // as total needs Number()
          currency: uuid(),
          remarks: 100,
        },
      ],
    },
  ];