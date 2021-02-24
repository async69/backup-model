import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";

class VendorPostingGroupAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        name: "",
        vat: "",
        vat_payable_account: "",
        vat_receivable_account: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      name: Joi.string().required().label("name"),
      vat: Joi.number().required().label("VAT"),
      vat_payable_account: Joi.string().required().label("VAT Payable Account"),
      vat_receivable_account: Joi.string()
        .required()
        .label("VAT Receivable Account"),
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        name: data.name ? data.name : "",
        vat: data.vat ? data.vat : "",
        vat_payable_account: data.vat_payable_account
          ? data.vat_payable_account
          : "",
        vat_receivable_account: data.vat_receivable_account
          ? data.vat_receivable_account
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
    this.populateDefaults();
  }

  doSubmit() {
    this.props.submit(this.state.data);
  }

  render() {
    const { coa } = this.props.options;
    return (
      <Card className="border-0">
        {/* <CardHeader className="border-0">New VAT Posting Group </CardHeader> */}
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput("name", "Name")}
              </Col>

              <Col md={6} sm={6} xs={12}>
                {this.renderInput("vat", "VAT", "number")}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "vat_payable_account",
                  label: "VAT Payable Account",
                  options: coa,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "vat_receivable_account",
                  label: "VAT Receivable Account",
                  options: coa,
                  optionsFrom: "server",
                })}
              </Col>
            </Row>
            <CardFooter align="center">
              {this.renderButton("Save", this.props.loader)}
            </CardFooter>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
export default VendorPostingGroupAdd;
