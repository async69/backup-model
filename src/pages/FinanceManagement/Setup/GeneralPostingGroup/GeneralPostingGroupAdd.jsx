import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { CardBody, CardFooter, Form, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { getLoading } from "../../../../store/GeneralSetup/Posting/GeneralBusinessPostingGroup/";

class GeneralPostingGroupAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        name: "",
      },
      lockUpdate: false,
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),

      name: Joi.string().required().label("name"),
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
    return (
      <>
        {/* <CardHeader className="border-0">New General Posting Group </CardHeader> */}
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={12} sm={6} xs={12}>
                {this.renderInput("name", " Name")}
              </Col>
            </Row>
            <CardFooter align="center">
              {this.renderButton("Save General Posting Group ")}
            </CardFooter>
          </Form>
        </CardBody>
      </>
    );
  }
}

export default connect(getLoading)(GeneralPostingGroupAdd);
