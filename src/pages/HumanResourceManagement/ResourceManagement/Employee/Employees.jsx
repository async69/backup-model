import React, { useEffect, useReducer } from "react";
import Page from "../../../../components/Page";
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
import EmployeeFilter from "./EmployeeFilter";
import EmployeeAdd from "./EmployeeAdd";
import Avatar from "components/Avatar";
import { _toggle, initialState, reducer } from "pages/common/ModalOptions";

export default function Employees({
  employees,
  options,
  doneAdd,
  addEmployee,
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
      <Page
        title={`Employees (${employees && employees.length})`}
        className="cr-page"
      >
        <CommonModals
          size="xl"
          data={state.data}
          openModal={state.openModal}
          component={state.Component}
          toggle={_toggle}
          dispatch={dispatch}
          title={state.title}
        />
        <Col align="right" className="mb-1  pl-3 pr-3">
          <Button
            className="mr-2"
            onClick={() => {
              _toggle(
                {
                  type: "EDIT",
                  Component: EmployeeFilter,
                  title: "Filter Employee",
                },
                dispatch
              );
            }}
            outline
            size="sm"
          >
            Filter Employee
          </Button>

          <Button
            className="m-2"
            onClick={() => {
              _toggle(
                {
                  type: "ADD",
                  Component: EmployeeAdd,
                  submit: addEmployee,
                  title: "New Employee",
                  options,
                },
                dispatch
              );
            }}
            outline
            size="sm"
          >
            New Employee
          </Button>
        </Col>
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
                  <Link to={`/singleEmployee/${employee.id}`}>
                    <Button color="primary" outline size="sm">
                      Manage Employee
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
        {/* <PDFViewer width="600" height="1000">
          <Print invoice={invoice} />
        </PDFViewer> */}
      </Page>
    </div>
  );
}
