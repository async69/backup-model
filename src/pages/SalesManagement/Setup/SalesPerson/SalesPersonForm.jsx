import React from "react";
import ReusabelForm from "pages/common/form";
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
import { addSalesPerson, getStatus } from "store/Sales/salesPersons";
import { connect } from "react-redux";

class SalesPersonForm extends ReusabelForm {
  initialState = {
    data: {
      code: "",
      name: "",
      remarks: "",
      last_modified_date: "",
    },
    errors: {},
  };
  state = this.initialState;

  schema = {
    code: Joi.string(),
    name: Joi.string(),
    remarks: Joi.string().allow("").optional(),
    last_modified_date: Joi.string(),
  };

  doSubmit = async () => {
    await this.props.addSalesPerson(this.state.data);
    if (this.props.status === "success") {
      this.toast.success("Sales Person added successfully");
      this.resetForm();
    }
  };

  render() {
    return (
      <Card className="border-0">
        <CardHeader className="border-0">Sales Person Header</CardHeader>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={12} sm={6} xs={12}>
                {this.renderInput("code", "Sales Person Code")}
              </Col>
              <Col md={12} sm={6} xs={12}>
                {this.renderInput("name", "Sales Person Name")}
              </Col>
              <Col md={12} sm={6} xs={12}>
                {this.renderInput(
                  "last_modified_date",
                  "Last Modified Date",
                  "date"
                )}
              </Col>
              <Col md={12} sm={12} xs={12}>
                {this.renderInput("remarks", "Remarks", "textarea")}
              </Col>
            </Row>
            <CardFooter align="center">
              {this.renderButton("Add Sales Person")}
            </CardFooter>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  status: getStatus(state),
});
const mapDispatchToProps = (dispatch) => ({
  addSalesPerson: () => dispatch(addSalesPerson()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SalesPersonForm);
