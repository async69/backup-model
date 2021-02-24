import React from "react";
import { Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import ReusabelForm from "../../../common/form";
import { connect } from "react-redux";
import {
  addPurchaseJournal,
  updatePurchaseJournal,
  getStatus,
} from "store/Finance/Journals/purchaseJournals";
import { selectChartOfAccounts } from "store/Finance/MasterData/ChartsOfAccounts/chartOfAccounts";
import PurchaseJournalLinesTable from "./PurchaseJournalLinesTable";

class PurchaseJournalForm extends ReusabelForm {
  initialState = {
    data: {
      status: "",
      date: "",
      document_number: "",
      description: "",
      remarks: "",
      vendor: "",
      invoice: "",
      purchase_journal_lines: [],
      //lines
    },
    errors: {},
  };
  state = JSON.parse(JSON.stringify(this.initialState));
  schema = {};

  mapToViewModel(purchaseJournal) {
    return {
      id: purchaseJournal.id,
      status: purchaseJournal.status,
      date: purchaseJournal.date,
      document_number: purchaseJournal.document_number,
      description: purchaseJournal.description,
      remarks: purchaseJournal.remarks,
      vendor: purchaseJournal.vendor,
      invoice: purchaseJournal.invoice,
      purchase_journal_lines: purchaseJournal.purchase_journal_lines,
    };
  }

  populatePurchaseJournal() {
    const { purchaseJournal } = this.props;
    if (!purchaseJournal) return;
    this.setState({ data: this.mapToViewModel(purchaseJournal) });
  }

  componentDidMount() {
    this.populatePurchaseJournal();
  }

  doSubmit = async () => {};
  render() {
    return (
      <Card className="border-0">
        <CardHeader className="border-0">Cash Receipt Journal </CardHeader>
        <CardBody>
          <Row>
            <Col md={3} sm={12} xs={12}>
              {this.renderSelect("status", "Status", [
                "Drafted",
                "Approved",
                "Posted",
              ])}
            </Col>
            <Col md={3} sm={12} xs={12}>
              {this.renderInput("date", "Date", "date")}
            </Col>
            <Col md={3} sm={12} xs={12}>
              {this.renderInput("document_number", "Document Number")}
            </Col>
            <Col md={3} sm={12} xs={12}>
              {this.renderInput("description", "Description", "textarea")}
            </Col>
            <Col md={12} sm={12} xs={12}>
              {this.renderInput("remarks", "Remarks", "textarea")}
            </Col>
          </Row>
          <hr />
          <CardHeader className="border-0">Line</CardHeader>
          <PurchaseJournalLinesTable
            purchaseJournalLines={this.state.data.purchase_journal_lines}
          />
        </CardBody>
      </Card>
    );
  }
}
const mapStateToProps = (state) => ({
  status: getStatus(state),
  chartOfAccounts: selectChartOfAccounts(state),
});

const mapDispatchToProps = (dispatch) => ({
  addPurchaseJournal: (data) => dispatch(addPurchaseJournal(data)),
  updatePurchaseJournal: (data) => dispatch(updatePurchaseJournal(data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchaseJournalForm);
