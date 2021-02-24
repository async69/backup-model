import React from "react";
import { Table } from "reactstrap";

const VenTable = (props) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th> Name</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>RM1</th>
          <td>AXA PLC</td>
        </tr>
        <tr>
          <th>RM2</th>
          <td>ZONDA PLC</td>
        </tr>
        <tr>
          <th>RM3</th>
          <td>BBLQ PLC</td>
        </tr>
        <tr>
          <th>RM4</th>
          <td>ANBESAPLC</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default VenTable;
