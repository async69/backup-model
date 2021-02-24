import React, { useEffect, useReducer } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, CardHeader, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import { _toggle, initialState, reducer } from "pages/common/ModalOptions";
import { MdRemoveRedEye, MdLocalPostOffice } from "react-icons/md";
import CustomTable from "pages/common/table";
import LoadingSpinner from "components/PageSpinner";
import PayrollProcessAdd from "./PayrollProcessAdd";
import _ from "lodash";
import statusTypes from "../../../../config/statusTypes";

export default function SavedPayrollProcess({
  payrollProcesss,
  doneAdd,
  doneEdit,
  savePayrollProcess,
  saveAddStatus,
  postPayrollProcess,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "from_date", label: "From Date" },
    { path: "to_date", label: "To Date" },
    { path: "total_employee_pension", label: "Total Employee Pension" },
    { path: "total_loan", label: "Total Loan" },
    { path: "total_local_sales", label: "Total Local Sales" },
    { path: "total_overtime", label: "Total Overtime" },
    { path: "total_pension_contribution", label: "Total Pension Contribution" },
    { path: "total_salary", label: "Total Salary" },
    { path: "total_transport_allowance", label: "Total Transport Allowance" },
    { path: "status", label: "Status" },

    {
      key: "view",
      label: "Actions",
      content: (payrollProcess) => (
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
                  Component: PayrollProcessAdd,
                  data: payrollProcess,
                  title: "View Payroll",
                },
                dispatch
              );
            }}
          >
            <MdRemoveRedEye />
          </Button>
          {payrollProcess.status === statusTypes.SAVED && (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() => {
                _toggle(
                  {
                    type: "POST",
                    submit: postPayrollProcess,
                    submitButtonLabel: "Post",
                    data: payrollProcess,
                    title: "Post",
                  },
                  dispatch
                );
              }}
            >
              <MdLocalPostOffice /> Post
            </Button>
          )}
        </>
      ),
    },
  ];

  useEffect(() => {
    if (doneAdd || doneEdit) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit]);

  const okSave = () => {
    savePayrollProcess(payrollProcesss);
  };

  console.log("payrollProcesss", payrollProcesss);

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
          {!_.isEmpty(payrollProcesss) && (
            <Button
              onClick={() => {
                _toggle(
                  {
                    type: "DELETE",
                    deleteOptions: {
                      okCallback: okSave,
                      title: "Are you sure?",
                      message: "",
                    },
                  },
                  dispatch
                );
              }}
              outline
              size="sm"
              disabled={saveAddStatus === "pending"}
            >
              {saveAddStatus === "pending" ? <LoadingSpinner /> : "Save"}
            </Button>
          )}
        </Col>

        <Card className="border-0">
          <CardBody>
            {!_.isEmpty(payrollProcesss) && (
              <CustomTable
                title="Saved Payroll Process"
                columns={columns}
                data={[payrollProcesss]}
              />
            )}
          </CardBody>
        </Card>
      </Page>
    </div>
  );
}
