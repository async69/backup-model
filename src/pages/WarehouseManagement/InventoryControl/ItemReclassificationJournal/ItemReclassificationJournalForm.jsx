import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Form,
  Row,
  Col,
} from "reactstrap";

class ItemReclassificationalJournalForm extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        quantity: "",
        remark: "",
        posting_date: "",
        item: "",
        warehouse: "",
        unit_of_measurement: "",
        from_bin: "",
        to_bin: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      quantity: Joi.number().required().label("quantity"),
      remark: Joi.string().allow("").optional("").label("remark"),
      posting_date: Joi.string().required().label("item"),
      item: Joi.string().required().label("item"),
      warehouse: Joi.string().required().label("warehouse"),
      unit_of_measurement: Joi.string().required().label("unit_of_measurement"),
      from_bin: Joi.string().required().label("from_bin"),
      to_bin: Joi.string().required().label("to_bin"),
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id,
        quantity: data.quantity,
        remark: data.remarks,
        posting_date: data.posting_date,
        item: data.item_detail.id,
        warehouse: data.warehouse_detail.id,
        unit_of_measurement: data.unit_of_measurement_detail.id,
        from_bin: data.from_bin_detail.id,
        to_bin: data.to_bin_detail.id,
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
    const { items, warehouses, bins, UOMs } = this.props.options;
    return (
      <Card className="border-0">
        <CardHeader className="border-0">{this.props.title}</CardHeader>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "item",
                  label: "Item Name",
                  options: items,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "quantity",
                  label: "Quantity",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "posting_date",
                  label: "Posting Date",
                  type: "date",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "warehouse",
                  label: "Warehouse",
                  options: warehouses,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "unit_of_measurement",
                  label: "Unit of Measurement",
                  options: UOMs,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "from_bin",
                  label: "From Bin",
                  options: bins,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "to_bin",
                  label: "To Bin",
                  options: bins,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={12} sm={6} xs={12}>
                {this.renderInput({
                  name: "remark",
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
export default ItemReclassificationalJournalForm;
