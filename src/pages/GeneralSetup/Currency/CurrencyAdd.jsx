import React from "react";
import ParentForm from "../../common/form";
import Joi from "joi-browser";
import { Card, CardFooter, Form, Row, Col } from "reactstrap";

class CurrencyAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        name: "",
        // company: "1b7e4686-38c6-4ce9-8e72-04a66d3618d8",
        symbol: "",
        roundingFactor: "",
        remarks: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      name: Joi.string().required().label("Name"),
      symbol: Joi.string().required().label("Code"),
      roundingFactor: Joi.number().required().label("Rounding Factor"),
      remarks: Joi.string().allow("").optional(),
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        symbol: data.symbol ? data.symbol : "",
        name: data.name ? data.name : "",
        roundingFactor: data.rounding_factor ? data.rounding_factor : "",
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

  doSubmit() {
    this.props.submit(this.state.data);
  }

  render() {
    return (
      <Card className="border-0">
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col md={12} sm={6} xs={12}>
              {this.renderInput("name", " Name")}
            </Col>
            <Col md={12} sm={6} xs={12}>
              {this.renderInput("symbol", " symbol")}
            </Col>

            <Col md={12} sm={6} xs={12}>
              {this.renderInput("roundingFactor", " Rounding Factor", "number")}
            </Col>

            <Col md={12} sm={12} xs={12}>
              {this.renderInput("remarks", "Remarks", "textarea")}
            </Col>
          </Row>
          <CardFooter align="center">
            {this.renderButton(
              this.props.isEdit ? "Edit Currency" : "Add Currency"
            )}
          </CardFooter>
        </Form>
      </Card>
    );
  }
}
export default CurrencyAdd;
