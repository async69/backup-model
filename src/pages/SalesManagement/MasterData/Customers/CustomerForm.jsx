import React from "react";
import { Card, CardBody, Form, Row, Col } from "reactstrap";
import ReusabelForm from "../../../common/form";
import { InlineTable } from "../../../common/InLineEditableTable";
import {
  initialState,
  mainSchema,
  getAddressColumns,
  addressLineSchema,
  addressLineMapper,
  populateState,
  addressSaveLineTag,
  contactLineSchema,
  contactSaveLineTag,
  getContactColumns,
} from "./config";
import { getLoading } from "../../../../store/Sales/MasterData/Customer";
import { connect } from "react-redux";

class CustomerForm extends ReusabelForm {
  constructor(props) {
    super(props);
    this.initialState = initialState;
    this.state = JSON.parse(JSON.stringify(this.initialState));
    this.schema = mainSchema;
    this.populateState = this.populateState.bind(this);
    this.updateAddressLines = this.updateAddressLines.bind(this);
    this.updateContactLines = this.updateContactLines.bind(this);
    this.lineMapper = this.lineMapper.bind(this);
  }

  doSubmit = async () => {
    this.props.submit(this.state.data);
  };

  componentDidMount() {
    this.componentDidUpdate();
  }

  lineMapper() {
    if (this.props.isEdit || this.props.isView) {
      return addressLineMapper(this.props.data);
    } else {
      return [];
    }
  }

  populateState(data) {
    const newData = populateState(data);
    this.setState({ lockUpdate: true, data: newData });
  }

  updateAddressLines(lines) {
    if (lines.length > 0 || this.state.data[addressSaveLineTag].length > 0) {
      this.setState({
        data: {
          ...this.state.data,
          [addressSaveLineTag]: lines,
        },
      });
    }
  }

  updateContactLines(lines) {
    if (lines.length > 0 || this.state.data[contactSaveLineTag].length > 0) {
      this.setState({
        data: {
          ...this.state.data,
          [contactSaveLineTag]: lines,
        },
      });
    }
  }

  componentDidUpdate() {
    if ((this.props.isEdit || this.props.isView) && !this.state.lockUpdate) {
      this.populateState(this.props.data);
    }
  }

  render() {
    const { postingGroups, currencies, vatPostingGroups } = this.props.options;
    return (
      <Card className="border-0">
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              {this.props.isView && (
                <Col md={4} sm={12} xs={12}>
                  {this.renderInput({
                    name: "number",
                    label: "Customer Number",
                  })}
                </Col>
              )}
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "name",
                  label: "Customer Name",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "tin_number",
                  label: "Tin Number",
                  type: "number",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "currency",
                  label: "Currency",
                  options: currencies,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "customer_posting_group",
                  label: "Customer Posting Group",
                  options: postingGroups,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "vat_posting_group",
                  label: "VAT Posting Group",
                  options: vatPostingGroups,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "credit_limit",
                  label: "Credit Limit",
                  type: "number",
                })}
              </Col>
              <Col md={12} sm={12} xs={12}>
                {this.renderInput("remarks", "Remarks", "textarea")}
              </Col>
              <Col md={12} sm={12} xs={12}>
                Address Line
                <InlineTable
                  columns={getAddressColumns(this.props.options)}
                  disabled={this.props.disabled}
                  data={this.state.data[addressSaveLineTag]}
                  callback={this.updateAddressLines}
                  schema={addressLineSchema}
                  startForm={this.props.isAdd}
                />
              </Col>
              <Col md={12} sm={12} xs={12}>
                Contact Line
                <InlineTable
                  columns={getContactColumns()}
                  disabled={this.props.disabled}
                  data={this.state.data[contactSaveLineTag]}
                  callback={this.updateContactLines}
                  schema={contactLineSchema}
                  startForm={this.props.isAdd}
                />
              </Col>
              <Col align="center">{this.renderButton("Save")}</Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default connect(getLoading)(CustomerForm);
