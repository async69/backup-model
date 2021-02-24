import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import ItemCategoryForm from "./ItemCategoryForm";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";

const ItemCategory = ({
  doneAdd,
  addItemCategory,
  doneEdit,
  editItemCategory,
  deleteItemCategory,
  itemCategorys,
  options,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "code", label: "Code" },
    { path: "name", label: "Name" },
    { path: "purchase_account.name", label: "Purchase Account" },
    {
      key: "view",
      label: "Actions",
      content: (itemCategory) => (
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
                  Component: ItemCategoryForm,
                  data: itemCategory,
                  title: "View Item Category",
                  options,
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
                  Component: ItemCategoryForm,
                  submit: editItemCategory,
                  data: itemCategory,
                  title: "Edit Item Category",
                  options,
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
                    id: itemCategory.id,
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
    deleteItemCategory(id);
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
                  Component: ItemCategoryForm,
                  submit: addItemCategory,
                  title: "New Item Category",
                  options,
                },
                dispatch
              )
            }
            outline
            size="sm"
          >
            New Item Category
          </Button>
        </Col>
        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="Item Categories"
              columns={columns}
              data={itemCategorys}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
};

export default ItemCategory;
