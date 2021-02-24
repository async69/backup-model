import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { CardBody, CardFooter, Form, Row, Col } from "reactstrap";
import { getLoading } from "store/Inventory/MasterData/inventoryItems";
import { connect } from "react-redux";

class InventoryItemForm extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        quantity: 0,
        item: "",
        warehouse: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.any().allow("").optional(),
      quantity: Joi.number(),
      item: Joi.string(),
      warehouse: Joi.string(),
    };
  }

  populateState(inventoryItem) {
    const updatedState = {
      ...this.state,
      data: {
        id: inventoryItem.id,
        quantity: inventoryItem.quantity,
        warehouse: inventoryItem.warehouse ? inventoryItem.warehouse.id : "",
        item: inventoryItem.item ? inventoryItem.item.id : "",
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
  componentDidMount() {
    this.componentDidUpdate();
  }

  doSubmit() {
    console.log(this.state.data);
    this.props.submit(this.state.data);
  }

  render() {
    const { isEdit } = this.props;
    const { items, warehouses } = this.props.options;
    return (
      <>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={12} sm={6} xs={12}>
                {this.renderSelect("item", "Item Name", items, "server")}
              </Col>
              <Col md={12} sm={6} xs={12}>
                {this.renderSelect(
                  "warehouse",
                  "Warehouse",
                  warehouses,
                  "server"
                )}
              </Col>

              <Col md={12} sm={12} xs={12}>
                {this.renderInput({
                  name: "quantity",
                  label: "Quantity",
                  disabled: isEdit,
                })}
              </Col>
            </Row>
            <CardFooter align="center">{this.renderButton("Save")}</CardFooter>
          </Form>
        </CardBody>
      </>
    );
  }
}
export default connect(getLoading)(InventoryItemForm);
