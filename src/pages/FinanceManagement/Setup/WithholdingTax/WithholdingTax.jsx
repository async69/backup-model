import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import WithholdingTaxForm from "./WithholdingTaxForm";
import CustomTable from "../../../common/table";
import { reverse } from "../../../../helpers/reverse";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import { _toggle, reducer, initialState } from "../../../common/ModalOptions";
import { getDateFormat } from "../../../../helpers/date";

const WithholdingTax = ({
  addWithholdingTax,
  editWithholdingTax,
  deleteWithholdingTax,
  taxes,
  doneAdd,
  doneEdit,
  fiscalYears,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const okDelete = (id) => {
    deleteWithholdingTax(id);
  };

  useEffect(() => {
    if (doneAdd || doneEdit) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit]);

  const columns = [
    { path: "item_type", label: "Item Type" },
    { path: "min_amount", label: "Min. Amount" },
    { path: "max_amount", label: "Max. Amount" },
    { path: "withholding_value", label: "Withholding Value" },
    { path: "updated_at", label: "Last Modified" },
    {
      key: "view",
      label: "Actions",
      content: (tax) => (
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
                  Component: WithholdingTaxForm,
                  data: tax,
                  title: "View Withholding Tax",
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
                  Component: WithholdingTaxForm,
                  data: tax,
                  submit: editWithholdingTax,
                  title: "Edit Withholding Tax",
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
                    id: tax.id,
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
                  Component: WithholdingTaxForm,
                  submit: addWithholdingTax,
                  title: "Add Withholding Tax",
                },
                dispatch
              )
            }
            outline
            size="sm"
          >
            New WithholdingTax
          </Button>
        </Col>
        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="Withholding Taxes"
              columns={columns}
              data={reverse(
                taxes.map((item) => ({
                  ...item,
                  updated_at: getDateFormat(item.updated_at),
                }))
              )}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
};

export default WithholdingTax;
