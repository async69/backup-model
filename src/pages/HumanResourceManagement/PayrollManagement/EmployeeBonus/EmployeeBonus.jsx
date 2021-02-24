import React, { useEffect, useReducer } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import EmployeeBonusAdd from "./EmployeeBonusAdd";
import { _toggle, initialState, reducer } from "pages/common/ModalOptions";
import CustomTable from "pages/common/table";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";

export default function EmployeeBonus({
  employeeBonuss,
  options,
  doneAdd,
  addEmployeeBonus,
  doneEdit,
  editEmployeeBonus,
  deleteEmployeeBonus,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "from_date", label: "From Date" },
    { path: "to_date", label: "To Date" },
    { path: "bonus", label: "Bonus" },
    { path: "remarks", label: "Remarks" },
    {
      key: "view",
      label: "Actions",
      content: (employeeBonus) => (
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
                  Component: EmployeeBonusAdd,
                  data: employeeBonus,
                  title: "View Employee Bonues",
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
                  Component: EmployeeBonusAdd,
                  submit: editEmployeeBonus,
                  data: employeeBonus,
                  title: "Edit Employee Bonues",
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
                    id: employeeBonus.id,
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
    deleteEmployeeBonus(id);
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
                  Component: EmployeeBonusAdd,
                  submit: addEmployeeBonus,
                  title: "New Overtime",
                  options,
                },
                dispatch
              );
            }}
            outline
            size="sm"
          >
            New Bonus
          </Button>
        </Col>

        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="Bonuses"
              columns={columns}
              data={employeeBonuss.filter(
                (employeeBonus) =>
                  employeeBonus.employee.id === options.employee.id
              )}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
}
