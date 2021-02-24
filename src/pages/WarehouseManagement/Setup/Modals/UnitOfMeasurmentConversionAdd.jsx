import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { Row, Col, Form, CardFooter, FormGroup } from "reactstrap";

class UnitOfMeasurmentConversionAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        derived_unit_code: "",
        derived_unit_name: "",
        basic_unit_of_measure_code: "",
        basic_unit_of_measure_name: "",
        amoujnt: "",
        remarks: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      derived_unit_code: Joi.string().required().label("Derived Unit Code"),
      derived_unit_name: Joi.string().required().label("Derived Unit Name"),
      amount: Joi.number().required().label("Amount"),
      basic_unit_of_measure_code: Joi.number()
        .required()
        .label("Basic Unit of Measurement Code"),
      basic_unit_of_measure_name: Joi.number()
        .required()
        .label("Basic Unit of Measurement Name"),
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
            <FormGroup>
              {this.renderSelect("derived_unit_code", "Derived Unit Code", [
                "this",
                "and ths",
              ])}
            </FormGroup>
          </Col>

          <Col md={6} sm={12} xs={12}>
            <FormGroup>
              {this.renderSelect("derived_unit_name", "Derived Unit Name", [
                "this",
                "and ths",
              ])}
            </FormGroup>
          </Col>

          <Col md={6} sm={12} xs={12}>
            <FormGroup>
              {this.renderSelect(
                "basic_unit_of_measure_code",
                "Basic Unit of Measurement Code",
                ["this", "and ths"]
              )}
            </FormGroup>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <FormGroup>
              {this.renderSelect(
                "basic_unit_of_measure_name",
                "Basic Unit of Measurement Name",
                ["this", "and ths"]
              )}
            </FormGroup>
          </Col>

          <Col md={6} sm={12} xs={12}>
            <FormGroup>
              {this.renderInput("amount", "Amount", "number")}
            </FormGroup>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <FormGroup>
              {this.renderInput("remarks", "Remarks", "textarea")}
            </FormGroup>
          </Col>
        </Row>
        <CardFooter align="center">
          {this.renderButton("Add Unit Of Measurment Conversion")}
        </CardFooter>
      </Form>
    );
  }
}
export default UnitOfMeasurmentConversionAdd;
