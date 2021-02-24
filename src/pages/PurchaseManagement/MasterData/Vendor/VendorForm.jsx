import React from "react";
import {
  Card,
  CardBody,
  Form,
  Row,
  Col,
  CardHeader,
  CardFooter,
} from "reactstrap";
import ReusabelForm from "../../../common/form";
import { InlineTable } from "../../../common/InLineEditableTable";
import {
  initialState,
  mainSchema,
  getAddressColumns,
  addressLineSchema,
  lineContentMapper,
  populateState,
  addressSaveLineTag,
  apiLineTag,
  contactLineSchema,
  contactSaveLineTag,
  getContactColumns,
} from "./config";
import { connect } from "react-redux";
import { getLoading } from "store/Purchase/MasterData/Vendor";

class VendorForm extends ReusabelForm {
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
      return lineContentMapper(this.props.data, apiLineTag);
    } else {
      return [];
    }
  }

  populateState(data) {
    const newData = populateState(data, this.lineMapper);
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
    const {
      vatPostingGroups,
      vendorPostingGroups,
      currencies,
      vendorTypes,
    } = this.props.options;
    return (
      <Card className="border-0">
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              {this.props.isView && (
                <Col md={4} sm={6} xs={12}>
                  {this.renderInput({
                    name: "number",
                    label: "Vendor Number",
                  })}
                </Col>
              )}
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "name",
                  label: "Vendor Name",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "tin_number",
                  label: "Tin Number",
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
                  name: "vendor_posting_group",
                  label: "Vendor Posting Group",
                  options: vendorPostingGroups,
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
                {this.renderSelect({
                  name: "vendor_type",
                  label: "Venor Type",
                  options: vendorTypes,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={12} sm={12} xs={12}>
                {this.renderInput("remarks", "Remarks", "textarea")}
              </Col>
              <Col md={12} sm={12} xs={12}>
                <CardHeader>Address Line</CardHeader>
                <InlineTable
                  columns={getAddressColumns(this.props.options)}
                  disabled={this.props.disabled}
                  data={
                    this.state.data[addressSaveLineTag].length > 0
                      ? this.state.data[addressSaveLineTag]
                      : []
                  }
                  callback={this.updateAddressLines}
                  schema={addressLineSchema}
                  startForm={this.props.isAdd}
                />
              </Col>
              <Col md={12} sm={12} xs={12}>
                <CardHeader>Contact Line</CardHeader>

                <InlineTable
                  columns={getContactColumns()}
                  disabled={this.props.disabled}
                  data={this.state.data[contactSaveLineTag]}
                  callback={this.updateContactLines}
                  schema={contactLineSchema}
                  startForm={this.props.isAdd}
                />
              </Col>
            </Row>
            <Col md={12} sm={12} xs={12}>
              <CardFooter align="center">
                {this.renderButton("Save")}
              </CardFooter>
            </Col>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default connect(getLoading)(VendorForm);
