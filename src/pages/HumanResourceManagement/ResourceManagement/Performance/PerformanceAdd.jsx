import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";

class PerformanceAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        goal_type: "",
        evaluation_result: null,
        evaluation_date: null,
        remarks: "",
        employee: this.props.options.selectedEmployee.id,
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      goal_type: Joi.string(),
      evaluation_result: Joi.number(),
      evaluation_date: Joi.date(),
      remarks: Joi.string().allow("").optional(),
      employee: Joi.string(),
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        goal_type: data.goal_type,
        evaluation_result: data.evaluation_result,
        evaluation_date: data.evaluation_date,
        remarks: data.remarks,
        employee: data.employee.id,
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
  componentDidMount() {
    this.componentDidUpdate();
  }

  doSubmit() {
    this.props.submit(this.state.data);
  }

  render() {
    return (
      <Card className="border-0">
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={12} sm={6} xs={12}>
                {this.renderInput({
                  name: "goal_type",
                  label: "Goal Type",
                })}
              </Col>
              <Col md={12} sm={6} xs={12}>
                {this.renderInput({
                  name: "evaluation_result",
                  label: "Evaluation Result",
                  type: "number",
                })}
              </Col>
              <Col md={12} sm={6} xs={12}>
                {this.renderInput({
                  name: "evaluation_date",
                  label: "Evaluation Date",
                  type: "date",
                })}
              </Col>

              <Col md={12} sm={12} xs={12}>
                {this.renderInput({
                  name: "remarks",
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
export default PerformanceAdd;
