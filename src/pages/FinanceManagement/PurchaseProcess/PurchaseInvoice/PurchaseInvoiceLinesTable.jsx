import React, { Component } from "react";
import Tabel from "../../../common/table";
import { MdDelete, MdEdit } from "react-icons/md";
import { Button } from "reactstrap";

class PurchaseInvoiceLinesTable extends Component {
  columns = [
    { path: "quantity", label: "Quantity" },
    { path: "remaining_quantity", label: "Remaining Quantity" },
    { path: "quantity_invoiced", label: "Quantity Invoiced" },
    { path: "unit_of_measurement", label: "Unit Of Measurement" },
    { path: "unit_price", label: "Unit Price" },
    { path: "amount_excl_vat", label: "Amount Excl VAT" },
    { path: "total_line_amount", label: "Total Line Amount" },
    { path: "currency", label: "Currency" },
    { path: "remark", label: "Remark" },
    { path: "tax", label: "Tax" },
    { path: "item.name", label: "Item" },
    { path: "invoice", label: "Invoice" },
    {
      key: "edit",
      content: (line) =>
        !this.props.disabled && (
          <Button size="sm" outline onClick={() => this.props.onEdit(line)}>
            <MdEdit />
          </Button>
        ),
    },
    {
      key: "delete",
      content: (line) =>
        !this.props.disabled && (
          <Button
            size="sm"
            outline
            color="danger"
            onClick={() => this.props.onDelete(line, "purchase_invoice_lines")}
          >
            <MdDelete />
          </Button>
        ),
    },
  ];
  render() {
    const { purchaseInvoiceLines } = this.props;
    return (
      <div>
        <Tabel columns={this.columns} data={purchaseInvoiceLines}></Tabel>
      </div>
    );
  }
}

export default PurchaseInvoiceLinesTable;
