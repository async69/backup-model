import React from "react";
import { Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import ReusabelForm from "../../../../pages/common/form";
import { connect } from "react-redux";
import {
  addPaymentJournal,
  updatePaymentJournal,
  getStatus,
} from "store/Finance/Journals/paymentJournals";
import { selectChartOfAccounts } from "store/Finance/MasterData/ChartsOfAccounts/chartOfAccounts";
import PaymentJournalLinesTable from "./PaymentJournalLinesTable";

class PaymentJournalForm extends ReusabelForm {
  initialState = {
    data: {
      status: "",
      date: "",
      document_number: "",
      description: "",
      remarks: "",
      vendor: "",
      invoice: "",
      cash_payment_journal_lines: [],
      //lines
    },
    errors: {},
  };
  state = JSON.parse(JSON.stringify(this.initialState));
  schema = {};

  mapToViewModel(paymentJournal) {
    return {
      id: paymentJournal.id,
      status: paymentJournal.status,
      date: paymentJournal.date,
      document_number: paymentJournal.document_number,
      description: paymentJournal.description,
      remarks: paymentJournal.remarks,
      document_type: paymentJournal.document_type,
      cash_payment_journal_lines: paymentJournal.cash_payment_journal_lines,
    };
  }

  populatePaymentJournal() {
    const { paymentJournal } = this.props;
    if (!paymentJournal) return;
    this.setState({ data: this.mapToViewModel(paymentJournal) });
  }

  componentDidMount() {
    this.populatePaymentJournal();
  }

  doSubmit = async () => {};
  render() {
    return (
      <Card className="border-0">
        <CardHeader className="border-0">Payment Journal</CardHeader>
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
            {/* <Col md={3} sm={12} xs={12}>
              {this.renderSelect("vendor", "Vendor", this.props.vendors)}
            </Col>
            <Col md={3} sm={12} xs={12}>
              {this.renderSelect("invoice", "Invoice", this.props.invoices)}
            </Col> */}
            <Col md={12} sm={12} xs={12}>
              {this.renderInput("remarks", "Remarks", "textarea")}
            </Col>
          </Row>
        </CardBody>
        <hr />
        <CardHeader className="border-0">Line</CardHeader>
        <CardBody>
          <PaymentJournalLinesTable
            paymentJournalLines={this.state.data.cash_payment_journal_lines}
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
  addPaymentJournal: (data) => dispatch(addPaymentJournal(data)),
  updatePaymentJournal: (data) => dispatch(updatePaymentJournal(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PaymentJournalForm);
