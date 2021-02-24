import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Label,
  Input,
  FormGroup,
  Form,
  Row,
  Col,
  Table,
} from "reactstrap";

const InputRow = () => {
  const [numberOfRows, setRows] = useState(1);
  const [finishedRows, setFinished] = useState(0);
  const initialRow = {
    itemCode: "",
    description: "",
    locationCode: "",
    binCode: "",
    lot: "",
    orderedQty: "",
    toBeReceivedQty: "",
    uom: "",
    unitPrice: "",
    totalAmount: "",
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
            size="sm"
            className="border-0"
            type="select"
            name="itemCode"
            id="itemCode"
            placeholder="Item Cat. Code"
            onChange={handleChange}
            title={idx}
          >
            <option>Option one</option>
            <option>Option Two</option>
          </Input>
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="select"
            name="description"
            id="description"
            placeholder="Item No"
            onChange={handleChange}
            title={idx}
          >
            <option>Option one</option>
            <option>Option Two</option>
          </Input>
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="text"
            name="locationCode"
            id="itemCode"
            placeholder="Item Name"
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="text"
            name="locationCode"
            id="itemCode"
            placeholder="Location Code"
            onChange={handleChange}
            title={idx}
          >
            <option>Option one</option>
            <option>Option Two</option>
          </Input>
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="text"
            name="binCode"
            id="binCode"
            placeholder="Bin Code"
            onChange={handleChange}
            title={idx}
          >
            <option>Option one</option>
            <option>Option Two</option>
          </Input>
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="text"
            name="lot"
            id="lot"
            placeholder="Lot No"
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="number"
            name="orderedQty"
            id="itemCode"
            placeholder="Orderd Qty"
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="number"
            name="toBeReceivedQty"
            id="toBeReceivedQty"
            placeholder="To Receive"
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
            <option>Option One</option>
            <option>Option Two</option>
          </Input>
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="text"
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
            type="text"
            name="totalAmount"
            id="totalAmount"
            placeholder="Total"
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

const GoodsRecievingNoteAdd = () => {
  return (
    <Card className="border-0">
      <CardHeader className="border-0">Header</CardHeader>
      <CardBody>
        <Form>
          <Row>
            <Col md={3} sm={12} xs={12}>
              <FormGroup>
                <Label for="documentNumber">Document Number</Label>
                <Input
                  size="sm"
                  type="text"
                  name="documentNumber"
                  id="documentNumber"
                  placeholder=" Document Number"
                />
              </FormGroup>
            </Col>
            <Col md={3} sm={12} xs={12}>
              <FormGroup>
                <Label for="locationCode">Location Code</Label>
                <Input
                  size="sm"
                  type="text"
                  name="locationCode"
                  id="locationCode"
                  placeholder="Location Code"
                />
              </FormGroup>
            </Col>
            <Col md={3} sm={12} xs={12}>
              <FormGroup>
                <Label for="purchaseOrderN0">Purchase Order No.</Label>
                <Input
                  size="sm"
                  type="text"
                  name="purchaseOrderN0"
                  id="purchaseOrderN0"
                  placeholder="Purchase Order No."
                />
              </FormGroup>
            </Col>
            <Col md={3} sm={12} xs={12}>
              <FormGroup>
                <Label for="vendoShipmentNo">Vendor Shipment No.</Label>
                <Input
                  size="sm"
                  type="text"
                  name="vendoShipmentNo"
                  id="vendoShipmentNo"
                  placeholder=" Vendor Shipment No. "
                />
              </FormGroup>
            </Col>
            <Col md={3} sm={12} xs={12}>
              <FormGroup>
                <Label for="salesOrderNo">Sales Order No.</Label>
                <Input
                  size="sm"
                  type="text"
                  name="salesOrderNo"
                  id="salesOrderNo"
                  placeholder=" Sales Order No."
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
                  placeholder="  Posting date"
                />
              </FormGroup>
            </Col>
            <Col md={3} sm={12} xs={12}>
              <FormGroup>
                <Label for="orderDate">Order Date</Label>
                <Input
                  size="sm"
                  type="date"
                  name="orderDate"
                  id="orderDate"
                  placeholder="  Order Date"
                />
              </FormGroup>
            </Col>
            <Col md={3} sm={12} xs={12}>
              <FormGroup>
                <Label for="orderDate">Status</Label>
                <Input
                  size="sm"
                  type="text"
                  name="orderDate"
                  id="orderDate"
                  placeholder="  Order Date"
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
        <Table
          style={{
            // whiteSpace: "nowrap",
            overflow: "scroll",
            border: 0,
          }}
          striped
          responsive
        >
          <thead>
            <tr>
              <th>Item Cat. Code </th>
              <th>Item No.</th>
              <th>Item Name</th>
              <th>Location Code</th>
              <th>Bin Code </th>
              <th>Lot No.</th>
              <th>Orderd Qty</th>
              <th>Qty to Receive</th>
              <th>U.O.M</th>
              <th>Unit Price</th>
              <th>Total Amount</th>
              <th>Posting Date</th>
              <th>Remarks </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>3hCH5543 </td>
              <td>Item No.</td>
              <td>Item Name</td>
              <td>Location Code</td>
              <td>Bin Code </td>
              <td>Lot No.</td>
              <td>Orderd Qty</td>
              <td>Qty to Receive</td>
              <td>U.O.M</td>
              <td>Unit Price</td>
              <td>Total Amount</td>
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
export default GoodsRecievingNoteAdd;
