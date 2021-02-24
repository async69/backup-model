import React, { Component } from "react";
import Table from "../../../common/table";

class PaymentJournalsTable extends Component {
  columns = [
    { path: "debit", label: "Debit" },
    { path: "credit", label: "Credit" },
    { path: "description", label: "Description" },
    { path: "account_balance", label: "Account Balance" },
    { path: "is_cash", label: "Is Cash" },
    { path: "account", label: "Account" },
    { path: "remarks", label: "Remarks" },
  ];
  render() {
    const { paymentJournalLines } = this.props;
    return (
      <div>
        <Table columns={this.columns} data={paymentJournalLines} />
      </div>
    );
  }
}

export default PaymentJournalsTable;
