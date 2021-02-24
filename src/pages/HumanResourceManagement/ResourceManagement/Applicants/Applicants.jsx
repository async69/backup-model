import React, { useState } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Table, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import ApplicantsAdd from "./ApplicantsAdd";

export default function Applicants() {
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
        buttonLabel="Save Applicant"
      />
      <Page title="Applicants ">
        <Col align="right" className="newButton">
          <Button
            onClick={() =>
              setModal({
                openModal: true,

                component: <ApplicantsAdd />,
              })
            }
            outline
            size="sm"
          >
            New Applicant
          </Button>
        </Col>

        <Card className="border-0">
          <CardBody>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>First Name</th>
                  <th>City/Region</th>
                  <th>Primary Phone Number</th>
                  <th>MobilePhone Number</th>
                  <th>Email</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Code</td>
                  <td>First Name</td>
                  <td>City/Region</td>
                  <td>Primary Phone Number</td>
                  <td>MobilePhone Number</td>
                  <td>Email</td>
                  <td>Remarks</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Page>
    </div>
  );
}
