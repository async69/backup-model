import React, { useReducer, useEffect } from "react";
import Page from "../../../components/Page";
import { Card, CardBody, CardHeader, Button, Col } from "reactstrap";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import CustomTable from "../../common/table";
import CurrencyModal from "./CurrencyAdd";
import { reverse } from "../../../helpers/reverse";
import { _toggle, initialState, reducer } from "../../common/ModalOptions";
import CommonModals from "../../../components/CommonModal";

export default function Currency({
  currencies,
  addCurrency,
  editCurrency,
  deleteCurrency,
  doneAdd,
  doneEdit,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "name", label: "Name" },
    { path: "symbol", label: "Symbol" },
    // { path: "accuracy", label: "Accuracy" },
    { path: "rounding_factor", label: "Rounding Factor" },
    {
      key: "view",
      label: "Actions",
      content: (currency) => (
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
                  Component: CurrencyModal,
                  data: currency,
                  title: "View Currencies",
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
                  Component: CurrencyModal,
                  submit: editCurrency,
                  title: "Edit Currency",
                  isEdit: true,
                  data: currency,
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
                    id: currency.id,
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
    deleteCurrency(id);
  };

  useEffect(() => {
    if (doneAdd || doneEdit) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit]);

  return (
    <div>
      <Page>
        <CommonModals
          size="md"
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
                  Component: CurrencyModal,
                  submit: addCurrency,
                  title: "Add Currency",
                  data: {},
                },
                dispatch
              );
            }}
            outline
            size="sm"
          >
            New Currency
          </Button>
        </Col>

        <Card className="border-0">
          <Col md={12} sm={12} xs={12}>
            <CardHeader className="border-0">Currency </CardHeader>
          </Col>
          <CardBody>
            <CustomTable columns={columns} data={reverse(currencies)} />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
}
