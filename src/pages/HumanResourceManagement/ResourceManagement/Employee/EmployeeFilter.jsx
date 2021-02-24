import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";

import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";

class Employee2Filter extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        employeeNumber: "",
        firstName: "",
        fathersName: "",
        familyName: "",
        department: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      employeeNumber: Joi.string().required().label("employeeNumber"),
      firstName: Joi.string().required().label("firstName"),
      fathersName: Joi.string().required().label("fathersName"),
      familyName: Joi.string().required().label("familyName"),
      department: Joi.string().required().label("department"),
    };
  }

  render() {
    return (
      <Card className="border-0">
        <CardBody>
          <Form>
            <Row>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput("employeeNumber", " Employee Number")}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect("department", "Department ", [
                  "dep  1",
                  "dep  2",
                ])}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("firstName", "First Name")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("fathersName", "Father's Name")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("familyName", "Family Name")}
              </Col>
            </Row>
          </Form>
        </CardBody>
        <CardFooter align="center">
          {this.renderButton("Search Employee")}
        </CardFooter>
      </Card>
    );
  }
}
export default Employee2Filter;
