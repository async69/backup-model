


import React from "react";
import { Form, Row, Col, CardBody, CardFooter } from "reactstrap";
import ReusableForm from "../../../common/form";
import Joi from "joi-browser";
import {
  addInventoryItem,
  getStatus,
  getErrors,
  getLoading,
} from "../../../../store/Inventory/InventoryItem";
import { connect } from "react-redux";

class InventtoryItemAdd extends ReusableForm {
  initialState = {
    data: {
      code: "",
      name: "",
    },
    errors: {},
  };
  state = this.initialState;
  schema = {
    code: Joi.string(),
    name: Joi.string().alphanum(),
  };

  doSubmit = async () => {
    await this.props.addInventoryItem(this.state.data);
    if (this.props.status === "success") {
      this.toast.success("Inventory Item  added successfully");
      this.resetForm();
    }
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <CardBody>
          <Row>
            <Col md={3} sm={12} xs={12}>
              {this.renderInput("item.no", "Item No.")}
            </Col>
            <Col md={3} sm={12} xs={12}>
              {this.renderInput("item.name", "item Name")}
            </Col>
            <Col md={3} sm={12} xs={12}>
              {this.renderSelect("item.category.code", "item Category Code", ["category 1, 'category 2]"])}
            </Col>

            <Col md={3} sm={12} xs={12}>
            {this.renderSelect("item.category.name", "item Category Name", ["NAme 1, 'Name 2]"])}
          </Col>
            <Col md={3} sm={12} xs={12}>
              {this.renderSelect("uom", "Unit of Measurement", ["uom 1", "uom 2"] )}
            </Col>
            <Col md={3} sm={12} xs={12}>
              {this.renderInput("isActive", "Is Active")}
            </Col>
            <Col md={3} sm={12} xs={12}>
              {this.renderInput("currentQuantity", "Current Quantity")}
            </Col>
            <Col md={3} sm={12} xs={12}>
              {this.renderSelect("locationCode", "Location Code" , ['location1 ', 'location 2' ])}
            </Col>

            <Col md={12} sm={12} xs={12}>
              {this.renderInput("Remark", "Remark", "textarea")}
            </Col>
          </Row>
          {/* <Row>
            <Col md={4} sm={12} xs={12} align="center">
              {this.props.errors && (
                <div>
                  {
                    <Alert color="danger">
                      {" "}
                      {this.getErrors(this.props.errors)}
                    </Alert>
                  }
                </div>
              )}
            </Col>
          </Row> */}
        </CardBody>
        <CardFooter align="center">
          {this.renderButton("Add Inventory Item")}
        </CardFooter>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  status: getStatus(state),
  errors: getErrors(state),
  loading: getLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  addInventoryItem: (inventoryItem) => dispatch(addInventoryItem(inventoryItem)),
});
export default connect(mapStateToProps, mapDispatchToProps)(InventtoryItemAdd);