import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";

class LeaveBalanceAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        annual_leave: null,
        duration: null,
        leave_request_date: null,
        from_date: null,
        to_date: null,
        leave_utilized: null,
        leave_balance: null,
        remarks: "",
        employee: this.props.options.selectedEmployee.id,
        leave_type: null,
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      annual_leave: Joi.number(),
      duration: Joi.number(),
      leave_request_date: Joi.date(),
      from_date: Joi.date(),
      to_date: Joi.date(),
      leave_utilized: Joi.number(),
      leave_balance: Joi.number(),
      remarks: Joi.string().allow("").optional(),
      employee: Joi.string(),
      leave_type: Joi.string(),
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        annual_leave: data.annual_leave,
        duration: data.duration,
        leave_request_date: data.leave_request_date,
        from_date: data.from_date,
        to_date: data.to_date,
        leave_utilized: data.leave_utilized,
        leave_balance: data.leave_balance,
        remarks: data.remarks,
        employee: data.employee.id,
        leave_type: data.leave_type.id,
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
    const { leaveTypes } = this.props.options;
    return (
      <Card className="border-0">
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "annual_leave",
                  label: "Annual Leave",
                  type: "number",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "duration",
                  label: "Duration",
                  type: "number",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "leave_request_date",
                  label: "Leave Request Date",
                  type: "date",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "from_date",
                  label: "From Date",
                  type: "date",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "to_date",
                  label: "To Date",
                  type: "date",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "leave_utilized",
                  label: "Leave Utilized",
                  type: "number",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "leave_balance",
                  label: "Leave Balance",
                  type: "number",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "leave_type",
                  label: "Leave Type",
                  options: leaveTypes,
                  optionsFrom: "server",
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
export default LeaveBalanceAdd;
