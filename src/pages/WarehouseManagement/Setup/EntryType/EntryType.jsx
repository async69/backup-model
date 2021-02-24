import React, { useReducer, useEffect } from "react";
import Page from "components/Page";
import { Card, Button, Col } from "reactstrap";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import EntryTypeAdd from "./EntryTypeAdd";
import { reverse } from "helpers/reverse";
import CustomTable from "pages/common/table";
import { _toggle, initialState, reducer } from "pages/common/ModalOptions";
import CommonModals from "components/CommonModal";

const EntryType = ({
  EntryTypes,
  addEntryType,
  editEntryType,
  deleteEntryType,
  doneAdd,
  doneEdit,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "code", label: "Code" },
    { path: "name", label: "Name" },
    { path: "remarks", label: "Remarks" },

    {
      key: "view",
      label: "Actions",
      content: (EntryTypes) => (
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
                  Component: EntryTypeAdd,
                  data: EntryTypes,
                  title: "View EntryTypes",
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
                  title: "Edit Entry Type",
                  Component: EntryTypeAdd,
                  submit: editEntryType,
                  isEdit: true,
                  data: EntryTypes,
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
                    id: EntryTypes.id,
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
    deleteEntryType(id);
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
                  Component: EntryTypeAdd,
                  submit: addEntryType,
                  isEdit: true,
                  data: EntryTypes,
                },
                dispatch
              );
            }}
            outline
            size="sm"
          >
            New EntryType
          </Button>
        </Col>

        <Card className="mainTable">
          <CustomTable
            title="Entry Types"
            columns={columns}
            data={EntryTypes}
          />
        </Card>
      </Page>
    </div>
  );
};

export default EntryType;
