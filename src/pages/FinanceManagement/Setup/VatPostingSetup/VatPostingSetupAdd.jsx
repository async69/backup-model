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

class VatPostingSetupAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        partnerVat: "",
        itemVat: "",
        vatReceivableAccount: "",
        vatPayableAccount: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      partnerVat: Joi.string().required().label("partnerVat"),
      itemVat: Joi.string().required().label("itemVat"),
      vatReceivableAccount: Joi.string()
        .required()
        .label("vatReceivableAccount"),
      vatPayableAccount: Joi.string().required().label("vatPayableAccount"),
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
        partnerVat: data.partner_vat_detail.id
          ? data.partner_vat_detail.id
          : "",
        itemVat: data.item_vat_detail.id ? data.item_vat_detail.id : "",
        vatReceivableAccount: data.vat_receivable_account_detail.id
          ? data.vat_receivable_account_detail.id
          : "",
        vatPayableAccount: data.vat_payable_account_detail.id
          ? data.vat_payable_account_detail.id
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
    const { postingGroups, accounts } = this.props.options;
    return (
      <Card className="border-0">
        <CardHeader className="border-0">New VAT Posting Setup </CardHeader>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "partnerVat",
                  label: "Partner VAT",
                  options: postingGroups,
                  optionsFrom: "server",
                })}
              </Col>

              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "itemVat",
                  label: "Item VAT",
                  options: postingGroups,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "vatReceivableAccount",
                  label: "VAT Receivable Account ",
                  options: accounts,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "vatPayableAccount",
                  label: "VAT Payable Account",
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
export default VatPostingSetupAdd;
