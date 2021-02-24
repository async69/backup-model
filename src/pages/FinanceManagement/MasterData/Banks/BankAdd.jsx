import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";

class BankAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        document_number: "",
        name: "",
        code: "",
        bic: "",
      },
      errors: {},
      lockUpdate: false,
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      document_number: Joi.string()
        .optional()
        .allow("")
        .label("Document Number"),
      name: Joi.string().required().label("Name"),
      code: Joi.string().required().label("Code"),
      bic: Joi.string().required().label("BIC"),
    };
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
        document_number: data.document_number ? data.document_number : "",
        name: data.name ? data.name : "",
        bic: data.bic ? data.bic : "",
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
    let label = "Add";
    if (this.props.isEdit) {
      label = "Edit";
    }
    return (
      <Card className="border-0">
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput("code", "Code")}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput("name", "Name")}
              </Col>
              <Col md={12} sm={6} xs={12}>
                {this.renderInput("bic", "BIC")}
              </Col>
            </Row>
            <CardFooter align="center">
              {this.renderButton(`${label} Bank`)}
            </CardFooter>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
export default BankAdd;
