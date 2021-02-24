import React from "react";
import { Col, Form, Row } from "reactstrap";
import ReusabelForm from "../../../common/form";
import Joi from "joi-browser";

class PurchaseInvoiceLineForm extends ReusabelForm {
  initialState = {
    data: {
      quantity: "",
      quantity_invoiced: "",
      unit_of_measurement: "",
      unit_price: "",
      currency: "",
      remark: "",
      item: "",
    },
    errors: {},
  };
  state = this.initialState;
  schema = {
    id: Joi.any().allow("").optional(),
    quantity: Joi.number(),
    quantity_invoiced: Joi.number(),
    unit_of_measurement: Joi.string(),
    unit_price: Joi.number(),
    currency: Joi.string(),
    remark: Joi.string(),
    item: Joi.string(),
  };
  mapToViewModel(line) {
    return {
      id: line.id,
      quantity: line.quantity,
      quantity_invoiced: line.quantity_invoiced,
      unit_of_measurement: line.unit_of_measurement,
      unit_price: line.unit_price,
      currency: line.currency,
      remark: line.remark,
      item: line.item.id,
    };
  }
  populateLine() {
    const { selectedLine } = this.props;
    if (!selectedLine) return;
    this.setState({ data: this.mapToViewModel(selectedLine) });
  }
  componentDidMount() {
    this.populateLine();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevProps.selectedLine) !==
      JSON.stringify(this.props.selectedLine)
    ) {
      this.populateLine();
    }
  }
  doSubmit = async () => {
    try {
      this.props.onSubmit(this.state.data, "purchase_invoice_line");
      this.resetForm();
    } catch (error) {}
  };
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col md={2} sm={6} xs={12}>
            {this.renderInput("quantity", "Quantity", "number")}
          </Col>
          <Col md={2} sm={6} xs={12}>
            {this.renderInput(
              "quantity_invoiced",
              "Quantity Invoiced",
              "number"
            )}
          </Col>
          <Col md={2} sm={6} xs={12}>
            {this.renderSelect(
              "unit_of_measurement",
              "Unit Of Measurement",
              this.props.unitMeasurements.map((unit) => unit.name)
            )}
          </Col>
          <Col md={2} sm={6} xs={12}>
            {this.renderInput("unit_price", "Unit Price", "number")}
          </Col>
          <Col md={2} sm={6} xs={12}>
            {this.renderInput("currency", "Currency")}
          </Col>
          <Col md={2} sm={6} xs={12}>
            {this.renderSelect("item", "Item", this.props.items, "server")}
          </Col>
          <Col md={12} sm={12} xs={12}>
            {this.renderInput("remark", "Remark", "textarea")}
          </Col>
          <Col align="center" md={12} sm={12} xs={12}>
            {this.renderButton("Insert Line")}
          </Col>
        </Row>
      </Form>
    );
  }
}

export default PurchaseInvoiceLineForm;
