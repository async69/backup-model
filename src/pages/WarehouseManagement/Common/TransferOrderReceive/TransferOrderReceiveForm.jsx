import React from "react";
import Joi from "joi-browser";
import { Card, CardBody, CardHeader, Label, Form, Row, Col } from "reactstrap";
import ReusabelForm from "../../../../pages/common/form";
import { connect } from "react-redux";
import TransferOrderReceiveLinesTable from "./TransferOrderReceiveLinesTable";
import TransferOrderReceiveLineForm from "./TransferOrderReceiveLineForm";
import {
  addTransferOrderReceive,
  updateTransferOrderReceive,
  getStatus,
} from "../../../../store/Inventory/Common/TransferOrderReceives";
import { selectItemMasterDatas as getItems } from "store/Inventory/Setup/Item/Inventory_Item";
import { selectWarehouses } from "store/Inventory/Warehouse";
import { selectBins } from "store/Inventory/Bin";
import { selectUOMs } from "store/Inventory/Setup/UOM/Warehouse";
import {
  loadTransferOrderIssues,
  getTransferOrderIssues,
} from "store/Inventory/Common/TransferOrderIssues";

class TransferOrderReceiveForm extends ReusabelForm {
  initialState = {
    data: {
      document_number: "",
      received_by: "",
      posting_date: "",
      remarks: "",
      status: "Open",
      transfer_order_issue: "",
      tor_lines: [],
    },
    errors: {},
    selectedLine: "",
    lineCounter: 1,
  };
  state = JSON.parse(JSON.stringify(this.initialState));
  schema = {
    id: Joi.any().allow("").optional(),
    document_number: Joi.string().allow("").optional(),
    received_by: Joi.number(),
    posting_date: Joi.date(),
    remarks: Joi.string().allow("").optional(),
    status: Joi.string(),
    transfer_order_issue: Joi.string(),
    tor_lines: Joi.array().items(Joi.object()).min(1),
  };

  mapToViewModel(transferOrderReceive) {
    return {
      id: transferOrderReceive.id,
      document_number: transferOrderReceive.document_number,
      received_by: transferOrderReceive.received_by,
      posting_date: transferOrderReceive.posting_date,
      remarks: transferOrderReceive.remarks,
      status: transferOrderReceive.status,
      transfer_order_issue: transferOrderReceive.transfer_order_issue_detail.id,
      tor_lines: transferOrderReceive.tor_lines.map((line) =>
        this.getLineFormData(line)
      ),
    };
  }
  populateTransferOrderReceive() {
    const { transferOrderReceive } = this.props;
    if (!transferOrderReceive) return;
    this.setState({ data: this.mapToViewModel(transferOrderReceive) });
  }

  componentDidMount() {
    this.populateTransferOrderReceive();
    this.props.loadTransferOrderIssues();
  }

  getLineFormData(line) {
    const {
      item_detail,
      unit_of_measurement_detail,
      from_warehouse_detail,
      to_warehouse_detail,
      from_bin_detail,
      to_bin_detail,
    } = line;
    if (line) {
      return {
        id: line.id,
        remaining_quantity: line.remaining_quantity,
        quantity_requested: line.quantity_requested,
        quantity_received: line.quantity_received,
        remarks: line.remarks,
        item: item_detail ? item_detail.id : line.item.id,
        unit_of_measurement: unit_of_measurement_detail
          ? unit_of_measurement_detail.id
          : line.unit_of_measurement.id,
        from_warehouse: from_warehouse_detail
          ? from_warehouse_detail.id
          : line.from_warehouse.id,
        to_warehouse: to_warehouse_detail
          ? to_warehouse_detail.id
          : line.to_warehouse.id,
        from_bin: from_bin_detail ? from_bin_detail.id : line.from_bin.id,
        to_bin: to_bin_detail ? to_bin_detail.id : line.to_bin.id,
      };
    }
  }

  doSubmit = async () => {
    const data = { ...this.state.data };
    if (data.id) {
      await this.props.updateTransferOrderReceive(data);
      if (this.props.status === "success") {
        this.toast.success("Transfer Order Receive updated successfully");
        this.resetForm();
      }
    } else {
      data.tor_lines.forEach((line) => {
        delete line.id;
      });
      await this.props.addTransferOrderReceive(data);
      if (this.props.status === "success") {
        this.toast.success("Transfer Order Receive added successfully");
        this.resetForm();
      }
    }
  };

  render() {
    const { data } = this.state;
    const { disabled } = this.props;
    return (
      <Card className="border-0">
        <CardHeader className="border-0">Transfer Order Receive</CardHeader>
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
                    "transfer_order_issue",
                    "Transer Order Issue",
                    this.props.transferOrderIssues.map((toi) => ({
                      name: toi.document_number,
                      id: toi.id,
                    })),
                    "server"
                  )}
                </Col>

                <Col md={3} sm={12} xs={12}>
                  {this.renderInput("received_by", "Received By")}
                </Col>
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
                <Col md={3} sm={12} xs={12}>
                  {this.renderInput("remarks", "Remarks", "textarea")}
                </Col>
              </>
              <Col md={12} sm={12} xs={12}>
                <CardHeader>Lines</CardHeader>
                <CardBody>
                  <TransferOrderReceiveLinesTable
                    transferOrderReceiveLines={this.getLineTableData(
                      data.tor_lines,
                      {
                        item: this.props.items,
                        unit_of_measurement: this.props.unitOfMeasurements,
                        from_warehouse: this.props.warehouses,
                        to_warehouse: this.props.warehouses,
                        to_bin: this.props.bins,
                        from_bin: this.props.bins,
                      }
                    )}
                    onEdit={this.handleLineEdit}
                    onDelete={this.handleLineDelete}
                    disabled={this.props.disabled}
                  />
                </CardBody>
              </Col>

              <Col align="center">{this.renderButton("Save")}</Col>
            </Row>
          </Form>
          <Row>
            <Col md={12} sm={12} xs={12}>
              {!this.props.disabled && (
                <>
                  <Label>Enter Line </Label>
                  <TransferOrderReceiveLineForm
                    onSubmit={this.handleLineSubmit}
                    selectedLine={this.getLineFormData(this.state.selectedLine)}
                    items={this.props.items}
                    unitOfMeasurements={this.props.unitOfMeasurements}
                    warehouses={this.props.warehouses}
                    bins={this.props.bins}
                  />
                </>
              )}
            </Col>
          </Row>
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
  transferOrderIssues: getTransferOrderIssues(state),
});

const mapDispatchToProps = (dispatch) => ({
  addTransferOrderReceive: (data) => dispatch(addTransferOrderReceive(data)),
  updateTransferOrderReceive: (data) =>
    dispatch(updateTransferOrderReceive(data)),
  loadTransferOrderIssues: () => dispatch(loadTransferOrderIssues()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransferOrderReceiveForm);
