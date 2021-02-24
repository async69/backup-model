import React, { Component } from 'react';
import Table from 'pages/common/table';

class SalesPersonsTable extends Component {
  columns = [
    { path: "code", label: "Code" },
    { path: "name", label: "Name" },
    { path: "remarks", label: "Remarks" },
    { path: "last_modified_date", label: "Last Modified Date" },
  ];
  render() {
    const { salesPersons } = this.props;
    return (
      <div>
        <Table columns={this.columns} data={salesPersons} />
      </div>
    );
  }
}

export default SalesPersonsTable;