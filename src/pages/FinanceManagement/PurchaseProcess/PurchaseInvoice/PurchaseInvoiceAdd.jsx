import React, { useState, useEffect } from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";

import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Table,
  Input,
  Form,
  Row,
  Col,
} from "reactstrap";

const Line = () => {
  const [numberOfRows, setRows] = useState(1);
  const [finishedRows, setFinished] = useState(0);
  const initialRow = {
    itemCategory: "",
    itemNumber: "",
    city: "",
    itemName: "",
    isHeadOffice: "",
    remarks: "",
    officeTelephoneNumber: "",
    finished: false,
  };
  const [data, setData] = useState([initialRow]);

  const handleChange = (event) => {
    const { name, value, title } = event.target;
    const index = Number(title);

    if (typeof data[Number(title)] === "undefined") {
      return null;
    }
    data[index] = {
      ...data[index],
      [name]: value,
    };
    setData(JSON.parse(JSON.stringify(data)));
    if (finishedRows + 1 === numberOfRows) {
      setRows(numberOfRows + 1);
      setData(data.concat(initialRow));
    }
  };

  useEffect(() => {
    data.forEach((state, idx) => {
      var emptyRow = false;
      for (var prop in state) {
        if (typeof state[prop] !== "boolean") {
          if (String(state[prop]) === "") {
            var updatedData = data;
            updatedData[idx] = {
              ...data[idx],
              finished: false,
            };
            setData(updatedData);
            emptyRow = true;
          }
        }
      }
      if (!emptyRow) {
        var _updatedData = data;
        _updatedData[idx] = {
          ...data[idx],
          finished: true,
        };
        setData(_updatedData);
      }
    });
    const finishedRows = data.filter((item) => item.finished);
    setFinished(finishedRows.length);
  }, [data]);

  return Array(numberOfRows)
    .fill("")
    .map((_, idx) => (
      <tr key={idx}>
        <td>{idx + 1}</td>
        <td>
          <Input
            className="border-0"
            size="sm"
            type="select"
            name="itemCategory"
            id="itemCategory"
            onChange={handleChange}
            title={idx}
          >
            <option>Country 1</option>
            <option>Country 3</option>
            <option>Country 4</option>
            <option>Country 5</option>
            <option>Country 2</option>
          </Input>
        </td>

        <td>
          <Input
            className="border-0"
            size="sm"
            type="select"
            name="itemNumber"
            id="itemNumber"
            onChange={handleChange}
            title={idx}
          >
            <option>Region 1</option>
            <option>Region 2</option>
            <option>Region 3</option>
            <option>Region 4</option>
            <option>Region 5</option>
          </Input>
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="text"
            name="itemName"
            id="itemName"
            placeholder="Item Name"
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="number"
            name="quantity"
            id="quantity"
            placeholder="Quantity"
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="number"
            name="remainingQuantity"
            id="remainingQuantity"
            placeholder="Remaining Quantity"
            onChange={handleChange}
            title={idx}
          />
        </td>

        <td>
          <Input
            size="sm"
            className="border-0"
            type="number"
            name="quantityInvoiced"
            id="quantityInvoiced"
            placeholder="Quantity Invoiced"
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="select"
            name="uom"
            id="uom"
            onChange={handleChange}
            title={idx}
          >
            <option>Option ... </option>
          </Input>
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="number"
            name="unitPrice"
            id="unitPrice"
            placeholder="Unit Price"
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="number"
            name="amountEXCLVAT"
            id="amountEXCLVAT"
            placeholder="Amount EXCL VAT"
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="number"
            name="vat"
            id="vat"
            placeholder="VAT"
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="number"
            name="totalAmount"
            id="totalAmount"
            placeholder="Total Amount"
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="select"
            name="currency"
            id="currency"
            onChange={handleChange}
            title={idx}
          >
            <option>Option 1</option>
            <option>Option 2</option>
          </Input>
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="textarea"
            name="remarks"
            id="remarks"
            placeholder="Remarks"
            onChange={handleChange}
            title={idx}
          />
        </td>
      </tr>
    ));
};

class PurchaseInvoiceAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        documentNumber: "",
        grnNumber: "",
        purchaseOrderNumber: "",
        vendorName: "",
        remainingQuanitiy: "",
        postingDate: "",
        vendorNumber: "",
        approvedBy: "",
        approvedDate: "",
        purchaseType: "",
        totalAmount: "",
        currency: "",
        remarks: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      documentNumber: Joi.string().required().label("documentNumber"),
      grnNumber: Joi.string().required().label("grnNumber"),
      purchaseOrderNumber: Joi.string().required().label("purchaseOrderNumber"),
      vendorName: Joi.string().required().label("vendorName"),
      vendorInvoiceNumber: Joi.string().required().label("vendorInvoiceNumber"),
      postingDate: Joi.string().required().label("postingDate"),
      vendorNumber: Joi.string().required().label("vendorNumber"),
      approvedBy: Joi.string().required().label("approvedBy"),
      approvedDate: Joi.string().required().label("approvedDate"),
      purchaseType: Joi.string().required().label("purchaseType"),
      totalAmount: Joi.string().required().label("totalAmount"),
      currency: Joi.string().required().label("currency"),
      remarks: Joi.string().allow("").optional(),
    };
  }

  render() {
    return (
      <Card className="border-0">
        <CardHeader className="border-0">New Purchase Invoice</CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("documentNumber", "Document Number")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("purchaseOrderNumber", "Purchase Order No.")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("grnNumber", "GRN No.")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect("vendorNumber", "Vendor No.", [
                  "Vendor No. 1",
                  "Vendor No. 2",
                ])}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("vendorName", "Vendor Name")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput(
                  "vendorInvoiceNumber",
                  "Vendor Invoice Number"
                )}
              </Col>
              <Col md={5} sm={6} xs={12}>
                {this.renderSelect("purchaseType", "Purchase Type", [
                  "option 1",
                  "option 2",
                ])}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("postingDate", "Posting Date", "number")}
              </Col>

              <Col md={3} sm={6} xs={12}>
                {this.renderSelect("approvedBy", "Approved By", [
                  "option 1",
                  "option 2",
                ])}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("approvedDate", "Approved Date", "date")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect("status", "Status", [
                  "option 1",
                  "option 2",
                ])}
              </Col>

              <Col md={4} sm={6} xs={12}>
                {this.renderInput("totalAmount", "Total Amount", "number")}
              </Col>

              <Col md={12} sm={12} xs={12}>
                {this.renderInput("remarks", "Remarks", "textarea")}
              </Col>
            </Row>
          </Form>
        </CardBody>

        <hr />
        <CardBody>
          <Card className="mb-2">
            <CardHeader className="border-0">Line</CardHeader>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item Category</th>
                  <th>Item No.</th>
                  <th>Item Name</th>
                  <th>Quantity </th>
                  <th>Remaining Quantity</th>
                  <th>Quantity Invoiced</th>
                  <th>Unit of Measurement</th>
                  <th>Unit Price</th>
                  <th>Amount Excl. VAT</th>
                  <th>VAT</th>
                  <th>Total Amount</th>
                  <th>Currency</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#</td>
                  <td>Item Category</td>
                  <td>Item No.</td>
                  <td>Item Name</td>
                  <td>Quantity </td>
                  <td>Remaining Quantity</td>
                  <td>Quantity Invoiced</td>
                  <td>Unit of Measurement</td>
                  <td>Unit Price</td>
                  <td>Amount Excl. VAT</td>
                  <td>VAT</td>
                  <td>Total Amount</td>
                  <td>Currency</td>
                  <td>Remarks</td>
                </tr>
                <Line />
              </tbody>
            </Table>
          </Card>

          <CardFooter align="center">{this.renderButton("Save")}</CardFooter>
        </CardBody>
      </Card>
    );
  }
}
export default PurchaseInvoiceAdd;
