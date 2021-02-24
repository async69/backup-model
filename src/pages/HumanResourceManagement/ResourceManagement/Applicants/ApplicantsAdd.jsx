import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";

import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";

class ApplicantsAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        code: "",
        firstName: "",
        lastName: "",
        cityRegion: "",
        primaryphoneNo: "",
        mobilePhoneNo: "",
        email: "",
        profferdCOntactMethod: "",
        appliedPositoin: "",
        pdfDocument: "",
        status: "",
        isHIred: "",
        remarks: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      code: Joi.string().required().label("code"),
      firstName: Joi.string().required().label("firstName"),
      lastName: Joi.string().required().label("lastName"),
      cityRegion: Joi.string().required().label("cityRegion"),
      primaryphoneNo: Joi.string().required().label("primaryphoneNo"),
      email: Joi.string().required().label("email"),
      profferdCOntactMethod: Joi.string()
        .required()
        .label("profferdCOntactMethod"),
      appliedPositoin: Joi.string().required().label("appliedPositoin"),
      status: Joi.string().required().label("status"),
      isHIred: Joi.string().required().label("isHIred"),
      remarks: Joi.string().allow("").optional(),
    };
  }

  render() {
    return (
      <Card className="border-0">
        <CardBody>
          <Form>
            <Row>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("code", " Code")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("firstName", "First Name")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("lastName", "Last Name")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("cityRegion", "City Region ")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("primaryphoneNo", " Primary Phone Number")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("email", " Email")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput(
                  "profferdCOntactMethod",
                  " Prefered Contact Method"
                )}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect("appliedPositoin", " Applied Positoin  ", [
                  " item 1",
                  " item 2",
                ])}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("status", "Status")}
              </Col>

              <Col className="mb-3" md={6} sm={6} xs={12}>
                {this.renderCheckbox("isHIred", " Is HIred ")}
              </Col>

              <Col md={12} sm={12} xs={12}>
                {this.renderInput("remarks", "Remarks", "textarea")}
              </Col>
            </Row>
          </Form>
        </CardBody>
        <CardFooter align="center">
          {this.renderButton("Add Applicant")}
        </CardFooter>
      </Card>
    );
  }
}
export default ApplicantsAdd;
