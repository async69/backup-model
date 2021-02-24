import React, { useEffect, useReducer } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import EmployeeOvertimeAdd from "./EmployeeOvertimeAdd";
import { _toggle, initialState, reducer } from "pages/common/ModalOptions";
import CustomTable from "pages/common/table";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";

export default function EmployeeOvertime({
  employeeOvertimes,
  options,
  doneAdd,
  addEmployeeOvertime,
  doneEdit,
  editEmployeeOvertime,
  deleteEmployeeOvertime,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "from_date", label: "From Date" },
    { path: "to_date", label: "To Date" },
    { path: "total_overtime_amount", label: "Total Overtime Amount" },
    { path: "remarks", label: "Remarks" },
    {
      key: "view",
      label: "Actions",
      content: (employeeOvertime) => (
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
                  Component: EmployeeOvertimeAdd,
                  data: employeeOvertime,
                  title: "View Employee Overtime",
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
                  Component: EmployeeOvertimeAdd,
                  submit: editEmployeeOvertime,
                  data: employeeOvertime,
                  title: "Edit Employee Overtime",
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
                    id: employeeOvertime.id,
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
    deleteEmployeeOvertime(id);
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
          <Button
            onClick={() => {
              _toggle(
                {
                  type: "ADD",
                  Component: EmployeeOvertimeAdd,
                  submit: addEmployeeOvertime,
                  title: "New Overtime",
                  options,
                },
                dispatch
              );
            }}
            outline
            size="sm"
          >
            New Overtime
          </Button>
        </Col>

        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="Over Time "
              columns={columns}
              data={employeeOvertimes.filter(
                (employeeOvertime) =>
                  employeeOvertime.employee.id === options.employee.id
              )}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
}
