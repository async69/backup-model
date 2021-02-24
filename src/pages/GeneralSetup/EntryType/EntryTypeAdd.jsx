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

class EntryTypeAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        name: "",
        status: "",
        dataType: "",
        Remarks: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      name: Joi.string().required().label("name"),
      status: Joi.string().required().label("status"),
      dataType: Joi.string().required().label("dataType"),
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
                {this.renderInput("name", " Name")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect("status", "Status ", [
                  "open",
                  "realized",
                  "approved",
                  "posted",
                  "rejected",
                ])}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect("dataType", "dataType ", [
                  "purchase request  ",
                  "purchase order ",
                  "receive  ",
                  "store issue voucher  ",
                  "store requisition ",
                  "purchase return ",
                  "sales request ",
                  "sales order ",
                  "sales return ",
                  "purchase invoice ",
                  "sales invoice  ",
                  "negative adj ",
                  "positive adj ",
                ])}
              </Col>

              <Col md={12} sm={12} xs={12}>
                {this.renderInput("remarks", "Remarks", "textarea")}
              </Col>
            </Row>
          </Form>
        </CardBody>
        <CardFooter align="center">
          {this.renderButton("Add Entry Type ")}
        </CardFooter>
      </Card>
    );
  }
}
export default EntryTypeAdd;
