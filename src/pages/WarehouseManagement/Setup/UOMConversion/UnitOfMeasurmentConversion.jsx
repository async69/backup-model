import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, Button, Col } from "reactstrap";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import UOMConversionAdd from "./UnitOfMeasurmentConversionAdd";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";
import CommonModals from "../../../../components/CommonModal";

const UOMConversion = ({
  UOMConversions,
  UOMs,
  addUOMConversion,
  editUOMConversion,
  deleteUOMConversion,
  doneAdd,
  doneEdit,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "amount", label: "Amount" },
    { path: "basic_unit_of_measurement_detail.name", label: "Basic UOM" },
    { path: "derived_unit_of_measurement_detail.name", label: "Derived UOM" },
    { path: "remarks", label: "Remarks" },
    {
      key: "view",
      label: "Actions",
      content: (UOMConversions) => (
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
                  Component: UOMConversionAdd,
                  data: UOMConversions,
                  title: "View Unit of Measurement Conversion",
                  options: {
                    UOMs: UOMs,
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
                  Component: UOMConversionAdd,
                  submit: editUOMConversion,
                  isEdit: true,
                  title: "Edit Unit of Measurement Conversion",
                  data: UOMConversions,
                  options: {
                    UOMs: UOMs,
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
                    id: UOMConversions.id,
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
    deleteUOMConversion(id);
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
                  Component: UOMConversionAdd,
                  submit: addUOMConversion,
                  isEdit: true,
                  data: UOMConversions,
                  options: {
                    UOMs: UOMs,
                  },
                },
                dispatch
              );
            }}
            outline
            size="sm"
          >
            New Unit Of Measurment Conversion
          </Button>
        </Col>

        <Card className="mainTable">
          <CustomTable
            title=" Unit Of Measurments Conversion"
            columns={columns}
            data={UOMConversions}
          />
        </Card>
      </Page>
    </div>
  );
};

export default UOMConversion;
