import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";

class EmployeeBonusAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        from_date: "",
        to_date: "",
        bonus: "",
        remarks: "",
        employee:
          props.options && props.options.employee
            ? props.options.employee.id
            : "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      from_date: Joi.date(),
      to_date: Joi.date(),
      bonus: Joi.number(),
      remarks: Joi.string().allow("").optional(),
      employee: Joi.string(),
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        from_date: data.from_date,
        to_date: data.to_date,
        bonus: data.bonus,
        employee: data.employee ? data.employee.id : "",
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
                {this.renderInput("from_date", "From Date", "date")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("to_date", "To Date", "date")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("bonus", "Bonus")}
              </Col>
              <Col md={12} sm={12} xs={12}>
                {this.renderInput("remarks", "Remarks", "textarea")}
              </Col>
            </Row>
            <CardFooter align="center">
              {this.renderButton("Save Bonus ")}
            </CardFooter>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
export default EmployeeBonusAdd;
