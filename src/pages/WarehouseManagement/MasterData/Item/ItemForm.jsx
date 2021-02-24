import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { CardBody, CardFooter, Form, Row, Col } from "reactstrap";
import { getLoading } from "store/Inventory/MasterData/items";
import { connect } from "react-redux";
import costing_methods from "static/data/costingMethods.json";

class ItemForm extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        document_number: "",
        name: "",
        quantity_on_purchase_order: "0",
        quantity_on_production_order: "0",
        quantity_on_sales_order: "0",
        price: "",
        is_blocked: "",
        can_be_sold: "",
        can_be_purchased: "",
        unit_cost: "0",
        remarks: "",
        warehouse: "",
        bin: "",
        category: "",
        basic_unit_of_measurement: "",
        costing_method: "",
        vat_product_posting_group: "",
        inventory_posting_group: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.any().allow("").optional(),
      document_number: Joi.any().allow("").optional(),
      name: Joi.string(),
      quantity_on_purchase_order: Joi.number().allow("").optional(),
      quantity_on_production_order: Joi.number().allow("").optional(),
      quantity_on_sales_order: Joi.number().allow("").optional(),
      price: Joi.string(),
      is_blocked: Joi.boolean().allow("").optional(),
      can_be_sold: Joi.boolean().allow("").optional(),
      can_be_purchased: Joi.boolean().allow("").optional(),
      unit_cost: Joi.string(),
      remarks: Joi.string().allow("").optional(),
      warehouse: Joi.string(),
      bin: Joi.string(),
      category: Joi.string(),
      basic_unit_of_measurement: Joi.string(),
      costing_method: Joi.string().allow(""),
      vat_product_posting_group: Joi.any(),
      inventory_posting_group: Joi.any(),
    };
  }

  populateState(item) {
    const updatedState = {
      ...this.state,
      data: {
        id: item.id,
        document_number: item.document_number,
        name: item.name,
        quantity_on_purchase_order: item.quantity_on_production_order,
        quantity_on_production_order: item.quantity_on_production_order,
        quantity_on_sales_order: item.quantity_on_sales_order,
        price: item.price,
        is_blocked: item.is_blocked,
        can_be_sold: item.can_be_sold,
        can_be_purchased: item.can_be_purchased,
        unit_cost: item.unit_cost,
        remarks: item.remarks,
        warehouse: item.warehouse,
        bin: item.bin,
        category: item.category_detail ? item.category_detail.id : "",
        basic_unit_of_measurement: item.basic_unit_of_measurement_detail
          ? item.basic_unit_of_measurement_detail.id
          : "",
        costing_method: item.costing_method_detail
          ? item.costing_method_detail.id
          : "",
        vat_product_posting_group: item.vat_product_posting_group_detail
          ? item.vat_product_posting_group_detail.id
          : "",
        inventory_posting_group: item.inventory_posting_group_detail
          ? item.inventory_posting_group_detail.id
          : "",
      },
      lockUpdate: true,
    };
    this.setState(updatedState);
  }

  componentDidUpdate() {
    if ((this.props.isEdit || this.props.isView) && !this.state.lockUpdate) {
      this.populateState(this.props.data);
    }
  }
  componentDidMount() {
    this.componentDidUpdate();
  }

  doSubmit() {
    const body = {
      ...this.state.data,
      is_blocked: this.state.data.is_blocked ? true : false,
      can_be_sold: this.state.data.can_be_sold ? true : false,
      can_be_purchased: this.state.data.can_be_purchased ? true : false,
    };
    this.props.submit(body);
  }

  render() {
    const { isView } = this.props;
    const { can_be_purchased } = this.state.data;
    const {
      itemCategories,
      unitMeasurements,
      warehouses,
      bins,
      vatPostingGroups,
      inventoryPostingGroups,
    } = this.props.options;
    return (
      <>
        {/* <CardHeader className="border-0">{this.props.title}</CardHeader> */}
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={4} sm={6} xs={12}>
                {this.renderCheckbox({
                  name: "can_be_sold",
                  label: "Can Be Sold",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderCheckbox({
                  name: "can_be_purchased",
                  label: "Can Be Purchased",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderCheckbox({
                  name: "is_blocked",
                  label: "Availability",
                })}
              </Col>
              <Col md={12} xs={12} sm={12}>
                <hr />
              </Col>
              {isView && (
                <Col md={4} sm={6} xs={12}>
                  {this.renderInput({
                    name: "document_number",
                    label: "Document Number",
                  })}
                </Col>
              )}

              <Col md={4} sm={6} xs={12}>
                {this.renderInput("name", "Item Name")}
              </Col>

              <Col md={4} sm={6} xs={12}>
                {this.renderInput("price", "Price")}
              </Col>

              {!can_be_purchased && (
                <Col md={4} sm={6} xs={12}>
                  {this.renderInput("unit_cost", "Unit Cost")}
                </Col>
              )}

              <Col md={4} sm={6} xs={12}>
                {this.renderSelect(
                  "warehouse",
                  "Warehouse",
                  warehouses,
                  "server"
                )}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect(
                  "bin",
                  "Bin",
                  bins.filter(
                    (bin) =>
                      this.state.data.warehouse === bin.warehouse_detail.id
                  ),
                  "server"
                )}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect(
                  "category",
                  "Category",
                  itemCategories,
                  "server"
                )}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect(
                  "basic_unit_of_measurement",
                  "Basic Unit of measurement",
                  unitMeasurements,
                  "server"
                )}
              </Col>

              <Col md={4} sm={6} xs={12}>
                {this.renderSelect(
                  "costing_method",
                  "Costing Method",
                  costing_methods
                )}
              </Col>
              {isView ? (
                <Col md={4} sm={6} xs={12}>
                  {this.renderSelect(
                    "vat_product_posting_group",
                    "VAT Product Posting Group",
                    vatPostingGroups,
                    "server"
                  )}
                </Col>
              ) : (
                <Col md={4} sm={6} xs={12}>
                  {this.renderSelect(
                    "vat_product_posting_group",
                    "VAT Product Posting Group",
                    vatPostingGroups,
                    "server"
                  )}
                </Col>
              )}

              <Col md={4} sm={6} xs={12}>
                {this.renderSelect(
                  "inventory_posting_group",
                  "Inventory Posting Group",
                  inventoryPostingGroups,
                  "server"
                )}
              </Col>

              <Col className="mt-3" md={12} sm={12} xs={12}>
                {this.renderInput("remarks", "Remarks", "textarea")}
              </Col>
            </Row>
            <CardFooter align="center">{this.renderButton("Save")}</CardFooter>
          </Form>
        </CardBody>
      </>
    );
  }
}
export default connect(getLoading)(ItemForm);
