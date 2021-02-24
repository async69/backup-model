import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";

class ConsignmentAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        loan_item: "",
        requested_date: null,
        loan_date: null,
        expected_return_date: null,
        actual_return_date: null,
        remarks: "",
        employee: this.props.options.selectedEmployee.id,
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      loan_item: Joi.string(),
      requested_date: Joi.date(),
      loan_date: Joi.date(),
      expected_return_date: Joi.date(),
      actual_return_date: Joi.date(),
      remarks: Joi.string().allow("").optional(),
      employee: Joi.string(),
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        loan_item: data.loan_item,
        requested_date: data.requested_date,
        loan_date: data.loan_date,
        expected_return_date: data.expected_return_date,
        actual_return_date: data.actual_return_date,
        remarks: data.remarks,
        employee: data.employee.id,
      },
      lockUpdate: true,
    };
    this.setState(updatedState);
  }

  componentDidUpdate() {
    if ((this.props.isEdit || this.props.isView) && !this.state.lockUpdate) {
      this.populateState(this.props.data);
    }
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  doSubmit() {
    this.props.submit(this.state.data);
  }

  render() {
    return (
      <Card className="border-0">
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "loan_item",
                  label: "Loan Item",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "loan_date",
                  label: "Loan Date",
                  type: "date",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "requested_date",
                  label: "Requested Date",
                  type: "date",
                })}
              </Col>
              <Col md={12} sm={6} xs={12}>
                {this.renderInput({
                  name: "expected_return_date",
                  label: "Expected Return Date",
                  type: "date",
                })}
              </Col>
              <Col md={12} sm={6} xs={12}>
                {this.renderInput({
                  name: "actual_return_date",
                  label: "Actual Return Date",
                  type: "date",
                })}
              </Col>

              <Col md={12} sm={12} xs={12}>
                {this.renderInput({
                  name: "remarks",
                  label: "Remarks",
                  type: "textarea",
                })}
              </Col>
            </Row>
            <CardFooter align="center">{this.renderButton("Save")}</CardFooter>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
export default ConsignmentAdd;
