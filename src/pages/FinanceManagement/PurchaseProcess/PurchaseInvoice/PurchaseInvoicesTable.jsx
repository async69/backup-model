import React, { Component } from "react";
import { Button } from "reactstrap";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import Table from "../../../common/table";

class PurchaseInvoicesTable extends Component {
  columns = [
    { path: "document_number", label: "Document Number" },
    { path: "posting_date", label: "Posting date" },
    // { path: "approved_date", label: "Approve date" },
    { path: "status", label: "Status" },
    { path: "total", label: "Paid Amount" },
    { path: "sub_total", label: "Sub Total" },
    { path: "total_amount", label: "Total Amount" },
    { path: "total_vat", label: "Total VAT" },
    { path: "purchase_order_no", label: "Purchase Order No" },
    { path: "grn_no", label: "GRN No" },
    { path: "purchase_type", label: "Purchase Type" },
    { path: "vendor", label: "Vendor" },
    { path: "total_amount_excl_vat", label: "Total Amount Excl VAT" },
    { path: "vendor_invoice_no", label: "Vendor Invoice No" },
    { path: "remarks", label: "Remarks" },
    {
      key: "buttons",
      content: (purchaseInvoice) => (
        <div>
          <Button
            className="ml-3"
            size="sm"
            outline
            color="info"
            onClick={() => this.props.onToggle("VIEW", purchaseInvoice)}
          >
            <MdRemoveRedEye />
          </Button>
          {purchaseInvoice.status === "Drafted" && (
            <>
              <Button
                className="ml-3"
                size="sm"
                outline
                color="warning"
                onClick={() => this.props.onToggle("EDIT", purchaseInvoice)}
              >
                <MdEdit />
              </Button>
              <Button
                className="ml-3"
                size="sm"
                outline
                color="danger"
                onClick={() => this.props.onToggle("DELETE", purchaseInvoice)}
              >
                <MdDelete />
              </Button>
            </>
          )}
          {purchaseInvoice.status === "Approved" && (
            <Button
              className="ml-3"
              size="sm"
              outline
              color="success"
              onClick={() => this.props.onToggle("POST", purchaseInvoice)}
            >
              Post
            </Button>
          )}
          {purchaseInvoice.status === "Drafted" && (
            <Button
              className="ml-3"
              size="sm"
              outline
              color="success"
              onClick={() => this.props.onToggle("APPROVE", purchaseInvoice)}
            >
              Approve
            </Button>
          )}
        </div>
      ),
    },
  ];
  render() {
    const { purchaseInvoices } = this.props;
    return (
      <div>
        <Table columns={this.columns} data={purchaseInvoices} />
      </div>
    );
  }
}

export default PurchaseInvoicesTable;
