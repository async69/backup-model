import React from "react";
import { CardBody, Col, Form, Row } from "reactstrap";
import ReusabelForm from "../../../common/form";
import Joi from "joi-browser";

class TransferOrderReceiveLineForm extends ReusabelForm {
  initialState = {
    data: {
      remaining_quantity: "",
      quantity_requested: "",
      quantity_received: "",
      remarks: "",
      item: "",
      unit_of_measurement: "",
      from_warehouse: "",
      to_warehouse: "",
      from_bin: "",
      to_bin: "",
    },
    errors: {},
  };
  state = JSON.parse(JSON.stringify(this.initialState));
  schema = {
    id: Joi.any().allow("").optional(),
    remaining_quantity: Joi.string(),
    quantity_requested: Joi.number(),
    quantity_received: Joi.number(),
    remarks: Joi.string(),
    item: Joi.string(),
    unit_of_measurement: Joi.string(),
    from_warehouse: Joi.string(),
    to_warehouse: Joi.string(),
    from_bin: Joi.string(),
    to_bin: Joi.string(),
  };
  mapToViewModel(line) {
    return {
      id: line.id,
      remaining_quantity: line.remaining_quantity,
      quantity_requested: line.quantity_requested,
      quantity_received: line.quantity_received,
      remarks: line.remarks,
      item: line.item,
      unit_of_measurement: line.unit_of_measurement,
      from_warehouse: line.from_warehouse,
      to_warehouse: line.to_warehouse,
      from_bin: line.from_bin,
      to_bin: line.to_bin,
    };
  }
  populateLine() {
    const { selectedLine } = this.props;
    if (!selectedLine) return;
    this.setState({ data: this.mapToViewModel(selectedLine) });
  }
  componentDidMount() {
    this.populateLine();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevProps.selectedLine) !==
      JSON.stringify(this.props.selectedLine)
    ) {
      this.populateLine();
    }
  }
  doSubmit = async () => {
    try {
      this.props.onSubmit(this.state.data, "tor_lines");
      this.resetForm();
    } catch (error) {}
  };
  render() {
    return (
      <CardBody>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col md={2} sm={12} xs={12}>
              {this.renderInput(
                "remaining_quantity",
                "Remaining Quantity",
                "number"
              )}
            </Col>
            <Col md={2} sm={12} xs={12}>
              {this.renderInput("quantity_requested", "Quantity", "number")}
            </Col>
            <Col md={2} sm={12} xs={12}>
              {this.renderInput(
                "quantity_received",
                "Quantity Received",
                "number"
              )}
            </Col>
            <Col md={2} sm={12} xs={12}>
              {this.renderSelect("item", "Item", this.props.items, "server")}
            </Col>
            <Col md={2} sm={12} xs={12}>
              {this.renderSelect(
                "unit_of_measurement",
                "Unit",
                this.props.unitOfMeasurements,
                "server"
              )}
            </Col>
            <Col md={2} sm={12} xs={12}>
              {this.renderSelect(
                "from_warehouse",
                "From Warehouse",
                this.props.warehouses,
                "server"
              )}
            </Col>
            <Col md={2} sm={12} xs={12}>
              {this.renderSelect(
                "to_warehouse",
                "To Warehouse",
                this.props.warehouses,
                "server"
              )}
            </Col>
            <Col md={2} sm={12} xs={12}>
              {this.renderSelect(
                "from_bin",
                "From Bin",
                this.props.bins,
                "server"
              )}
            </Col>
            <Col md={2} sm={12} xs={12}>
              {this.renderSelect("to_bin", "To Bin", this.props.bins, "server")}
            </Col>
            <Col md={6} sm={12} xs={12}>
              {this.renderInput("remarks", "Remarks (optional)", "textarea")}
            </Col>
            <Col align="center" md={12} sm={12} xs={12}>
              {this.renderButton("Insert Line")}
            </Col>
          </Row>
        </Form>
      </CardBody>
    );
  }
}

export default TransferOrderReceiveLineForm;
