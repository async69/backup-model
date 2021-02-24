import React from "react";
import ParentForm from "../../common/form";
import Joi from "joi-browser";
import {
  Card,
  CardHeader,
  Row,
  Col,
  CardBody,
  Form,
  CardFooter,
} from "reactstrap";

class PurchaseTypeAdd extends ParentForm {
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

  //   doSubmit() {
  //     this.props.addVendorType(this.state.data);
  //   }

  render() {
    return (
      <Card className="border-0">
        <CardHeader className="border-0">Add Purchase Type</CardHeader>
        <Form onSubmit={this.handleSubmit}>
          <CardBody>
            <Row>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect("code", "Code", [
                  "Option One",
                  "Option Two",
                  "Option Three",
                ])}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput("name", "Name")}
              </Col>
              <Col md={12} sm={12} xs={12}>
                {this.renderInput("remarks", "Remarks", "textarea")}
              </Col>
            </Row>
          </CardBody>
          <CardFooter align="center">
            {this.renderButton("Save Purchase Type")}
          </CardFooter>
        </Form>
      </Card>
    );
  }
}
export default PurchaseTypeAdd;
