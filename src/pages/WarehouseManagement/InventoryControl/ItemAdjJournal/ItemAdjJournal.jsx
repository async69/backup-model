import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, Button, Col } from "reactstrap";
import {
  MdRemoveRedEye,
  MdEdit,
  MdDelete,
  MdClose,
  MdLocalPostOffice,
  MdCheckCircle,
} from "react-icons/md";
import { IoIosSend } from "react-icons/io";

// import { IoIosSend } from "react-icons/io"
import ItemAdjustmentJournalAdd from "./ItemAdjJournalAdd";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";
import CommonModals from "../../../../components/CommonModal";
import statusTypes from "../../../../config/statusTypes";

const ItemAdjustmentJournal = ({
  ItemAdjustmentJournals,
  addItemAdjustmentJournal,
  editItemAdjustmentJournal,
  deleteItemAdjustmentJournal,
  items,
  warehouses,
  unitMeasurements,
  bins,
  doneAdd,
  doneEdit,
  donePatch,
  postItemAdjustmentJournal,
  approveItemAdjustmentJournal,
  rejectItemAdjustmentJournal,
  sendForApproval,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "document_number", label: "Document Number" },
    { path: "entry_type", label: "Adj. Type" },
    { path: "item_detail.name", label: "Item Name" },
    { path: "quantity", label: "Quantity" },
    { path: "status", label: "Status" },
    {
      key: "view",
      label: "Actions",
      content: (itemAdjustmentJournal) => (
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
                  Component: ItemAdjustmentJournalAdd,
                  data: itemAdjustmentJournal,
                  title: "View Item Adjustment Journal",
                  size: "xl",
                  options: {
                    items,
                    warehouses,
                    unitMeasurements,
                    bins,
                  },
                },
                dispatch
              );
            }}
          >
            <MdRemoveRedEye />
          </Button>
          {itemAdjustmentJournal.status === statusTypes.OPEN ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="edit"
              onClick={() => {
                _toggle(
                  {
                    type: "EDIT",
                    Component: ItemAdjustmentJournalAdd,
                    submit: editItemAdjustmentJournal,
                    isEdit: true,
                    data: itemAdjustmentJournal,
                    title: "Edit Item Adjustment Journal",
                    size: "xl",

                    options: {
                      items,
                      warehouses,
                      unitMeasurements,
                      bins,
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
          {itemAdjustmentJournal.status === statusTypes.OPEN ? (
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
                      id: itemAdjustmentJournal.id,
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
          {itemAdjustmentJournal.status === statusTypes.OPEN ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() => sendForApproval(itemAdjustmentJournal)}
            >
              {/* Send For Approval */}
              <IoIosSend />
            </Button>
          ) : (
            <></>
          )}
          {itemAdjustmentJournal.status === statusTypes.SENT_FOR_APPROVAL ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() =>
                approveItemAdjustmentJournal(itemAdjustmentJournal)
              }
            >
              <MdCheckCircle /> Approve
            </Button>
          ) : (
            <></>
          )}
          {itemAdjustmentJournal.status === statusTypes.SENT_FOR_APPROVAL ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() => rejectItemAdjustmentJournal(itemAdjustmentJournal)}
            >
              {/* Reject */}
              <MdClose />
            </Button>
          ) : (
            <></>
          )}
          {itemAdjustmentJournal.status === statusTypes.APPROVED ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() => {
                _toggle(
                  {
                    type: "POST",
                    submit: postItemAdjustmentJournal,
                    data: itemAdjustmentJournal,
                    title: "Post",
                    size: "md",
                  },
                  dispatch
                );
              }}
            >
              <MdLocalPostOffice />
            </Button>
          ) : (
            <></>
          )}
        </>
      ),
    },
  ];

  const okDelete = (id) => {
    deleteItemAdjustmentJournal(id);
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
          size={state.size}
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
                  Component: ItemAdjustmentJournalAdd,
                  submit: addItemAdjustmentJournal,
                  isEdit: true,
                  data: ItemAdjustmentJournals,
                  options: { items, warehouses, unitMeasurements, bins },
                },
                dispatch
              );
            }}
            outline
            size="sm"
          >
            New Item Adjustment
          </Button>
        </Col>

        <Card className="mainTable">
          <CustomTable
            title="Item Adjustement Journals"
            columns={columns}
            data={ItemAdjustmentJournals}
          />
        </Card>
      </Page>
    </div>
  );
};

export default ItemAdjustmentJournal;
