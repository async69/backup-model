import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, Button, Col } from "reactstrap";
import GoodReceivingNoteForm from "./GoodReceivingNoteForm";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";
import CommonModals from "../../../../components/CommonModal";
import statusTypes from "../../../../config/statusTypes";
import { FaHandHolding } from "react-icons/fa";

const GoodReceivingNote = ({
  goodReceivingNotes,
  addGoodReceivingNote,
  editGoodReceivingNote,
  deleteGoodReceivingNote,
  receiveGoodReceivingNote,
  doneAdd,
  doneEdit,
  donePatch,
  items,
  unitMeasurements,
  warehouses,
  bins,
  purchaseTypes,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "document_number", label: "Document No." },
    { path: "purchase_order_no", label: "Purchase Order No" },
    { path: "posting_date", label: "Posting Date" },
    { path: "status", label: "Status" },
    {
      key: "view",
      label: "Actions",
      content: (goodReceivingNote) => (
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
                  Component: GoodReceivingNoteForm,
                  data: goodReceivingNote,
                  title: "View Good Receiving Note",
                  options: {
                    items,
                    unitMeasurements,
                    warehouses,
                    bins,
                    purchaseTypes,
                  },
                },
                dispatch
              );
            }}
          >
            <MdRemoveRedEye />
          </Button>
          {goodReceivingNote.status === statusTypes.OPEN ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="edit"
              onClick={() => {
                _toggle(
                  {
                    type: "EDIT",
                    Component: GoodReceivingNoteForm,
                    submit: editGoodReceivingNote,
                    isEdit: true,
                    data: goodReceivingNote,
                    title: "Edit Good Receiving Note",
                    options: {
                      items,
                      unitMeasurements,
                      warehouses,
                      bins,
                      purchaseTypes,
                    },
                  },
                  dispatch
                );
              }}
            >
              <MdEdit />
            </Button>
          ) : (
            <></>
          )}
          {goodReceivingNote.status === statusTypes.OPEN ? (
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
                      id: goodReceivingNote.id,
                      message: "",
                    },
                  },
                  dispatch
                );
              }}
            >
              <MdDelete />
            </Button>
          ) : (
            <></>
          )}
          {goodReceivingNote.status === statusTypes.OPEN ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() => {
                _toggle(
                  {
                    type: "POST",
                    submit: receiveGoodReceivingNote,
                    submitButtonLabel: "Receive",
                    data: goodReceivingNote,
                    title: "Receive",
                    purchaseTypes,
                  },
                  dispatch
                );
              }}
            >
              <FaHandHolding className="mr-2 mb-1" /> Receive
            </Button>
          ) : (
            <></>
          )}
        </>
      ),
    },
  ];

  const okDelete = (id) => {
    deleteGoodReceivingNote(id);
  };

  useEffect(() => {
    if (doneAdd || doneEdit || donePatch) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit, donePatch]);

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
                  Component: GoodReceivingNoteForm,
                  submit: addGoodReceivingNote,
                  isEdit: true,
                  options: {
                    items,
                    unitMeasurements,
                    warehouses,
                    bins,
                    purchaseTypes,
                  },
                },
                dispatch
              );
            }}
            outline
            size="sm"
          >
            New Good Receiving Note
          </Button>
        </Col>

        <Card className="mainTable">
          <CustomTable
            title="Good Receiving Notes"
            columns={columns}
            data={goodReceivingNotes.map((item) => ({
              ...item,
              // order_date: getDateFormat(item.order_date),
              // approved_date: getDateFormat(item.approved_date),
              // due_date: getDateFormat(item.due_date),
              // updated_at: getDateFormat(item.updated_at),
            }))}
          />
        </Card>
      </Page>
    </div>
  );
};

export default GoodReceivingNote;
