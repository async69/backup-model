import React from "react";
import Joi from "joi-browser";
import { CardBody, CardHeader, Label, Form, Row, Col } from "reactstrap";
import ReusabelForm from "../../../../pages/common/form";
import { connect } from "react-redux";
import StoreRequisitionLinesTable from "./StoreRequisitionLinesTable";
import StoreRequisitionLineForm from "./StoreRequisitionLineForm";
import {
  addStoreRequisition,
  updateStoreRequisition,
  getStatus,
} from "../../../../store/Inventory/Common/StoreRequisitions";
import { selectItemMasterDatas as getItems } from "store/Inventory/Setup/Item/Inventory_Item";
import { selectUOMs } from "store/Inventory/Setup/UOM/Warehouse";

class StoreRequisitionForm extends ReusabelForm {
  initialState = {
    data: {
      document_number: "",
      requested_by: "",
      requested_date: "",
      approved_date: "",
      status: "Open",
      remarks: "",
      posting_date: "",
      issue_type: "",
      sr_lines: [],
    },
    errors: {},
    selectedLine: "",
    lineCounter: 1,
  };
  state = JSON.parse(JSON.stringify(this.initialState));
  schema = {
    id: Joi.any().allow("").optional(),
    document_number: Joi.string().allow("").optional(),
    requested_by: Joi.any().allow("").optional(),
    requested_date: Joi.any().allow("").optional(),
    approved_date: Joi.any().allow("").optional(),
    status: Joi.string().allow("").optional(),
    remarks: Joi.string().allow("").optional(),
    posting_date: Joi.any().allow("").optional(),
    issue_type: Joi.string().valid(["SIV", "TOI"]),
    sr_lines: Joi.array().items(Joi.object()).min(1),
  };

  mapToViewModel(storeRequisition) {
    return {
      id: storeRequisition.id,
      document_number: storeRequisition.document_number,
      requested_by: storeRequisition.requested_by,
      requested_date: storeRequisition.requested_date,
      approved_date: storeRequisition.approved_date,
      status: storeRequisition.status,
      remarks: storeRequisition.remarks,
      posting_date: storeRequisition.posting_date,
      issue_type: storeRequisition.issue_type,
      sr_lines: storeRequisition.sr_lines.map((line) =>
        this.getLineFormData(line)
      ),
    };
  }
  populateStoreRequisition() {
    const { storeRequisition } = this.props;
    if (!storeRequisition) return;
    this.setState({ data: this.mapToViewModel(storeRequisition) });
  }

  componentDidMount() {
    this.populateStoreRequisition();
  }

  getLineFormData(line) {
    const { item_detail, unit_of_measurement_detail } = line;
    if (line) {
      return {
        id: line.id,
        quantity: line.quantity,
        unit_price: line.unit_price,
        total_amount: line.total_amount,
        remarks: line.remarks,
        item: item_detail ? item_detail.id : line.item.id,
        unit_of_measurement: unit_of_measurement_detail
          ? unit_of_measurement_detail.id
          : line.unit_of_measurement.id,
      };
    }
  }

  doSubmit = async () => {
    const data = { ...this.state.data };
    if (data.id) {
      await this.props.updateStoreRequisition({
        id: data.id,
        issue_type: data.issue_type,
        remarks: data.remarks,
        sr_lines: data.sr_lines,
      });
      if (this.props.status === "success") {
        this.toast.success("Store Requisition updated successfully");
        this.resetForm();
      }
    } else {
      data.sr_lines.forEach((line) => {
        delete line.id;
      });
      await this.props.addStoreRequisition({
        issue_type: data.issue_type,
        remarks: data.remarks,
        sr_lines: data.sr_lines,
      });
      if (this.props.status === "success") {
        this.toast.success("Store Requisition added successfully");
        this.resetForm();
      }
    }
  };

  render() {
    const { data } = this.state;
    const { disabled } = this.props;
    return (
      <>
        {/* <CardHeader className="border-0">Store Requisition</CardHeader> */}
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              {data.id && disabled && (
                <>
                  <Col md={3} sm={12} xs={12}>
                    {this.renderInput("document_number", "Document Number")}
                  </Col>

                  <Col md={3} sm={12} xs={12}>
                    {this.renderInput("requested_by", "Requested By")}
                  </Col>
                  <Col md={3} sm={12} xs={12}>
                    {this.renderInput(
                      "requested_date",
                      "Requested Date",
                      "date"
                    )}
                  </Col>
                  <Col md={3} sm={12} xs={12}>
                    {this.renderInput("approved_date", "Approved Date", "date")}
                  </Col>
                </>
              )}

              <Col md={3} sm={6} xs={12}>
                {this.renderSelect("issue_type", "Issue Type", ["SIV", "TOI"])}
              </Col>

              {data.id && disabled && (
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
              )}

              <Col md={6} sm={6} xs={12}>
                {this.renderInput("remarks", "Remarks (optional)", "textarea")}
              </Col>
              <Col md={12} sm={12} xs={12}>
                <CardHeader>Lines</CardHeader>
                <CardBody>
                  <StoreRequisitionLinesTable
                    storeRequisitionLines={this.getLineTableData(
                      data.sr_lines,
                      {
                        item: this.props.items,
                        unit_of_measurement: this.props.unitOfMeasurements,
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
                  <StoreRequisitionLineForm
                    onSubmit={this.handleLineSubmit}
                    selectedLine={this.getLineFormData(this.state.selectedLine)}
                    items={this.props.items}
                    unitOfMeasurements={this.props.unitOfMeasurements}
                  />
                </>
              )}
            </Col>
          </Row>
        </CardBody>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  status: getStatus(state),
  items: getItems(state),
  unitOfMeasurements: selectUOMs(state),
});

const mapDispatchToProps = (dispatch) => ({
  addStoreRequisition: (data) => dispatch(addStoreRequisition(data)),
  updateStoreRequisition: (data) => dispatch(updateStoreRequisition(data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreRequisitionForm);
