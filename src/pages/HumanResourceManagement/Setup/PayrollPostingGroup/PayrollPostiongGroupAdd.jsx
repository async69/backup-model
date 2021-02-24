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

class PayrollPostingGroupAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        salary_expense_account: "",
        overtime_account: "",
        employee_pension_account: "",
        transport_allowance_account: "",
        loan_account: "",
        local_sales_account: "",
        income_tax_account: "",
        pension_contribution_account: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      salary_expense_account: Joi.string()
        .required()
        .label("Salary Expense Account"),
      overtime_account: Joi.string().required().label("Overtime Account"),
      employee_pension_account: Joi.string()
        .required()
        .label("Employee Pension Account"),
      transport_allowance_account: Joi.string()
        .required()
        .label("Transport Allowance Account"),
      loan_account: Joi.string().required().label("Local Account"),
      local_sales_account: Joi.string().required().label("Local Sales Account"),
      income_tax_account: Joi.string().required().label("Income Tax Account"),
      pension_contribution_account: Joi.string()
        .required()
        .label("Pension Contribution Account"),
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        salary_expense_account: data.salary_expense_account
          ? data.salary_expense_account.id
          : "",
        overtime_account: data.overtime_account ? data.overtime_account.id : "",
        employee_pension_account: data.employee_pension_account
          ? data.employee_pension_account.id
          : "",
        transport_allowance_account: data.transport_allowance_account
          ? data.transport_allowance_account.id
          : "",
        loan_account: data.loan_account ? data.loan_account.id : "",
        local_sales_account: data.local_sales_account
          ? data.local_sales_account.id
          : "",
        income_tax_account: data.income_tax_account
          ? data.income_tax_account.id
          : "",
        pension_contribution_account: data.pension_contribution_account
          ? data.pension_contribution_account.id
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

  doSubmit() {
    this.props.submit(this.state.data);
  }

  render() {
    const chartOfAccounts = this.props.options;
    return (
      <Card className="border-0">
        <CardHeader className="border-0">{this.props.title}</CardHeader>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "salary_expense_account",
                  label: "Salary Expense Account",
                  options: chartOfAccounts,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "overtime_account",
                  label: "Overtime Account",
                  options: chartOfAccounts,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "employee_pension_account",
                  label: "Employee Pension Account",
                  options: chartOfAccounts,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "transport_allowance_account",
                  label: "Transport Allowance Account",
                  options: chartOfAccounts,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "loan_account",
                  label: "Loan Account",
                  options: chartOfAccounts,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "local_sales_account",
                  label: "Local Sales Account",
                  options: chartOfAccounts,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "income_tax_account",
                  label: "Income Tax Account",
                  options: chartOfAccounts,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "pension_contribution_account",
                  label: "Pension Contribution Account",
                  options: chartOfAccounts,
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
export default PayrollPostingGroupAdd;
