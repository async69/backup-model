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
    itemCode: "",
    itemName: "",
    locationCode: "",
    binCode: "",
    estimatedUnitPrice: "",
    estimatedTotslAmount: "",
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
            name="itemCategoryCode"
            id="itemCategoryCode"
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
            name="itemCode"
            id="itemCode"
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
            className="border-0"
            size="sm"
            type="text"
            name="itemName"
            id="itemName"
            placeholder="itemName"
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            className="border-0"
            size="sm"
            type="select"
            name="locationLode"
            id="locationLode"
            onChange={handleChange}
            title={idx}
          >
            <option>Location Code 1</option>
            <option>Location Code 2</option>
            <option>Location Code 3</option>
            <option>Location Code 4</option>
            <option>Location Code 5</option>
          </Input>
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
            <option>Bin Code 1</option>
            <option>Bin Code 2</option>
            <option>Bin Code 3</option>
            <option>Bin Code 4</option>
            <option>Bin Code 5</option>
          </Input>
        </td>

        <td>
          <Input
            className="border-0"
            size="sm"
            type="text"
            name="estimatedUnitPrice"
            id="estimatedUnitPrice"
            placeholder="Quantity"
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            className="border-0"
            size="sm"
            type="select"
            name="uom"
            id="uom"
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
            type="number"
            placeholder="Estimated Unit Price"
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            className="border-0"
            size="sm"
            type="text"
            name="estimated TotalPrice"
            id="estimated TotalPrice"
            placeholder="Estimated Total Price"
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            className="border-0"
            size="sm"
            type="date"
            name="pDate"
            id="postedDate"
            placeholder="postedDate"
            onChange={handleChange}
            title={idx}
          />
        </td>
        <td>
          <Input
            className="border-0"
            size="sm"
            type="text"
            name="remarks"
            id="remarks"
            placeholder="Remarks "
            onChange={handleChange}
            title={idx}
          />
        </td>
      </tr>
    ));
};

const StoreRequisitionAdd = () => {
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
                  <Label for="locationCode">Location Code </Label>
                  <Input
                    size="sm"
                    type="select"
                    name="locationCode"
                    id="locationCode"
                    placeholder=" Location Code "
                  >
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={3} sm={12} xs={12}>
                <FormGroup>
                  <Label for="requestedBy">Requested By</Label>
                  <Input
                    size="sm"
                    type="select"
                    name="requestedBy"
                    id="requestedBy"
                  >
                    <option>Entity 1</option>
                    <option>Entity 2</option>
                    <option>Entity 3</option>
                    <option>Entity 4</option>
                    <option>Entity 5</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={3} sm={12} xs={12}>
                <FormGroup>
                  <Label for="requestedDate">Requested Date</Label>
                  <Input
                    size="sm"
                    type="date"
                    name="requestedDate"
                    id="requestedDate"
                    placeholder=" Requested Date "
                  />
                </FormGroup>
              </Col>

              <Col md={3} sm={12} xs={12}>
                <FormGroup>
                  <Label for="approvedBy"> Approved By</Label>
                  <Input
                    disabled
                    size="sm"
                    type="text"
                    name="approvedBy"
                    id="approvedBy"
                    placeholder=" Approved By"
                  />
                </FormGroup>
              </Col>

              <Col md={3} sm={12} xs={12}>
                <FormGroup>
                  <Label for="approvedDate">Approved Date</Label>
                  <Input
                    disabled
                    size="sm"
                    type="date"
                    name="approvedDate"
                    id="approvedDate"
                    placeholder=" Approved Date"
                  />
                </FormGroup>
              </Col>

              <Col md={4} sm={12} xs={12}>
                <FormGroup>
                  <Label for="approvedStatus">Approved Status</Label>
                  <Input
                    disabled
                    size="sm"
                    type="text"
                    name="approvedStatus"
                    id="approvedStatus"
                    placeholder="  status"
                  />
                </FormGroup>
              </Col>
              <Col md={4} sm={12} xs={12}>
                <FormGroup>
                  <Label for="typeOfIssue">Type of Issue</Label>
                  <Input
                    size="sm"
                    type="select"
                    name="typeOfIssue"
                    id="typeOfIssue"
                  >
                    <option>SIV</option>
                    <option>TOI</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={4} sm={12} xs={12}>
                <FormGroup>
                  <Label for="typeOfIssue">Status</Label>
                  <Input
                    size="sm"
                    type="select"
                    name="typeOfIssue"
                    id="typeOfIssue"
                  >
                    <option>Option one</option>
                    <option>Option two</option>
                  </Input>
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
                <th>Item Cat. Code </th>
                <th>Item Code</th>
                <th>Item Name </th>
                <th>Location Code</th>
                <th>Bin Code </th>
                <th>Quantity </th>
                <th>U.O.M</th>
                <th>Estimated Unit Price</th>
                <th>Estimated Total Amount</th>
                <th>Posting Date</th>
                <th>Remarks </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Item Cat. Code </td>
                <td>Item Code</td>
                <td>Item Name </td>
                <td>Location Code</td>
                <td>Bin Code </td>
                <td>Quantity </td>
                <td>U.O.M</td>
                <td>Estimated Unit Price</td>
                <td>Estimated Total Amount</td>
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
export default StoreRequisitionAdd;
