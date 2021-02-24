import React, { useState } from "react";
import Page from "../../../components/Page";
import { Card, CardBody, CardHeader, Table, Button, Col } from "reactstrap";
import CommonModals from "../../../components/CommonModal";
import CompanyAdd from "./CompanyAdd";

export default function Company() {
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
        buttonLabel="Save Company"
      />

      <Page>
        <Col align="right" className="newButton">
          <Button
            onClick={() =>
              setModal({
                openModal: true,

                component: <CompanyAdd />,
              })
            }
            outline
            size="sm"
          >
            New Company
          </Button>
        </Col>

        <Card className="border-0">
          <Col md={12} sm={12} xs={12}>
            <CardHeader className="border-0">Company </CardHeader>
          </Col>
          <CardBody>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email </th>
                  <th>SubCity</th>
                  <th>Country</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Name </td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Page>
    </div>
  );
}
