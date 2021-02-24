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

class UnitofDurationAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        code: "",
        name: "",
        remarks: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      code: Joi.string().required().label("code"),
      name: Joi.string().required().label("name"),
      remarks: Joi.string().allow("").optional(),
    };
  }

  render() {
    return (
      <Card className="border-0">
        <CardHeader className="border-0"> New Unit of Duration</CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput("code", "Code ")}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput("name", "Name ")}
              </Col>
              <Col md={12} sm={12} xs={12}>
                {this.renderInput("remarks", "Remarks", "textarea")}
              </Col>
            </Row>
          </Form>
        </CardBody>
        <CardFooter align="center">
          {this.renderButton("Save Unit of Duration")}
        </CardFooter>
      </Card>
    );
  }
}
export default UnitofDurationAdd;
