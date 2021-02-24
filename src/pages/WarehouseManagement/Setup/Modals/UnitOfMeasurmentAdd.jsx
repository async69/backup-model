import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { Row, Col, Form, CardFooter } from "reactstrap";

class UnitOfMeasurmentAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        name: "",
        code: "",
        remarks: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      name: Joi.string().required().label("Name"),
      code: Joi.string().required().label("Code"),
      remarks: Joi.string().allow("").optional(),
    };
  }

  doSubmit() {
    this.props.addUOM(this.state.data);
  }

  componentDidUpdate() {
    if (this.props.doneAdd) {
      this.resetForm();
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col md={6} sm={12} xs={12}>
            {this.renderInput("code", "Code")}
          </Col>
          <Col md={6} sm={12} xs={12}>
            {this.renderInput("name", "Name")}
          </Col>
          <Col md={12} sm={12} xs={12}>
            {this.renderInput("remarks", "Remarks")}
          </Col>
        </Row>
        <CardFooter align="center">{this.renderButton("Add UOM")}</CardFooter>
      </Form>
    );
  }
}
export default UnitOfMeasurmentAdd;
