import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";

import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Form,
  Row,
  Col,
} from "reactstrap";

class EmployeeMaterialLoanAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        employeeNumber: "",
        employeeName: "",
        department: "",
        loanItem: "",
        requestedDate: "",
        loanDate: "",
        expectedReturnDate: "",
        actualReturnDate: "",
        remarks: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      employeeNumber: Joi.string().required().label("employeeNumber"),
      employeeName: Joi.string().required().label("employeeName"),
      department: Joi.string().required().label("department"),
      loanItem: Joi.string().required().label("loanItem"),

      requestedDate: Joi.string().required().label("requestedDate"),
      loanDate: Joi.string().required().label("loanDate"),
      expectedReturnDate: Joi.string().required().label("expectedReturnDate"),
      actualReturnDate: Joi.string().required().label("actualReturnDate"),
      remarks: Joi.string().allow("").optional(),
    };
  }

  render() {
    return (
      <Card className="border-0">
        <CardHeader className="border-0">Header</CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("employeeNumber", " Employee NUmber")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("employeeName", "Employee Name")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect("department", "Department ", [
                  "department 1",
                  "department 2",
                ])}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect("loanItem", " Loan Item ", [
                  " item 1",
                  " item 2",
                ])}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("requestedDate", "Request Date ", "Date")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("loanDate", "Loan Date ", "Date")}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput(
                  "expectedReturnDate",
                  "Expected Return Date ",
                  "Date"
                )}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput("actualReturnDate", "Actual Date ", "Date")}
              </Col>
              <Col md={12} sm={12} xs={12}>
                {this.renderInput("remarks", "Remarks", "textarea")}
              </Col>
            </Row>
          </Form>
        </CardBody>
        <CardFooter align="center">
          {this.renderButton("Add Employee Material Loan")}
        </CardFooter>
      </Card>
    );
  }
}
export default EmployeeMaterialLoanAdd;
