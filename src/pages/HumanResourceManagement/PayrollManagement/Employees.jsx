import React, { useEffect, useReducer } from "react";
import Page from "components/Page";
import { Link } from "react-router-dom";
import {
  Row,
  Button,
  Col,
  Card,
  CardBody,
  CardText,
  CardFooter,
} from "reactstrap";
import CommonModals from "components/CommonModal";
import Avatar from "components/Avatar";

import { _toggle, initialState, reducer } from "pages/common/ModalOptions";

export default function Employees({
  employees,
  doneAdd,
  doneEdit,
  deleteEmployee,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (doneAdd || doneEdit) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit]);

  return (
    <div>
      <Page className="mt-4 ml-2 mr-2" title="Employees">
        <CommonModals
          size="xl"
          data={state.data}
          openModal={state.openModal}
          component={state.Component}
          toggle={_toggle}
          dispatch={dispatch}
          title={state.title}
        />
        <Col align="right" className="mb-1  pl-3 pr-3"></Col>
        <Row>
          {employees.map((employee) => (
            <Col md={4} sm={6} xs={12}>
              <Card className="border-0 shadow_">
                <CardBody>
                  <Row>
                    <Col md={4} sm={6} xs={12}>
                      <Avatar size={80} src={employee.picture} />
                    </Col>
                    <Col md={8} sm={6} xs={12}>
                      <CardText>
                        <b>
                          {employee.first_name + " " + employee.father_name}
                        </b>
                      </CardText>
                      <CardText>Status : {employee.status.name}</CardText>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter align="right">
                  <Link to={`/payrollManagement/${employee.id}`}>
                    <Button color="success" outline>
                      Manage Payroll
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
      </Page>
    </div>
  );
}
