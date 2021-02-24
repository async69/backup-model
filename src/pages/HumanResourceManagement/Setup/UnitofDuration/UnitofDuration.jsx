import React, { useState } from "react";
import Page from "../../../../components/Page";
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  Button,
  Col,
  Collapse,
} from "reactstrap";
import UnitofDurationAdd from "./UnitofDurationAdd";

export default function UnitofDuration() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [status, setStatus] = useState("New Unit of Duration ");
  const onExited = () => setStatus("New Unit of Duration ");
  const onEntered = () => setStatus("Hide Form");

  return (
    <div>
      <Page title="Unit of Duration  ">
        <Col align="right" className="mb-4 pl-3 pr-3">
          <Button outline size="md" onClick={toggle}>
            {" "}
            {status}
          </Button>
        </Col>
        <Collapse
          className="mb-3"
          isOpen={isOpen}
          onEntered={onEntered}
          onExited={onExited}
        >
          <UnitofDurationAdd />
        </Collapse>
        <Card className="border-0">
          <Col>
            <CardHeader className="border-0">Unit of Duration </CardHeader>
          </Col>
          <CardBody>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> Code </td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Page>
    </div>
  );
}
