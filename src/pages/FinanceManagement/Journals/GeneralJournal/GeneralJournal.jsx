import React, { useReducer, useEffect } from "react";
import { Card, Button, Col } from "reactstrap";
import Page from "../../../../components/Page";
import CommonModals from "../../../../components/CommonModal";
import GeneralJournalForm from "./GeneralJournalForm";
import PostForm from "./PostForm";
import CustomTable from "../../../common/table";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import { _toggle, reducer, initialState } from "../../../common/ModalOptions";
import statusTypes from "../../../../config/statusTypes";

const GeneralJournal = ({
  generalJournals,
  doneAdd,
  doneEdit,
  addGeneralJournal,
  editGeneralJournal,
  donePatch,
  postGeneralJournal,
  deleteGeneralJournal,
  COAs,
  documentTypes,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    {
      path: "general_journal_lines[0].account_detail.account_number",
      label: "Account Number",
    },
    { path: "general_journal_lines[0].debit", label: "Debit" },
    { path: "general_journal_lines[0].credit", label: "Credit" },
    { path: "description", label: "Description" },
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
                  Component: GeneralJournalForm,
                  data: journal,
                  title: "View General Journal",
                  options: { COAs, documentTypes },
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
                    submit: postGeneralJournal,
                    title: "Post General Journal",
                    options: { COAs, documentTypes },
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
                    Component: GeneralJournalForm,
                    data: journal,
                    submit: editGeneralJournal,
                    title: "Edit General Journal",
                    options: { COAs, documentTypes },
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
                    Component: GeneralJournalForm,
                    data: journal,
                    submit: editGeneralJournal,
                    title: "Edit General Journal",
                    options: { COAs, documentTypes },
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
    deleteGeneralJournal(id);
  };

  useEffect(() => {
    if (doneAdd || doneEdit || donePatch) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit || donePatch]);

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
            size="sm"
            outline
            color="primary"
            onClick={() => {
              _toggle(
                {
                  type: "ADD",
                  Component: GeneralJournalForm,
                  data: {},
                  submit: addGeneralJournal,
                  title: "Add General Journal",
                  options: { COAs, documentTypes },
                },
                dispatch
              );
            }}
          >
            New General Journal
          </Button>
        </Col>
        <Card className="mainTable">
          <CustomTable
            title="General Journals"
            columns={columns}
            data={generalJournals.filter((item) => ({
              ...item,
              general_journal_lines: item["general_journal_lines"].map(
                (prop) => ({
                  ...prop,
                  description:
                    prop.account_detail.account_number +
                    " " +
                    prop.account_detail.name,
                })
              ),
            }))}
          />
        </Card>
      </Page>
    </div>
  );
};
export default GeneralJournal;
