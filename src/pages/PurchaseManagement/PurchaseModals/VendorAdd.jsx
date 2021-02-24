import React, { useState, useEffect } from "react";
import ParentForm from "../../common/form";
import Joi from "joi-browser";
import {
  Card,
  CardHeader,
  Row,
  Col,
  CardBody,
  Form,
  CardFooter,
  Input,
  Table,
} from "reactstrap";

const AddAddress = () => {
  const [numberOfRows, setRows] = useState(1);
  const [finishedRows, setFinished] = useState(0);
  const initialRow = {
    country: "",
    region: "",
    city: "",
    postalCode: "",
    isHeadOffice: "",
    officeTelephoneNumber: "",
    remarks: "",
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
        <td>
          <Input
            className="border-0"
            type="select"
            name="country"
            id="country"
            onChange={handleChange}
            title={idx}
          >
            <option>country 1</option>
            <option>country 3</option>
            <option>country 4</option>
            <option>country 5</option>
            <option>country 2</option>
          </Input>
        </td>

        <td>
          <Input
            className="border-0"
            size="sm"
            type="select"
            name="region"
            id="region"
            onChange={handleChange}
            title={idx}
          >
            <option>region 1</option>
            <option>region 2</option>
            <option>region 3</option>
            <option>region 4</option>
            <option>region 5</option>
          </Input>
        </td>
        <td>
          <Input
            className="border-0"
            size="sm"
            type="select"
            name="city"
            id="city"
            onChange={handleChange}
            title={idx}
          >
            <option>city 1</option>
            <option>city 2</option>
            <option>city 3</option>
            <option>city 4</option>
            <option>city 5</option>
          </Input>
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="text"
            name="postalCode"
            id="postalCode"
            placeholder="Postal Code"
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            disabled
            size="sm"
            className="border-0"
            type="text"
            name="isHeadOffice"
            id="isHeadOffice"
            placeholder="isHeadOffice"
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="number"
            name="officeTelephoneNumber"
            id="officeTelephoneNumber"
            placeholder="Office Telephone Number"
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="text"
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

const AddContactInformation = () => {
  const [numberOfRows, setRows] = useState(1);
  const [finishedRows, setFinished] = useState(0);
  const initialRow = {
    name: "",
    officeTelephoneNumber: "",
    mobileNumber: "",
    email: "",
    remarks: "",
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
        <td>
          <Input
            className="border-0"
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            className="border-0"
            type="number"
            name="officeTelephoneNumber"
            id="officeTelephoneNumber"
            placeholder="Office Telephone Number"
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            className="border-0"
            type="number"
            name="mobileNumber"
            id="mobileNumber"
            onChange={handleChange}
            placeholder="Mobile Number"
            title={idx}
          />
        </td>
        <td>
          <Input
            className="border-0"
            type="text"
            name="email"
            id="email"
            onChange={handleChange}
            title={idx}
            placeholder="Email"
          />
        </td>
        <td>
          <Input
            className="border-0"
            type="textarea"
            name="remarks"
            id="remarks"
            onChange={handleChange}
            title={idx}
            placeholder="Remarks"
          />
        </td>
      </tr>
    ));
};

class VendorAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        name: "",
        code: "",
        warehouse: "",
        remarks: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      name: Joi.string().required().label("vendorNumber"),
      code: Joi.string().required().label("vendorType"),
      vendorName: Joi.string().required().label("vendorName"),
      vendorPostingGroup: Joi.string().required().label("vendorPostingGroup"),
      currency: Joi.string().required().label("currency"),
      remarks: Joi.string().allow("").optional(),
    };
  }

  render() {
    return (
      <Card className="border-0">
        <CardHeader className="border-0">Add Vendor </CardHeader>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("vendorNumber", "Vendor Number")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect("vendorType", "Vendor Type", [
                  "Option One",
                  "Option Two",
                  "Option Three",
                ])}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("vendorName", "Vendor Name")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect(
                  "vendorPostingGroup",
                  "Vendor Posting Group",
                  ["Option One", "Option Two", "Option Three"]
                )}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("tinNumber", "Tin Number")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect("currency", "Currency", [
                  "Option One",
                  "Option Two",
                  "Option Three",
                ])}
              </Col>
              <Col md={12} sm={12} xs={12}>
                {this.renderInput("remarks", "Remarks", "textarea")}
              </Col>
            </Row>
          </Form>
        </CardBody>

        <CardHeader className="border-0">Add Address</CardHeader>
        <CardBody>
          <Table hover responsive>
            <thead>
              <tr>
                <th>Country </th>
                <th>Region</th>
                <th>City </th>
                <th>Postal Code</th>
                <th>Is Head Office </th>
                <th>Office Telephone Number </th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Country </td>
                <td>Region</td>
                <td>City </td>
                <td>Postal Code</td>
                <td>Is Head Office </td>
                <td>Office Telephone Number </td>
                <td>Remarks</td>
              </tr>
              <AddAddress />
            </tbody>
          </Table>
        </CardBody>
        <CardHeader className="border-0">Add Contact Information</CardHeader>
        <CardBody>
          <Table hover responsive>
            <thead>
              <tr>
                <th>Name </th>
                <th>Office Telephone Number </th>
                <th>Mobile Number</th>
                <th>Email</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Name </td>
                <td>Office Telephone Number </td>
                <td>Mobile Number</td>
                <td>Email</td>
                <td>Remarks</td>
              </tr>
              <AddContactInformation />
            </tbody>
          </Table>

          <CardFooter align="center">
            {this.renderButton("Add Vendor")}
          </CardFooter>
        </CardBody>
      </Card>
    );
  }
}
export default VendorAdd;
