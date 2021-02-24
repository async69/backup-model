import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import PayrollRateAdd from "./PayrollRateAdd";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";

const PayrollRate = ({
  doneAdd,
  addPayrollRate,
  doneEdit,
  editPayrollRate,
  deletePayrollRate,
  payrollRates,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "employee_pension_rate", label: "Employee Pension Rate" },
    { path: "employer_pension_rate", label: "Employer Pension Rate" },
    { path: "holiday_overtime_rate", label: "Holiday Overtime Rate" },
    { path: "night_overtime_rate", label: "Night Overtime Rate" },
    { path: "weekend_overtime_rate", label: "Weekend Overtime Rate" },
    { path: "overtime_rate", label: "Overtime Rate" },
    { path: "remarks", label: "Remarks" },
    {
      key: "view",
      label: "Actions",
      content: (payrollRates) => (
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
                  Component: PayrollRateAdd,
                  data: payrollRates,
                  title: "View Payroll Rate",
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
                  Component: PayrollRateAdd,
                  submit: editPayrollRate,
                  data: payrollRates,
                  title: "Edit Payroll Rate",
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
                    id: payrollRates.id,
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
    deletePayrollRate(id);
  };

  return (
    <div>
      <Page
        title="Payroll Rate"
        breadcrumbs={[{ name: "Human Resource", active: true }]}
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
        <Col align="right" className="newButton">
          <Button
            onClick={() =>
              _toggle(
                {
                  type: "ADD",
                  Component: PayrollRateAdd,
                  submit: addPayrollRate,
                  title: "New Payroll Rate",
                },
                dispatch
              )
            }
            outline
            size="sm"
          >
            New Payroll Rate
          </Button>
        </Col>
        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="Payroll Rates"
              columns={columns}
              data={payrollRates}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
};

export default PayrollRate;
