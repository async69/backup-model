import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";

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
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      invoice: Joi.string().required().label("invoice"),
      cash_account: Joi.string().required().label("Fiscal Year"),
      posting_date: Joi.string().required().label("Start Date"),
      paid_amount: Joi.number().required().label("End Date"),
    };
  }

  populateState(data) {
    const { type } = this.props.options;
    var updatedState = {};
    if (type === "PAY") {
      updatedState = {
        ...this.state,
        data: {
          invoice: data.id ? data.id : "",
        },
        lockUpdate: true,
      };
    }
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
    const { accounts } = this.props.options;
    return (
      <Card className="border-0">
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "cash_account",
                  label: "Cash Account",
                  options: accounts,
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
            </Row>
            <CardFooter align="center">{this.renderButton("Save")}</CardFooter>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
export default PeriodForm;
