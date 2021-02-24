import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";

class EmployeeOvertimeAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        from_date: "",
        to_date: "",
        day_overtime_hour: "0",
        day_overtime_amount: "0",
        weekend_overtime_hour: "0",
        weekend_overtime_amount: "0",
        nighttime_overtime_hour: "0",
        nighttime_overtime_amount: "0",
        holiday_overtime_hour: "0",
        holiday_overtime_amount: "0",
        total_overtime_amount: "0",
        remarks: "",
        employee:
          props.options && props.options.employee
            ? props.options.employee.id
            : "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      from_date: Joi.date(),
      to_date: Joi.date(),
      day_overtime_hour: Joi.string().allow("").optional(),
      day_overtime_amount: Joi.string().allow("").optional(),
      weekend_overtime_hour: Joi.string().allow("").optional(),
      weekend_overtime_amount: Joi.string().allow("").optional(),
      nighttime_overtime_hour: Joi.string().allow("").optional(),
      nighttime_overtime_amount: Joi.string().allow("").optional(),
      holiday_overtime_hour: Joi.string().allow("").optional(),
      holiday_overtime_amount: Joi.string().allow("").optional(),
      total_overtime_amount: Joi.string().allow("").optional(),
      remarks: Joi.string().allow("").optional(),
      employee: Joi.string(),
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        from_date: data.from_date,
        to_date: data.to_date,
        day_overtime_hour: data.day_overtime_hour,
        day_overtime_amount: data.day_overtime_amount,
        weekend_overtime_hour: data.weekend_overtime_hour,
        weekend_overtime_amount: data.weekend_overtime_amount,
        nighttime_overtime_hour: data.nighttime_overtime_hour,
        nighttime_overtime_amount: data.nighttime_overtime_amount,
        holiday_overtime_hour: data.holiday_overtime_hour,
        holiday_overtime_amount: data.holiday_overtime_amount,
        total_overtime_amount: data.total_overtime_amount,
        remarks: data.remarks,
        employee: data.employee ? data.employee.id : "",
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
    const { isView } = this.props;
    return (
      <Card className="border-0">
        {/* <CardHeader className="border-0">Header</CardHeader> */}
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("from_date", "OverTime  start date", "date")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("to_date", "Overtime end date", "date")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("day_overtime_hour", "Day Overtime Hour")}
              </Col>
              {isView && (
                <Col md={4} sm={12} xs={12}>
                  {this.renderInput(
                    "day_overtime_amount",
                    "Day Overtime Amount"
                  )}
                </Col>
              )}
              <Col md={4} sm={6} xs={12}>
                {this.renderInput(
                  "weekend_overtime_hour",
                  "Weekend Overtime Hour"
                )}
              </Col>
              {isView && (
                <Col md={4} sm={12} xs={12}>
                  {this.renderInput(
                    "weekend_overtime_amount",
                    "Weekend Overtime Amount"
                  )}
                </Col>
              )}

              <Col md={4} sm={6} xs={12}>
                {this.renderInput(
                  "nighttime_overtime_hour",
                  "Nighttime Overtime Hour"
                )}
              </Col>
              {isView && (
                <Col md={4} sm={12} xs={12}>
                  {this.renderInput(
                    "nighttime_overtime_amount",
                    "Nighttime Overtime Amount "
                  )}
                </Col>
              )}
              <Col md={4} sm={6} xs={12}>
                {this.renderInput(
                  "holiday_overtime_hour",
                  "Holiday Overtime Hour"
                )}
              </Col>
              {isView && (
                <Col md={4} sm={12} xs={12}>
                  {this.renderInput(
                    "holiday_overtime_amount",
                    "Holiday Overtime Amount"
                  )}
                </Col>
              )}
              {isView && (
                <Col md={4} sm={12} xs={12}>
                  {this.renderInput(
                    "total_overtime_amount",
                    "Total Overtime Amount"
                  )}
                </Col>
              )}

              <Col md={12} sm={12} xs={12}>
                {this.renderInput("remarks", "Remarks", "textarea")}
              </Col>
            </Row>
            <CardFooter align="center">
              {this.renderButton("Save Overtime ")}
            </CardFooter>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
export default EmployeeOvertimeAdd;
