import React, { useReducer, useEffect } from "react";
import { Card, Col, Button } from "reactstrap";
import Page from "../../../../components/Page";
import CommonModals from "../../../../components/CommonModal";
import FiscalYearForm from "./FiscalYearForm";
import CustomTable from "../../../common/table";
import { reverse } from "../../../../helpers/reverse";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import { _toggle, reducer, initialState } from "../../../common/ModalOptions";
import { getDateFormat } from "../../../../helpers/date";

const FiscalYear = ({
  fiscalYears,
  doneAdd,
  addFiscalYear,
  doneEdit,
  editFiscalYear,
  deleteFiscalYear,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "year", label: "Year" },
    { path: "start_date", label: "Start Date" },
    { path: "end_date", label: "End Date" },
    { path: "state", label: "State" },
    { path: "updated_at", label: "Last Modified" },
    {
      key: "view",
      label: "Actions",
      content: (fiscalYear) => (
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
                  Component: FiscalYearForm,
                  data: fiscalYear,
                  title: "View Fiscal Year",
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
                  Component: FiscalYearForm,
                  data: fiscalYear,
                  submit: editFiscalYear,
                  title: "Edit Fiscal Year",
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
                    id: fiscalYear.id,
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

  const okDelete = (id) => {
    deleteFiscalYear(id);
  };

  useEffect(() => {
    if (doneAdd || doneEdit) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit]);

  return (
    <div>
      <CommonModals
        size="xl"
        data={state.data}
        openModal={state.openModal}
        component={state.Component}
        title={state.title}
        toggle={_toggle}
        dispatch={dispatch}
      />
      <Page>
        <Col align="right" className="newButton">
          <Button
            onClick={() =>
              _toggle(
                {
                  type: "ADD",
                  Component: FiscalYearForm,
                  submit: addFiscalYear,
                  title: "Add Fiscal Year",
                },
                dispatch
              )
            }
            outline
            size="sm"
          >
            New Fiscal Year
          </Button>
        </Col>

        <Card className="mainTable">
          <CustomTable
            title="Fiscal Years"
            columns={columns}
            data={reverse(
              fiscalYears.map((item) => ({
                ...item,
                updated_at: getDateFormat(item.updated_at),
              }))
            )}
          />
        </Card>
      </Page>
    </div>
  );
};
export default FiscalYear;
