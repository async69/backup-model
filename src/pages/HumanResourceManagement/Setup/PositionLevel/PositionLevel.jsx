import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import PositionLevelAdd from "./PositionLevelAdd";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";

const PositionLevel = ({
  doneAdd,
  addPositionLevel,
  doneEdit,
  editPositionLevel,
  deletePositionLevel,
  positionLevels,
  positions,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "name", label: "Name" },
    { path: "code", label: "Code" },
    { path: "position.name", label: "Position" },
    { path: "remarks", label: "Remarks" },
    {
      key: "view",
      label: "Actions",
      content: (positionLevels) => (
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
                  Component: PositionLevelAdd,
                  data: positionLevels,
                  title: "View Position Level",
                  options: { positions },
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
                  Component: PositionLevelAdd,
                  submit: editPositionLevel,
                  data: positionLevels,
                  title: "Edit Position Level",
                  options: { positions },
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
                    id: positionLevels.id,
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
    deletePositionLevel(id);
  };
  console.log(positions, "positions");

  return (
    <div>
      <Page
        title="Position Level"
        breadcrumbs={[{ name: "Human Resource", active: true }]}
      >
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
                  Component: PositionLevelAdd,
                  submit: addPositionLevel,
                  title: "New Position Level",
                  options: { positions },
                },
                dispatch
              )
            }
            outline
            size="sm"
          >
            New Position Level
          </Button>
        </Col>
        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="Position Levels"
              columns={columns}
              data={positionLevels}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
};

export default PositionLevel;
