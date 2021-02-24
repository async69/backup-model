import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";

import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";

class LoanAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        previousPosition: "",
        currentPosition: "",
        loantype: "",
        remarks: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      previousPosition: Joi.string().required().label("previousPosition"),
      currentPosition: Joi.string().required().label("currentPosition"),
      loantype: Joi.string().required().label("loantype"),
      evalutionDate: Joi.string().required().label("evalutionDate"),
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
                {this.renderInput("previousPosition", "Previous Position ")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("currentPosition", "Current Position")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect("loantype", "Loan Type ", [
                  " type 1",
                  " type 2",
                ])}
              </Col>

              <Col md={12} sm={12} xs={12}>
                {this.renderInput("remarks", "Remarks", "textarea")}
              </Col>
            </Row>
          </Form>
        </CardBody>
        <CardFooter align="center">{this.renderButton("Save Loan")}</CardFooter>
      </Card>
    );
  }
}
export default LoanAdd;
