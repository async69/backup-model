import React, { Component } from "react";
import Tabel from "../../../common/table";
import { Button } from "reactstrap";
import { MdDelete, MdEdit } from "react-icons/md";

class StoreRequisitionLinesTable extends Component {
  columns = [
    { path: "quantity", label: "Quantity" },
    { path: "unit_price", label: "Unit Price" },
    { path: "total_amount", label: "Total Amount" },
    { path: "item.name", label: "Item" },
    { path: "unit_of_measurement.name", label: "Unit" },
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
            onClick={() => this.props.onDelete(line, "sr_lines")}
          >
            <MdDelete />
          </Button>
        ),
    },
  ];

  render() {
    const { storeRequisitionLines } = this.props;
    return (
      <div>
        <Tabel columns={this.columns} data={storeRequisitionLines}></Tabel>
      </div>
    );
  }
}

export default StoreRequisitionLinesTable;
