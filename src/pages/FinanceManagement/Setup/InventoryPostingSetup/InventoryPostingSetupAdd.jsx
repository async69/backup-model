import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";

class InventoryPostingSetupAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        itemLocation: "",
        itemPostingGroup: "",
        inventoryAccount: "",
        cogs_account: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      itemLocation: Joi.string().required().label("itemLocation"),
      itemPostingGroup: Joi.string().required().label("itemPostingGroup"),
      inventoryAccount: Joi.string().required().label("inventoryAccount"),
      cogs_account: Joi.string().required().label("cogs_account"),
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        itemLocation: data.item_location_detail.id
          ? data.item_location_detail.id
          : "",
        itemPostingGroup: data.item_posting_group_detail.id
          ? data.item_posting_group_detail.id
          : "",
        inventoryAccount: data.inventory_account_detail.id
          ? data.inventory_account_detail.id
          : "",
        cogs_account: data.cogs_account_detail.id
          ? data.cogs_account_detail.id
          : "",
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
    const { accounts, postingGroups, itemLocations } = this.props.options;
    return (
      <Card className="border-0">
        {/* <CardHeader className="border-0">New Inventory Posting Setup </CardHeader> */}
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "itemLocation",
                  label: "Item Location",
                  options: itemLocations,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "itemPostingGroup",
                  label: "Item Posting Group",
                  options: postingGroups,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "inventoryAccount",
                  label: "Inventory Account ",
                  options: accounts,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "cogs_account",
                  label: "Cost of Goods Sold Account",
                  options: accounts,
                  optionsFrom: "server",
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
export default InventoryPostingSetupAdd;
