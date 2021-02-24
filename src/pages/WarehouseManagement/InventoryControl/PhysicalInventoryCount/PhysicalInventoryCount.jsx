import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import PhysicalInventoryJournalForm from "./PhysicalInventoryCountForm";
import { MdRemoveRedEye, MdEdit, MdDelete, MdClose } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";
import { getDateFormat } from "../../../../helpers/date";
import statusTypes from "config/statusTypes";

const PhysicalInventoryJournals = ({
  doneAdd,
  addPhysicalInventoryJournal,
  doneEdit,
  editPhysicalInventoryJournal,
  deletePhysicalInventoryJournal,
  physicalInventoryJournals,
  items,
  warehouses,
  bins,
  UOMs,
  adjustPhysicalInventoryJournal,
  processPhysicalInventoryJournal,
  approvePhysicalInventoryJournal,
  rejectPhysicalInventoryJournal,
  sendForApproval,
  inventoryItems,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "item_detail.name", label: "Item Name" },
    { path: "item_detail.item_number", label: "Item Number" },
    { path: "inventory_quantity", label: "Inventory Quantity" },
    { path: "inventory_total_amount", label: "Inventory Amount" },
    { path: "physical_counted_quantity", label: "Physical Quantity" },

    {
      key: "view",
      label: "Actions",
      content: (physicalInventoryJournal) => (
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
                  Component: PhysicalInventoryJournalForm,
                  data: physicalInventoryJournal,
                  title: "View Physical Inventory Count",
                  options: {
                    items,
                    warehouses,
                    bins,
                    UOMs,
                    inventoryItems,
                  },
                },
                dispatch
              );
            }}
          >
            <MdRemoveRedEye />
          </Button>
          {physicalInventoryJournal.status === statusTypes.OPEN ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="edit"
              onClick={() => {
                _toggle(
                  {
                    type: "EDIT",
                    Component: PhysicalInventoryJournalForm,
                    submit: editPhysicalInventoryJournal,
                    isEdit: true,
                    data: physicalInventoryJournal,
                    title: "Edit Physical Inventory Count",
                    options: {
                      items,
                      warehouses,
                      bins,
                      UOMs,
                      inventoryItems,
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
          {physicalInventoryJournal.status === statusTypes.OPEN ? (
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
                      id: physicalInventoryJournal.id,
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
          {physicalInventoryJournal.status === statusTypes.OPEN ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() => sendForApproval(physicalInventoryJournal)}
            >
              {/* Send For Approval */}
              <IoIosSend />
            </Button>
          ) : (
            <></>
          )}
          {physicalInventoryJournal.status === statusTypes.SENT_FOR_APPROVAL ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() =>
                approvePhysicalInventoryJournal(physicalInventoryJournal)
              }
            >
              <IoIosSend /> Approve
            </Button>
          ) : (
            <></>
          )}
          {physicalInventoryJournal.status === statusTypes.SENT_FOR_APPROVAL ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="danger"
              onClick={() =>
                rejectPhysicalInventoryJournal(physicalInventoryJournal)
              }
            >
              {/* Reject */}
              <MdClose />
            </Button>
          ) : (
            <></>
          )}
          {physicalInventoryJournal.status === statusTypes.APPROVED ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() =>
                processPhysicalInventoryJournal(physicalInventoryJournal)
              }
            >
              Process
            </Button>
          ) : (
            <></>
          )}
          {physicalInventoryJournal.status === statusTypes.PROCESS ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="edit"
              onClick={() => {
                _toggle(
                  {
                    type: "POST",
                    submit: adjustPhysicalInventoryJournal,
                    data: physicalInventoryJournal,
                    title: "Post",
                  },
                  dispatch
                );
              }}
            >
              Adjust
            </Button>
          ) : (
            <></>
          )}
        </>
      ),
    },
  ];

  useEffect(() => {
    if (doneAdd || doneEdit) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit]);

  const okDelete = (id) => {
    deletePhysicalInventoryJournal(id);
  };

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
            onClick={() =>
              _toggle(
                {
                  type: "ADD",
                  Component: PhysicalInventoryJournalForm,
                  submit: addPhysicalInventoryJournal,
                  options: { items, warehouses, bins, UOMs, inventoryItems },
                  title: "New Physical Inventory Journal",
                },
                dispatch
              )
            }
            outline
            size="sm"
          >
            New Physical Inventory Count
          </Button>
        </Col>
        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title=" Physical Inventory Journals"
              columns={columns}
              data={physicalInventoryJournals.map((item) => ({
                ...item,
                updated_at: getDateFormat(item.updated_at),
              }))}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
};

export default PhysicalInventoryJournals;
