import React from "react";
import ReusableForm from "../form";
import Joi from "joi-browser";
import { Col, Form, CardBody, CardFooter, Card } from "reactstrap";

class PostForm extends ReusableForm {
  initialState = {
    data: {
      posting_date: "",
    },
    errors: {},
  };
  state = this.initialState;
  schema = {
    posting_date: Joi.date(),
  };
  doSubmit = async () => {
    this.props.submit({
      id: this.props.data.id,
      posting_date: this.state.data.posting_date,
    });
  };
  render() {
    return (
      <Card className="border-0">
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Col md={12} sm={6} xs={12}>
              {this.renderInput("posting_date", "Choose Date", "date")}
            </Col>
            <CardFooter>
              {this.renderButton(
                this.props.submitButtonLabel
                  ? this.props.submitButtonLabel
                  : "Submit"
              )}
            </CardFooter>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default PostForm;
