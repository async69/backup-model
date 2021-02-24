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

class QualificationAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        start_date: null,
        end_date: null,
        related_document: null,
        remarks: "",
        employee: this.props.options.selectedEmployee.id,
        qualification_type: null,
        education_type: null,
        institue: null,
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      start_date: Joi.date(),
      end_date: Joi.date(),
      related_document: Joi.any(),
      remarks: Joi.string().allow("").optional(),
      employee: Joi.string(),
      qualification_type: Joi.string(),
      education_type: Joi.string(),
      institue: Joi.string(),
    };
  }
  populateState(qualification) {
    const updatedState = {
      ...this.state,
      data: {
        id: qualification.id,
        start_date: qualification.start_date,
        end_date: qualification.end_date,
        related_document: qualification.related_document,
        remarks: qualification.remarks,
        employee: qualification.employee.id,
        qualification_type: qualification.qualification_type.id,
        education_type: qualification.education_type.id,
        institue: qualification.institue.id,
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
    const body = {
      ...this.state.data,
      is_blocked: this.state.data.is_blocked ? true : false,
    };
    this.props.submit(body);
  }

  render() {
    // const { isView } = this.props;
    const {
      qualificationTypes,
      educationTypes,
      institutions,
    } = this.props.options;
    return (
      <Card className="border-0">
        <CardHeader className="border-0">New Qualification</CardHeader>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("start_date", "Start Date", "Date")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("end_date", "End Date", "Date")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderFileUploader(
                  "related_document",
                  "Related document"
                )}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "qualification_type",
                  label: "Qualification Type",
                  options: qualificationTypes,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "education_type",
                  label: "Education Type",
                  options: educationTypes,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "institue",
                  label: "Institue",
                  options: institutions,
                  optionsFrom: "server",
                })}
              </Col>

              <Col md={12} sm={12} xs={12}>
                {this.renderInput("remarks", "Remarks", "textarea")}
              </Col>
            </Row>
            <CardFooter align="center">
              {this.renderButton("save Qualification")}
            </CardFooter>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
export default QualificationAdd;
