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

class ItemReclassificationJournalAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        documentNumber: "",
        itemNumber: "",
        locationCode: "",
        binCode: "",
        newBinCode: "",
        quantity: "",
        uom: "",
        remarks: "",
      },
      availableBins: [],
      selectedBin: {
        tag: "",
        id: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      documentNumber: Joi.string().required().label("documentNumber"),
      itemNumber: Joi.string().required().label("itemNumber"),
      locationCode: Joi.string().required().label("locationCode"),
      binCode: Joi.string().required().label("binCode"),
      newBinCode: Joi.string().required().label("newBinCode"),
      quantity: Joi.string().required().label("quantity"),
      uom: Joi.string().required().label("uom"),
      remarks: Joi.string().allow("").optional(),
    };
    this.locationFilter = this.locationFilter.bind(this);
    this.selectBinCurrenct = this.selectBinCurrenct.bind(this);
    this.selectBinNew = this.selectBinNew.bind(this);
  }

  doSubmit() {
    this.props.addItemReclassificationJournal(this.state.data);
  }

  locationFilter(selectedWarehouse) {
    const availableBins = this.props.setupBins.filter(
      (bins) => bins.warehouse.id === selectedWarehouse
    );
    this.setState({ availableBins });
  }

  selectBinCurrenct(id) {
    this.setState({ tag: "current", id });
  }

  selectBinNew(id) {
    this.setState({ tag: "new", id });
  }

  render() {
    return (
      <div>
        <Card className="border-0">
          <CardHeader className="border-0">
            Add Item Reclassification Journal{" "}
          </CardHeader>
          <CardBody>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col md={6} sm={12} xs={12}>
                  <FormGroup>
                    {this.renderInput("documentNumber", "Document Number")}
                  </FormGroup>
                </Col>
                <Col md={6} sm={12} xs={12}>
                  <FormGroup>
                    {this.renderSelect({
                      name: "itemNumber",
                      label: "Item Number",
                      options: this.props.items.map((item) => ({
                        id: item.id,
                        name: item.master_item.name,
                      })),
                      optionsFrom: "server",
                    })}
                  </FormGroup>
                </Col>
                <Col md={6} sm={12} xs={12}>
                  <FormGroup>
                    {this.renderSelect({
                      name: "locationCode",
                      label: "Location Code",
                      options: this.props.warehouses,
                      optionsFrom: "server",
                      callback: this.locationFilter,
                    })}
                  </FormGroup>
                </Col>
                <Col md={6} sm={12} xs={12}>
                  <FormGroup>
                    {this.renderSelect({
                      name: "binCode",
                      label: "Bin Code",
                      options: this.state.availableBins.filter(
                        (bin) => bin.id !== this.state.data.newBinCode
                      ),
                      optionsFrom: "server",
                      callback: this.selectBinCurrenct,
                    })}
                  </FormGroup>
                </Col>
                <Col md={6} sm={12} xs={12}>
                  <FormGroup>
                    {this.renderSelect({
                      name: "newBinCode",
                      label: "New Bin Code",
                      options: this.state.availableBins.filter(
                        (bin) => bin.id !== this.state.data.binCode
                      ),
                      optionsFrom: "server",
                      callback: this.selectBinNew,
                    })}
                  </FormGroup>
                </Col>
                <Col md={6} sm={12} xs={12}>
                  <FormGroup>
                    {this.renderInput("quantity", "Quantity", "number")}
                  </FormGroup>
                </Col>
                <Col md={6} sm={12} xs={12}>
                  <FormGroup>
                    {this.renderSelect(
                      "uom",
                      "Unit Of Measurment",
                      this.props.UOMs,
                      "server"
                    )}
                  </FormGroup>
                </Col>
                <Col md={12} sm={12} xs={12}>
                  {this.renderInput("remarks", "Remarks", "textarea")}
                </Col>
              </Row>
              <CardFooter align="center">
                {this.renderButton("Add Item Reclassification Journal")}
              </CardFooter>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default ItemReclassificationJournalAdd;
