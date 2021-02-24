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
import itemTypes from "../../../../static/assets/options/itemTypes.json";

class WithholdingForm extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        item_type: "",
        min_amount: "",
        max_amount: "",
        withholding_value: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      item_type: Joi.string().required().label("Item Type"),
      min_amount: Joi.number().required().label("Min Amount"),
      max_amount: Joi.number().required().label("Max Amount"),
      withholding_value: Joi.number().required().label("Withholding Value"),
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        item_type: data.item_type ? data.item_type : "",
        min_amount: data.min_amount ? data.min_amount : "",
        max_amount: data.max_amount ? data.max_amount : "",
        withholding_value: data.withholding_value ? data.withholding_value : "",
      },
      lockUpdate: true,
    };
    this.setState(updatedState);
  }

  componentDidUpdate() {
    if ((this.props.isEdit || this.props.isView) && !this.state.lockUpdate) {
      this.populateState(this.props.data);
    }
  }

  doSubmit() {
    this.props.submit(this.state.data);
  }

  render() {
    return (
      <Card className="border-0">
        <CardHeader className="border-0">{this.props.title}</CardHeader>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "item_type",
                  label: "Item Type",
                  options: itemTypes,
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "min_amount",
                  label: "Min Amount",
                  type: "number",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "max_amount",
                  label: "Max Amount",
                  type: "number",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "withholding_value",
                  label: "Withhodling Value",
                  type: "number",
                })}
              </Col>
            </Row>
            <CardFooter align="center">{this.renderButton("Save")}</CardFooter>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
export default WithholdingForm;
