import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Form,
  Row,
  Col,
} from "reactstrap";

class DepartmentAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        employee_pension_rate: "",
        employer_pension_rate: "",
        holiday_overtime_rate: "",
        night_overtime_rate: "",
        weekend_overtime_rate: "",
        overtime_rate: "",
        remarks: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      employee_pension_rate: Joi.string()
        .required()
        .label("Employee Pension Rate"),
      employer_pension_rate: Joi.string()
        .required()
        .label("Employer Pension Rate"),
      holiday_overtime_rate: Joi.string()
        .required()
        .label("Holiday Overtime Rate"),
      night_overtime_rate: Joi.string().required().label("Night Overtime Rate"),
      weekend_overtime_rate: Joi.string()
        .required()
        .label("Weekend Overtime Rate"),
      overtime_rate: Joi.string().required().label("Overtime Rate"),
      remarks: Joi.string().allow("").optional(),
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        employee_pension_rate: data.employee_pension_rate
          ? data.employee_pension_rate
          : "",
        employer_pension_rate: data.employer_pension_rate
          ? data.employer_pension_rate
          : "",
        holiday_overtime_rate: data.holiday_overtime_rate
          ? data.holiday_overtime_rate
          : "",
        night_overtime_rate: data.night_overtime_rate
          ? data.night_overtime_rate
          : "",
        weekend_overtime_rate: data.weekend_overtime_rate
          ? data.weekend_overtime_rate
          : "",
        overtime_rate: data.overtime_rate ? data.overtime_rate : "",
        remarks: data.remarks ? data.remarks : "",
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
        <CardHeader className="border-0">{this.props.title}</CardHeader>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "employee_pension_rate",
                  label: "Employee Pension Rate",
                  type: "number",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "employer_pension_rate",
                  label: "Employer Pension Rate",
                  type: "number",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "holiday_overtime_rate",
                  label: "Holiday Overtime Rate",
                  type: "number",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "night_overtime_rate",
                  label: "Night Overtime Rate",
                  type: "number",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "weekend_overtime_rate",
                  label: "Weekend Overtime Rate",
                  type: "number",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "overtime_rate",
                  label: "Overtime Rate",
                  type: "number",
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
export default DepartmentAdd;
