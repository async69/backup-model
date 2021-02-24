import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";
// import entryTypes from "static/assets/options/entryTypes.json";
import { getLoading } from "store/Inventory/InventoryControl/ItemAdjJournal";
import { connect } from "react-redux";
class StockMovementView extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        item_number: "",
        item: "",
        begining_quantity: "",
        purchase_receipt_qty: "",
        sales_issue_order_qty: "",
        sales_issue_voucher_qty: "",
        positive_adjustment_qty: "",
        negative_adjustment_qty: "",
        purchase_return_qty: "",
        sales_return_qty: "",
        consumption_qty: "",
        disposal_qty: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      item_name: Joi.string().optional().allow("").label("Item Number"),
    };
  }

  doSubmit() {
    this.props.submit(this.state.data);
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id,
        item_number: data.item_number,
        item: data.item,
        begining_quantity: data.begining_quantity,
        purchase_receipt_qty: data.purchase_receipt_qty,
        sales_issue_order_qty: data.sales_issue_order_qty,
        sales_issue_voucher_qty: data.sales_issue_voucher_qty,
        positive_adjustment_qty: data.positive_adjustment_qty,
        negative_adjustment_qty: data.negative_adjustment_qty,
        purchase_return_qty: data.purchase_return_qty,
        sales_return_qty: data.sales_return_qty,
        consumption_qty: data.consumption_qty,
        disposal_qty: data.disposal_qty,
      },
      lockUpdate: true,
    };
    this.setState(updatedState);
  }

  componentDidUpdate() {
    if (this.props.doneAdd) {
      this.resetForm();
    }

    if ((this.props.isEdit || this.props.isView) && !this.state.lockUpdate) {
      this.populateState(this.props.data);
    }
  }
  componentDidMount() {
    this.componentDidUpdate();
  }

  render() {
    return (
      <Card className="border-0">
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={6} sm={12} xs={12}>
                {this.renderInput("item_number", "Item Number")}
              </Col>
              <Col md={6} sm={12} xs={12}>
                {this.renderInput("item", "Item Name")}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "begining_quantity",
                  label: "Beginning Quantity",
                  type: "number",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "purchase_receipt_qty",
                  label: "Purchase Receipt Quantity",
                  type: "number",
                })}
              </Col>{" "}
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "sales_issue_order_qty",
                  label: "Sales Issue Order QTY",
                  type: "number",
                })}
              </Col>{" "}
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "sales_issue_voucher_qty",
                  label: "Sales Issue Voucher Quantity",
                  type: "number",
                })}
              </Col>{" "}
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "positive_adjustment_qty",
                  label: "Positive Adjustment Quantity",
                  type: "number",
                })}
              </Col>{" "}
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "negative_adjustment_qty",
                  label: "Negative Adjustment Quantity",
                  type: "number",
                })}
              </Col>{" "}
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "purchase_return_qty",
                  label: "Purchase Return QTY",
                  type: "number",
                })}
              </Col>{" "}
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "sales_return_qty",
                  label: "Sales Return Quantity",
                  type: "number",
                })}
              </Col>{" "}
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "consumption_qty",
                  label: "Consumption Quantity",
                  type: "number",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "disposal_qty",
                  label: "Disposal Quantity",
                  type: "number",
                })}
              </Col>
            </Row>
            <CardFooter align="center">{this.renderButton("Save")}</CardFooter>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
export default connect(getLoading)(StockMovementView);
