import React from "react";
import ParentForm from "../../common/form";
import Joi from "joi-browser";
import { Card, CardFooter, Form, Row, Col } from "reactstrap";

class CityAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        code: "",
        name: "",
        regions: "",
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
      regions: Joi.string().required().label("Region"),
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
        regions: data.region_detail.id ? data.region_detail.id : "",
        remarks: data.remark ? data.remark : "",
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

  render() {
    const { regions } = this.props.options;
    return (
      <Card className="border-0">
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col md={12} sm={6} xs={12}>
              {this.renderInput("code", " Code")}
            </Col>
            <Col md={12} sm={6} xs={12}>
              {this.renderInput("name", " Name")}
            </Col>
            <Col md={12} sm={6} xs={12}>
              {this.renderSelect({
                name: "regions",
                label: "Region",
                options: regions,
                optionsFrom: "server",
              })}
            </Col>
            <Col md={12} sm={12} xs={12}>
              {this.renderInput("remarks", "Remarks", "textarea")}
            </Col>
          </Row>
          <CardFooter align="center">{this.renderButton("Save")}</CardFooter>
        </Form>
      </Card>
    );
  }
}
export default CityAdd;
