import React from "react";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";
import subAccountTypes from "../../../../static/data/subAccountTypes.json";
import ParentForm from "../../../common/form";
import reportTypes from "../../../../static/data/reportTypes.json";

class ChartsOfAccountADD extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        accountNumber: "",
        accountName: "",
        chartsOfAccountType: "",
        reportType: "",
        balance: "",
        hasRelatedBankAccount: false,
        subAccountType: "",
        remarks: "",
      },
      lockUpdate: false,
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      accountNumber: Joi.number().required().label("Account Number"),
      accountName: Joi.string().required().label("Account Name"),
      chartsOfAccountType: Joi.string()
        .required()
        .label("Chart of Account Type"),
      subAccountType: Joi.string().required().label("Sub-Account Type"),
      reportType: Joi.string().required().label("Report Type"),
      balance: Joi.number().required().label("Balance"),
      hasRelatedBankAccount: Joi.boolean().allow(false).optional(),
      remarks: Joi.string().allow("").optional(),
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        accountNumber: data.account_number ? Number(data.account_number) : "",
        accountName: data.name ? data.name : "",
        chartsOfAccountType: data.parent.id ? data.parent.id : "",
        subAccountType: data.sub_account_type ? data.sub_account_type : "",
        reportType: data.report_type ? data.report_type : "",
        balance: data.balance ? data.balance : "",
        hasRelatedBankAccount: true ? Boolean(data.has_related_bank) : "",
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
    const { accountTypes } = this.props.options;
    return (
      <Card className="border-0">
        {/* <CardHeader className="border-0">{this.props.title}</CardHeader> */}
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("accountNumber", " Account Number", "number")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("accountName", "Account Name")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "chartsOfAccountType",
                  label: "Charts of Accounts Type",
                  options: accountTypes,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "subAccountType",
                  label: "Sub Account Type",
                  options: subAccountTypes,
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect(
                  "reportType",
                  "Financial Statement",
                  reportTypes
                )}
              </Col>

              <Col md={4} sm={6} xs={12}>
                {this.renderInput("balance", "Balance", "number")}
              </Col>
              <Col md={12} sm={6} xs={12}>
                {this.renderCheckbox(
                  "hasRelatedBankAccount",
                  "Has Related Bank Account?"
                )}
              </Col>

              <Col md={12} sm={12} xs={12}>
                {this.renderInput("remarks", "Remarks", "textarea")}
              </Col>
            </Row>
            <CardFooter align="center">
              {this.renderButton(
                this.props.isEdit
                  ? "Edit Chart of Account"
                  : "Save Chart of Account"
              )}
            </CardFooter>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
export default ChartsOfAccountADD;
