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

class PurchaserAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        purchaserName: "",
        remarks: "",
        isActive: false,
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      purchaserName: Joi.string().required().label("purchaserName"),
      remarks: Joi.string().allow("").optional(),
      isActive: Joi.boolean().allow(false).optional(),
    };
  }

  doSubmit() {
    this.props.addPurchaser(this.state.data);
  }

  render() {
    return (
      <Card className="border-0">
        <CardHeader className="border-0">Add Purchaser </CardHeader>
        <Form onSubmit={this.handleSubmit}>
          <CardBody>
            <Row>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect("purchaserName", "Purchaser Name", [
                  "Option One",
                  "Option Two",
                  "Option Three",
                ])}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderCheckbox("isActive", "Is Active?")}
              </Col>
              <Col md={12} sm={12} xs={12}>
                {this.renderInput("remarks", "Remarks", "textarea")}
              </Col>
            </Row>
          </CardBody>
          <CardFooter align="center">
            {this.renderButton("Save Purchaser")}
          </CardFooter>
        </Form>
      </Card>
    );
  }
}
export default PurchaserAdd;
