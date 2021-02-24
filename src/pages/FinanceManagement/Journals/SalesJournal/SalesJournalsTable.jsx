import React, { Component } from "react";
import { Button } from "reactstrap";
import Table from "../../../common/table";
import { MdRemoveRedEye } from "react-icons/md";

class SalesJournalsTable extends Component {
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
      content: (salesJournal) => (
        <div>
          <Button
            className="ml-3"
            size="sm"
            outline
            color="info"
            onClick={() => this.props.onToggle("VIEW", salesJournal)}
          >
            <MdRemoveRedEye />
          </Button>
          {/* <Button
            className="ml-3"
            size="sm"
            outline
            color="warning"
            onClick={() => this.props.onToggle("EDIT", salesJournal)}
          >
            <MdEdit />
          </Button>
          <Button
            className="ml-3"
            size="sm"
            outline
            color="danger"
            onClick={() => this.props.onToggle("DELETE", salesJournal)}
          >
            <MdDelete />
          </Button> */}
          {/* <Button
            className="ml-3"
            size="sm"
            outline
            color="primary"
            disabled={salesJournal.status === "Accepted" || salesJournal.status === "Rejected"}
            onClick={() => this.props.onToggle("POST", salesJournal)}
          >
            Post
          </Button> */}
        </div>
      ),
    },
  ];
  render() {
    const { salesJournals } = this.props;
    return (
      <div>
        <Table columns={this.columns} data={salesJournals} />
      </div>
    );
  }
}

export default SalesJournalsTable;
