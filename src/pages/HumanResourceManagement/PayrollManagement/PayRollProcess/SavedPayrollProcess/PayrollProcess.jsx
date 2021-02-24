import React, { useEffect, useReducer } from "react";
import Page from "components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CommonModals from "components/CommonModal";
import { _toggle, initialState, reducer } from "pages/common/ModalOptions";
import { MdRemoveRedEye, MdLocalPostOffice } from "react-icons/md";
import CustomTable from "pages/common/table";
import PayrollProcessAdd from "./PayrollProcessAdd";
import statusTypes from "config/statusTypes";

export default function PayrollProcess({
  payrollProcesss,
  doneAdd,
  doneEdit,
  savePayrollProcess,
  postPayrollProcess,
  donePatch,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "from_date", label: "From Date" },
    { path: "to_date", label: "To Date" },
    { path: "total_employee_pension", label: "Total Employee Pension" },
    { path: "total_pension_contribution", label: "Total Pension Contribution" },
    { path: "total_salary", label: "Total Salary" },
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
                    size: "md",
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
    if (doneAdd || doneEdit || donePatch) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit, donePatch]);

  console.log("payrollProcesss", payrollProcesss);

  return (
    <div>
      <Page>
        <CommonModals
          // size="xl"
          data={state.data}
          openModal={state.openModal}
          component={state.Component}
          toggle={_toggle}
          dispatch={dispatch}
          title={state.title}
          size={state.size}
        />
        <Col align="right" className="newButton">
          {/* {!_.isEmpty(payrollProcesss) && (
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
          )} */}
        </Col>

        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="Saved Payroll Process"
              columns={columns}
              data={payrollProcesss}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
}
