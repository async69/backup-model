export const printMapper = (data, defaultData) => {
    return {
        invoice_no: data.document_number,
        due_date: data.due_date,
        trans_date: data.order_date,
        customerNumber: data.customer.customer_number,
        customerName: data.customer.name,
        salesRegion: data.sales_region.name,
        salesPerson: String(data.sales_person),
        postingDate: String(data.posting_date),
        approvedBy: String(data.approved_by),
        approvedDate: String(data.approved_date),
        items: data.sales_order_lines.map(line => ({
            itemName: line.item.name,
            itemCategory: line.category.category,
            quantity: line.quantity,
            unitPrice: line.unit_price,
            discount: line.discount,
            discountMethod: line.discount_method,
            totalAmount: line.total,
            vat: line.vat_amount,
            totalExcludingVAT: line.amount_excl_vat,
            currency: String(line.currency),
            unit_of_measurement: line.unit_of_measurement.name
        }))
    }
}