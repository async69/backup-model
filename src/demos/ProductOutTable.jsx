import React from "react";
import { Table } from "reactstrap";

const ProductOutTable = (props) => {
  return (
    <Table>
      <thead>
        <tr>
          <th> Name</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Plumby Nut</td>
          <th>52%</th>
        </tr>
        <tr>
          <td>Plumby Sup </td>
          <th>40%</th>
        </tr>
        <tr>
          <td>Dimbatch</td>
          <th>8%</th>
        </tr>
      </tbody>
    </Table>
  );
};

export default ProductOutTable;
