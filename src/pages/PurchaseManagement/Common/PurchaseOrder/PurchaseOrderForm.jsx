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
import { apiLineTag as PRAPILineTag } from "../PurchaseRequisition/config";
import statusTypes from "../../../../config/statusTypes";
import { getLoading } from "store/Purchase/Common/PurchaseOrder";
import { connect } from "react-redux";

class PurchaseOrderForm extends ReusabelForm {
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
    const {
      vendors,
      purchaseTypes,
      purchaseRequisitions,
      departments,
      employees,
    } = this.props.options;

    const callback = (id) => {
      const foundPR = purchaseRequisitions.find((item) => item.id === id);
      return (
        foundPR && {
          name: [
            { name: "vendor", value: foundPR.vendor.id },
            {
              name: "requestor_department",
              value: foundPR.requester_department,
            },
            { name: "purchase_type", value: foundPR.purchase_type_detail.id },
            { name: "purchaser", value: foundPR.purchaser },
            {
              name: "expected_delivery_date",
              value: foundPR.expected_delivery_date,
            },
            { name: "posting_date", value: foundPR.posting_date },
            { name: "approved_by", value: foundPR.approved_by },
            { name: "approved_date", value: foundPR.approved_date },
            { name: "status", value: foundPR.status },
            { name: "remarks", value: foundPR.remarks },
            {
              name: saveLineTag,
              value: foundPR[PRAPILineTag].map((line) => ({
                _id: line.id,
                item_category: line.category ? line.category.id : "",
                item_no: line.item.document_number,
                item: line.item.id,
                quantity: Number(line.quantity),
                unit_measure: line.unit_of_measurement.id,
                unit_price: Number(line.unit_price),
                total_amount: Number(line.total),
                currency: line.currency.id,
                remarks: line.remarks,
              })),
            },
          ],
          hasMultiple: true,
        }
      );
    };

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
                  name: "purchase_requisition",
                  label: "Purchase Requisition Number",
                  options: purchaseRequisitions.filter(pr => pr.status === statusTypes.APPROVED).map((p) => ({
                    id: p.id,
                    name: p.document_number,
                  })),
                  optionsFrom: "server",
                  callback,
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "vendor",
                  label: "Vendor Name",
                  options: vendors,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "requestor_department",
                  label: "Requesting Department",
                  options: departments,
                  optionsFrom: "server",
                })}
              </Col>

              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "purchaser",
                  label: "Purchaser",
                  options: employees.map((e) => ({
                    id: e.id,
                    name: e.first_name + " " + e.father_name,
                  })),
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "purchase_type",
                  label: "Purchase Type",
                  options: purchaseTypes,
                  optionsFrom: "server",
                })}
              </Col>
              {/* {this.props.isView &&
              statusTypes.OPEN !== this.state.data.status &&
              statusTypes.SENT_FOR_APPROVAL !== this.state.data.status &&
              statusTypes.APPROVED !== this.state.data.status ? (
                <Col md={3} sm={12} xs={12}>
                  {this.renderInput({
                    name: "posting_date",
                    label: "Posting Date",
                    type: "date",
                  })}
                </Col>
              ) : (
                <></>
              )} */}
              <Col md={3} sm={12} xs={12}>
                {this.renderInput({
                  name: "expected_delivery_date",
                  label: "Expected Delivery Date",
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
                  columns={getColumns(this.props.options)}
                  disabled={this.props.disabled}
                  data={this.state.data[saveLineTag]}
                  callback={this.updateLines}
                  schema={lineSchema}
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

export default connect(getLoading)(PurchaseOrderForm);
