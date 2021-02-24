import React from "react";
import { Card, CardBody, Form, Row, Col } from "reactstrap";
import ReusabelForm from "../../../common/form";
import { InlineTable } from "../../../common/InLineEditableTable";
import {
  initialState,
  mainSchema,
  getColumns,
  lineSchema,
  lineContentMapper,
  populateState,
  saveLineTag,
  apiLineTag,
} from "./config";
import statusTypes from "../../../../config/statusTypes";
import { getLoading } from "../../../../store/Sales/Common/SalesOrder";
import { connect } from "react-redux";

class SalesOrderForm extends ReusabelForm {
  constructor(props) {
    super(props);
    this.initialState = initialState;
    this.state = JSON.parse(JSON.stringify(this.initialState));
    this.schema = mainSchema;
    this.handleLineSave = this.handleLineSave.bind(this);
    this.populateState = this.populateState.bind(this);
    this.updateLines = this.updateLines.bind(this);
    this.lineMapper = this.lineMapper.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  doSubmit = async () => {
    this.props.submit(this.state.data);
  };

  componentDidMount() {
    this.populateDefaults();
    this.componentDidUpdate();
    this.populateDefaults();
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

  updateLines(lines) {
    if (lines.length > 0 || this.state.data[saveLineTag].length > 0) {
      this.setState({
        data: {
          ...this.state.data,
          [saveLineTag]: lines,
        },
      });
    }
  }

  componentDidUpdate() {
    if ((this.props.isEdit || this.props.isView) && !this.state.lockUpdate) {
      this.populateState(this.props.data);
    }
  }

  handleLineSave(data) {
    this.setState({
      data: {
        ...this.state.data,
        [saveLineTag]: data,
      },
    });
  }

  updateData(key, value) {
    this.setState({
      data: {
        ...this.state.data,
        [key]: value,
      },
    });
  }

  render() {
    const { salesRegions, customers, employees } = this.props.options;
    return (
      <Card className="border-0">
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              {(
                <Col md={3} sm={12} xs={12}>
                  {this.renderInput({
                    name: "document_number",
                    label: "Document Number",
                  })}
                </Col>
              ) && this.props.isView}
              <Col className="mb-3" md={3} sm={6} xs={12}>
                {this.renderInput({
                  name: "order_date",
                  label: "Order Date",
                  type: "date",
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "customer_number",
                  label: "Customer Number",
                  options: customers.map((item) => item.document_number),
                  callback: (value) => {
                    const found = customers.find(
                      (item) => item.document_number === value
                    );
                    if (found) {
                      return { name: "customer", value: found.id };
                    }
                  },
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "customer",
                  label: "Customer Name",
                  options: customers,
                  optionsFrom: "server",
                  disabled: true,
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "sales_region_code",
                  label: "Sales Region Code",
                  options: salesRegions.map((region) => region.code),
                  callback: (data) => {
                    const found = salesRegions.find(
                      (item) => item.code === data
                    );
                    if (found) {
                      return {
                        name: "sales_region",
                        value: found.id,
                      };
                    }
                  },
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "sales_region",
                  label: "Sales Region",
                  options: salesRegions,
                  optionsFrom: "server",
                  disabled: true,
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "sales_person",
                  label: "Sales Person",
                  options: employees.map((e) => ({
                    id: e.id,

                    name: e.first_name + " " + e.father_name,
                  })),
                  optionsFrom: "server",
                })}
              </Col>
              {this.props.isView &&
              statusTypes.POSTED !== this.state.data.status &&
              statusTypes.OPEN_SIV !== this.state.data.status ? (
                <Col md={3} sm={12} xs={12}>
                  {this.renderInput({
                    name: "posting_date",
                    label: "Posting Date",
                    type: "date",
                  })}
                </Col>
              ) : (
                <></>
              )}
              <Col md={3} sm={6} xs={12}>
                {this.renderInput({
                  name: "due_date",
                  label: "Due Date",
                  type: "date",
                })}
              </Col>
              {this.props.isView &&
              statusTypes.OPEN !== this.state.data.status &&
              statusTypes.SENT_FOR_APPROVAL !== this.state.data.status ? (
                <Col md={3} sm={12} xs={12}>
                  {this.renderInput({
                    name: "approved_by",
                    label: "Approved By",
                  })}
                </Col>
              ) : (
                <></>
              )}
              {this.props.isView &&
              statusTypes.OPEN !== this.state.data.status &&
              statusTypes.SENT_FOR_APPROVAL !== this.state.data.status ? (
                <Col md={3} sm={12} xs={12}>
                  {this.renderInput({
                    name: "approved_date",
                    label: "Approved Date",
                  })}
                </Col>
              ) : (
                <></>
              )}
              {this.props.isView ? (
                <Col md={3} sm={12} xs={12}>
                  {this.renderInput({
                    name: "status",
                    label: "Status",
                  })}
                </Col>
              ) : (
                <></>
              )}
              <Col md={12} sm={12} xs={12}>
                {this.renderInput("remarks", "Remarks", "textarea")}
              </Col>
              <Col md={12} sm={12} xs={12}>
                <InlineTable
                  columns={getColumns(this.props)}
                  disabled={this.props.disabled}
                  data={this.state.data[saveLineTag]}
                  callback={this.updateLines}
                  schema={lineSchema}
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

export default connect(getLoading)(SalesOrderForm);
