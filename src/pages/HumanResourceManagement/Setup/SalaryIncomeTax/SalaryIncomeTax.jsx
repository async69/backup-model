import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import SalaryIncomeTaxAdd from "./SalaryIncomeTaxAdd";
import { MdRemoveRedEye, MdEdit } from "react-icons/md";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";

const SalaryIncomeTax = ({
  doneAdd,
  addSalaryIncomeTax,
  doneEdit,
  editSalaryIncomeTax,
  deleteSalaryIncomeTax,
  salaryIncomeTaxes,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "from_salary", label: "From Salary" },
    { path: "to_salary", label: "To Salary" },
    { path: "deduction", label: "Deduction" },
    { path: "tax", label: "Tax" },
    { path: "remarks", label: "Remarks" },
    {
      key: "view",
      label: "Actions",
      content: (salaryIncomeTaxes) => (
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
                  Component: SalaryIncomeTaxAdd,
                  data: salaryIncomeTaxes,
                  title: "View Salary Income Tax",
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
                  Component: SalaryIncomeTaxAdd,
                  submit: editSalaryIncomeTax,
                  data: salaryIncomeTaxes,
                  title: "Edit Salary Income Tax",
                },
                dispatch
              );
            }}
          >
            <MdEdit />
          </Button>
          {/* <Button
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
                    id: salaryIncomeTaxes.id,
                    message: "",
                  },
                },
                dispatch
              );
            }}
          >
            <MdDelete />
          </Button> */}
        </>
      ),
    },
  ];

  useEffect(() => {
    if (doneAdd || doneEdit) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit]);

  return (
    <div>
      <Page
        title="Salary Income Tax"
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
                  Component: SalaryIncomeTaxAdd,
                  submit: addSalaryIncomeTax,
                  title: "New Salary Income Tax",
                },
                dispatch
              )
            }
            outline
            size="sm"
          >
            New Salary Income Tax
          </Button>
        </Col>
        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="Salary Income Taxes"
              columns={columns}
              data={salaryIncomeTaxes}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
};

export default SalaryIncomeTax;
