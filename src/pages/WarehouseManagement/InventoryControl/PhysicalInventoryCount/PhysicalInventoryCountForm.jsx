import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";
import { getLoading } from "store/Inventory/InventoryControl/PhysicalInventoryJournal";
import { connect } from "react-redux";
class PhysicalInventoryJournalForm extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        item: "",
        warehouse: "",
        basic_unit_of_measurement: "",
        unit_price: "",
        status: "",
        inventory_quantity: "",
        inventory_total_amount: "",
        physical_counted_quantity: "",
        physical_total_amount: "",
        quantity: "",
        posting_date: "",
        remarks: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      unit_price: Joi.number(),
      inventory_quantity: Joi.number(),
      physical_counted_quantity: Joi.number(),
      posting_date: Joi.date().allow("").optional(),
      remarks: Joi.string().allow("").optional(),
      item: Joi.string(),
      warehouse: Joi.string(),
      basic_unit_of_measurement: Joi.string(),

      status: Joi.string().allow("").optional(),
      inventory_total_amount: Joi.number().allow("").optional(),
      physical_total_amount: Joi.number().allow("").optional(),
      quantity: Joi.number().allow("").optional(),
      item_number: Joi.string().allow("").optional(),
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id,
        item: data.item_detail.id,
        item_number: data.item_detail.item_number,
        warehouse: data.warehouse_detail.id,
        basic_unit_of_measurement: data.basic_unit_of_measurement_detail.id,
        unit_price: data.unit_price,
        status: data.status,
        inventory_quantity: data.inventory_quantity,
        inventory_total_amount: data.inventory_total_amount,
        physical_counted_quantity: data.physical_counted_quantity,
        physical_total_amount: data.physical_total_amount,
        quantity: data.quantity,
        posting_date: data.posting_date,
        remarks: data.remarks,
      },
      lockUpdate: true,
    };
    this.setState(updatedState);
  }

  componentDidUpdate() {
    if ((this.props.isEdit || this.props.isView) && !this.state.lockUpdate) {
      this.populateState(this.props.data);
    }
  }

  doSubmit() {
    this.props.submit(this.state.data);
  }

  render() {
    const { items, warehouses, UOMs, inventoryItems } = this.props.options;
    return (
      <Card className="border-0">
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "item_number",
                  label: "Item Number",
                  options: inventoryItems.map((inventoryItem) => ({
                    name: inventoryItem.item.number,
                    id: inventoryItem.item.id,
                  })),
                  callback: (value) => {
                    const item = items.find((i) => i.id === value);
                    const inventoryItem = inventoryItems.find(
                      (i) => i.item.id === item.id
                    );
                    console.log(inventoryItem, "inventoryItem");
                    return {
                      name: [
                        { name: "item", value },
                        { name: "warehouse", value: item.warehouse },
                        { name: "unit_price", value: item.unit_cost },
                        {
                          name: "basic_unit_of_measurement",
                          value: item.basic_unit_of_measurement_detail.id,
                        },
                        {
                          name: "inventory_quantity",
                          value: inventoryItem.quantity
                            ? inventoryItem.quantity
                            : 0,
                        },
                      ],
                    };
                  },
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "item",
                  label: "Item Name",
                  options: items,
                  disabled: true,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "warehouse",
                  label: "Warehouse",
                  options: warehouses,
                  disabled: true,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "basic_unit_of_measurement",
                  label: "Unit of Measurement",
                  options: UOMs,
                  disabled: true,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "unit_price",
                  label: "Unit Price",
                  disabled: true,
                  type: "number",
                })}
              </Col>
              {this.state.data.id && (
                <>
                  <Col md={6} sm={12} xs={12}>
                    {this.renderInput({
                      name: "quantity",
                      label: "Quantity",
                      type: "number",
                    })}
                  </Col>
                  <Col md={6} sm={12} xs={12}>
                    {this.renderInput({
                      name: "inventory_total_amount",
                      label: "Inventory Total Quantity",
                      type: "number",
                    })}
                  </Col>
                  <Col md={6} sm={12} xs={12}>
                    {this.renderInput({
                      name: "physical_total_amount",
                      label: "Physical Total Amount",
                      type: "number",
                    })}
                  </Col>
                  <Col md={6} sm={12} xs={12}>
                    {this.renderInput({
                      name: "status",
                      label: "Status",
                    })}
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
                {this.renderInput({
                  name: "inventory_quantity",
                  label: "Inventory Quantity",
                  disabled: true,
                  type: "number",
                })}
              </Col>

              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "physical_counted_quantity",
                  label: "Physical Counted Quantity",
                  type: "number",
                })}
              </Col>

              <Col md={12} sm={12} xs={12}>
                {this.renderInput({
                  name: "remarks",
                  label: "Remarks",
                  type: "textarea",
                })}
              </Col>
            </Row>
            <CardFooter align="center">{this.renderButton("Save")}</CardFooter>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
export default connect(getLoading)(PhysicalInventoryJournalForm);
