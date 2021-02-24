import React from "react";
import ParentForm from "../../../../common/form";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";
import { getLoading } from "store/Inventory/Bin";
import { connect } from "react-redux";
class BinAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        code: "",
        name: "",
        warehouse: "",
        remarks: "",
      },
      errors: {},
      lockUpdate: false,
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      code: Joi.string().required().label("Code"),
      name: Joi.string().required().label("Name"),
      warehouse: Joi.string().required().label("Warehouse"),
      remarks: Joi.string().allow("").optional(),
    };
    this.populateState = this.populateState.bind(this);
  }

  doSubmit() {
    this.props.submit(this.state.data);
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        code: data.code ? data.code : "",
        name: data.name ? data.name : "",
        warehouse: data.warehouse_detail ? data.warehouse_detail.id : "",
        remarks: data.remarks ? data.remarks : "",
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
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("code", "Code")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("name", "Name")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "warehouse",
                  label: "Warehouse",
                  options: this.props.options.Warehouses,
                  optionsFrom: "server",
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
export default connect(getLoading)(BinAdd);
