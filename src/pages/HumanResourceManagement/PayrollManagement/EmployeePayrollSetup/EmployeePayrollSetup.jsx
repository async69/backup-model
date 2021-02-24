import React, { useEffect, useReducer } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import EmployeeSalaryAdd from "./EmployeePayrollSetupAdd";
import { _toggle, initialState, reducer } from "pages/common/ModalOptions";
import CustomTable from "pages/common/table";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";

export default function EmployeeSalary({
  employeeSalarys,
  options,
  doneAdd,
  addEmployeeSalary,
  doneEdit,
  editEmployeeSalary,
  deleteEmployeeSalary,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "gross_salary", label: "Basic Salary" },
    { path: "total_working_hours", label: "Monthly Working Hours" },
    { path: "remarks", label: "Remarks" },
    {
      key: "view",
      label: "Actions",
      content: (employeeSalary) => (
        <>
          <Button
            className="m-1"
            size="sm"
            outline
            color="blue"
            onClick={() => {
              _toggle(
                {
                  type: "VIEW",
                  Component: EmployeeSalaryAdd,
                  data: employeeSalary,
                  title: "View Employee Salary",
                },
                dispatch
              );
            }}
          >
            <MdRemoveRedEye />
          </Button>
          <Button
            className="m-1"
            size="sm"
            outline
            color="warning"
            onClick={() => {
              _toggle(
                {
                  type: "EDIT",
                  Component: EmployeeSalaryAdd,
                  submit: editEmployeeSalary,
                  data: employeeSalary,
                  title: "Edit Employee Salary",
                },
                dispatch
              );
            }}
          >
            <MdEdit />
          </Button>
          <Button
            className="m-1"
            size="sm"
            outline
            color="danger"
            onClick={() => {
              _toggle(
                {
                  type: "DELETE",
                  deleteOptions: {
                    okCallback: okDelete,
                    title: "Are you sure?",
                    id: employeeSalary.id,
                    message: "",
                  },
                },
                dispatch
              );
            }}
          >
            <MdDelete />
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    if (doneAdd || doneEdit) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit]);

  const okDelete = (id) => {
    deleteEmployeeSalary(id);
  };

  return (
    <div>
      <Page>
        <CommonModals
          size="xl"
          data={state.data}
          openModal={state.openModal}
          component={state.Component}
          toggle={_toggle}
          dispatch={dispatch}
          title={state.title}
        />
        <Col align="right" className="newButton">
          {employeeSalarys.filter(
            (employeeSalary) =>
              employeeSalary.employee.id === options.employee.id
          ).length === 0 && (
            <Button
              onClick={() => {
                _toggle(
                  {
                    type: "ADD",
                    Component: EmployeeSalaryAdd,
                    submit: addEmployeeSalary,
                    title: "New Salary",
                    options,
                  },
                  dispatch
                );
              }}
              outline
              size="sm"
            >
              New Salary
            </Button>
          )}
        </Col>

        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="Salary"
              columns={columns}
              data={employeeSalarys.filter(
                (employeeSalary) =>
                  employeeSalary.employee.id === options.employee.id
              )}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
}
