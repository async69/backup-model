import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";

class ConsignmentAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        organization: "",
        worked_position: "",
        start_date: null,
        end_date: null,
        remarks: "",
        employee: this.props.options.selectedEmployee.id,
        country: null,
        city: null,
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      organization: Joi.string(),
      worked_position: Joi.string(),
      start_date: Joi.date(),
      end_date: Joi.date(),
      remarks: Joi.string().allow("").optional(),
      employee: Joi.string(),
      country: Joi.string(),
      city: Joi.string(),
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        organization: data.organization,
        worked_position: data.worked_position,
        start_date: data.start_date,
        end_date: data.end_date,
        remarks: data.remarks,
        employee: data.employee.id,
        country: data.country.id,
        city: data.city.id,
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
    const { cities, countries } = this.props.options;
    return (
      <Card className="border-0">
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "organization",
                  label: "Organization",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "worked_position",
                  label: "Position",
                })}
              </Col>
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
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "country",
                  label: "Country",
                  options: countries,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "city",
                  label: "City",
                  options: cities,
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
export default ConsignmentAdd;
