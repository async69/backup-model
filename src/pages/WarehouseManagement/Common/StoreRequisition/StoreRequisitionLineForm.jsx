import React from "react";
import { CardBody, Col, Form, Row } from "reactstrap";
import ReusabelForm from "../../../common/form";
import Joi from "joi-browser";

class StoreRequisitionLineForm extends ReusabelForm {
  initialState = {
    data: {
      quantity: "",
      unit_price: "",
      total_amount: "",
      remarks: "",
      item: "",
      unit_of_measurement: "",
    },
    errors: {},
  };
  state = JSON.parse(JSON.stringify(this.initialState));
  schema = {
    id: Joi.any().allow("").optional(),
    quantity: Joi.number().integer(),
    unit_price: Joi.number().integer(),
    total_amount: Joi.number().integer(),
    remarks: Joi.string().allow("").optional(),
    item: Joi.string(),
    unit_of_measurement: Joi.string(),
  };
  mapToViewModel(line) {
    return {
      id: line.id,
      quantity: line.quantity,
      unit_price: line.unit_price,
      total_amount: line.total_amount,
      remarks: line.remarks,
      item: line.item,
      unit_of_measurement: line.unit_of_measurement,
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
      this.props.onSubmit(this.state.data, "sr_lines");
      this.resetForm();
    } catch (error) {}
  };
  render() {
    return (
      <CardBody>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col md={2} sm={12} xs={12}>
              {this.renderInput("quantity", "Quantity", "number")}
            </Col>
            <Col md={2} sm={12} xs={12}>
              {this.renderInput("unit_price", "Unit Price", "number")}
            </Col>
            <Col md={2} sm={12} xs={12}>
              {this.renderInput("total_amount", "Total Amount", "number")}
            </Col>
            <Col md={2} sm={12} xs={12}>
              {this.renderSelect("item", "Item", this.props.items, "server")}
            </Col>
            <Col md={2} sm={12} xs={12}>
              {this.renderSelect(
                "unit_of_measurement",
                "Unit",
                this.props.unitOfMeasurements,
                "server"
              )}
            </Col>
            <Col md={6} sm={12} xs={12}>
              {this.renderInput("remarks", "Remarks (optional)", "textarea")}
            </Col>
            <Col align="center" md={12} sm={12} xs={12}>
              {this.renderButton("Insert Line")}
            </Col>
          </Row>
        </Form>
      </CardBody>
    );
  }
}

export default StoreRequisitionLineForm;
