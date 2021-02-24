import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";
import { Card, CardBody, CardFooter, Form, Row, Col } from "reactstrap";

class TrainingAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        from_date: null,
        to_date: null,
        remarks: "",
        employee: this.props.options.selectedEmployee.id,
        disciplinary_action_type: null,
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      from_date: Joi.date(),
      to_date: Joi.date(),
      remarks: Joi.string().allow("").optional(),
      employee: Joi.string(),
      disciplinary_action_type: Joi.string(),
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        from_date: data.from_date,
        to_date: data.to_date,
        remarks: data.remarks,
        employee: data.employee.id,
        disciplinary_action_type: data.disciplinary_action_type.id,
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
    const { disciplinaryActionTypes } = this.props.options;
    return (
      <Card className="border-0">
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "disciplinary_action_type",
                  label: "Disciplinary Action Tpe",
                  options: disciplinaryActionTypes,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "from_date",
                  label: "From Date",
                  type: "date",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "to_date",
                  label: "To Date",
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
export default TrainingAdd;
