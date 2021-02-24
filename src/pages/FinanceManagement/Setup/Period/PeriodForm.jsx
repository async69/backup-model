import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";
import stateTypes from "../../../../static/data/stateTypes";

class PeriodForm extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        name: "",
        fiscalYear: "",
        start_date: "",
        end_date: "",
        state: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      name: Joi.string().required().label("Name"),
      fiscalYear: Joi.string().required().label("Fiscal Year"),
      start_date: Joi.string().required().label("Start Date"),
      end_date: Joi.string().required().label("End Date"),
      state: Joi.string().required().label("State"),
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        name: data.name ? data.name : "",
        fiscalYear: data.fiscal_year ? data.fiscal_year : "",
        start_date: data.start_date ? data.start_date : "",
        end_date: data.end_date ? data.end_date : "",
        state: data.state ? data.state : "",
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
    const { fiscalYears } = this.props.options;
    return (
      <Card className="border-0">
        {/* <CardHeader className="border-0">{this.props.title}</CardHeader> */}
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "fiscalYear",
                  label: "Fiscal Year",
                  options: fiscalYears.map((item) => ({
                    ...item,
                    name: item.year,
                  })),
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "name",
                  label: "Name",
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
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "state",
                  label: "State",
                  options: stateTypes,
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
export default PeriodForm;
