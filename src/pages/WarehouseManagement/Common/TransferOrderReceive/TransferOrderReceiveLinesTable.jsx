import React, { Component } from "react";
import Tabel from "../../../common/table";
import { Button } from "reactstrap";
import { MdDelete, MdEdit } from "react-icons/md";

class TransferOrderReceiveLinesTable extends Component {
  columns = [
    { path: "item.name", label: "Item" },
    { path: "from_bin.name", label: "From Bin" },
    { path: "to_bin.name", label: "To Bin" },
    { path: "from_warehouse.name", label: "From Warehouse" },
    { path: "to_warehouse.name", label: "To Warehouse" },
    { path: "unit_of_measurement.name", label: "Unit" },
    { path: "remaining_quantity", label: "Remaining Quantity" },
    { path: "quantity_requested", label: "Quantity Requested" },
    { path: "quantity_received", label: "Quantity Received" },
    { path: "remarks", label: "Remarks" },
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
            onClick={() => this.props.onDelete(line, "tor_lines")}
          >
            <MdDelete />
          </Button>
        ),
    },
  ];

  render() {
    const { transferOrderReceiveLines } = this.props;
    return (
      <div>
        <Tabel columns={this.columns} data={transferOrderReceiveLines}></Tabel>
      </div>
    );
  }
}

export default TransferOrderReceiveLinesTable;
