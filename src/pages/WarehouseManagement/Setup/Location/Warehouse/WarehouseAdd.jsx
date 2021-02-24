import React from "react";
import ParentForm from "../../../../common/form";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";

import { getLoading } from "store/Inventory/Warehouse";
import { connect } from "react-redux";

class WarehouseAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        code: "",
        name: "",
        location: "",
        is_bin_mandatory: "",
        remarks: "",
      },
      errors: {},
      lockUpdate: false,
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      code: Joi.string().required().label("Code"),
      name: Joi.string().required().label("Name"),
      location: Joi.string().required().label("Location"),
      is_bin_mandatory: Joi.string()
        .allow("")
        .optional()
        .label("is Bin Mandatory"),
      remarks: Joi.string().allow("").optional(),
    };
    this.populateState = this.populateState.bind(this);
  }

  doSubmit() {
    this.props.submit(this.state.data);
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        code: data.code ? data.code : "",
        name: data.name ? data.name : "",
        location: data.location ? data.location : "",
        is_bin_mandatory: data.is_bin_mandatory ? data.is_bin_mandatory : "",
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
    return (
      <Card className="border-0">
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("code", "Code")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("name", "Name")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("location", "Location")}
              </Col>
              <Col md={12} sm={12} xs={12}>
                {this.renderInput("remarks", "Remarks", "textarea")}
              </Col>
            </Row>
            <CardFooter align="center">{this.renderButton("Save")}</CardFooter>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
export default connect(getLoading)(WarehouseAdd);
