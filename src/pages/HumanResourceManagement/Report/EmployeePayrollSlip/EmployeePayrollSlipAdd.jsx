import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";

class EmployeePayrollSlipAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        employee_no: "",
        employee_name: "",
        Department: "",
        Positon: "",
        start_date: "",
        end_date: "",
        Bank_number: "",
        Bank_name: "",
        basic_salary: "",
        total_absense_amount: "",
        transport_allowance: "",
        positoin_allowance: "",
        mobile_allowance: "",
        others_allowance: "",
        overtime: "",
        bonus: "",
        income_tax: "",
        net_salary: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      employee_no: Joi.string().required().label("employee_no"),
      employee_name: Joi.string().required().label("employee_name"),
      Department: Joi.string().required().label("Department"),
      Positon: Joi.string().required().label("Positon "),
      start_date: Joi.string().required().label("start_date"),
      end_date: Joi.string().required().label("end_date"),
      Bank_number: Joi.string().required().label("Bank_number"),
      Bank_name: Joi.string().required().label("Bank_name"),
      basic_salary: Joi.string().required().label("basic_salary"),
      total_absense_amount: Joi.string()
        .required()
        .label("total_absense_amount"),
      transport_allowance: Joi.string().required().label("transport_allowance"),
      positoin_allowance: Joi.string().required().label("positoin_allowance"),
      mobile_allowance: Joi.string().required().label("mobile_allowance"),
      others_allowance: Joi.string().required().label("others_allowance"),
      overtime: Joi.string().required().label("overtime"),
      bonus: Joi.string().required().label("bonus"),
      income_tax: Joi.string().required().label("income_tax"),
      net_salary: Joi.string().required().label("net_salary"),
    };
  }

  render() {
    return (
      <Card className="border-0">
        <CardBody>
          <Form>
            <Row>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("employee_no", "Employee No")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("employee_name", "Employee Name")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("Department", "Department")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("Positon ", "Positon ")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("start_date", " start date", "date")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("end_date", " end date", "date")}
              </Col>

              <Col md={3} sm={6} xs={12}>
                {this.renderInput("Bank_number", "Bank Number ")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("Bank_name", "Bank Name ")}
              </Col>

              <Col md={3} sm={6} xs={12}>
                {this.renderInput("basic_salary", "Basic Salary ")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("total_absense_amount", "Total Absense  ")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput(
                  "transport_allowance",
                  "Transport Allowance  "
                )}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("mobile_allowance", "Mobile Allowanc  ")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("others_allowance", "Other Allowance  ")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("overtime", "Overtime ")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("bonus", "Bonus  ")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("income_tax", "Income Tax  ")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("net_salary", "Net Salary  ")}
              </Col>
            </Row>
          </Form>
        </CardBody>
        <CardFooter align="center">
          {this.renderButton("Save Payroll Slip  ")}
        </CardFooter>
      </Card>
    );
  }
}
export default EmployeePayrollSlipAdd;
