import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";

class PerformanceAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        from_date: null,
        to_date: null,
        absence_reason: "",
        remarks: "",
        employee: this.props.options.selectedEmployee.id,
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      from_date: Joi.date(),
      to_date: Joi.date(),
      absence_reason: Joi.string(),
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
        absence_reason: data.absence_reason,
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
                  name: "absence_reason",
                  label: "Absence Reason",
                  type: "textarea",
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
