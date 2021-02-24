import React from "react";
import ParentForm from "../../common/form";
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
import featureNames from "../../../static/data/featureNames.json";

class NoSeriesAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        featureName: "",
        prefix: "",
        suffix: "",
        numberOfDigits: "",
        startingNumber: "",
        endingNumber: "",
        remarks: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      featureName: Joi.string().required().label("featureName"),
      prefix: Joi.string().required().label("prefix"),
      suffix: Joi.string().required().label("suffix"),
      numberOfDigits: Joi.number().required().label("numberOfDigits"),
      startingNumber: Joi.number().required().label("startingNumber"),
      endingNumber: Joi.number().required().label("endingNumber"),
      remarks: Joi.string().allow("").optional(),
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        featureName: data.feature_name ? data.feature_name : "",
        prefix: data.prefix ? data.prefix : "",
        suffix: data.sufix ? data.sufix : "",
        startingNumber: data.starting_number ? data.starting_number : "",
        numberOfDigits: data.number_of_digits ? data.number_of_digits : "",
        endingNumber: data.last_doc_number ? Number(data.last_doc_number) : "",
        remarks: data.remark ? data.remark : "",
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
        <CardHeader className="border-0">No. Series</CardHeader>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "featureName",
                  label: "Feature Name",
                  options: featureNames,
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "prefix",
                  label: "Prefix",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "suffix",
                  label: "Suffix",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "numberOfDigits",
                  label: "Number Of Digits",
                  type: "number",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "startingNumber",
                  label: "Starting Number",
                  type: "number",
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "endingNumber",
                  label: "Ending Number",
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
export default NoSeriesAdd;
