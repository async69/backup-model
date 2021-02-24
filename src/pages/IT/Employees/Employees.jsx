import React, { useReducer, useEffect } from "react";
import Page from "../../../components/Page";
import { Card, CardBody, CardHeader, Button, Col } from "reactstrap";
import { MdRemoveRedEye, MdEdit } from "react-icons/md";
import CustomTable from "../../common/table";
import { _toggle, initialState, reducer } from "../../common/ModalOptions";
import CommonModals from "../../../components/CommonModal";
import Permissions from "./Permissions";

const Employees = ({ employees, patchEmployee, editITEmployee, doneEdit }) => {
  console.log("employees", employees);
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "firstName", label: "First Name" },
    { path: "lastName", label: "Last Name" },
    { path: "department", label: "Department" },
    {
      key: "view",
      label: "Actions",
      content: (employee) => (
        <>
          {Boolean(employee.hasAccount) ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="info"
              onClick={() => {
                _toggle(
                  {
                    type: "VIEW",
                    Component: Permissions,
                    data: employee,
                    title: "View Employee",
                  },
                  dispatch
                );
              }}
            >
              <MdRemoveRedEye />
            </Button>
          ) : (
            <></>
          )}
          {!Boolean(employee.hasAccount) ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="info"
              onClick={() => patchEmployee(employee)}
            >
              Add Account
            </Button>
          ) : (
            <></>
          )}
          {Boolean(employee.hasAccount) ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="info"
              onClick={() => {
                _toggle(
                  {
                    type: "EDIT",
                    Component: Permissions,
                    data: employee,
                    title: "Edit Employee",
                    submit: editITEmployee,
                  },
                  dispatch
                );
              }}
            >
              <MdEdit />
            </Button>
          ) : (
            <></>
          )}
        </>
      ),
    },
  ];

  useEffect(() => {
    if (doneEdit) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneEdit]);

  return (
    <div>
      <CommonModals
        size="xl"
        data={state.data}
        openModal={state.openModal}
        component={state.Component}
        toggle={_toggle}
        dispatch={dispatch}
        title={state.title}
      />
      <Page>
        <Card className="border-0">
          <Col md={12} sm={12} xs={12}>
            <CardHeader className="border-0">Employees</CardHeader>
          </Col>
          <CardBody>
            <CustomTable columns={columns} data={employees} />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
};

export default Employees;
