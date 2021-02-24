import React from "react";
import { Card, CardBody, CardHeader, Label, Form, Row, Col } from "reactstrap";
import ReusabelForm from "../../../../pages/common/form";
import { connect } from "react-redux";
import { InlineTable } from "../../../common/InLineEditableTable";

import {
  addTransferOrderIssue,
  updateTransferOrderIssue,
  getStatus,
} from "../../../../store/Inventory/Common/TransferOrderIssues";
import { selectItemMasterDatas as getItems } from "store/Inventory/Setup/Item/Inventory_Item";
import { selectWarehouses } from "store/Inventory/Warehouse";
import { selectBins } from "store/Inventory/Bin";
import { selectUOMs } from "store/Inventory/Setup/UOM/Warehouse";
import {
  loadStoreRequisitions,
  getStoreRequisitions,
} from "store/Inventory/Common/StoreRequisitions";
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

class TransferOrderIssueForm extends ReusabelForm {
  constructor(props) {
    super(props);
    this.initialState = initialState;
    this.state = JSON.parse(JSON.stringify(this.initialState));
    this.schema = mainSchema;
    this.handleLineSave = this.handleLineSave.bind(this);
    this.populateState = this.populateState.bind(this);
    this.updateLines = this.updateLines.bind(this);
    this.lineMapper = this.lineMapper.bind(this);
  }

  doSubmit = async () => {
    // this.props.submit(this.state.data);
    alert();
  };

  componentDidMount() {
    this.componentDidUpdate();
  }

  lineMapper() {
    if (this.props.transferOrderIssue) {
      return lineContentMapper(this.props.transferOrderIssue, apiLineTag);
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
    if (this.props.transferOrderIssue && !this.state.lockUpdate) {
      this.populateState(this.props.transferOrderIssue);
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

  render() {
    const { data } = this.state;
    const { disabled } = this.props;
    return (
      <Card className="border-0">
        <CardHeader className="border-0">Transfer Order Issue</CardHeader>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <>
                {this.state.data.id && (
                  <Col md={3} sm={12} xs={12}>
                    {this.renderInput("document_number", "Document Number")}
                  </Col>
                )}
                <Col md={3} sm={12} xs={12}>
                  {this.renderSelect(
                    "store_requisition",
                    "Store Requistion",
                    this.props.storeRequisitions.map((sr) => ({
                      name: sr.document_number,
                      id: sr.id,
                    })),
                    "server"
                  )}
                </Col>

                <Col md={3} sm={12} xs={12}>
                  {this.renderInput("issued_by", "Requested By")}
                </Col>
                <Col md={3} sm={12} xs={12}>
                  {this.renderInput("approved_by", "Approved By")}
                </Col>
                <Col md={3} sm={12} xs={12}>
                  {this.renderInput("approved_date", "Approved Date", "date")}
                </Col>
              </>

              <>
                <Col md={3} sm={12} xs={12}>
                  {this.renderInput("posting_date", "Posting Date", "date")}
                </Col>

                <Col md={3} sm={12} xs={12}>
                  {this.renderSelect("status", "Status", [
                    "Open",
                    "Approved",
                    "Rejected",
                    "Posted",
                    "Pending",
                  ])}
                </Col>
              </>

              <Col md={6} sm={6} xs={12}>
                {this.renderInput("remarks", "Remarks (optional)", "textarea")}
              </Col>
              <Col md={12} sm={12} xs={12}>
                <CardHeader>Lines</CardHeader>
                <CardBody>
                  {/* <TransferOrderIssueLinesTable
                    transferOrderIssueLines={data.toi_lines}
                    options={{
                      items: this.props.items,
                      unitOfMeasurements: this.props.unitOfMeasurements,
                      warehouses: this.props.warehouses,
                      bins: this.props.bins,
                    }}
                    onLineUpdate={this.handleLineUpdate}
                    disabled={disabled}
                  /> */}
                  <InlineTable
                    columns={getColumns({
                      items: this.props.items,
                      unitOfMeasurements: this.props.unitOfMeasurements,
                      warehouses: this.props.warehouses,
                      bins: this.props.bins,
                    })}
                    disabled={disabled}
                    data={data.toi_lines}
                    callback={this.updateLines}
                    schema={lineSchema}
                  />
                </CardBody>
              </Col>

              <Col align="center">{this.renderButton("Save")}</Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
const mapStateToProps = (state) => ({
  status: getStatus(state),
  items: getItems(state),
  warehouses: selectWarehouses(state),
  bins: selectBins(state),
  unitOfMeasurements: selectUOMs(state),
  storeRequisitions: getStoreRequisitions(state),
});

const mapDispatchToProps = (dispatch) => ({
  addTransferOrderIssue: (data) => dispatch(addTransferOrderIssue(data)),
  updateTransferOrderIssue: (data) => dispatch(updateTransferOrderIssue(data)),
  loadStoreRequisitions: () => dispatch(loadStoreRequisitions()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransferOrderIssueForm);
