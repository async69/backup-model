import React, { Component } from "react";
import { Button } from "reactstrap";
import Table from "../../../common/table";
import { MdRemoveRedEye } from "react-icons/md";

class PaymentJournalsTable extends Component {
  columns = [
    { path: "status", label: "Status" },
    { path: "date", label: "Date" },
    { path: "document_number", label: "Document No." },
    { path: "description", label: "Description" },
    { path: "vendor", label: "Vendor" },
    { path: "invoice", label: "Invoice" },
    { path: "remarks", label: "Remarks" },
    {
      key: "buttons",
      content: (paymentJournal) => (
        <div>
          <Button
            className="ml-3"
            size="sm"
            outline
            color="info"
            onClick={() => this.props.onToggle("VIEW", paymentJournal)}
          >
            <MdRemoveRedEye />
          </Button>
        </div>
      ),
    },
  ];
  render() {
    const { paymentJournals } = this.props;
    return (
      <div>
        <Table columns={this.columns} data={paymentJournals} />
      </div>
    );
  }
}

export default PaymentJournalsTable;
