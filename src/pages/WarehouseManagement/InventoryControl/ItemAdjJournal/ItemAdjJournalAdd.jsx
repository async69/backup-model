import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";
import entryTypes from "static/assets/options/entryTypes.json";
import { getLoading } from "store/Inventory/InventoryControl/ItemAdjJournal";
import { connect } from "react-redux";
class ItemAdjustmentJournalAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        document_number: "",
        item_number: "",
        posting_date: "2021-01-01",
        entry_type: "",
        warehouse: "",
        item: "",
        unit_of_measurement: "",
        bin: "",
        quantity: "",
        status: "Open",
        remarks: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      document_number: Joi.string()
        .optional()
        .allow("")
        .label("Document Number"),
      item_number: Joi.string().allow("").optional(),
      posting_date: Joi.string().allow("").optional(),
      entry_type: Joi.string(),
      warehouse: Joi.string(),
      item: Joi.string(),
      unit_of_measurement: Joi.string(),
      bin: Joi.string(),
      quantity: Joi.number(),
      status: Joi.string().allow("").optional(),
      remarks: Joi.string().allow("").optional(),
    };
  }

  doSubmit() {
    this.props.submit(this.state.data);
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id,
        document_number: data.document_number,
        item_number: data.item_detail.item_number,
        item: data.item_detail.id,
        posting_date: data.posting_date,
        entry_type: data.entry_type,
        warehouse: data.warehouse_detail.id,
        unit_of_measurement: data.unit_of_measurement_detail.id,
        bin: data.bin_detail.id,
        quantity: data.quantity,
        status: data.status,
        remarks: data.remarks,
      },
      lockUpdate: true,
    };
    this.setState(updatedState);
  }

  componentDidUpdate() {
    if (this.props.doneAdd) {
      this.resetForm();
    }

    if ((this.props.isEdit || this.props.isView) && !this.state.lockUpdate) {
      this.populateState(this.props.data);
    }
  }
  componentDidMount() {
    this.componentDidUpdate();
  }

  render() {
    const { items, warehouses, unitMeasurements, bins } = this.props.options;
    return (
      <Card className="border-0">
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              {this.state.data.id && (
                <>
                  <Col md={6} sm={12} xs={12}>
                    {this.renderInput("document_number", "Document Number")}
                  </Col>
                  <Col md={6} sm={12} xs={12}>
                    {this.renderInput({
                      name: "posting_date",
                      label: "Posting Date",
                      type: "date",
                    })}
                  </Col>
                </>
              )}

              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "item_number",
                  label: "Item Number",
                  options: items.map((item) => ({
                    name: item.document_number,
                    id: item.id,
                  })),
                  callback: (value) => {
                    return { name: "item", value };
                  },
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "item",
                  label: "Item Name",
                  options: items,
                  optionsFrom: "server",
                  disabled: true,
                })}
              </Col>

              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "warehouse",
                  label: "Warehouse",
                  options: warehouses,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "bin",
                  label: "Bin",
                  options: bins,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "unit_of_measurement",
                  label: "Unit of Measurement",
                  options: unitMeasurements,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "entry_type",
                  label: "Entry Type",
                  options: entryTypes,
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "quantity",
                  label: "Quantity",
                  type: "number",
                })}
              </Col>

              <Col md={12} sm={12} xs={12}>
                {this.renderInput("remarks", "Remarks", "textarea")}
              </Col>
            </Row>
            <CardFooter align="center">{this.renderButton("Save")}</CardFooter>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
export default connect(getLoading)(ItemAdjustmentJournalAdd);
