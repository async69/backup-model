import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import DisciplinaryActionAdd from "./DisciplinaryActionAdd";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";

const DisciplinaryAction = ({
  doneAdd,
  addDisciplinaryAction,
  doneEdit,
  editDisciplinaryAction,
  deleteDisciplinaryAction,
  disciplinaryActions,
  options,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "from_date", label: "From Date" },
    { path: "to_date", label: "To Date" },
    {
      path: "disciplinary_action_type.name",
      label: "Disciplinary Action Type",
    },
    { path: "remarks", label: "Remarks" },
    {
      key: "view",
      label: "Actions",
      content: (disciplinaryActions) => (
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
                  Component: DisciplinaryActionAdd,
                  data: disciplinaryActions,
                  title: "View Disciplinary Action",
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
                  Component: DisciplinaryActionAdd,
                  submit: editDisciplinaryAction,
                  data: disciplinaryActions,
                  title: "Edit Disciplinary Action",
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
                    id: disciplinaryActions.id,
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
    deleteDisciplinaryAction(id);
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
                  Component: DisciplinaryActionAdd,
                  submit: addDisciplinaryAction,
                  title: "New Disciplinary Action",
                  options,
                },
                dispatch
              )
            }
            outline
            size="sm"
          >
            New Disciplinary Action
          </Button>
        </Col>
        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="Disciplinary Action"
              columns={columns}
              data={disciplinaryActions}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
};

export default DisciplinaryAction;
