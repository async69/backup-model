import React, { Component } from "react";
import { Card, CardHeader, Col, Button } from "reactstrap";
import Page from "../../../../components/Page";
import Table from "../../../common/table";
import { reverse } from "../../../../helpers/reverse";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import CommonModals from "../../../../components/CommonModal";
import VendorTypeForm from "./VendorTypeForm";

class VendorTypesTable extends Component {
  columns = [
    { path: "code", label: "Code" },
    { path: "name", label: "Name" },
    { path: "remarks", label: "Remarks" },
    {
      key: "buttons",
      content: (vendorType) => (
        <div>
          <Button
            className="ml-3"
            size="sm"
            outline
            color="info"
            onClick={() => this.props.onToggle("VIEW", vendorType)}
          >
            <MdRemoveRedEye />
          </Button>
          <Button
            className="ml-3"
            size="sm"
            outline
            color="warning"
            onClick={() => this.props.onToggle("EDIT", vendorType)}
          >
            <MdEdit />
          </Button>
          <Button
            className="ml-3"
            size="sm"
            outline
            color="danger"
            onClick={() => this.props.onToggle("DELETE", vendorType)}
          >
            <MdDelete />
          </Button>
        </div>
      ),
    },
  ];
  render() {
    const { vendorTypes } = this.props;
    return (
      <div>
        <Table columns={this.columns} data={vendorTypes} />
      </div>
    );
  }
}

export default VendorTypesTable;
