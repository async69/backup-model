import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import InventoryPostingGroupForm from "./InventoryPostingGroupAdd";
import CustomTable from "../../../common/table";
import { reverse } from "../../../../helpers/reverse";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import { _toggle, reducer, initialState } from "../../../common/ModalOptions";
import { getDateFormat } from "../../../../helpers/date";

const InventoryPostingGroup = ({
  addInventoryPostingGroup,
  editInventoryPostingGroup,
  deleteInventoryPostingGroup,
  postingGroups,
  doneAdd,
  doneEdit,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const okDelete = (id) => {
    deleteInventoryPostingGroup(id);
  };

  useEffect(() => {
    if (doneAdd || doneEdit) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit]);

  const columns = [
    { path: "code", label: "Code" },
    { path: "name", label: "Name" },
    { path: "updated_at", label: "Last modified" },
    {
      key: "view",
      label: "Actions",
      content: (postingGroup) => (
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
                  Component: InventoryPostingGroupForm,
                  data: postingGroup,
                  title: "View Inventory Posting Group",
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
                  Component: InventoryPostingGroupForm,
                  data: postingGroup,
                  submit: editInventoryPostingGroup,
                  title: "Edit Inventory Posting Group",
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
                    id: postingGroup.id,
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
        size="md"
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
                  Component: InventoryPostingGroupForm,
                  submit: addInventoryPostingGroup,
                  title: "Add Inventory Posting Group",
                },
                dispatch
              )
            }
            outline
            size="sm"
          >
            New Inventory Posting Group
          </Button>
        </Col>
        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title=" Inventory Posting Group"
              columns={columns}
              data={reverse(
                postingGroups.map((item) => ({
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

export default InventoryPostingGroup;
