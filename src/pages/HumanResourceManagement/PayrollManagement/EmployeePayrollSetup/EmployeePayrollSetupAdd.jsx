import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";

class EmployeeSalaryAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        gross_salary: "",
        employee_pension: "0",
        employer_pension: "0",
        transport_allowance: "0",
        position_allowance: "0",
        mobile_allowance: "0",
        other_allowance: "0",
        total_working_hours: "",
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
      id: Joi.string().allow("").optional(),
      gross_salary: Joi.string(),
      employee_pension: Joi.string().allow("").optional(),
      employer_pension: Joi.string().allow("").optional(),
      transport_allowance: Joi.string().allow("").optional(),
      position_allowance: Joi.string().allow("").optional(),
      mobile_allowance: Joi.string().allow("").optional(),
      other_allowance: Joi.string().allow("").optional(),
      total_working_hours: Joi.string(),
      remarks: Joi.string().allow("").optional(),
      employee: Joi.string(),
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        gross_salary: data.gross_salary,
        employee_pension: data.employee_pension,
        employer_pension: data.employer_pension,
        transport_allowance: data.transport_allowance,
        position_allowance: data.position_allowance,
        mobile_allowance: data.mobile_allowance,
        other_allowance: data.other_allowance,
        total_working_hours: data.total_working_hours,
        remarks: data.remarks,
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

  componentDidMount() {
    this.componentDidUpdate();
  }

  doSubmit() {
    this.props.submit(this.state.data);
  }

  render() {
    const { isView } = this.props;
    return (
      <Card className="border-0">
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("gross_salary", "Gross Salary", "number")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput(
                  "total_working_hours",
                  "Monthly Working Hours"
                )}
              </Col>
              {isView && (
                <>
                  <Col md={4} sm={12} xs={12}>
                    {this.renderInput(
                      "employee_pension",
                      "Employee Pension",
                      "number"
                    )}
                  </Col>
                  <Col md={4} sm={12} xs={12}>
                    {this.renderInput(
                      "employer_pension",
                      "Employer Pension",
                      "number"
                    )}
                  </Col>
                </>
              )}
              <Col md={4} sm={6} xs={12}>
                {this.renderInput(
                  "transport_allowance",
                  "Transport Allowance",
                  "number"
                )}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput(
                  "position_allowance",
                  "Position Allowance",
                  "number"
                )}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput(
                  "mobile_allowance",
                  "Mobile Allowance",
                  "number"
                )}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput(
                  "other_allowance",
                  "Other Allowance",
                  "number"
                )}
              </Col>

              <Col md={12} sm={12} xs={12}>
                {this.renderInput("remarks", "Remarks", "textarea")}
              </Col>
            </Row>
            <CardFooter align="center">
              {this.renderButton("Save Salary ")}
            </CardFooter>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
export default EmployeeSalaryAdd;
