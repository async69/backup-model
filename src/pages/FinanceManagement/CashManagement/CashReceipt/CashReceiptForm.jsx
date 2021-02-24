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

class PeriodForm extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        invoice: "",
        cash_account: "",
        posting_date: "",
        paid_amount: "",
        is_bank_account: false,
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
      is_bank_account: Joi.boolean().required().allow(false).optional(),
    };
  }

  populateState(data) {
    this.setState({
      data: {
        ...this.state.data,
        invoice: data.id ? data.id : "",
      },
      lockUpdate: true,
    });
  }

  componentDidUpdate() {
    if ((this.props.isEdit || this.props.isView) && !this.state.lockUpdate) {
      console.log("once", this.state.lockUpdate);
      this.populateState(this.props.data);
    }
  }

  doSubmit() {
    this.props.submit(this.state.data);
  }

  render() {
    const { accounts, bankAccounts } = this.props.options;
    return (
      <Card className="border-0">
        <CardHeader className="border-0">{this.props.title}</CardHeader>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "cash_account",
                  label: "Cash Account",
                  options: Boolean(this.state.data.is_bank_account)
                    ? bankAccounts
                    : accounts,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "posting_date",
                  label: "Posting Date",
                  type: "date",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "paid_amount",
                  label: "Paid Amount",
                  type: "number",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderCheckbox("is_bank_account", "Is Bank Account?")}
              </Col>
            </Row>
            <CardFooter align="center">{this.renderButton("Save")}</CardFooter>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
export default PeriodForm;
