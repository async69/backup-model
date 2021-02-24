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
    itemCategoryCode: "",
    itemNo: "",
    itemName: "",
    locationCode: "",
    binCode: "",
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
            disabled
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
            name="locationCode"
            id="locationCode"
            placeholder="Location Code"
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
            name="binCode"
            id="binCode"
            placeholder=" Bin Code"
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
            placeholder="Qty to Issue"
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
            id="issuedQty"
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
            id="postedDate"
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
            name="postedDate"
            id="postedDate"
            placeholder="Amount (Excl.VAT)"
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            size="sm"
            className="border-0"
            type="number"
            name="postedDate"
            id="postedDate"
            placeholder="Total Amount"
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
            placeholder="Posting Date"
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

const PurchaseReturnAdd = () => {
  return (
    <Card className="border-0">
      <CardHeader className="border-0">New Purchase Return</CardHeader>
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
                <Label for="purchaseOrderN0">Purchase Order Number </Label>
                <Input
                  size="sm"
                  type="text"
                  name="purchaseOrderN0"
                  id="purchaseOrderN0"
                  placeholder=" Purchase Order Number "
                />
              </FormGroup>
            </Col>
            <Col md={3} sm={12} xs={12}>
              <FormGroup>
                <Label for="purchaseOrderN0">Vendor Code </Label>
                <Input
                  size="sm"
                  type="text"
                  name="purchaseOrderN0"
                  id="purchaseOrderN0"
                  placeholder=" Vendor Code"
                />
              </FormGroup>
            </Col>
            <Col md={3} sm={12} xs={12}>
              <FormGroup>
                <Label for="purchaseOrderN0">Vendor Name </Label>
                <Input
                  size="sm"
                  type="text"
                  name="purchaseOrderN0"
                  id="purchaseOrderN0"
                  placeholder="Vendor Name"
                />
              </FormGroup>
            </Col>

            <Col md={3} sm={12} xs={12}>
              <FormGroup>
                <Label for="tOIN">GRN Number </Label>
                <Input
                  size="sm"
                  type="text"
                  name="grnNo"
                  id="grnNo"
                  placeholder=" GRN Number  "
                />
              </FormGroup>
            </Col>

            <Col md={3} sm={12} xs={12}>
              <FormGroup>
                <Label for="fromlocationCode">From Location Code </Label>
                <Input
                  size="sm"
                  type="select"
                  name="fromlocationCode"
                  id="fromlocationCode"
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
                <Label for="supplierInvoiceNo">Suplier Invoice Number </Label>
                <Input
                  size="sm"
                  type="text"
                  name="supplierInvoiceNo"
                  id="supplierInvoiceNo"
                  placeholder=" Supplier Invoice  Number"
                />
              </FormGroup>
            </Col>
            <Col md={3} sm={12} xs={12}>
              <FormGroup>
                <Label for="receivedBy">Issued By </Label>
                <Input
                  disabled
                  size="sm"
                  type="text"
                  name="approvedby"
                  id="approvedby"
                  placeholder=" Issued By"
                />
              </FormGroup>
            </Col>

            <Col md={3} sm={12} xs={12}>
              <FormGroup>
                <Label for="receivedBy">Approved By </Label>
                <Input
                  size="sm"
                  type="text"
                  name="approvedby"
                  id="approvedby"
                  placeholder=" Approved By "
                />
              </FormGroup>
            </Col>
            <Col md={3} sm={12} xs={12}>
              <FormGroup>
                <Label for="receivedDate">Approved Date </Label>
                <Input
                  size="sm"
                  type="date"
                  name="receivedDate"
                  id="receivedDate"
                  placeholder=" Approved Date "
                />
              </FormGroup>
            </Col>

            <Col md={3} sm={12} xs={12}>
              <FormGroup>
                <Label for="postingDate">Posting Date</Label>
                <Input
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
                  size="sm"
                  type="text"
                  name="postingDate"
                  id="postingDate"
                  placeholder="Posting Date"
                />
              </FormGroup>
            </Col>
            <Col md={12} sm={12} xs={12}>
              <FormGroup>
                <Label for="remark">Last Modified Date</Label>
                <Input
                  size="sm"
                  disabled
                  type="date"
                  name="remark"
                  id="remark"
                  placeholder="Remark"
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
              <th>Item Category Code </th>
              <th>Item Number </th>
              <th>Item Name</th>
              <th>Location Code</th>
              <th>Bin Code </th>
              <th>Qty Ordered </th>
              <th>Qty Received </th>
              <th>Qty To Issue </th>
              <th>Qty Issued </th>
              <th>U.O.M</th>
              <th>Unit Price</th>
              <th>Amount (Excl. VAT)</th>
              <th>Total Amount</th>
              <th>Posting Date</th>
              <th>Remarks </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Item Category Code </td>
              <td>Item Number </td>
              <td>Item Name</td>
              <td>Location Code</td>
              <td>Bin Code </td>
              <td>Qty Ordered </td>
              <td>Qty Received </td>
              <td>Qty To Issue </td>
              <td>Qty Issued </td>
              <td>U.O.M</td>
              <td>Unit Price</td>
              <td>Amount (Excl. VAT)</td>
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
export default PurchaseReturnAdd;
