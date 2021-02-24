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

class PhysicalInventoryJournalAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        itemNumber: "",
        locationCode: "",
        itemName: "",
        qtyPhysicalCount: "",
        qtyCalculated: "",
        quantity: "",
        unitPrice: "",
        remarks: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      itemNumber: Joi.string().required().label("itemNumber"),
      locationCode: Joi.string().required().label("locationCode"),
      itemName: Joi.string().required().label("itemName"),
      qtyPhysicalCount: Joi.string().required().label("qtyPhysicalCount"),
      quantity: Joi.string().required().label("quantity"),
      qtyCalculated: Joi.string().required().label("qtyCalculated"),
      unitPrice: Joi.number().required().label("unitPrice"),
      remarks: Joi.string().allow("").optional(),
    };
  }

  componentDidUpdate() {
    if (this.props.doneAdd) {
      this.resetForm();
    }
  }

  doSubmit() {
    this.props.addPhysicalInventoryJournal(this.state.data);
  }

  render() {
    return (
      <div>
        <Card className="border-0">
          <CardHeader className="border-0">
            Add Physical Inventory Journal{" "}
          </CardHeader>
          <CardBody>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col md={4} sm={12} xs={12}>
                  <FormGroup>
                    {this.renderInput("itemNumber", "Item Number")}
                  </FormGroup>
                </Col>
                <Col md={4} sm={12} xs={12}>
                  <FormGroup>
                    {this.renderSelect(
                      "itemName",
                      "Item Name",
                      this.props.items.map((item) => ({
                        id: item.id,
                        name: item.master_item.name,
                      })),
                      "server"
                    )}
                  </FormGroup>
                </Col>
                <Col md={4} sm={12} xs={12}>
                  <FormGroup>
                    {this.renderSelect(
                      "locationCode",
                      "Location Code",
                      this.props.warehouses,
                      "server"
                    )}
                  </FormGroup>
                </Col>

                <Col md={4} sm={12} xs={12}>
                  <FormGroup>
                    {this.renderInput(
                      "qtyCalculated",
                      "Quantity (Calculated)",
                      "number"
                    )}
                  </FormGroup>
                </Col>
                <Col md={4} sm={12} xs={12}>
                  <FormGroup>
                    {this.renderInput("quantity", "Quantity", "number")}
                  </FormGroup>
                </Col>
                <Col md={4} sm={12} xs={12}>
                  <FormGroup>
                    {this.renderInput(
                      "qtyPhysicalCount",
                      "Quantity (Physical Count)",
                      "number"
                    )}
                  </FormGroup>
                </Col>
                <Col md={4} sm={12} xs={12}>
                  <FormGroup>
                    {this.renderInput("unitPrice", "Unit Price", "number")}
                  </FormGroup>
                </Col>
                <Col md={4} sm={12} xs={12}>
                  <FormGroup>
                    {this.renderInput(
                      "unit_of_measure",
                      "Unit Of Masure",
                      "unit"
                    )}
                  </FormGroup>
                </Col>
                <Col md={4} sm={12} xs={12}>
                  {this.renderInput("remarks", "Remarks", "textarea")}
                </Col>
              </Row>
              <CardFooter align="center">
                {this.renderButton("Add Physical Inventory Journal")}
              </CardFooter>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default PhysicalInventoryJournalAdd;
