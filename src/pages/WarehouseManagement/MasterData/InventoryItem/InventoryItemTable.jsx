import React, { Component } from "react";
import Table from "../../../common/table";

class InventoryItemTable extends Component {
  columns = [
    { path: "item.no", label: "Item No" },
    { path: "item.name", label: "item Name" },
    { path: "item.category.code", label: "item category code " },
    { path: "category.name", label: "item category name" },
    { path: "uom", label: "Basic unit of measurement   " },
    { path: "isActive", label: "is active " },
    { path: "currentQuantity", label: "curent quantity" },
    { path: "locationCode", label: "Location Code " },
    { path: "remark", label: "Remark" },

  ];
  render() {
    const { inventoryItemTable } = this.props;
    return (
      <div>
        <Table columns={this.columns} data={inventoryItemTable} />
      </div>
    );
  }
}

export default InventoryItemTable;