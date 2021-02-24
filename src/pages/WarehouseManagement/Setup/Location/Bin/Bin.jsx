import React, { useReducer, useEffect } from "react";
import Page from "../../../../../components/Page";
import { Card, Button, Col } from "reactstrap";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import BinAdd from "./BinAdd";
import CustomTable from "../../../../common/table";
import {
  _toggle,
  initialState,
  reducer,
} from "../../../../common/ModalOptions";
import CommonModals from "../../../../../components/CommonModal";

const Bin = ({
  Bins,
  addBin,
  editBin,
  deleteBin,
  doneAdd,
  doneEdit,
  Warehouses,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "code", label: "Code" },
    { path: "name", label: "Name" },
    // { path: "remarks", label: "Remarks" },

    {
      key: "view",
      label: "Actions",
      content: (Bins) => (
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
                  Component: BinAdd,
                  data: Bins,
                  title: "View Bins",
                  options: { Warehouses },
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
                  title: "Edit Bins",
                  type: "EDIT",
                  Component: BinAdd,
                  submit: editBin,
                  isEdit: true,
                  data: Bins,
                  options: { Warehouses },
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
                    id: Bins.id,
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
    deleteBin(id);
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
                  Component: BinAdd,
                  submit: addBin,
                  isEdit: true,
                  data: Bins,
                  options: { Warehouses },
                },
                dispatch
              );
            }}
            outline
            size="sm"
          >
            New Bin
          </Button>
        </Col>

        <Card className="mainTable">
          <CustomTable title="Bins" columns={columns} data={Bins} />
        </Card>
      </Page>
    </div>
  );
};

export default Bin;
