import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";
// import entryTypes from "static/assets/options/entryTypes.json";
import { getLoading } from "store/Inventory/InventoryControl/ItemAdjJournal";
import { connect } from "react-redux";
class ItemAvailabilityByLocationView extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        item_code: "",
        quantity: "",
        warehouse_code: "",
        warehouse_name: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      item_name: Joi.string().optional().allow("").label("Item Number"),
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
        item: data.item,
        item_code: data.item_code,
        quantity: data.quantity,
        warehouse_code: data.warehouse_code,
        warehouse_name: data.warehouse_name,
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
    return (
      <Card className="border-0">
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={6} sm={12} xs={12}>
                {this.renderInput("item", "Item Code")}
              </Col>
              <Col md={6} sm={12} xs={12}>
                {this.renderInput("item_code", "Item Name")}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "quantity",
                  label: "Quantity",
                  type: "number",
                })}
              </Col>
              <Col md={6} sm={12} xs={12}>
                {this.renderInput("warehouse_code", "Warehouse Code")}
              </Col>
              <Col md={6} sm={12} xs={12}>
                {this.renderInput("warehouse_name", "Warehouse Name")}
              </Col>
            </Row>
            <CardFooter align="center">{this.renderButton("Save")}</CardFooter>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
export default connect(getLoading)(ItemAvailabilityByLocationView);
