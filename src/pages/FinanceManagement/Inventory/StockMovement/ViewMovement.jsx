import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Form,
  Row,
  Col,
} from "reactstrap";

class ViewMovement extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        item_number: "",
        transaction_type: "",
        purchase_receipt_qty: "",
        purchase_receive_amount: "",
        sales_issue_order_qty: "",
        sales_issue_order_amount: "",
        positive_adjustment_qty: "",
        positive_adjustment_amount: "",
        negative_adjustment_qty: "",
        negative_adjustment_amount: "",
        transfer_receive_qty: "",
        transfer_receive_amount: "",
        transfer_issue_qty: "",
        transfer_issue_amount: "",
        purchase_return_qty: "",
        purchase_return_amount: "",
        sales_return_qty: "",
        sales_return_amount: "",
        consumption_qty: "",
        consumption_amount: "",
        disposal_qty: "",
        disposal_amount: "",
        unit_of_measurement: "",
        item: "",
        entry_type: "",
        posting_date: "",
        warehouse: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      item_number: Joi.string(),
      transaction_type: Joi.string(),
      purchase_receipt_qty: Joi.string(),
      purchase_receive_amount: Joi.string(),
      sales_issue_order_qty: Joi.string(),
      sales_issue_order_amount: Joi.string(),
      positive_adjustment_qty: Joi.string(),
      positive_adjustment_amount: Joi.string(),
      negative_adjustment_qty: Joi.string(),
      negative_adjustment_amount: Joi.string(),
      transfer_receive_qty: Joi.string(),
      transfer_receive_amount: Joi.string(),
      transfer_issue_qty: Joi.string(),
      transfer_issue_amount: Joi.string(),
      purchase_return_qty: Joi.string(),
      purchase_return_amount: Joi.string(),
      sales_return_qty: Joi.string(),
      sales_return_amount: Joi.string(),
      consumption_qty: Joi.string(),
      consumption_amount: Joi.string(),
      disposal_qty: Joi.string(),
      disposal_amount: Joi.string(),
      unit_of_measurement: Joi.string(),
      item: Joi.string(),
      entry_type: Joi.string(),
      posting_date: Joi.string(),
      warehouse: Joi.string(),
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        item_number: String(data.item_number),
        transaction_type: String(data.transaction_type),
        purchase_receipt_qty: String(data.purchase_receipt_qty),
        purchase_receive_amount: String(data.purchase_receive_amount),
        sales_issue_order_qty: String(data.sales_issue_order_qty),
        sales_issue_order_amount: String(data.sales_issue_order_amount),
        positive_adjustment_qty: String(data.positive_adjustment_qty),
        positive_adjustment_amount: String(data.positive_adjustment_amount),
        negative_adjustment_qty: String(data.negative_adjustment_qty),
        negative_adjustment_amount: String(data.negative_adjustment_amount),
        transfer_receive_qty: String(data.transfer_receive_qty),
        transfer_receive_amount: String(data.transfer_receive_amount),
        transfer_issue_qty: String(data.transfer_issue_qty),
        transfer_issue_amount: String(data.transfer_issue_amount),
        purchase_return_qty: String(data.purchase_return_qty),
        purchase_return_amount: String(data.purchase_return_amount),
        sales_return_qty: String(data.sales_return_qty),
        sales_return_amount: String(data.sales_return_amount),
        consumption_qty: String(data.consumption_qty),
        consumption_amount: String(data.consumption_amount),
        disposal_qty: String(data.disposal_qty),
        disposal_amount: String(data.disposal_amount),
        unit_of_measurement: String(data.unit_of_measurement),
        item: String(data.item),
        entry_type: String(data.entry_type),
        posting_date: String(data.posting_date),
        warehouse: String(data.warehouse),
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

  doSubmit() {
    this.props.submit(this.state.data);
  }

  render() {
    return (
      <Card className="border-0">
        <CardHeader className="border-0">{this.props.title}</CardHeader>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "item_number",
                  label: "Item Number",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "transaction_type",
                  label: "Transaction Type",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "purchase_receipt_qty",
                  label: "Purchase Received Quantity",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "purchase_receive_amount",
                  label: "Purchase Rcevied Amount",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "sales_issue_order_qty",
                  label: "Sales Issue Order Quantity",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "sales_issue_order_amount",
                  label: "Sales Issue Order Amount",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "positive_adjustment_qty",
                  label: "Posetive Adjustment Quantity",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "positive_adjustment_amount",
                  label: "Posetive Adjustment Amount",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "negative_adjustment_qty",
                  label: "Negative Adjustment Quantity",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "negative_adjustment_amount",
                  label: "Negative Adjustment Amount",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "transfer_receive_qty",
                  label: "Transfer Receive Quantity",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "transfer_receive_amount",
                  label: "Transfer Receive Amount",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "transfer_issue_qty",
                  label: "Tranfer Issue Quantity",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "transfer_issue_amount",
                  label: "Transfer Issue Amount",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "purchase_return_qty",
                  label: "Purchase Receive Quantity",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "purchase_return_amount",
                  label: "Purchase Receive Amount",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "sales_return_qty",
                  label: "Sales Return Quantity",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "sales_return_amount",
                  label: "Sales Return Amount",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "consumption_qty",
                  label: "Consmption Quantity",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "consumption_amount",
                  label: "Consmption Quantity",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "disposal_qty",
                  label: "Disposal Quantity",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "disposal_amount",
                  label: "Disposal Amount",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "unit_of_measurement",
                  label: "Unit of Measurement",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "item",
                  label: "Item Name",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "posting_date",
                  label: "Posting Date",
                  type: "date",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "warehouse",
                  label: "Warehouse",
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
export default ViewMovement;
