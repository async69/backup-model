import React, { useReducer, useEffect } from "react";
import Page from "../../../../../components/Page";
import { Card, Button, Col } from "reactstrap";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import WarehouseAdd from "./WarehouseAdd";
import CustomTable from "../../../../common/table";
import {
  _toggle,
  initialState,
  reducer,
} from "../../../../common/ModalOptions";
import CommonModals from "../../../../../components/CommonModal";

const Warehouse = ({
  Warehouses,
  addWarehouse,
  editWarehouse,
  deleteWarehouse,
  doneAdd,
  doneEdit,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "code", label: "Code" },
    { path: "name", label: "Name" },
    { path: "location", label: "Location" },
    // { path: "remarks", label: "Remarks" },

    {
      key: "view",
      label: "Actions",
      content: (Warehouses) => (
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
                  Component: WarehouseAdd,
                  data: Warehouses,
                  title: "View Warehouses",
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
                  title: "Edit Warehouse",
                  Component: WarehouseAdd,
                  submit: editWarehouse,
                  isEdit: true,
                  data: Warehouses,
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
                    id: Warehouses.id,
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
    deleteWarehouse(id);
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
                  Component: WarehouseAdd,
                  submit: addWarehouse,
                  isEdit: true,
                  data: Warehouses,
                },
                dispatch
              );
            }}
            outline
            size="sm"
          >
            New Warehouse
          </Button>
        </Col>

        <Card className="mainTable">
          <CustomTable title="Warehouses" columns={columns} data={Warehouses} />
        </Card>
      </Page>
    </div>
  );
};

export default Warehouse;
