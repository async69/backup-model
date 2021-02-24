import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";

import { Card, CardBody, CardHeader, Form, Row, Col, Label } from "reactstrap";
import SalesQuoteLinesTable from "./SalesQuoteLinesTable";
import SalesQuoteLineForm from "pages/SalesManagement/Common/SalesQuote/SalesQuoteLineForm";
import { addSalesQuote, getStatus } from "store/Sales/salesQuotes";
import { connect } from "react-redux";

class SalesQuoteForm extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        document_number: "",
        quoted_date: "",
        customer_no: "",
        customer_name: "",
        sales_region: "",
        sales_person: "",
        prepared_by: "",
        posting_date: "",
        approved_by: "",
        approved_date: "",
        status: "",
        remarks: "",
        lines: [],
      },
      lineCounter: 1,
      errors: {},
    };
    this.state = JSON.parse(JSON.stringify(this.initialState));
    this.schema = {
      document_number: Joi.string().required().label("document_number"),
      quoted_date: Joi.string().required().label("quoted_date"),
      customer_no: Joi.string().required().label("customer_no"),
      customer_name: Joi.string().required().label("customer_name"),
      sales_region: Joi.string().required().label("sales_region"),
      sales_person: Joi.string().required().label("sales_person"),
      prepared_by: Joi.string().required().label("prepared_by"),
      posting_date: Joi.string().required().label("posting_date"),
      approved_by: Joi.string().required().label("approved_by"),
      approved_date: Joi.string().required().label("approved_date"),
      status: Joi.string().required().label("status"),
      remarks: Joi.string().allow("").optional(),
      lines: Joi.array().items(Joi.object()).min(1),
    };
  }
  doSubmit = async () => {
    await this.props.addSalesQuote(this.state.data);
    if (this.props.status === "success") {
      this.toast.success("Sales Qoute added successfully");
      this.resetForm();
    }
  };
  render() {
    return (
      <Card className="border-0">
        <CardHeader className="border-0">Sales Quote</CardHeader>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput("document_number", "Document Number ")}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput("quoted_date", "Quoted Date", "date")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect("customer_no", "Customer No ", [
                  "customer number 1",
                  "customer number 2",
                ])}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("customer_name", "Customer Name")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect("sales_region", "Sales Region  ", [
                  "sales region 1",
                  "sales region 2",
                ])}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect("sales_person", "Sales Person ", [
                  "person 1",
                  "person 2",
                ])}
              </Col>

              <Col md={6} sm={6} xs={12}>
                {this.renderSelect("prepared_by", "Prepared By ", [
                  "person 1",
                  "person 2",
                ])}
              </Col>

              <Col md={6} sm={6} xs={12}>
                {this.renderInput("posting_date", "Posting Date", "date")}
              </Col>

              <Col md={4} sm={6} xs={12}>
                {this.renderSelect("approved_by", "Approved By", [
                  "person 1",
                  "person 2",
                  "person 3",
                ])}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("approved_date", "Approved Date", "date")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("status", "status")}
              </Col>

              <Col md={12} sm={12} xs={12}>
                {this.renderInput("remarks", "Remarks", "textarea")}
              </Col>
              <Col md={12} sm={12} xs={12}>
                <CardHeader>Lines</CardHeader>
                <CardBody>
                  <SalesQuoteLinesTable
                    salesQuoteLines={this.state.data.lines}
                    onEdit={this.handleLineEdit}
                    onDelete={this.handleLineDelete}
                  />
                </CardBody>
                <Col align="center">
                  {this.renderButton("Sales Sales Quote")}
                </Col>
              </Col>
            </Row>
          </Form>
          <Row>
            <Col md={12} sm={12} xs={12}>
              <Label>Enter Line </Label>
              <SalesQuoteLineForm
                onSubmit={this.handleLineSubmit}
                selectedLine={this.state.selectedLine}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}
const mapStateToProps = (state) => ({
  status: getStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  addSalesQuote: (salesQuote) => dispatch(addSalesQuote(salesQuote)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SalesQuoteForm);
