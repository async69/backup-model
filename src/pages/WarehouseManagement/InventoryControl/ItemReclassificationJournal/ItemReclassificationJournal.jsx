import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, CardHeader, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import ItemReclassificationJournalsForm from "./ItemReclassificationJournalForm";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import { reverse } from "../../../../helpers/reverse";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";
import { getDateFormat } from "../../../../helpers/date";

const ItemReclassificationJournals = ({
  doneAdd,
  addItemReclassificationJournal,
  doneEdit,
  editItemReclassificationJournal,
  deleteNitemReclassificationJournal,
  itemReclassificationJournals,
  items,
  warehouses,
  bins,
  UOMs,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "document_number", label: "Document Number" },
    { path: "item_detail.name", label: "Item Name" },
    { path: "warehouse_detail.name", label: "Warehouse" },
    { path: "from_bin_detail.name", label: "From Bin" },
    { path: "to_bin_detail.name", label: "To Bin" },
    { path: "unit_of_measurement_detail.name", label: "Unit of Measurement" },
    { path: "quantity", label: "Quantity" },
    { path: "posting_date", label: "Posting Date" },
    { path: "remarks", label: "Remarks" },
    { path: "updated_at", label: "Last Modified Date" },
    {
      key: "view",
      label: "Actions",
      content: (itemReclassificationJournal) => (
        <>
          <Button
            className="m-1"
            size="sm"
            outline
            color="primary"
            onClick={() => {
              _toggle(
                {
                  type: "VIEW",
                  Component: ItemReclassificationJournalsForm,
                  data: itemReclassificationJournal,
                  options: { items, warehouses, bins, UOMs },
                  title: "View Item Reclassification Journal",
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
            color="primary"
            onClick={() => {
              _toggle(
                {
                  type: "EDIT",
                  Component: ItemReclassificationJournalsForm,
                  submit: editItemReclassificationJournal,
                  data: itemReclassificationJournal,
                  options: { items, warehouses, bins, UOMs },
                  title: "Edit Item Reclassification Journal",
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
            color="primary"
            onClick={() => {
              _toggle(
                {
                  type: "DELETE",
                  deleteOptions: {
                    okCallback: okDelete,
                    title: "Are you sure?",
                    id: itemReclassificationJournal.id,
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

  useEffect(() => {
    if (doneAdd || doneEdit) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit]);

  const okDelete = (id) => {
    deleteNitemReclassificationJournal(id);
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
                  Component: ItemReclassificationJournalsForm,
                  submit: addItemReclassificationJournal,
                  options: { items, warehouses, bins, UOMs },
                  title: "New Item Reclassification Journal",
                },
                dispatch
              )
            }
            outline
            size="sm"
          >
            New Item Reclassification Journal
          </Button>
        </Col>
        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="Item Reclassification Journals"
              columns={columns}
              data={itemReclassificationJournals.map((item) => ({
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

export default ItemReclassificationJournals;
