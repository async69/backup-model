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
    fromBinCode: "",
    frombinCode: "",
    toBinCode: "",
    tobinCode: "",
    requestedQty: "",
    toreceiveQty: "",
    receivedQty: "",
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
            disabled
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
            type="select"
            name="fromBinCode"
            id="fromBinCode"
            placeholder="From Bin Code"
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
            type="select"
            name="toBinCode"
            id="toBinCode"
            placeholder="To Bin Code"
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
            type="text"
            name="requestedQty"
            id="requestedQty"
            placeholder="Quantity Requested"
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="text"
            name="toreceiveQty"
            id="toreceiveQty"
            placeholder=" Qty to Receive"
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
            placeholder=" Quantity Receieved"
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
            placeholder="U.O.M"
            onChange={handleChange}
            title={idx}
          >
            <option>Option one</option>
            <option>Option one</option>
          </Input>
        </td>

        <td>
          <Input
            disabled
            size="sm"
            className="border-0"
            type="date"
            name="postedDate"
            id="postedDate"
            placeholder="Posted on"
            onChange={handleChange}
            title={idx}
          />
        </td>

        {/* <td>
          <Input
            disabled
            size="sm"
            className="border-0"
            type="date"
            name="postingDate"
            id="postingDate"
            placeholder="Posting Date"
            onChange={handleChange}
            title={idx}
          />
        </td> */}
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

const TransferOrderReceiveAdd = () => {
  return (
    <div>
      <Card className="border-0">
        <CardHeader className="border-0">Header</CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col md={3} sm={12} xs={12}>
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

              <Col md={3} sm={12} xs={12}>
                <FormGroup>
                  <Label for="tOIN">Transfer Order Issue No </Label>
                  <Input
                    size="sm"
                    type="text"
                    name="tOIN"
                    id="tOIN"
                    placeholder=" Transfer Order Issue No "
                  />
                </FormGroup>
              </Col>

              <Col md={3} sm={12} xs={12}>
                <FormGroup>
                  <Label for="fromLocationCode">From Location Code </Label>
                  <Input
                    size="sm"
                    type="select"
                    name="fromLocationCode"
                    id="fromLocationCode"
                  >
                    <option>Location 1</option>
                    <option>Location 2</option>
                    <option>Location 3</option>
                    <option>Location 4</option>
                    <option>Location 5</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={3} sm={12} xs={12}>
                <FormGroup>
                  <Label for="toLocationCode">To Location Code </Label>
                  <Input
                    size="sm"
                    type="select"
                    name="toLocationCode"
                    id="toLocationCode"
                  >
                    <option>Location 1</option>
                    <option>Location 2</option>
                    <option>Location 3</option>
                    <option>Location 4</option>
                    <option>Location 5</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={3} sm={12} xs={12}>
                <FormGroup>
                  <Label for="receivedBy">Received By </Label>
                  <Input
                    disabled
                    size="sm"
                    type="text"
                    name="receivedBy"
                    id="receivedBy"
                    placeholder=" Received By "
                  />
                </FormGroup>
              </Col>

              <Col md={3} sm={12} xs={12}>
                <FormGroup>
                  <Label for="postingDate">Posting Date</Label>
                  <Input
                    disabled
                    size="sm"
                    type="date"
                    name="postingDate"
                    id="postingDate"
                    placeholder="  Posting Date"
                  />
                </FormGroup>
              </Col>
              <Col md={3} sm={12} xs={12}>
                <FormGroup>
                  <Label for="postingDate">Status</Label>
                  <Input
                    disabled
                    size="sm"
                    type="date"
                    name="postingDate"
                    id="postingDate"
                    placeholder="  Posting Date"
                  />
                </FormGroup>
              </Col>
              <Col md={3} sm={12} xs={12}>
                <FormGroup>
                  <Label for="postingDate">Last Modified date</Label>
                  <Input
                    disabled
                    size="sm"
                    type="date"
                    name="postingDate"
                    id="postingDate"
                    placeholder="  Posting Date"
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
        <CardHeader className="border-0">Line</CardHeader>
        <CardBody>
          <Table hover responsive>
            <thead>
              <tr>
                <th>Item Category </th>
                <th>Item No </th>
                <th>Item Name</th>
                <th>From Bin Code</th>
                <th>To Bin Code</th>
                <th>Qty Requested </th>
                <th>Qty To Receive </th>
                <th>Qty Received </th>
                <th>U.O.M</th>
                <th>Posting Date</th>
                <th>Remarks </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Item Category </td>
                <td>Item No </td>
                <td>Item Name</td>
                <td>From Bin Code</td>
                <td>To Bin Code</td>
                <td>Qty Requested </td>
                <td>Qty To Receive </td>
                <td>Qty Received </td>
                <td>U.O.M</td>
                <td>Posting Date</td>
                <td>Remarks </td>
              </tr>

              <InputRow />
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};
export default TransferOrderReceiveAdd;
