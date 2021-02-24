import React from "react";
import ParentForm from "../../../common/form";
import {
  Card,
  CardHeader,
  Row,
  Col,
  CardBody,
  Form,
  CardFooter,
  FormGroup,
} from "reactstrap";
import Joi from "joi-browser";

class ItemLedgerEntriesAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        posting_date: "",
        itemNumber: "",
        ItemName: "",
        transactionType: "",
        entryType: "",
        unitMeasure: "",
        quantity: "",
        unitPrice: "",
        locationCode: "",
        locationName: "",
        remarks: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      posting_date: Joi.string().required().label("posting_date"),
      ItemName: Joi.string().required().label("ItemName"),
      itemNumber: Joi.string().required().label("itemNumber"),
      transactionType: Joi.string().required().label("transactionType"),
      entryType: Joi.string().required().label("entryType"),
      unitMeasure: Joi.string().required().label("unitMeasure"),
      quantity: Joi.string().required().label("quantity"),
      unitPrice: Joi.string().required().label("unitPrice"),
      locationCode: Joi.string().required().label("locationCode"),
      locationName: Joi.string().required().label("locationName"),
      remarks: Joi.string().allow("").optional(),
    };
  }

  render() {
    return (
      <div>
        <Card className="border-0">
          <CardHeader className="border-0">Add Item Ledger Entries </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col md={4} sm={12} xs={12}>
                  <FormGroup>
                    {this.renderInput("posting_date", "Posting Date", "date")}
                  </FormGroup>
                </Col>
                <Col md={4} sm={12} xs={12}>
                  <FormGroup>
                    {this.renderInput("itemName", "Item Name")}
                  </FormGroup>
                </Col>
                <Col md={4} sm={12} xs={12}>
                  <FormGroup>
                    {this.renderSelect("itemNumber", "Item Name", [
                      "this",
                      "and this ",
                    ])}
                  </FormGroup>
                </Col>
                <Col md={4} sm={12} xs={12}>
                  <FormGroup>
                    {this.renderInput("transactionType", "Transaction Type")}
                  </FormGroup>
                </Col>
                <Col md={4} sm={12} xs={12}>
                  <FormGroup>
                    {this.renderInput("entryType", "Entry Type")}
                  </FormGroup>
                </Col>
                <Col md={4} sm={12} xs={12}>
                  <FormGroup>
                    {this.renderSelect("unitMeasure", "Unit Of Measurment", [
                      "this",
                      "and this ",
                    ])}
                  </FormGroup>
                </Col>
                <Col md={4} sm={12} xs={12}>
                  <FormGroup>
                    {this.renderInput("quantity", "Amount", "number")}
                  </FormGroup>
                </Col>
                <Col md={4} sm={12} xs={12}>
                  <FormGroup>
                    {this.renderInput("unitPrice", "Unit Price", "number")}
                  </FormGroup>
                </Col>
                <Col md={4} sm={12} xs={12}>
                  <FormGroup>
                    {this.renderSelect("locationCode", "Location Code", [
                      "this",
                      "and this ",
                    ])}
                  </FormGroup>
                </Col>
                <Col md={4} sm={12} xs={12}>
                  <FormGroup>
                    {this.renderSelect("locationName", "Location Name", [
                      "this",
                      "and this ",
                    ])}
                  </FormGroup>
                </Col>

                <Col md={8} sm={12} xs={12}>
                  {this.renderInput("remarks", "Remarks", "textarea")}
                </Col>
              </Row>
              <CardFooter align="center">
                {this.renderButton("Add Item Ledger Entries")}
              </CardFooter>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default ItemLedgerEntriesAdd;
