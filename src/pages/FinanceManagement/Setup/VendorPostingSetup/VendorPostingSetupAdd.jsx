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

class VendorPostingSetupAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        partnerGroup: "",
        itemGroup: "",
        purchaseAccount: "",
        salesAccount: "",
        costOfGoodsSoldAcc: "",
        cashAccount: "",
      },
      lockUpdate: false,
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      partnerGroup: Joi.string().required().label("partnerGroup"),
      itemGroup: Joi.string().required().label("itemGroup"),
      purchaseAccount: Joi.string().required().label("purchaseAccount"),
      salesAccount: Joi.string().required().label("salesAccount"),
      costOfGoodsSoldAcc: Joi.string().required().label("costOfGoodsSoldAcc"),
      cashAccount: Joi.string().required().label("costOfGoodsSoldAcc"),
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
        partnerGroup: data.partner_group_detail.id
          ? data.partner_group_detail.id
          : "",
        itemGroup: data.name ? data.name : "",
        purchaseAccount: data.purchase_account_detail.id
          ? data.purchase_account_detail.id
          : "",
        salesAccount: data.sales_account_detail.id
          ? data.sales_account_detail.id
          : "",
        costOfGoodsSoldAcc: data.cost_of_goods_sold_account_detail.id
          ? data.cost_of_goods_sold_account_detail.id
          : "",
        cashAccount: data.cash_account_detail.id
          ? data.cash_account_detail.id
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
    const { postingGroups, itemCategories, accounts } = this.props.options;
    return (
      <Card className="border-0">
        <CardHeader className="border-0">New Vendor Posting Setup</CardHeader>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "partnerGroup",
                  label: "Partner Group",
                  options: postingGroups,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "itemGroup",
                  label: " Item Group",
                  options: itemCategories,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "purchaseAccount",
                  label: " Purchase Account",
                  options: accounts,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "salesAccount",
                  label: "Sales Account",
                  options: accounts,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "costOfGoodsSoldAcc",
                  label: "Cost of Goods Sold  Account",
                  options: accounts,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "cashAccount",
                  label: "Cash Account",
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
export default VendorPostingSetupAdd;
