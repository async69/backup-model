import React, { Component } from "react";
import Table from "../../../common/table";
import { MdDelete, MdRemoveRedEye } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { Button } from "reactstrap";
import { MdPrint } from "react-icons/md";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Print from "./TOIprint/components/reports/Print";
import invoice from "../../../PrintDummyData/data/invoice";

class TransferOrderIssueTable extends Component {
  columns = [
    {
      path: "store_requisition_detail.document_number",
      label: "Store Requisition",
    },
    { path: "document_number", label: "Document Number" },
    { path: "issued_by", label: "Issued By" },
    { path: "posting_date", label: "Posting Date" },
    { path: "approved_by", label: "Approved By" },
    { path: "approved_date", label: "Approved Date" },
    { path: "remarks", label: "Remarks" },
    { path: "status", label: "Status" },
    {
      key: "buttons",
      content: (toi) => (
        <div>
          <Button
            className="ml-3"
            size="sm"
            outline
            color="info"
            onClick={() => this.props.onToggle("VIEW", toi)}
          >
            <MdRemoveRedEye />
          </Button>
          {toi.status === "Open" && (
            <>
              <Button
                className="ml-3"
                size="sm"
                outline
                color="warning"
                onClick={() => this.props.onToggle("EDIT", toi)}
              >
                <MdEdit />
              </Button>
              <Button
                className="ml-3"
                size="sm"
                outline
                color="danger"
                onClick={() => this.props.onToggle("DELETE", toi)}
              >
                <MdDelete />
              </Button>
            </>
          )}
          {toi.status === "Approved" && (
            <Button
              className="ml-3"
              size="sm"
              outline
              color="success"
              onClick={() => this.props.onToggle("POST", toi)}
            >
              Post
            </Button>
          )}
          {toi.status === "Open" && (
            <Button
              className="ml-3"
              size="sm"
              outline
              color="success"
              onClick={() => this.props.onToggle("APPROVE", toi)}
            >
              Approve
            </Button>
          )}
        </div>
      ),
    },
  ];
  render() {
    const { transferOrderIssues } = this.props;
    return (
      <div>
        <Table columns={this.columns} data={transferOrderIssues} />

        <PDFDownloadLink
          document={
            <Print orientation="landscape" className="app" invoice={invoice} />
          }
          fileName="TOI.pdf"
        >
          {({ loading }) =>
            loading ? (
              <Button className="ml-3" size="sm" outline color="info">
                Loading ...
              </Button>
            ) : (
              <Button className="ml-3" size="sm" outline color="info">
                <MdPrint />
              </Button>
            )
          }
        </PDFDownloadLink>
      </div>
      // this is some commit test 
      
    );
  }
}

export default TransferOrderIssueTable;
