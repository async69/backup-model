import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";
import { today } from "../../../../helpers/date";

class CashReceiptForm extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        invoice: "",
        cash_account: "",
        posting_date: today,
        paid_amount: "",
        is_cash_account: false,
      },
      accounts: [],
      errors: {},
      lockUpdate: false,
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      invoice: Joi.string().required().label("invoice"),
      cash_account: Joi.string().required().label("Fiscal Year"),
      posting_date: Joi.string().required().label("Start Date"),
      paid_amount: Joi.number().required().label("End Date"),
      is_cash_account: Joi.boolean().required().allow(false).optional(),
    };
  }

  populateState(data) {
    console.log("heree", data);
    this.setState({
      data: {
        ...this.state.data,
        invoice: data.id ? data.id : "",
        paid_amount: Number(data.total),
      },
      lockUpdate: true,
    });
  }

  componentDidUpdate() {
    if (
      (this.props.isEdit || this.props.isView || this.props.isPatch) &&
      !this.state.lockUpdate
    ) {
      this.populateState(this.props.data);
    }
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  doSubmit() {
    this.props.submit(this.state.data);
  }

  render() {
    const { accounts, bankAccounts } = this.props.options;
    return (
      <Card className="border-0">
        {/* <CardHeader className="border-0">{this.props.title}</CardHeader> */}
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col align="center" md={12} sm={12} xs={12}>
                {this.renderCheckbox("is_cash_account", "Is Cash Account?")}
              </Col>
              <Col md={12} sm={6} xs={12}>
                {this.renderSelect({
                  name: "cash_account",
                  label: "Cash Account",
                  options: Boolean(this.state.data.is_cash_account)
                    ? accounts
                    : bankAccounts,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={12} sm={6} xs={12}>
                {this.renderInput({
                  name: "posting_date",
                  label: "Posting Date",
                  type: "date",
                })}
              </Col>
              <Col md={12} sm={6} xs={12}>
                {this.renderInput({
                  name: "paid_amount",
                  label: "Paid Amount",
                  type: "number",
                  disabled: true,
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
export default CashReceiptForm;
