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

class VendorPostingGroupForm extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        code: "",
        name: "",
        payable_account: "",
        withholding_tax_account: "",
      },
      lockUpdate: false,
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      code: Joi.string().required().label("Code"),
      name: Joi.string().required().label("name"),
      payable_account: Joi.string(),
      withholding_tax_account: Joi.string(),
    };
  }

  doSubmit() {
    this.props.submit(this.state.data);
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        code: data.code ? data.code : "",
        name: data.name ? data.name : "",
        payable_account: data.payable_account ? data.payable_account : "",
        withholding_tax_account: data.withholding_tax_account
          ? data.withholding_tax_account
          : "",
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

  componentDidMount() {
    this.componentDidUpdate();
  }

  render() {
    const { accounts } = this.props.options;
    return (
      <Card className="border-0">
        <CardHeader className="border-0">New Vendor Posting Group </CardHeader>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("name", "Name")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("code", "Code")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "payable_account",
                  label: "Payable Account",
                  options: accounts,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "withholding_tax_account",
                  label: "Withholding Tax Account",
                  options: accounts,
                  optionsFrom: "server",
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
export default VendorPostingGroupForm;
