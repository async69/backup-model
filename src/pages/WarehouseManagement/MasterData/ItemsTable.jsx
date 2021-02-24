import React, { Component } from "react";
import { Button } from "reactstrap";
import Table from "pages/common/table";
import { MdDelete, MdRemoveRedEye } from "react-icons/md";
import { MdEdit } from "react-icons/md";

class ItemsTable extends Component {
  columns = [
    { path: "name", label: "Name" },
    { path: "costing_method_detail.name", label: "Costing Method" },
    { path: "category_detail.name", label: "Category" },
    { path: "basic_unit_of_measurement_detail.name", label: "Basic Unit" },
    { path: "document_number", label: "Document Number" },
    { path: "invetory_quantity", label: "Inventory Quantity" },
    { path: "quantity_on_purchase_order", label: "Qty On Purchase Order" },
    { path: "quantity_on_production_order", label: "Qty On Production Order" },
    { path: "quantity_on_sales_order", label: "Qty On Sales Order" },
    { path: "sales_price", label: "Sales Price" },
    { path: "unit_cost", label: "Unit Cost" },
    { path: "remarks", label: "Remarks" },
    { path: "item_type", label: "Item Type" },
    // { path: "warehouse", label: "Warehouse" },
    // { path: "bin", label: "Bin" },
    {
      path: "general_product_posting_group_detail.name",
      label: "General Product Posting Group",
    },
    {
      path: "vat_product_posting_group_detail.name",
      label: "VAT Product Posting Group",
    },
    {
      path: "inventory_posting_group_detail.name",
      label: "Inventory Posting Group",
    },
    // { path: "item_location[0]", label: "Location" },
    {
      key: "buttons",
      content: (item) => (
        <div>
          <Button
            className="ml-3"
            size="sm"
            outline
            color="primary"
            onClick={() => this.props.onToggle("VIEW", item)}
          >
            <MdRemoveRedEye />
          </Button>

          <>
            <Button
              className="ml-3"
              size="sm"
              outline
              color="warning"
              onClick={() => this.props.onToggle("EDIT", item)}
            >
              <MdEdit />
            </Button>
            <Button
              className="ml-3"
              size="sm"
              outline
              color="danger"
              onClick={() => this.props.onToggle("DELETE", item)}
            >
              <MdDelete />
            </Button>
          </>
        </div>
      ),
    },
  ];
  render() {
    const { items } = this.props;
    return (
      <div>
        <Table columns={this.columns} data={items} />
      </div>
    );
  }
}

export default ItemsTable;
