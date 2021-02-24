import React, { useReducer, useEffect } from "react";
import { Card, Button } from "reactstrap";
import Page from "../../../../components/Page";
import CommonModals from "../../../../components/CommonModal";
import CashPaymentJournalForm from "./CashPaymentJournalForm";
import PostForm from "./PostForm";
import CustomTable from "../../../common/table";
import { reverse } from "../../../../helpers/reverse";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import { _toggle, reducer, initialState } from "../../../common/ModalOptions";
import { getDateFormat } from "../../../../helpers/date";
import statusTypes from "../../../../config/statusTypes";

const CashPaymentJournal = ({
  cashPaymentJournals,
  doneAdd,
  doneEdit,
  editCashPaymentJournal,
  donePatch,
  approveCashPaymentJournal,
  postCashPaymentJournal,
  deleteCashPaymentJournal,
  COAs,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "date", label: "Date" },
    { path: "document_number", label: "Document Number" },
    // { path: "description", label: "Decription" },
    // { path: "remarks", label: "Remarks" },
    { path: "vendor.name", label: "Vendor" },
    { path: "invoice.name", label: "Invoice" },
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
                  Component: CashPaymentJournalForm,
                  data: journal,
                  title: "View Cash Payment Journal",
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
              color="edit"
              disabled={!Boolean(journal.status === statusTypes.OPEN)}
              onClick={() => {
                _toggle(
                  {
                    type: "EDIT",
                    Component: PostForm,
                    data: journal,
                    submit: postCashPaymentJournal,
                    title: "Post Cash Payment Journal",
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
          {Boolean(journal.status === statusTypes.DRAFTED) ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              disabled={!Boolean(journal.status === statusTypes.DRAFTED)}
              onClick={() => approveCashPaymentJournal(journal)}
            >
              Approve
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
                    Component: CashPaymentJournalForm,
                    data: journal,
                    submit: editCashPaymentJournal,
                    title: "Edit Cash Payment Journal",
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
    deleteCashPaymentJournal(id);
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
            title="Cash Payment Journals"
            columns={columns}
            data={reverse(
              cashPaymentJournals.map((invoice) => ({
                ...invoice,
                date: getDateFormat(invoice.date),
              }))
            )}
          />
        </Card>
      </Page>
    </div>
  );
};
export default CashPaymentJournal;
