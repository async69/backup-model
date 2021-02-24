import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";

class TerminationAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        termination_request_date: null,
        last_working_date: null,
        remarks: "",
        employee: this.props.options.selectedEmployee.id,
        termination_type: null,
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      termination_request_date: Joi.date(),
      last_working_date: Joi.date(),
      remarks: Joi.string().allow("").optional(),
      employee: Joi.string(),
      termination_type: Joi.string(),
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        termination_request_date: data.termination_request_date,
        last_working_date: data.last_working_date,
        remarks: data.remarks,
        employee: data.employee.id,
        termination_type: data.termination_type.id,
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
    const { terminationTypes } = this.props.options;
    return (
      <Card className="border-0">
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "termination_type",
                  label: "Termination Type",
                  options: terminationTypes,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "termination_request_date",
                  label: "Termination Request Date",
                  type: "date",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "last_working_date",
                  label: "Last Working Date",
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
export default TerminationAdd;
