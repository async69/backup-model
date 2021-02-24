import React, { Component } from "react";
import Tabel from "../../../common/table";
import { InlineTable } from "../../../common/InLineEditableTable";
import Joi from "joi-browser";

class TransferOrderIssueLinesTable extends Component {
  schema = {
    _id: Joi.any().allow("").optional(),
    remaining_quantity: Joi.string(),
    quantity_requested: Joi.number(),
    quantity_issued: Joi.number(),
    remarks: Joi.string(),
    item: Joi.string(),
    unit_of_measurement: Joi.string(),
    from_warehouse: Joi.string(),
    to_warehouse: Joi.string(),
    from_bin: Joi.string(),
    to_bin: Joi.string(),
  };
  getColumns = (options) => {
    const { items, unitOfMeasurements, bins, warehouses } = options;
    return [
      {
        tag: "item",
        label: "Item Name",
        type: "select",
        options: items,
        optionsFrom: "server",
      },
      {
        tag: "from_bin",
        label: "From Bin",
        type: "select",
        options: bins,
        optionsFrom: "server",
      },
      {
        tag: "to_bin",
        label: "To Bin",
        type: "select",
        options: bins,
        optionsFrom: "server",
      },
      {
        tag: "from_warehouse",
        label: "From Warehouse",
        type: "select",
        options: warehouses,
        optionsFrom: "server",
      },
      {
        tag: "to_warehouse",
        label: "To Warehouse",
        type: "select",
        options: warehouses,
        optionsFrom: "server",
      },
      {
        tag: "unit_of_measurement",
        label: "Unit of Measurement",
        type: "select",
        options: unitOfMeasurements,
        optionsFrom: "server",
      },

      {
        tag: "remaining_quantity",
        label: "Remaining Quantity",
        type: "number",
      },
      {
        tag: "quantity_requested",
        label: "Quantity Requested",
        type: "number",
      },
      { tag: "quantity_issued", label: "Quantity issued", type: "number" },
      { tag: "remarks", label: "Remarks", type: "text" },
    ];
  };

  render() {
    const {
      transferOrderIssueLines,
      onLineUpdate,
      options,
      disabled,
    } = this.props;
    return (
      <InlineTable
        columns={this.getColumns(options)}
        disabled={disabled}
        data={transferOrderIssueLines}
        callback={onLineUpdate}
        schema={this.schema}
      />
    );
  }
}

export default TransferOrderIssueLinesTable;
