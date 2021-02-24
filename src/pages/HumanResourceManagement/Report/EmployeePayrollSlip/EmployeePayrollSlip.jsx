import React, { useState } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, CardHeader, Table, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import EmployeePayrollSlipAdd from "./EmployeePayrollSlipAdd";

export default function EmployeePayrollSlip() {
  const [modal, setModal] = useState({
    openModal: false,
    component: <React.Fragment />,
    data: {},
    buttonLabel: "",
  });

  const toggle = (type, data) => {
    switch (type) {
      case "OPEN": {
        setModal({ openModal: true });
        break;
      }

      case "CLOSE": {
        setModal({ openModal: false, data: null });
        break;
      }
      default:
        return data;
    }
  };

  return (
    <div>
      <CommonModals
        size="xl"
        data={modal.data}
        openModal={modal.openModal}
        component={modal.component}
        title={modal.title}
        toggle={toggle}
        buttonLabel="Save Employee Bonus"
      />

      <Page>
        <Col align="right" className="newButton">
          <Button
            onClick={() =>
              setModal({
                openModal: true,
                data: "hello",
                component: <EmployeePayrollSlipAdd />,
              })
            }
            outline
            size="sm"
          >
            New Slip
          </Button>
        </Col>

        <Card className="border-0">
          <Col md={12} sm={12} xs={12}>
            <CardHeader className="border-0"> Payroll Slip </CardHeader>
          </Col>
          <CardBody>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Employee No. </th>
                  <th>Employee Name </th>
                  <th>Employee department </th>
                  <th> Positon </th>
                  <th>Start Date </th>
                  <th>End Date </th>
                  <th> Bank No. </th>
                  <th> Bank Name </th>
                  <th> Basic Salary </th>
                  <th> Total Absense </th>
                  <th> Transport allowance </th>
                  <th> Positon allowance </th>
                  <th> Mobile allowance </th>
                  <th> Other allowance </th>
                  <th> Over Time </th>
                  <th> Bonus </th>
                  <th> Income Tax </th>
                  <th> Net Salary </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Start Date </td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Page>
    </div>
  );
}
