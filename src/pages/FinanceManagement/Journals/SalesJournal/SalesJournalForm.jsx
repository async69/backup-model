import React from "react";
import { Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import ReusabelForm from "../../../common/form";
import { connect } from "react-redux";
import {
  addSalesJournal,
  updateSalesJournal,
  getStatus,
} from "store/Finance/Journals/salesJournals";
import { selectChartOfAccounts } from "store/Finance/MasterData/ChartsOfAccounts/chartOfAccounts";
import SalesJournalLinesTable from "./SalesJournalLinesTable";

class SalesJournalForm extends ReusabelForm {
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

  mapToViewModel(salesJournal) {
    return {
      id: salesJournal.id,
      status: salesJournal.status,
      date: salesJournal.date,
      document_number: salesJournal.document_number,
      description: salesJournal.description,
      remarks: salesJournal.remarks,
      vendor: salesJournal.vendor,
      invoice: salesJournal.invoice,
      purchase_journal_lines: salesJournal.purchase_journal_lines,
    };
  }

  populateSalesJournal() {
    const { salesJournal } = this.props;
    if (!salesJournal) return;
    this.setState({ data: this.mapToViewModel(salesJournal) });
  }

  componentDidMount() {
    this.populateSalesJournal();
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
          <SalesJournalLinesTable
            salesJournalLines={this.state.data.purchase_journal_lines}
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
  addSalesJournal: (data) => dispatch(addSalesJournal(data)),
  updateSalesJournal: (data) => dispatch(updateSalesJournal(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SalesJournalForm);
