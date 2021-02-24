import React, { Component } from "react";
import Table from "../../../common/table";
import { MdDelete, MdRemoveRedEye } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { Button } from "reactstrap";

class StoreRequisitionTable extends Component {
  columns = [
    { path: "document_number", label: "Document Number" },
    { path: "requested_by", label: "Requested By" },
    { path: "requested_date", label: "Requested Date" },
    { path: "approved_date", label: "Approved Date" },
    { path: "status", label: "Status" },
    { path: "posting_date", label: "Posting Date" },
    { path: "issue_type", label: "Issue Type" },
    { path: "remarks", label: "Remarks" },
    {
      key: "buttons",
      content: (sr) => (
        <div>
          <Button
            className="ml-3"
            size="sm"
            outline
            color="info"
            onClick={() => this.props.onToggle("VIEW", sr)}
          >
            <MdRemoveRedEye />
          </Button>
          {sr.status === "Open" && (
            <>
              <Button
                className="ml-3"
                size="sm"
                outline
                color="warning"
                onClick={() => this.props.onToggle("EDIT", sr)}
              >
                <MdEdit />
              </Button>
              <Button
                className="ml-3"
                size="sm"
                outline
                color="danger"
                onClick={() => this.props.onToggle("DELETE", sr)}
              >
                <MdDelete />
              </Button>
            </>
          )}
          {sr.status === "Approved" && (
            <Button
              className="ml-3"
              size="sm"
              outline
              color="success"
              onClick={() => this.props.onToggle("POST", sr)}
            >
              Post
            </Button>
          )}
          {sr.status === "Open" && (
            <Button
              className="ml-3"
              size="sm"
              outline
              color="success"
              onClick={() => this.props.onToggle("APPROVE", sr)}
            >
              Approve
            </Button>
          )}
        </div>
      ),
    },
  ];
  render() {
    const { storeRequisitions } = this.props;
    return (
      <div>
        <Table columns={this.columns} data={storeRequisitions} />
      </div>
    );
  }
}

export default StoreRequisitionTable;
