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
    locationCode: "",
    binCode: "",
    requestedQty: "",
    toissueQty: "",
    issuedQty: "",
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
            placeholder="Item Name"
            onChange={handleChange}
            title={idx}
          />
        </td>

        <td>
          <Input
            className="border-0"
            size="sm"
            type="select"
            name="binCode"
            id="binCode"
            onChange={handleChange}
            title={idx}
          >
            <option>Code 1</option>
            <option>Code 2</option>
            <option>Code 3</option>
            <option>Code 4</option>
            <option>Code 5</option>
          </Input>
        </td>

        <td>
          <Input
            size="sm"
            className="border-0"
            type="number"
            name="requestedQty"
            id="requestedQty"
            placeholder="Requested Qty"
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="number"
            name="toissueQty"
            id="torissueQty"
            placeholder=" Qty to Issue"
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="number"
            name="issuedQty"
            id="issuedQty"
            placeholder=" Issued Qty"
            onChange={handleChange}
            title={idx}
          />
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
            <option>U.O.M 1</option>
            <option>U.O.M 2</option>
            <option>U.O.M 3</option>
            <option>U.O.M 4</option>
            <option>U.O.M 5</option>
          </Input>
        </td>
        <td>
          <Input
            className="border-0"
            size="sm"
            type="text"
            name="unitPrice"
            id="unitPrice"
            placeholder="price"
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            className="border-0"
            size="sm"
            type="text"
            name="totalAmount"
            id="totalAmount"
            placeholder="Price "
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="date"
            name="postedDate"
            id="postedDate"
            placeholder="Posted on"
            onChange={handleChange}
            title={idx}
            disabled
          />
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

const StoreIssueVoucherAdd = () => {
  return (
    <div>
      <Card className="border-0">
        <CardHeader className="border-0">Header</CardHeader>
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
                  <Label for="srNo">Store Requisition No </Label>
                  <Input
                    size="sm"
                    type="text"
                    name="srNo"
                    id="srNo"
                    placeholder=" Store Requisitin No "
                  />
                </FormGroup>
              </Col>
              <Col md={3} sm={12} xs={12}>
                <FormGroup>
                  <Label for="salesOrderNo">Sales Order No </Label>
                  <Input
                    size="sm"
                    type="text"
                    name="salesOrderNo"
                    id="salesOrderNo"
                    placeholder=" Sales Order No "
                  />
                </FormGroup>
              </Col>
              <Col md={3} sm={12} xs={12}>
                <FormGroup>
                  <Label for="salesOrderNo">Purchase Return No </Label>
                  <Input
                    size="sm"
                    type="text"
                    name="salesOrderNo"
                    id="salesOrderNo"
                    placeholder="Purchase Return No"
                  />
                </FormGroup>
              </Col>
              <Col md={3} sm={12} xs={12}>
                <FormGroup>
                  <Label for="locationCode">Location Code </Label>
                  <Input
                    size="sm"
                    type="select"
                    name="locationCode"
                    id="locationCode"
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
                  <Label for="issuedBy">Issued By </Label>
                  <Input
                    disabled
                    size="sm"
                    type="text"
                    name="issuedBy"
                    id="issuedBy"
                    placeholder=" Issued By "
                  />
                </FormGroup>
              </Col>

              <Col md={3} sm={12} xs={12}>
                <FormGroup>
                  <Label for="postingDate">Posting Date</Label>
                  <Input
                    disabled
                    size="sm"
                    type="text"
                    name="postingDate"
                    id="postingDate"
                    placeholder="  Posting Date"
                  />
                </FormGroup>
              </Col>
              <Col md={3} sm={12} xs={12}>
                <FormGroup>
                  <Label for="postingDate">Approved By</Label>
                  <Input
                    disabled
                    size="sm"
                    type="text"
                    name="postingDate"
                    id="postingDate"
                    placeholder="Approved By"
                  />
                </FormGroup>
              </Col>
              <Col md={3} sm={12} xs={12}>
                <FormGroup>
                  <Label for="postingDate">Approved Date</Label>
                  <Input
                    disabled
                    size="sm"
                    type="date"
                    name="postingDate"
                    id="postingDate"
                    placeholder="Approved Date"
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
                <th>Item Category</th>
                <th>Item No</th>
                <th>Item Name</th>
                <th>Bin Code</th>
                <th>Qty Requested</th>
                <th>Qty To Issue</th>
                <th>Qty Issued</th>
                <th>U.O.M</th>
                <th>Unit Price</th>
                <th>Total Amount</th>
                <th>Posting Date</th>
                <th>Remarks</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Item Category</td>
                <td>Item No</td>
                <td>Item Name</td>
                <td>Bin Code</td>
                <td>Qty Requested</td>
                <td>Qty To Issue</td>
                <td>Qty Issued</td>
                <td>U.O.M</td>
                <td>Unit Price</td>
                <td>Total Amount</td>
                <td>Posting Date</td>
                <td>Remarks</td>
              </tr>
              <tr></tr>
              <InputRow />
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};
export default StoreIssueVoucherAdd;
