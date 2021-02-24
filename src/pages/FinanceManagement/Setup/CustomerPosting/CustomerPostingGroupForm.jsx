import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { getLoading } from "../../../../store/GeneralSetup/Posting/CustomerPostingGroups/";

class CustomerPostingGroupForm extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        code: "",
        name: "",
        receivable_account: "",
        withholding_tax_receivable_account: "",
      },
      lockUpdate: false,
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      code: Joi.string().required().label("Code"),
      name: Joi.string().required().label("name"),
      receivable_account: Joi.string(),
      withholding_tax_receivable_account: Joi.string(),
    };
  }

  doSubmit() {
    this.props.submit(this.state.data);
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        code: data.code ? data.code : "",
        name: data.name ? data.name : "",
        receivable_account: data.receivable_account
          ? data.receivable_account
          : "",
        withholding_tax_receivable_account: data.withholding_tax_receivable_account
          ? data.withholding_tax_receivable_account
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

  render() {
    const { accounts } = this.props.options;
    return (
      <Card className="border-0">
        {/* <CardHeader className="border-0">New Customer Posting Group </CardHeader> */}
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("name", " Name")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("code", " Code")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "receivable_account",
                  label: "Receivable Account",
                  options: accounts,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "withholding_tax_receivable_account",
                  label: "Withholding Tax Receivable Account",
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

export default connect(getLoading)(CustomerPostingGroupForm);
