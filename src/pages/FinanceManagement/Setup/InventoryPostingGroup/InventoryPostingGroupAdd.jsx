import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { CardBody, CardFooter, Form, Row, Col } from "reactstrap";

class InventoryPostingGroupAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        name: "",
        code: "",

      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      name: Joi.string().required().label("Name"),
      code: Joi.string().required().label("Code"),

    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        code: data.code ? data.code : "",
        name: data.name ? data.name : "",

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
    return (
      <>
        {/* <CardHeader className="border-0">New Inventory Posting Group</CardHeader> */}
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
            <Col md={12} sm={6} xs={12}>
                {this.renderInput("code", "Code")}
              </Col>
              <Col md={12} sm={6} xs={12}>
                {this.renderInput("name", "Name")}
              </Col>
            </Row>
            <CardFooter align="center">{this.renderButton("Save")}</CardFooter>
          </Form>
        </CardBody>
      </>
    );
  }
}
export default InventoryPostingGroupAdd;
