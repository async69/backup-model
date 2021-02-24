import React from "react";
import ParentForm from "../../common/form";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";

class AccountTypeAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        starting_number: "",
        name: "",
        number_of_digits: "",
      },
      errors: {},
      lockUpdate: false,
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      name: Joi.string().required().label("Name"),
      starting_number: Joi.number().required().label("Starting Number"),
      number_of_digits: Joi.number().required().label("Number of Digits"),
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
        name: data.name ? data.name : "",
        starting_number: data.starting_number ? data.starting_number : "",
        number_of_digits: data.number_of_digits ? data.number_of_digits : "",
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
    let label = "Add";
    if (this.props.isEdit) {
      label = "Edit";
    }
    return (
      <Card className="border-0">
        {/* <CardHeader className="border-0">Add an Account Type</CardHeader> */}
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={12} sm={6} xs={12}>
                {this.renderInput("name", "Name")}
              </Col>

              <Col md={12} sm={6} xs={12}>
                {this.renderInput(
                  "number_of_digits",
                  "Number of Digits",
                  "number"
                )}
              </Col>
              <Col md={12} sm={6} xs={12}>
                {this.renderInput(
                  "starting_number",
                  "Starting Number",
                  "number"
                )}
              </Col>
            </Row>
            <CardFooter align="center">
              {this.renderButton(`${label} Account Type`)}
            </CardFooter>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
export default AccountTypeAdd;
