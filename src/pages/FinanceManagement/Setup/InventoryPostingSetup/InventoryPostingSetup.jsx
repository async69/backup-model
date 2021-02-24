import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import InventoryPostingSetupForm from "./InventoryPostingSetupAdd";
import CustomTable from "../../../common/table";
import { reverse } from "../../../../helpers/reverse";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import { _toggle, reducer, initialState } from "../../../common/ModalOptions";
import { getDateFormat } from "../../../../helpers/date";

const InventoryPostingSetup = ({
  addInventoryPostingSetup,
  editInventoryPostingSetup,
  deleteInventoryPostingSetup,
  postingSetups,
  doneAdd,
  doneEdit,
  postingGroups,
  accounts,
  itemLocations,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const okDelete = (id) => {
    deleteInventoryPostingSetup(id);
  };

  useEffect(() => {
    if (doneAdd || doneEdit) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit]);

  const columns = [
    { path: "item_location_detail.name", label: "Item Location" },
    { path: "item_posting_group_detail.name", label: "Item Posting Group" },
    { path: "inventory_account_detail.name", label: "Inventory Account" },
    { path: "cogs_account_detail.name", label: "Cost of Goods Sold Account" },
    { path: "updated_at", label: "Last modified" },
    {
      key: "view",
      label: "Actions",
      content: (postingSetup) => (
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
                  Component: InventoryPostingSetupForm,
                  data: postingSetup,
                  title: "View Inventory Posting Setup",
                  options: { postingGroups, accounts, itemLocations },
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
                  Component: InventoryPostingSetupForm,
                  data: postingSetup,
                  submit: editInventoryPostingSetup,
                  title: "Edit Inventory Posting Setup",
                  options: { postingGroups, accounts, itemLocations },
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
                    id: postingSetup.id,
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
                  Component: InventoryPostingSetupForm,
                  submit: addInventoryPostingSetup,
                  title: "Add Inventory Posting Setup",
                  options: { postingGroups, accounts, itemLocations },
                },
                dispatch
              )
            }
            outline
            size="sm"
          >
            New Inventory Posting Setup
          </Button>
        </Col>
        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="Inventory Posting Setup"
              columns={columns}
              data={reverse(
                postingSetups.map((item) => ({
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

export default InventoryPostingSetup;
