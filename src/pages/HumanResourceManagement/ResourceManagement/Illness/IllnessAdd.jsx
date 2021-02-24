import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";

class TrainingAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        employee_number: "",
        employee_name: "",
        illness_type: "",
        body_part: "",
        incident_date: "",
        case_description: "",
        case_outcome: "",
        remarks: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      employee_number: Joi.string()
        .optional()
        .allow("")
        .label("Employee Number"),
      employee_name: Joi.string().optional().allow("").label("Employee Name"),
      illness_type: Joi.string().required().label("Illness Type"),
      body_part: Joi.string().required().label("Body Part"),
      incident_date: Joi.string().required().label("Incident Date"),
      case_description: Joi.string().required().label("Case Description"),
      case_outcome: Joi.string().required().label("Case Outcome"),
      remarks: Joi.string().allow("").optional(),
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        employee_number: data.employee_number ? data.employee_number : "",
        employee_name: data.employee_name ? data.employee_name : "",
        illness_type: data.illness_type ? data.illness_type : "",
        body_part: data.body_part ? data.body_part : "",
        incident_date: data.incident_date ? data.incident_date : "",
        case_description: data.case_description ? data.case_description : "",
        case_outcome: data.case_outcome ? data.case_outcome : "",
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

  doSubmit() {
    this.props.submit(this.state.data);
  }

  render() {
    return (
      <Card className="border-0">
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "illness_type",
                  label: "Illness Type",
                  options: ["Illness 1", "Illness 2"],
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "body_part",
                  label: "Body Part",
                  options: ["Body Part 1", "Body Part 2"],
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "incident_date",
                  label: "Incident Date",
                  type: "date",
                })}
              </Col>
              <Col md={12} sm={6} xs={12}>
                {this.renderInput({
                  name: "case_description",
                  label: "Case Description",
                  type: "textarea",
                })}
              </Col>
              <Col md={12} sm={6} xs={12}>
                {this.renderInput({
                  name: "case_outcome",
                  label: "Case Outcome",
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
export default TrainingAdd;
