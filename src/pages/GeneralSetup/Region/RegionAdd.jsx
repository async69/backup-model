import React from "react";
import ParentForm from "../../common/form";
import Joi from "joi-browser";
import { Card, CardFooter, Form, Row, Col } from "reactstrap";

class RegionAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        code: "",
        name: "",
        countries: "",
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
      countries: Joi.string().required().label("Country"),
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
        id: data.id ? data.id : "",
        code: data.code ? data.code : "",
        name: data.name ? data.name : "",
        countries: data.country ? data.country : "",
        remarks: data.remark ? data.remark : "",
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

  render() {
    const { countries } = this.props.options;
    return (
      <Card className="border-0">
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col md={12} sm={6} xs={12}>
              {this.renderInput("code", "Code")}
            </Col>
            <Col md={12} sm={6} xs={12}>
              {this.renderInput("name", "Name")}
            </Col>
            <Col md={12} sm={6} xs={12}>
              {this.renderSelect({
                name: "countries",
                label: "Country",
                options: countries,
                optionsFrom: "server",
              })}
            </Col>

            <Col md={12} sm={12} xs={12}>
              {this.renderInput("remarks", "Remarks", "textarea")}
            </Col>
          </Row>
          <CardFooter align="center">
            {this.renderButton("Add Region")}
          </CardFooter>
        </Form>
      </Card>
    );
  }
}
export default RegionAdd;
