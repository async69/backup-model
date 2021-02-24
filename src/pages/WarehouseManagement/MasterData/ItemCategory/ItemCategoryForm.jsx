import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { CardBody, CardFooter, Form, Row, Col } from "reactstrap";
import { getLoading } from "store/Inventory/MasterData/itemCategories";
import { connect } from "react-redux";

class ItemCategoryForm extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        name: "",
        code: "",
        remarks: "",
        purchase_account: "",
        sales_account: "",
        cost_of_goods_sold_account: "",
        cash_account: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.any().allow("").optional(),
      code: Joi.string(),
      name: Joi.string().max(100),
      remarks: Joi.string().allow("").optional(),
      purchase_account: Joi.string(),
      sales_account: Joi.string(),
      cost_of_goods_sold_account: Joi.string(),
      cash_account: Joi.string(),
    };
  }

  populateState(item) {
    const updatedState = {
      ...this.state,
      data: {
        id: item.id,
        code: item.code,
        name: item.name,
        remarks: item.remarks,
        purchase_account: item.purchase_account ? item.purchase_account.id : "",
        sales_account: item.sales_account ? item.sales_account.id : "",
        cost_of_goods_sold_account: item.cost_of_goods_sold_account
          ? item.cost_of_goods_sold_account.id
          : "",
        cash_account: item.cash_account ? item.cash_account.id : "",
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

  doSubmit() {
    console.log(this.state.data);
    this.props.submit(this.state.data);
  }

  render() {
    const { chartOfAccounts } = this.props.options;
    return (
      <>
        {/* <CardHeader className="border-0">{this.props.title}</CardHeader> */}
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput("name", "Category Name")}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput("code", "Category Code")}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "purchase_account",
                  label: "Purchase Account",
                  options: chartOfAccounts,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "sales_account",
                  label: "Sales Account",
                  options: chartOfAccounts,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "cost_of_goods_sold_account",
                  label: "Cost Of Goods Sold Account",
                  options: chartOfAccounts,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "cash_account",
                  label: "Cash Account",
                  options: chartOfAccounts,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={12} sm={12} xs={12}>
                {this.renderInput("remarks", "Remarks", "textarea")}
              </Col>
            </Row>
            <CardFooter align="center">{this.renderButton("Save")}</CardFooter>
          </Form>
        </CardBody>
      </>
    );
  }
}
export default connect(getLoading)(ItemCategoryForm);
