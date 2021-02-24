import React from "react";
import ReusableForm from "../../common/form";
import Joi from "joi-browser";
import { connect } from "react-redux";
import {
  CardBody,
  Form,
  Row,
  Col,
  CardFooter,
  Card,
  CardHeader,
} from "reactstrap";
import { selectItemCategories } from "store/Inventory/MasterData/itemCategories";

import { selectUOMs } from "store/Inventory/UnitOfMeasurement";
import { selectWarehouses } from "store/Inventory/Warehouse";
import {
  Add as addItem,
  Edit as updateItem,
  selectAddStatus,
  selectEditStatus,
} from "store/Inventory/MasterData/items";
import { selectBins } from "store/Inventory/Bin";
import { selectCostingMethods } from "store/GeneralSetup/CostingMethods";
import { selectVATPostingGroups } from "store/GeneralSetup/Posting/VAT_Posting_Group";
import { selectGeneralBusinessPostingGroups } from "store/GeneralSetup/Posting/GeneralBusinessPostingGroup";
import { selectInventoryPostingGroups } from "store/GeneralSetup/Posting/InventoryPostingGroups";
class ItemForm extends ReusableForm {
  initialState = {
    data: {
      document_number: "",
      name: "",
      invetory_quantity: "0",
      quantity_on_purchase_order: "0",
      quantity_on_production_order: "0",
      quantity_on_sales_order: "0",
      sales_price: "",
      is_blocked: "false",
      unit_cost: "0",
      remarks: "",
      item_type: "",
      warehouse: "",
      bin: "",
      category: "",
      basic_unit_of_measurement: "",
      costing_method: "",
      general_product_posting_group: "",
      vat_product_posting_group: "",
      inventory_posting_group: "",
    },

    errors: {},
  };
  state = this.initialState;
  schema = {
    id: Joi.any().allow("").optional(),
    document_number: Joi.any().allow("").optional(),
    name: Joi.string(),
    invetory_quantity: Joi.number(),
    quantity_on_purchase_order: Joi.number().allow("").optional(),
    quantity_on_production_order: Joi.number().allow("").optional(),
    quantity_on_sales_order: Joi.number().allow("").optional(),
    sales_price: Joi.string(),
    is_blocked: Joi.boolean().allow("").optional(),
    unit_cost: Joi.string(),
    remarks: Joi.string().allow("").optional(),
    item_type: Joi.string().valid([
      "Product",
      "Raw Material",
      "Spare part",
      "Service",
    ]),
    warehouse: Joi.string(),
    bin: Joi.string(),
    category: Joi.string(),
    basic_unit_of_measurement: Joi.string(),
    costing_method: Joi.string(),
    general_product_posting_group: Joi.any(),
    vat_product_posting_group: Joi.any(),
    inventory_posting_group: Joi.any(),
  };

  mapToViewModel(item) {
    return {
      id: item.id,
      document_number: item.document_number,
      name: item.name,
      invetory_quantity: item.invetory_quantity,
      quantity_on_purchase_order: item.quantity_on_production_order,
      quantity_on_production_order: item.quantity_on_production_order,
      quantity_on_sales_order: item.quantity_on_sales_order,
      sales_price: item.sales_price,
      is_blocked: item.is_blocked,
      unit_cost: item.unit_cost,
      remarks: item.remarks,
      item_type: item.item_type,
      warehouse: item.warehouse,
      bin: item.bin,
      category: item.category_detail.id,
      basic_unit_of_measurement: item.basic_unit_of_measurement_detail.id,
      costing_method: item.costing_method_detail.id,
      general_product_posting_group:
        item.general_product_posting_group_detail.id,
      vat_product_posting_group: item.vat_product_posting_group_detail.id,
      inventory_posting_group: item.inventory_posting_group_detail.id,
    };
  }

  pupulateItem() {
    if (!this.props.item) return;
    this.setState({ data: this.mapToViewModel(this.props.item) });
  }

  componentDidMount() {
    this.pupulateItem();
  }
  doSubmit = async () => {
    const { data } = this.state;

    if (data.id) {
      await this.props.updateItem(data);
      if (this.props.editStatus.status === "success") {
        this.toast.success("item updated successfully");
        this.resetForm();
      }
    } else {
      await this.props.addItem(data);
      if (this.props.addStatus.status === "success") {
        this.toast.success("item added successfully");
        this.resetForm();
      }
    }
  };

  render() {
    const { data } = this.state;
    return (
      <Card className="border-0">
        <CardHeader className="border-0">ADD New Item </CardHeader>
        <Form onSubmit={this.handleSubmit} disabled={this.props.disabled}>
          <CardBody>
            <Row>
              {data.id && (
                <Col md={3} sm={12} xs={12}>
                  {this.renderInput("document_number", "Document Number")}
                </Col>
              )}
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("name", "Item Name")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("invetory_quantity", "Inventory Qty")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput(
                  "quantity_on_purchase_order",
                  "Qty On Purchase Order"
                )}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput(
                  "quantity_on_production_order",
                  "Qty On Production Order"
                )}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput(
                  "quantity_on_sales_order",
                  "Qty On Sales Order"
                )}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("sales_price", "Sales Price")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderCheckbox("is_blocked", "Block")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("unit_cost", "Unit Cost")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect("item_type", "Item Type", [
                  "Product",
                  "Raw Material",
                  "Spare part",
                  "Service",
                ])}
              </Col>

              <Col md={4} sm={6} xs={12}>
                {this.renderSelect(
                  "warehouse",
                  "Warehouse",
                  this.props.warehouses,
                  "server"
                )}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect("bin", "Bin", this.props.bins, "server")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect(
                  "category",
                  "category",
                  this.props.itemCategories,
                  "server"
                )}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect(
                  "basic_unit_of_measurement",
                  "Basic Unit of measurement",
                  this.props.unitMeasurements,
                  "server"
                )}
              </Col>

              <Col md={3} sm={6} xs={12}>
                {this.renderSelect(
                  "costing_method",
                  "Costing Method",
                  this.props.costingMethods,
                  "server"
                )}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect(
                  "general_product_posting_group",
                  "General Product Posting Group",
                  this.props.generalBusinessPostingGroups,
                  "server"
                )}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect(
                  "vat_product_posting_group",
                  "VAT Product Posting Group",
                  this.props.vatPostingGroups,
                  "server"
                )}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect(
                  "inventory_posting_group",
                  "Inventory Posting Group",
                  this.props.inventoryPostingGroups,
                  "server"
                )}
              </Col>
              <Col md={12} sm={12} xs={12}>
                {this.renderInput("remarks", "Remarks", "textarea")}
              </Col>
            </Row>
          </CardBody>
          <CardFooter align="center">
            {this.renderButton("Save Item")}
          </CardFooter>
        </Form>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  itemCategories: selectItemCategories(state),
  unitMeasurements: selectUOMs(state),
  warehouses: selectWarehouses(state),
  bins: selectBins(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  costingMethods: selectCostingMethods(state),
  vatPostingGroups: selectVATPostingGroups(state),
  generalBusinessPostingGroups: selectGeneralBusinessPostingGroups(state),
  inventoryPostingGroups: selectInventoryPostingGroups(state),
});

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
  updateItem: (item) => dispatch(updateItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);
