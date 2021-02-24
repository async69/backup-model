import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import InventoryItemForm from "./InventoryItemForm";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";
import { getDateFormat } from "../../../../helpers/date";

const InventoryItem = ({
  doneAdd,
  addInventoryItem,
  doneEdit,
  editInventoryItem,
  deleteInventoryItem,
  inventoryItems,
  unitMeasurements,
  warehouses,
  items,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "item.name", label: "Item Name" },
    { path: "item.number", label: "Item Number" },
    { path: "warehouse.name", label: "Warehouse Name" },
    { path: "quantity", label: "Quantity" },
    {
      key: "view",
      label: "Actions",
      content: (inventoryItem) => (
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
                  Component: InventoryItemForm,
                  data: inventoryItem,
                  title: "View Inventory Item",
                  options: {
                    items,
                    warehouses,
                    unitMeasurements,
                  },
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
                  Component: InventoryItemForm,
                  submit: editInventoryItem,
                  data: inventoryItem,
                  title: "Edit Inventory Item",
                  options: {
                    items,
                    warehouses,
                    unitMeasurements,
                  },
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
                    id: inventoryItem.id,
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
    deleteInventoryItem(id);
  };

  return (
    <div>
      <Page>
        <CommonModals
          data={state.data}
          openModal={state.openModal}
          component={state.Component}
          toggle={_toggle}
          dispatch={dispatch}
          title={state.title}
          size="md"
        />
        <Col align="right" className="newButton">
          <Button
            onClick={() =>
              _toggle(
                {
                  type: "ADD",
                  Component: InventoryItemForm,
                  submit: addInventoryItem,
                  title: "New Inventory Item",
                  options: {
                    items,
                    warehouses,
                    unitMeasurements,
                  },
                },
                dispatch
              )
            }
            outline
            size="sm"
          >
            New Inventory Item
          </Button>
        </Col>
        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="Inventory Item "
              columns={columns}
              data={inventoryItems.map((inventoryItem) => ({
                ...inventoryItem,
                updated_at: getDateFormat(inventoryItem.updated_at),
              }))}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
};

export default InventoryItem;
