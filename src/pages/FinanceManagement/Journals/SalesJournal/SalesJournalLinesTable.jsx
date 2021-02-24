import React, { Component } from "react";
import Table from "../../../common/table";

class SalesJournalsTable extends Component {
  columns = [
    { path: "debit", label: "Debit" },
    { path: "credit", label: "Credit" },
    { path: "description", label: "Description" },
    { path: "account_balance", label: "Account Balance" },
    { path: "account", label: "Account" },
    { path: "remarks", label: "Remarks" },
  ];
  render() {
    const { salesJournalLines } = this.props;
    return (
      <div>
        <Table columns={this.columns} data={salesJournalLines} />
      </div>
    );
  }
}

export default SalesJournalsTable;
