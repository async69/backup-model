import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import ItemForm from "./ItemForm";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";
import { getDateFormat } from "../../../../helpers/date";

const Item = ({
  doneAdd,
  addItem,
  doneEdit,
  editItem,
  deleteItem,
  items,
  itemCategories,
  unitMeasurements,
  warehouses,
  bins,
  costingMethods,
  vatPostingGroups,
  generalBusinessPostingGroups,
  inventoryPostingGroups,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "document_number", label: "Item Number" },
    { path: "name", label: "Name" },
    { path: "category_detail.name", label: "Category" },
    { path: "price", label: "Price" },
    {
      key: "view",
      label: "Actions",
      content: (item) => (
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
                  Component: ItemForm,
                  data: item,
                  title: "View Item",
                  options: {
                    itemCategories,
                    unitMeasurements,
                    warehouses,
                    bins,
                    costingMethods,
                    vatPostingGroups,
                    generalBusinessPostingGroups,
                    inventoryPostingGroups,
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
                  Component: ItemForm,
                  submit: editItem,
                  data: item,
                  title: "Edit Item",
                  options: {
                    itemCategories,
                    unitMeasurements,
                    warehouses,
                    bins,
                    costingMethods,
                    vatPostingGroups,
                    generalBusinessPostingGroups,
                    inventoryPostingGroups,
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
                    id: item.id,
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
    deleteItem(id);
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
                  Component: ItemForm,
                  submit: addItem,
                  title: "New Item",
                  options: {
                    itemCategories,
                    unitMeasurements,
                    warehouses,
                    bins,
                    costingMethods,
                    vatPostingGroups,
                    generalBusinessPostingGroups,
                    inventoryPostingGroups,
                  },
                },
                dispatch
              )
            }
            outline
            size="sm"
          >
            New Item
          </Button>
        </Col>
        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="Items"
              columns={columns}
              data={items.map((item) => ({
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

export default Item;
