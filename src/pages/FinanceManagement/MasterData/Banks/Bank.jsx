import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, Button, Col } from "reactstrap";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import BankAdd from "./BankAdd";
import { reverse } from "../../../../helpers/reverse";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";
import CommonModals from "../../../../components/CommonModal";

const Bank = ({ banks, addBank, editBank, deleteBank, doneAdd, doneEdit }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "document_number", label: "Document Number" },
    { path: "name", label: "Name" },
    { path: "code", label: "Code" },
    { path: "bic", label: "BIC" },
    {
      key: "view",
      label: "Actions",
      content: (banks) => (
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
                  Component: BankAdd,
                  data: banks,
                  title: "View Bank",
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
                  title: "Edit Bank",
                  type: "EDIT",
                  Component: BankAdd,
                  submit: editBank,
                  isEdit: true,
                  data: banks,
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
                    id: banks.id,
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
    deleteBank(id);
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
                  Component: BankAdd,
                  submit: addBank,
                  isEdit: true,
                  data: banks,
                },
                dispatch
              );
            }}
            outline
            size="sm"
          >
            New Bank
          </Button>
        </Col>

        <Card className="mainTable">
          <CustomTable title="Banks" columns={columns} data={reverse(banks)} />
        </Card>
      </Page>
    </div>
  );
};

export default Bank;
