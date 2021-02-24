import React, { useState } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, CardHeader, Table, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import EmployeeMaterialLoanAdd from "./EmployeeMaterialLoanAdd";

export default function Performance() {
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
        buttonLabel="Save Performance"
      />

      <Page>
        <Col align="right" className="newButton">
          <Button
            onClick={() =>
              setModal({
                openModal: true,

                component: <EmployeeMaterialLoanAdd />,
              })
            }
            outline
            size="sm"
          >
            New Employee Material Loan
          </Button>
        </Col>

        <Card className="border-0">
          <Col md={12} sm={12} xs={12}>
            <CardHeader className="border-0">
              Employee Material Loan{" "}
            </CardHeader>
          </Col>
          <CardBody>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Employee Number </th>
                  <th>Employee Name</th>
                  <th>Department </th>
                  <th>Loan Iten </th>
                  <th>Requested Date </th>
                  <th>Loan Date </th>
                  <th>Expected Return Date </th>
                  <th>Actual Return Date </th>
                  <th>Last MOdified Date </th>

                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Employee Number </td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Page>
    </div>
  );
}
