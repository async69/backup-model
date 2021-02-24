import React, { Component } from "react";
import Table from "../../../common/table";
import { MdDelete, MdRemoveRedEye } from "react-icons/md";
import { MdEdit, MdPrint } from "react-icons/md";
import { Button } from "reactstrap";

class TransferOrderReceiveTable extends Component {
  columns = [
    {
      path: "transfer_order_issue_detail.document_number",
      label: "Transfer Order Issue",
    },
    { path: "document_number", label: "Document Number" },
    { path: "received_by", label: "Received By" },
    { path: "posting_date", label: "Posting Date" },
    { path: "remarks", label: "Remarks" },
    { path: "status", label: "Status" },
    {
      key: "buttons",
      content: (tor) => (
        <div>
          <Button
            className="ml-3"
            size="sm"
            outline
            color="primary"
            onClick={() => this.props.onToggle("VIEW", tor)}
          >
            <MdRemoveRedEye />
          </Button>
          {tor.status === "Open" && (
            <>
              <Button
                className="ml-3"
                size="sm"
                outline
                color="warning"
                onClick={() => this.props.onToggle("EDIT", tor)}
              >
                <MdEdit />
              </Button>
              <Button
                className="ml-3"
                size="sm"
                outline
                color="danger"
                onClick={() => this.props.onToggle("DELETE", tor)}
              >
                <MdDelete />
              </Button>
            </>
          )}
          {tor.status === "Approved" && (
            <Button
              className="ml-3"
              size="sm"
              outline
              color="primary"
              onClick={() => this.props.onToggle("POST", tor)}
            >
              Post
            </Button>
          )}
          {tor.status === "Open" && (
            <Button
              className="ml-3"
              size="sm"
              outline
              color="primary"
              onClick={() => this.props.onToggle("APPROVE", tor)}
            >
              Approve
            </Button>
          )}
        </div>
      ),
    },
  ];
  render() {
    const { transferOrderReceives } = this.props;
    return (
      <div>
        <Table columns={this.columns} data={transferOrderReceives} />

       
      </div>
    );
  }
}

export default TransferOrderReceiveTable;
