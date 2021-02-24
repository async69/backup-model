import React, { useState } from "react";
import Page from "../../../components/Page";
import { Card, CardBody, CardHeader, Table, Button, Col } from "reactstrap";
import CommonModals from "../../../components/CommonModal";
import EntryTypeAdd from "./EntryTypeAdd";

export default function EntryType() {
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
        buttonLabel="Save Entry Type"
      />

      <Page>
        <Col align="right" className="newButton">
          <Button
            onClick={() =>
              setModal({
                openModal: true,

                component: <EntryTypeAdd />,
              })
            }
            outline
            size="sm"
          >
            New Entry Type
          </Button>
        </Col>

        <Card className="border-0">
          <Col md={12} sm={12} xs={12}>
            <CardHeader className="border-0">Entry Types </CardHeader>
          </Col>
          <CardBody>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>status </th>
                  <th>data type-</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>name </td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Page>
    </div>
  );
}
