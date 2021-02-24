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

class VendorAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        documentNumber: "",
        vendorName: "",
        vendorPostingGroup: "",
        vatPostingGroup: "",
        generalBusinessPostingGroup: "",
        tinNumber: "",
        currency: "",
        balance: "",
        address: "",
        remarks: "",
      },
      lockUpdate: false,
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      documentNumber: Joi.string().required().label("documentNumber"),
      vendorName: Joi.string().required().label("vendorName"),
      vendorPostingGroup: Joi.string().required().label("vendorPostingGroup"),
      vatPostingGroup: Joi.string().required().label("vatPostingGroup"),
      generalBusinessPostingGroup: Joi.string()
        .required()
        .label("generalBusinessPostingGroup"),
      tinNumber: Joi.string().required().label("tinNumber"),
      currency: Joi.string().required().label("currency"),
      balance: Joi.string().required().label("balance"),
      address: Joi.string().required().label("address"),
      remarks: Joi.string().allow("").optional(),
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        documentNumber: data.document_number ? data.document_number : "",
        vendorName: data.name ? data.name : "",
        vendorPostingGroup: data.vendor_posting_group_detail.id
          ? data.vendor_posting_group_detail.id
          : "",
        vatPostingGroup: data.vat_posting_group_detail.id
          ? data.vat_posting_group_detail.id
          : "",
        generalBusinessPostingGroup: data.general_buisness_posting_group_detail
          .id
          ? data.general_buisness_posting_group_detail.id
          : "",
        tinNumber: data.tin_number ? data.tin_number : "",
        currency: data.currency ? data.currency : "",
        balance: data.balance ? data.balance : "",
        address: data.address ? data.address : "",
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

  render() {
    const {
      VAT_Posting_Groups,
      Vendor_Posting_Groups,
      General_Business_Posting_Groups,
    } = this.props.options;
    return (
      <Card className="border-0">
        {/* <CardHeader className="border-0">New Vendor</CardHeader> */}
        <CardBody>
          <Form>
            <Row>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("documentNumber", "Vendor Number")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("vendorName", "Vendor Name")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "vendorPostingGroup",
                  label: "Vendor Posting Group",
                  options: Vendor_Posting_Groups,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "vatPostingGroup",
                  label: "VAT Posting Group",
                  options: VAT_Posting_Groups,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "generalBusinessPostingGroup",
                  label: "General Business Posting Group",
                  options: General_Business_Posting_Groups,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("tinNumber", "Tin Number ", "number")}
              </Col>
              {/* <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "currency",
                  label: "Currency",
                  options: currencies,
                  optionsFrom: "server",
                })}
              </Col> */}

              {/* <Col md={3} sm={6} xs={12}>
                {this.renderInput("balance", "Balance")}
              </Col> */}

              <Col md={3} sm={6} xs={12}>
                {this.renderInput("address", "Address")}
              </Col>

              <Col md={12} sm={12} xs={12}>
                {this.renderInput("remarks", "Remarks", "textarea")}
              </Col>
            </Row>
            <hr />
            <CardFooter align="center">
              {this.renderButton("Save Vendor")}
            </CardFooter>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
export default VendorAdd;
