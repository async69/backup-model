import React, { useState } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Table, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import LoanAdd from "./LoanAdd";

export default function Loan() {
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
        buttonLabel="Save Loan"
      />

      <Page>
        <Col align="right" className="newButton">
          <Button
            onClick={() =>
              setModal({
                openModal: true,

                component: <LoanAdd />,
              })
            }
            outline
            size="sm"
          >
            New Loan
          </Button>
        </Col>

        <Card className="border-0">
          <CardBody>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Previous Position</th>
                  <th>Current Position </th>
                  <th>Loan Type</th>
                  <th>Last Modified Date</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Some Position </td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Page>
    </div>
  );
}
