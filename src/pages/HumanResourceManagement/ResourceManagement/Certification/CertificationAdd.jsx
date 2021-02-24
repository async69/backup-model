import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";

class CertificationTypeAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        start_date: null,
        end_date: null,
        related_document: null,
        remarks: "",
        employee: this.props.options.selectedEmployee.id,
        certification_type: null,
        education_type: null,
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      start_date: Joi.date(),
      end_date: Joi.date(),
      related_document: Joi.any(),
      remarks: Joi.string().allow("").optional(),
      employee: Joi.string(),
      certification_type: Joi.string(),
      education_type: Joi.string(),
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        start_date: data.start_date,
        end_date: data.end_date,
        related_document: data.related_document,
        remarks: data.remarks,
        employee: data.employee.id,
        certification_type: data.certification_type
          ? data.certification_type.id
          : "",
        education_type: data.education_type ? data.education_type.id : "",
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
    const { certificationTypes, educationTypes } = this.props.options;
    return (
      <Card className="border-0">
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "start_date",
                  label: "Start Date",
                  type: "date",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "end_date",
                  label: "End Date",
                  type: "date",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "certification_type",
                  label: "Certification Type",
                  options: certificationTypes,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "education_type",
                  label: "Education Type",
                  options: educationTypes,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderFileUploader(
                  "related_document",
                  "Related Document"
                )}
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
export default CertificationTypeAdd;
