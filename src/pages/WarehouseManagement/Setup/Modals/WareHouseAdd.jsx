import React from "react";
import { Row, Col, Form, CardFooter } from "reactstrap";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";

class AddWarehouse extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        name: "",
        code: "",
        location: "",
        binMandatory: false,
        remarks: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      name: Joi.string().required().label("Name"),
      code: Joi.string().required().label("Code"),
      location: Joi.string().required().label("Location"),
      remarks: Joi.string().allow("").optional(),
      binMandatory: Joi.boolean().allow(false).optional(),
    };
  }
  doSubmit() {
    this.props.addWarehouse(this.state.data);
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
          <Col md={4} sm={12} xs={12}>
            {this.renderInput("code", "Code")}
          </Col>
          <Col md={4} sm={12} xs={12}>
            {this.renderInput("name", "Name")}
          </Col>
          <Col md={4} sm={12} xs={12}>
            {this.renderInput("location", "Location")}
          </Col>

          <Col md={12} sm={12} xs={12}>
            {this.renderCheckbox("binMandatory", "Bin Mandatory")}
          </Col>
          <hr />
          <Col md={12} sm={12} xs={12}>
            {this.renderInput("remarks", "Remarks")}
          </Col>
        </Row>
        <CardFooter align="center">
          {this.renderButton("Add Warehouse")}
        </CardFooter>
      </Form>
    );
  }
}

export default AddWarehouse;
