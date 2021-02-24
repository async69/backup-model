import React from "react";
import { Row, Col, Form, CardFooter } from "reactstrap";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";

import { getLoading } from "store/Inventory/EntryType";
import { connect } from "react-redux";
class AddEntryType extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        name: "",
        remarks: "",
      },
      errors: {},
      lockUpdate: false,
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      name: Joi.string().required().label("Name"),
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
        name: data.name ? data.name : "",
        remarks: data.remark ? data.remark : "",
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

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col md={6} sm={12} xs={12}>
            {this.renderInput("name", "Name")}
          </Col>
          <Col md={6} sm={12} xs={12}>
            {this.renderInput({
              name: "remarks",
              label: "Remarks",
            })}
          </Col>
        </Row>
        <CardFooter align="center">
          {this.renderButton(
            this.props.isEdit ? "Edit Entry Type" : "Add Entry Type"
          )}
        </CardFooter>
      </Form>
    );
  }
}

export default connect(getLoading)(AddEntryType);
