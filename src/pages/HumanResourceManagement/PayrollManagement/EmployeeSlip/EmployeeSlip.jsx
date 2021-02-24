import React, { useEffect, useReducer } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import { _toggle, initialState, reducer } from "pages/common/ModalOptions";
import CustomTable from "pages/common/table";
// import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import _ from "lodash";

export default function EmployeeSlip({
  employeeSlips,
  options,
  doneAdd,
  doneEdit,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "basic_salary", label: "Basic Salary" },
    { path: "income_tax", label: "Income Tax" },
    { path: "net_salary", label: "Net Salary" },
    { path: "total_deduction", label: "Total Deduction" },
    { path: "non_taxable_income", label: "Non Taxabke Income" },
    { path: "taxable_income", label: "Taxable Income" },
    { path: "employee_pension", label: "Employee Pension" },
    { path: "employer_pension", label: "Employer Pension" },
    { path: "from_date", label: "From Date" },
    { path: "to_date", label: "To Date" },
    // {
    //   key: "view",
    //   content: (employeeSlip) => (
    //     <>
    //       <Button
    //         className="m-1"
    //         size="sm"
    //         outline
    //         color="primary"
    //         onClick={() => {
    //           _toggle(
    //             {
    //               type: "VIEW",
    //               Component: EmployeeSlipAdd,
    //               data: employeeSlip,
    //               title: "View Employee Overtime",
    //             },
    //             dispatch
    //           );
    //         }}
    //       >
    //         <MdRemoveRedEye />
    //       </Button>
    //       <Button
    //         className="m-1"
    //         size="sm"
    //         outline
    //         color="warning"
    //         onClick={() => {
    //           _toggle(
    //             {
    //               type: "EDIT",
    //               Component: EmployeeSlipAdd,
    //               submit: editEmployeeSlip,
    //               data: employeeSlip,
    //               title: "Edit Employee Overtime",
    //             },
    //             dispatch
    //           );
    //         }}
    //       >
    //         <MdEdit />
    //       </Button>
    //       <Button
    //         className="m-1"
    //         size="sm"
    //         outline
    //         color="danger"
    //         onClick={() => {
    //           _toggle(
    //             {
    //               type: "DELETE",
    //               deleteOptions: {
    //                 okCallback: okDelete,
    //                 title: "Are you sure?",
    //                 id: employeeSlip.id,
    //                 message: "",
    //               },
    //             },
    //             dispatch
    //           );
    //         }}
    //       >
    //         <MdDelete />
    //       </Button>
    //     </>
    //   ),
    // },
  ];

  useEffect(() => {
    if (doneAdd || doneEdit) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit]);

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
        <Col align="right" className="newButton"></Col>

        <Card className="border-0">
          <CardBody>
            {!_.isEmpty(employeeSlips) && (
              <CustomTable
                title="Employee Slip "
                columns={columns}
                data={[employeeSlips]}
              />
            )}
          </CardBody>
        </Card>
      </Page>
    </div>
  );
}
