import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import QualificationLevelTypeAdd from "./QualificationLevelTypeAdd";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import { reverse } from "../../../../helpers/reverse";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";
import { getDateFormat } from "../../../../helpers/date";

const QualificationLevelType = ({
  doneAdd,
  addQualificationLevelType,
  doneEdit,
  editQualificationLevelType,
  deleteQualificationLevelType,
  qualificationLevelTypes,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "name", label: "Name" },
    { path: "code", label: "Code" },
    { path: "remarks", label: "Remarks" },
    { path: "updated_at", label: "Last Modified Date" },
    {
      key: "view",
      label: "Actions",
      content: (qualificationLevelTypes) => (
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
                  Component: QualificationLevelTypeAdd,
                  data: qualificationLevelTypes,
                  title: "View Qualification Level Type",
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
                  Component: QualificationLevelTypeAdd,
                  submit: editQualificationLevelType,
                  data: qualificationLevelTypes,
                  title: "Edit Qualification Level Type",
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
                    id: qualificationLevelTypes.id,
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
    deleteQualificationLevelType(id);
  };

  return (
    <div>
      <Page
        title="Qualification Level Type"
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
                  Component: QualificationLevelTypeAdd,
                  submit: addQualificationLevelType,
                  title: "New Qualification Level Type",
                },
                dispatch
              )
            }
            outline
            size="sm"
          >
            New Qualification Level Type
          </Button>
        </Col>
        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title=" Qualification Level Types"
              columns={columns}
              data={reverse(
                qualificationLevelTypes.map((item) => ({
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

export default QualificationLevelType;
