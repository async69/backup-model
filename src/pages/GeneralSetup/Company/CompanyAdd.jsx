import React from "react";
import ParentForm from "../../common/form";
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

class CompanyAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        name: "",
        email: "",
        subcity: "",
        country: "",
        Remarks: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      name: Joi.string().required().label("name"),
      email: Joi.string().required().label("email"),
      subcity: Joi.string().required().label("subcity"),
      country: Joi.string().required().label("country"),
      remarks: Joi.string().allow("").optional(),
    };
  }

  render() {
    let label = "Add";
    if (this.props.isEdit) {
      label = "Edit";
    }
    return (
      <Card className="border-0">
        <CardHeader className="border-0">Add A Company</CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput("name", " Name")}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput("email", " Email")}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput("subcity", " Sub City")}
              </Col>

              <Col md={6} sm={6} xs={12}>
                {this.renderSelect("country", "Country ", [
                  "country 1",
                  "country 2",
                ])}
              </Col>

              <Col md={12} sm={12} xs={12}>
                {this.renderInput("remarks", "Remarks", "textarea")}
              </Col>
            </Row>
          </Form>
        </CardBody>
        <CardFooter align="center">
          {this.renderButton(` ${label} Company`)}
        </CardFooter>
      </Card>
    );
  }
}
export default CompanyAdd;
