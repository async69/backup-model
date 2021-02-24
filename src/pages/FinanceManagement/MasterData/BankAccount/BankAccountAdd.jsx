import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";

class BankAccountAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        bankAccountCode: "",
        bankName: "",
        bankBranch: "",
        bankAccountNumber: "",
        chartsOfAccountNumber: "",
        currency: "",
        isActive: false,
        region: "",
        city: "",
        phoneNumber: "",
        faxNumber: "",
        emailAdress: "",
        remarks: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      bankAccountCode: Joi.string().required().label("Bank Account Code"),
      bankName: Joi.string().required().label("Bank Name"),
      bankBranch: Joi.string().required().label("Bank Branch"),
      bankAccountNumber: Joi.number().required().label("Bank Account Number"),
      chartsOfAccountNumber: Joi.string()
        .required()
        .label("Chart of Accounts Number"),
      currency: Joi.string().required().label("Currency"),
      isActive: Joi.boolean().allow(false).optional(),
      region: Joi.string().required().label("Region"),
      city: Joi.string().required().label("City"),
      phoneNumber: Joi.string().required().label("Phone Number"),
      faxNumber: Joi.string().required().label("Fax Number"),
      emailAdress: Joi.string().required().label("Email Address"),
      remarks: Joi.string().allow("").optional(),
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        bankAccountCode: data.bank_account_code ? data.bank_account_code : "",
        bankName: data.bank.id ? data.bank.id : "",
        bankBranch: data.branch_name ? data.branch_name : "",
        bankAccountNumber: data.account_number ? data.account_number : "",
        chartsOfAccountNumber: data.charts_of_account.id
          ? data.charts_of_account.id
          : "",
        currency: data.currency.id ? data.currency.id : "",
        isActive: data.is_active ? Boolean(data.is_active) : "",
        region: data.region.id ? data.region.id : "",
        city: data.city.id ? data.city.id : "",
        phoneNumber: data.phone_no ? data.phone_no : "",
        faxNumber: data.fax_no ? String(data.fax_no) : "",
        emailAdress: data.email ? data.email : "",
        remarks: data.remarks ? data.remarks : "",
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
    const { currencies, regions, cities, banks, COAs } = this.props.options;
    return (
      <Card className="border-0">
        {/* <CardHeader className="border-0">New Bank Account</CardHeader> */}
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "bankAccountCode",
                  label: "Bank Account Code ",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "bankName",
                  label: "Bank Name",
                  options: banks,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "bankBranch",
                  label: "Bank Branch",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "bankAccountNumber",
                  label: "Bank Account Number",
                  type: "number",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "chartsOfAccountNumber",
                  label: "Charts of Accounts Number ",
                  options: COAs.map((account) => ({
                    ...account,
                    name: account.account_number,
                    value: account.id,
                  })),
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "currency",
                  label: "Currency ",
                  options: currencies,
                  optionsFrom: "server",
                })}
              </Col>

              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "region",
                  label: "Region",
                  options: regions,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "city",
                  label: "City ",
                  options: cities,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "phoneNumber",
                  label: "Phone Number",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "faxNumber",
                  label: "Fax Number",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "emailAdress",
                  label: "Email Address",
                })}
              </Col>
              <Col md={12} sm={12} xs={12}>
                {this.renderCheckbox("isActive", "Is Active?")}
              </Col>
              <Col md={12} sm={12} xs={12}>
                {this.renderInput({
                  name: "remarks",
                  label: "Remarks",
                  type: "textarea",
                })}
              </Col>
            </Row>
            <CardFooter align="center">
              {this.renderButton("Save Account ")}
            </CardFooter>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
export default BankAccountAdd;
