import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import PayrollPostingGroupAdd from "./PayrollPostiongGroupAdd";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";

const PayrollPostingGroup = ({
  doneAdd,
  addPayrollPostingGroup,
  doneEdit,
  editPayrollPostingGroup,
  deletePayrollPostingGroup,
  payrollPostingGroups,
  chartOfAccounts,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "salary_expense_account.name", label: "Salary Expense Account" },
    { path: "overtime_account.name", label: "Overtime Account" },
    { path: "employee_pension_account.name", label: "Emplyee Pension Account" },
    {
      path: "transport_allowance_account.name",
      label: "Transport Allowance Account",
    },
    { path: "loan_account.name", label: "Loan Account" },
    { path: "local_sales_account.name", label: "Local Sales Account" },
    { path: "income_tax_account.name", label: "Income Tax Account" },
    {
      path: "pension_contribution_account.name",
      label: "Pension Contribution Account",
    },
    {
      key: "view",
      label: "Actions",
      content: (payrollPostingGroups) => (
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
                  Component: PayrollPostingGroupAdd,
                  data: payrollPostingGroups,
                  title: "View PayrollPostingGroup",
                  options: chartOfAccounts,
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
                  Component: PayrollPostingGroupAdd,
                  submit: editPayrollPostingGroup,
                  data: payrollPostingGroups,
                  title: "Edit PayrollPostingGroup",
                  options: chartOfAccounts,
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
                    id: payrollPostingGroups.id,
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
    deletePayrollPostingGroup(id);
  };

  return (
    <div>
      <Page
        title="PayrollPostingGroup"
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
                  Component: PayrollPostingGroupAdd,
                  submit: addPayrollPostingGroup,
                  title: "New PayrollPostingGroup",
                  options: chartOfAccounts,
                },
                dispatch
              )
            }
            outline
            size="sm"
          >
            New Payroll Posting Group
          </Button>
        </Col>
        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="Payroll Posting Groups"
              columns={columns}
              data={payrollPostingGroups}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
};

export default PayrollPostingGroup;
