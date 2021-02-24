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

class GeneralLedgerEntryModal extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        postingDate: "",
        documentType: "",
        refNo: "",
        journalDocumentNumber: "",
        accountNumber: "",
        description: "",
        debit: "",
        balance: "",
        credit: "",
        remarks: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      postingDate: Joi.string().required().label("Posting Date"),
      documentType: Joi.string().required().label("Document Type"),
      refNo: Joi.string().required().label("Reference Number"),
      journalDocumentNumber: Joi.string()
        .required()
        .label("Journal Document Number"),
      accountNumber: Joi.string().required().label("Account Number"),
      description: Joi.string().required().label("Description"),
      debit: Joi.string().required().label("Debit"),
      credit: Joi.string().required().label("Credit"),
      balance: Joi.string().required().label("Balance"),
      remarks: Joi.string().allow("").optional(),
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        postingDate: data.posting_date ? data.posting_date : "",
        documentType: data.document_type ? data.document_type : "",
        refNo: data.ref_no ? data.ref_no : "",
        journalDocumentNumber: data.document_number ? data.document_number : "",
        accountNumber: data.account_number ? data.account_number : "",
        description: data.description ? data.description : "",
        isActive: data.is_active ? Boolean(data.is_active) : "",
        debit: data.debit ? data.debit : "",
        balance: data.account_balance ? data.account_balance : "",
        credit: data.credit ? data.credit : "",
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
    this.populateDefaults();
    if ((this.props.isEdit || this.props.isView) && !this.state.lockUpdate) {
      this.populateState(this.props.data);
    }
  }

  doSubmit() {
    this.props.submit(this.state.data);
  }

  render() {
    return (
      <Card className="border-0">
        <CardHeader className="border-0">{this.props.title}</CardHeader>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "postingDate",
                  label: "Posting Date",
                })}
              </Col>
              {/* <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "documentType",
                  label: "Document Type",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "refNo",
                  label: "Ref. No.",
                })}
              </Col> */}
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "journalDocumentNumber",
                  label: "Journal Document No.",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "accountNumber",
                  label: "Account Number",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "description",
                  label: "Description",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "debit",
                  label: "Debit",
                  type: "number",
                })}
              </Col>
              {this.props.options && (
                <Col md={6} sm={6} xs={12}>
                  {this.renderInput({
                    name: "balance",
                    label: "Balance",
                    type: "number",
                  })}
                </Col>
              )}
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "credit",
                  label: "Credit",
                  type: "number",
                })}
              </Col>
              <Col md={12} sm={12} xs={12}>
                {this.renderInput({
                  name: "remarks",
                  label: "Remarks",
                  type: "textarea",
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
export default GeneralLedgerEntryModal;
