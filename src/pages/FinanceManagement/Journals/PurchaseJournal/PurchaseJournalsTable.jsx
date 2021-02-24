import React, { Component } from "react";
import { Button } from "reactstrap";
import Table from "../../../common/table";
import { MdRemoveRedEye } from "react-icons/md";

class PurchaseJournalsTable extends Component {
  columns = [
    { path: "status", label: "Status" },
    { path: "date", label: "Date" },
    { path: "document_number", label: "Document Number" },
    { path: "description", label: "Decription" },
    { path: "remarks", label: "Remarks" },
    { path: "vendor", label: "Vendor" },
    { path: "invoice", label: "Invoice" },
    {
      key: "buttons",
      content: (purchaseJournal) => (
        <div>
          <Button
            className="ml-3"
            size="sm"
            outline
            color="info"
            onClick={() => this.props.onToggle("VIEW", purchaseJournal)}
          >
            <MdRemoveRedEye />
          </Button>
          {/* <Button
            className="ml-3"
            size="sm"
            outline
            color="warning"
            onClick={() => this.props.onToggle("EDIT", purchaseJournal)}
          >
            <MdEdit />
          </Button>
          <Button
            className="ml-3"
            size="sm"
            outline
            color="danger"
            onClick={() => this.props.onToggle("DELETE", purchaseJournal)}
          >
            <MdDelete />
          </Button> */}
          {/* <Button
            className="ml-3"
            size="sm"
            outline
            color="primary"
            disabled={purchaseJournal.status === "Accepted" || purchaseJournal.status === "Rejected"}
            onClick={() => this.props.onToggle("POST", purchaseJournal)}
          >
            Post
          </Button> */}
        </div>
      ),
    },
  ];
  render() {
    const { purchaseJournals } = this.props;
    return (
      <div>
        <Table columns={this.columns} data={purchaseJournals} />
      </div>
    );
  }
}

export default PurchaseJournalsTable;
