import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import IllnessAdd from "./IllnessAdd";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import { reverse } from "../../../../helpers/reverse";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";
import { getDateFormat } from "../../../../helpers/date";

const Illness = ({
  doneAdd,
  addIllness,
  doneEdit,
  editIllness,
  deleteIllness,
  illness,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "employee_number", label: "Employee Number" },
    { path: "illness_type", label: "Illness Type" },
    { path: "body_part", label: "Body Part" },
    { path: "incident_date", label: "Incident Date" },
    { path: "case_description", label: "Case Description" },
    { path: "case_outcome", label: "Case Outcome" },
    { path: "updated_at", label: "Last Modified Date" },
    { path: "remarks", label: "Remarks" },

    {
      key: "view",
      label: "Actions",
      content: (illness) => (
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
                  Component: IllnessAdd,
                  data: illness,
                  title: "View Illness",
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
                  Component: IllnessAdd,
                  submit: editIllness,
                  data: illness,
                  title: "Edit Illness",
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
                    id: illness.id,
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
    deleteIllness(id);
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
                  Component: IllnessAdd,
                  submit: addIllness,
                  title: "New Illness",
                },
                dispatch
              )
            }
            outline
            size="sm"
          >
            New Illness
          </Button>
        </Col>
        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="Illness"
              columns={columns}
              data={reverse(
                illness.map((item) => ({
                  ...item,
                  updated_at: getDateFormat(item.updated_at),
                }))
              )}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
};

export default Illness;
