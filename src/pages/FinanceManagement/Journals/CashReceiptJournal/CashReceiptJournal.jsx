import React, { useReducer, useEffect } from "react";
import { Card, Button } from "reactstrap";
import Page from "../../../../components/Page";
import CommonModals from "../../../../components/CommonModal";
import CashReceiptJournalForm from "./CashReceiptJournalForm";
import PostForm from "./PostForm";
import CustomTable from "../../../common/table";
import { reverse } from "../../../../helpers/reverse";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import { _toggle, reducer, initialState } from "../../../common/ModalOptions";
import { getDateFormat } from "../../../../helpers/date";
import statusTypes from "../../../../config/statusTypes";

const CashReceiptJournal = ({
  cashReceiptJournals,
  doneAdd,
  doneEdit,
  editCashReceiptJournal,
  donePatch,
  postCashReceiptJournal,
  approveCashReceiptJournal,
  deleteCashReceiptJournal,
  COAs,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "date", label: "Posting Date" },
    { path: "sales_order.order_number", label: "Sales Order No." },
    { path: "customer.document_number", label: "Customer Number" },
    { path: "customer.name", label: "Customer Name" },

    // { path: "", label: "Document Type" },
    // { path: "invoice.name", label: "Ref No." },
    // { path: "", label: "External Number" },
    // { path: "document_number", label: "Document Number" },
    // { path: "description", label: "Description" },

    {
      key: "view",
      label: "Actions",
      content: (journal) => (
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
                  Component: CashReceiptJournalForm,
                  data: journal,
                  title: "View Cash Receipt Journal",
                  options: { COAs },
                },
                dispatch
              );
            }}
          >
            <MdRemoveRedEye />
          </Button>
          {Boolean(journal.status === statusTypes.OPEN) ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              disabled={!Boolean(journal.status === statusTypes.OPEN)}
              onClick={() => {
                _toggle(
                  {
                    type: "EDIT",
                    Component: PostForm,
                    data: journal,
                    submit: postCashReceiptJournal,
                    title: "Post Cash Receipt Journal",
                    options: { COAs },
                  },
                  dispatch
                );
              }}
            >
              Post
            </Button>
          ) : (
            <></>
          )}
          {Boolean(journal.status === statusTypes.OPEN) ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="edit"
              disabled={!Boolean(journal.status === statusTypes.OPEN)}
              onClick={() => {
                _toggle(
                  {
                    type: "EDIT",
                    Component: CashReceiptJournalForm,
                    data: journal,
                    submit: editCashReceiptJournal,
                    title: "Edit Cash Receipt Journal",
                    options: { COAs },
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
          {Boolean(journal.status === statusTypes.DRAFTED) ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="edit"
              disabled={!Boolean(journal.status === statusTypes.DRAFTED)}
              onClick={() => {
                _toggle(
                  {
                    type: "EDIT",
                    Component: CashReceiptJournalForm,
                    data: journal,
                    submit: editCashReceiptJournal,
                    title: "Edit Cash Receipt Journal",
                    options: { COAs },
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
          {Boolean(journal.status === statusTypes.DRAFTED) ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="danger"
              disabled={!Boolean(journal.status === statusTypes.DRAFTED)}
              onClick={() => {
                _toggle(
                  {
                    type: "DELETE",
                    deleteOptions: {
                      okCallback: okDelete,
                      title: "Are you sure?",
                      id: journal.id,
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
        </>
      ),
    },
  ];

  const okDelete = (id) => {
    deleteCashReceiptJournal(id);
  };

  useEffect(() => {
    if (doneAdd || doneEdit || donePatch) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit || donePatch]);

  return (
    <div>
      <CommonModals
        size="xl"
        data={state.data}
        openModal={state.openModal}
        component={state.Component}
        toggle={_toggle}
        dispatch={dispatch}
        title={state.title}
      />
      <Page>
        <Card className="mainTable">
          <CustomTable
            title="Cash Recept Journal"
            columns={columns}
            data={reverse(
              cashReceiptJournals.map((invoice) => ({
                ...invoice,
                customer_name: invoice.customer.customer_name,
                approved_date: getDateFormat(invoice.approved_date),
              }))
            )}
          />
        </Card>
      </Page>
    </div>
  );
};
export default CashReceiptJournal;
