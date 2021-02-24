import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  Label,
  Input,
  FormGroup,
  Form,
  Row,
  Col,
} from "reactstrap";

const InputRow = () => {
  const [numberOfRows, setRows] = useState(1);
  const [finishedRows, setFinished] = useState(0);
  const initialRow = {
    itemCategory: "",
    itemNo: "",
    itemName: "",
    fromlocationCode: "",
    frombinCode: "",
    orderedQty: "",
    receivedQty: "",
    toIssueQty: "",
    issuedQty: "",
    postedDate: "",
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
            size="sm"
            type="select"
            name="itemCategory"
            id="itemCategory"
            onChange={handleChange}
            title={idx}
          >
            <option>Category 1</option>
            <option>Category 3</option>
            <option>Category 4</option>
            <option>Category 5</option>
            <option>Category 2</option>
          </Input>
        </td>

        <td>
          <Input
            className="border-0"
            size="sm"
            type="select"
            name="itemNo"
            id="itemNo"
            onChange={handleChange}
            title={idx}
          >
            <option>Item No 1</option>
            <option>Item No 2</option>
            <option>Item No 3</option>
            <option>Item No 4</option>
            <option>Item No 5</option>
          </Input>
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="text"
            name="itemName"
            id="itemName"
            placeholder="Item Name "
            onChange={handleChange}
            title={idx}
          />
        </td>

        <td>
          <Input
            size="sm"
            className="border-0"
            type="text"
            name="fromlocationCode"
            id="fromlocationCode"
            placeholder="From Location Code"
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="text"
            name="frombinCode"
            id="frombinCode"
            placeholder="From Bin "
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="text"
            name="orderedQty"
            id="orderedQty"
            placeholder=" Qty Ordered"
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="text"
            name="receivedQty"
            id="receivedQty"
            placeholder=" Qty Received"
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="text"
            name="toIssueQty"
            id="toIssueQty"
            placeholder="Qty To Issue "
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="text"
            name="issuedQty"
            id="issuedQty"
            placeholder="Qty Issued "
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="select"
            name="issuedQty"
            id="U.O.M"
            placeholder=" "
            onChange={handleChange}
            title={idx}
          >
            <option>Option One</option>
            <option>Option Two</option>
          </Input>
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="number"
            name="postedDate"
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
            type="text"
            name="postedDate"
            id="postedDate"
            placeholder="Amount (Excl VAT)"
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="text"
            name="postedDate"
            id="postedDate"
            placeholder="Posted"
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

const SalesReturnAdd = () => {
  return (
    <Card className="border-0">
      <CardHeader className="border-0">New Sales Return </CardHeader>
      <CardBody>
        <Form>
          <Row>
            <Col md={6} sm={12} xs={12}>
              <FormGroup>
                <Label for="documentNumber">Document Number </Label>
                <Input
                  size="sm"
                  type="text"
                  name="documentNumber"
                  id="documentNumber"
                  placeholder=" Document Number "
                />
              </FormGroup>
            </Col>
            <Col md={6} sm={12} xs={12}>
              <FormGroup>
                <Label for="salesOrderN0">Sales Order Number </Label>
                <Input
                  size="sm"
                  type="text"
                  name="salesOrderN0"
                  id="salesOrderN0"
                  placeholder=" Sales Order Number"
                />
              </FormGroup>
            </Col>
            <Col md={3} sm={12} xs={12}>
              <FormGroup>
                <Label for="salesOrderN0">Customer Code</Label>
                <Input
                  size="sm"
                  type="text"
                  name="salesOrderN0"
                  id="salesOrderN0"
                  placeholder="Customer Code"
                />
              </FormGroup>
            </Col>
            <Col md={3} sm={12} xs={12}>
              <FormGroup>
                <Label for="salesOrderN0">Customer Name</Label>
                <Input
                  size="sm"
                  type="text"
                  name="salesOrderN0"
                  id="salesOrderN0"
                  placeholder="Customer Name"
                />
              </FormGroup>
            </Col>

            <Col md={3} sm={12} xs={12}>
              <FormGroup>
                <Label for="tOIN">SIV Number</Label>
                <Input
                  size="sm"
                  type="text"
                  name="sivNo"
                  id="sivNo"
                  placeholder=" SIV Number"
                />
              </FormGroup>
            </Col>
            <Col md={3} sm={12} xs={12}>
              <FormGroup>
                <Label for="tOIN">Received By </Label>
                <Input
                  disabled
                  size="sm"
                  type="text"
                  name="sivNo"
                  id="sivNo"
                  placeholder="Received By"
                />
              </FormGroup>
            </Col>

            <Col md={3} sm={12} xs={12}>
              <FormGroup>
                <Label for="binCode">Posting Date</Label>
                <Input
                  size="sm"
                  type="text"
                  name="binCode"
                  id="binCode"
                  placeholder=" Posting Date"
                />
              </FormGroup>
            </Col>
            <Col md={3} sm={12} xs={12}>
              <FormGroup>
                <Label for="binCode">Approved By</Label>
                <Input
                  size="sm"
                  type="text"
                  name="binCode"
                  id="binCode"
                  placeholder="Approved By"
                  disabled
                />
              </FormGroup>
            </Col>
            <Col md={3} sm={12} xs={12}>
              <FormGroup>
                <Label for="binCode">Approved Date</Label>
                <Input
                  size="sm"
                  type="date"
                  name="binCode"
                  id="binCode"
                  disabled
                  placeholder="Approved Date"
                />
              </FormGroup>
            </Col>
            <Col md={3} sm={12} xs={12}>
              <FormGroup>
                <Label for="binCode">Status</Label>
                <Input
                  size="sm"
                  type="text"
                  name="binCode"
                  id="binCode"
                  placeholder="Status"
                />
              </FormGroup>
            </Col>
            <Col md={12} sm={12} xs={12}>
              <FormGroup>
                <Label for="binCode">Last Modified Date</Label>
                <Input
                  size="sm"
                  disabled
                  type="text"
                  name="binCode"
                  id="binCode"
                  placeholder="Status"
                />
              </FormGroup>
            </Col>

            <Col md={12} sm={12} xs={12}>
              <FormGroup>
                <Label for="remark">Remark</Label>
                <Input
                  size="sm"
                  type="textarea"
                  name="remark"
                  id="remark"
                  placeholder="Remark"
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </CardBody>

      <hr />
      <CardBody>
        <Table hover responsive>
          <thead>
            <tr>
              <th>Item Category Code </th>
              <th>Item No </th>
              <th>Item Name</th>
              <th>From Location Code</th>
              <th>From Bin Code </th>
              <th>Qty Orderd </th>
              <th>Qty Received </th>
              <th>Qty To Issue </th>
              <th>Qty Issued </th>
              <th>U.O.M </th>
              <th>Unit Price</th>
              <th>Amount (Excl. VAT)</th>
              <th>Posting Date</th>
              <th>Remarks </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Item Category Code </td>
              <td>Item No </td>
              <td>Item Name</td>
              <td>From Location Code</td>
              <td>From Bin Code </td>
              <td>Qty Orderd </td>
              <td>Qty Received </td>
              <td>Qty To Issue </td>
              <td>Qty Issued </td>
              <td>U.O.M </td>
              <td>Unit Price</td>
              <td>Amount (Excl. VAT)</td>
              <td>Posting Date</td>
              <td>Remarks </td>
            </tr>
            <InputRow />
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};
export default SalesReturnAdd;
