import React from "react";
import ReusableForm from "../../../common/form";
import Joi from "joi-browser";
import { Col, Row, Form } from "reactstrap";
import { connect } from "react-redux";
import {
  postStoreRequisition,
  getStatus,
} from "store/Inventory/Common/StoreRequisitions";

class PostForm extends ReusableForm {
  initialState = {
    data: {
      status: "",
      posting_date: "",
    },
    errors: {},
  };

  state = this.initialState;
  schema = {
    status: Joi.string().valid("Accepted", "Pending", "Rejected"),
    posting_date: Joi.date(),
  };
  doSubmit = async () => {
    await this.props.postStoreRequisition(
      this.props.storeRequisition.id,
      this.state.data
    );
    if (this.props.status === "success") {
      this.toast.success("Store Requisition posted successfully!");
    }
  };
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col md={6} sm={12} xs={12}>
            {this.renderSelect("status", "Status", [
              "Accepted",
              "Pending",
              "Rejected",
            ])}
          </Col>
          <Col md={6} sm={12} xs={12}>
            {this.renderInput("posting_date", "Posting date", "date")}
          </Col>
        </Row>
        <Row>
          <Col align="center">{this.renderButton("Submit")}</Col>
        </Row>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  status: getStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  postStoreRequisition: (srId, body) =>
    dispatch(postStoreRequisition(srId, body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
