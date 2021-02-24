import React from "react";
import { Card, CardBody, Form, Row, Col, CardHeader } from "reactstrap";
import PurchaseInvoiceLinesTable from "./PurchaseInvoiceLinesTable";
import Joi from "joi-browser";
import ReusabelForm from "../../../../pages/common/form";
import PurchaseInvoiceLineForm from "./PurchaseInvoiceLineForm";
import { connect } from "react-redux";
import {
  addPurchaseInvoice,
  updatePurchaseInvoice,
  getStatus,
} from "../../../../store/Finance/PurchaseProcess/purchaseInvoices";
import { selectUOMs } from "store/Inventory/Setup/UOM";
import { selectItemMasterDatas as getItems } from "store/Inventory/Setup/Item/Item_MasterData";
import {
  Fetch as loadVendors,
  selectVendors as getVendors,
} from "store/Finance/PurchaseProcess/Vendors";

class PurchaseInvoiceForm extends ReusabelForm {
  initialState = {
    data: {
      document_no: "",
      posted_date: "",
      approved_date: "",
      status: "",
      remarks: "",
      paid_amount: "",
      purchase_order_no: "",
      grn_no: "",
      vendor_invoice_no: "",
      purchase_type: "",
      vendor: "",
      purchase_invoice_line: [],
    },
    errors: {},
    selectedLine: "",
    lineCounter: 1,
  };
  state = JSON.parse(JSON.stringify(this.initialState));
  schema = {
    id: Joi.any().allow("").optional(),
    document_no: Joi.string(),
    posted_date: Joi.date().allow("").optional(),
    approved_date: Joi.date().allow("").optional(),
    status: Joi.string().valid("Drafted", "Approved", "Posted", "Paid"),
    remarks: Joi.string(),
    paid_amount: Joi.string(),
    purchase_order_no: Joi.string(),
    grn_no: Joi.string(),
    vendor_invoice_no: Joi.string(),
    purchase_type: Joi.string().valid(["Free tinder", "Tinder"]),
    vendor: Joi.string(),
    purchase_invoice_line: Joi.array().items(Joi.object()).min(1),
  };

  mapToViewModel(purchaseInvoice) {
    return {
      id: purchaseInvoice.id,
      document_no: purchaseInvoice.document_number,
      posted_date: purchaseInvoice.posted_date,
      approved_date: purchaseInvoice.approved_date,
      status: purchaseInvoice.status,
      remarks: purchaseInvoice.remarks,
      paid_amount: purchaseInvoice.paid_amount,
      purchase_order_no: purchaseInvoice.purchase_order_no,
      grn_no: purchaseInvoice.grn_no,
      vendor_invoice_no: purchaseInvoice.vendor_invoice_no,
      purchase_type: purchaseInvoice.purchase_type,
      vendor: purchaseInvoice.vendor,
      purchase_invoice_line: purchaseInvoice.purchase_invoice_line.map((line) =>
        this.getLineFormData(line)
      ),
    };
  }

  populatePurchaseInvoice() {
    const { purchaseInvoice } = this.props;
    if (!purchaseInvoice) return;
    this.setState({ data: this.mapToViewModel(purchaseInvoice) });
  }

  componentDidMount() {
    this.props.loadVendors();
    this.populatePurchaseInvoice();
  }

  getLineFormData(line) {
    if (line) {
      return {
        id: line.id,
        quantity: line.quantity,
        quantity_invoiced: line.quantity_invoiced,
        unit_of_measurement: line.unit_of_measurement,
        unit_price: line.unit_price,
        currency: line.currency,
        remark: line.remarks,
        item: line.item,
      };
    }
  }

  doSubmit = async () => {
    const data = { ...this.state.data };
    delete data.posted_date;
    delete data.approved_date;
    if (data.id) {
      await this.props.updatePurchaseInvoice(data);
      if (this.props.status === "success") {
        this.toast.success("Purchase Invoice updated successfully");
        this.resetForm();
      }
    } else {
      data.purchase_invoice_line.forEach((line) => {
        delete line.id;
      });
      await this.props.addPurchaseInvoice(data);
      if (this.props.status === "success") {
        this.toast.success("Purchase Invoice added successfully");
        this.resetForm();
      }
    }
  };
  render() {
    return (
      <Card className="border-0">
        {/* <CardHeader className="border-0">Purchase Invoice</CardHeader> */}
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("document_no", "Document No.")}
              </Col>
              {this.state.data.id && (
                <>
                  <Col md={3} sm={6} xs={12}>
                    {this.renderInput("posted_date", "Date", "date")}
                  </Col>
                  <Col md={3} sm={6} xs={12}>
                    {this.renderInput("approved_date", "Approved Date", "date")}
                  </Col>
                </>
              )}
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect("status", "Status", [
                  "Drafted",
                  "Approved",
                  "Posted",
                  "Paid",
                ])}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("paid_amount", "Paid Amount", "number")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("purchase_order_no", "Purchase Order Number")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("grn_no", "GRN No.")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("vendor_invoice_no", "Vendor Invoice No.")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect("purchase_type", "Purchase Type", [
                  "Free tinder",
                  "Tinder",
                ])}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect(
                  "vendor",
                  "Vendor",
                  this.props.vendors,
                  "server"
                )}
              </Col>
              <Col md={12} sm={12} xs={12}>
                {this.renderInput("remarks", "Remarks", "textarea")}
              </Col>
              <hr />
              <Col md={12} sm={12} xs={12}>
                {!this.props.disabled && (
                  <>
                    <CardHeader className="mb-3">Enter Line</CardHeader>
                    <PurchaseInvoiceLineForm
                      onSubmit={this.handleLineSubmit}
                      selectedLine={this.getLineFormData(
                        this.state.selectedLine
                      )}
                      items={this.props.items}
                      unitMeasurements={this.props.unitMeasurements}
                    />
                  </>
                )}
              </Col>
              <Col md={12} sm={12} xs={12}>
                <CardHeader>Lines </CardHeader>
                <PurchaseInvoiceLinesTable
                  purchaseInvoiceLines={this.getLineTableData(
                    this.state.data.purchase_invoice_line,
                    {
                      item: this.props.items,
                    }
                  )}
                  onEdit={this.handleLineEdit}
                  onDelete={this.handleLineDelete}
                  disabled={this.props.disabled}
                />
              </Col>

              <Col align="center">{this.renderButton("Save")}</Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
const mapStateToProps = (state) => ({
  status: getStatus(state),
  items: getItems(state),
  unitMeasurements: selectUOMs(state),
  vendors: getVendors(state),
});

const mapDispatchToProps = (dispatch) => ({
  addPurchaseInvoice: (data) => dispatch(addPurchaseInvoice(data)),
  updatePurchaseInvoice: (data) => dispatch(updatePurchaseInvoice(data)),
  loadVendors: () => dispatch(loadVendors()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchaseInvoiceForm);
