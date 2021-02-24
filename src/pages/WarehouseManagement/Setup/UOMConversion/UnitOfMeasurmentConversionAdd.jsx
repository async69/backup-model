import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";

import { getLoading } from "store/Inventory/UnitConversion";
import { connect } from "react-redux";
class UOMConversionAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        amount: "",
        basic_unit_of_measurement: "",
        derived_unit_of_measurement: "",
        remarks: "",
        basic_amount: "1",
      },
      errors: {},
      lockUpdate: false,
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      amount: Joi.string().required().label("Code"),
      basic_unit_of_measurement: Joi.string().required().label("Basic UOM"),
      derived_unit_of_measurement: Joi.string().required().label("Derived UOM"),
      remarks: Joi.string().allow("").optional(),
      basic_amount: Joi.string().allow("").optional(),
    };
    this.populateState = this.populateState.bind(this);
  }

  doSubmit() {
    const data = { ...this.state.data };
    delete data.basic_amount;
    this.props.submit(this.state.data);
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        amount: data.amount ? data.amount : "",
        basic_unit_of_measurement: data.basic_unit_of_measurement_detail.id
          ? data.basic_unit_of_measurement_detail.id
          : "",
        derived_unit_of_measurement: data.derived_unit_of_measurement_detail.id
          ? data.derived_unit_of_measurement_detail.id
          : "",
        remarks: data.remarks ? data.remarks : "",
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
    const { UOMs } = this.props.options;
    return (
      <Card className="border-0">
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "basic_unit_of_measurement",
                  label: "Basic UOM",
                  options: UOMs,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput({
                  name: "basic_amount",
                  label: "Amount",
                  disabled: true,
                })}
              </Col>

              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "derived_unit_of_measurement",
                  label: "Derived UOM",
                  options: UOMs,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("amount", "Amount")}
              </Col>
              <Col md={12} sm={6} xs={12}>
                {this.renderInput("remarks", "Remarks")}
              </Col>
            </Row>
            <CardFooter align="center">{this.renderButton("Save")}</CardFooter>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
export default connect(getLoading)(UOMConversionAdd);
