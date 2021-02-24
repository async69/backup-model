import React from 'react';
import { CardBody, Col, Form, Row } from "reactstrap";
import ReusabelForm from "../../../common/form";
import Joi from "joi-browser";
class SalesQuoteLineForm extends ReusabelForm {
    initialState = {
        data:{
            item_category_code: "",
            item_no: "",
            item_name:"",
            quantity: "",
            unit_measure: "",
            unit_price: "",
            net_amount: "",
            currency:"",
            remarks: "",
        },
        errors: {}
    }
    state = this.initialState
    schema = {
        id: Joi.any().allow("").optional(),
        item_category_code: Joi.string(),
        item_no: Joi.string(),
        item_name:Joi.string(),
        quantity: Joi.number(),
        unit_measure: Joi.string(),
        unit_price: Joi.number(),
        net_amount: Joi.string(),
        currency:Joi.string(),
        remarks: Joi.string(),
    }
    mapToViewModel(line) {
        return {
          id: line.id,
          item_category_code: line.item_category_code,
            item_no: line.item_no,
            item_name:line.item_name,
            quantity: line.quantity,
            unit_measure: line.unit_measure,
            unit_price: line.unit_price,
            net_amount: line.net_amount,
            currency:line.currency,
            remarks: line.remarks
        };
      }
      populateLine() {
        const { selectedLine } = this.props;
        if (!selectedLine) return;
        this.setState({ data: this.mapToViewModel(selectedLine) });
      }
      componentDidMount() {
        this.populateLine();
      }
      componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectedLine !== this.props.selectedLine) {
          this.populateLine();
        }
      }
      doSubmit = async () => {
        try {
          this.props.onSubmit(this.state.data);
          this.resetForm();
        } catch (error) {}
      };

    render() {
        return (
            <CardBody>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col md={2} sm={12} xs={12}>
              {this.renderSelect("item_category_code", "Item category", [
                "category 1",
                "category 2",
                "category 3",
              ])}
            </Col>
            <Col md={2} sm={12} xs={12}>
              {this.renderInput("item_no", "Item Number")}
            </Col>
            <Col md={2} sm={12} xs={12}>
              {this.renderInput("item_name", "Item Name")}
            </Col>
            <Col md={2} sm={12} xs={12}>
              {this.renderInput("quantity", "Quantity", "number")}
            </Col>
            <Col md={2} sm={12} xs={12}>
              {this.renderSelect(
                "unit_measure",
                "Unit Measure",
                ["Kg","M","CM"]
              )}
            </Col>
            <Col md={2} sm={12} xs={12}>
            {this.renderInput("unit_price", "Unit Price", "number")}
            </Col>
            <Col md={2} sm={12} xs={12}>
              {this.renderInput("net_amount", "Net Amount", "number")}
            </Col>
            <Col md={2} sm={12} xs={12}>
              {this.renderSelect("currency", "Currency",["USD", "ETB"])}
            </Col>
            <Col md={6} sm={12} xs={12}>
              {this.renderInput("remarks", "Remarks", "textarea")}
            </Col>
            <Col align="center" md={12} sm={12} xs={12}>
              {this.renderButton("Insert Line")}
            </Col>
          </Row>
        </Form>
      </CardBody>
        );
    }
}

export default SalesQuoteLineForm;