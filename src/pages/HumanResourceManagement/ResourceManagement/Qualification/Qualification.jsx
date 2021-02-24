import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import QualificationForm from "./QualificationAdd";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";
import { getDateFormat } from "../../../../helpers/date";

const Qualification = ({
  doneAdd,
  addQualification,
  doneEdit,
  editQualification,
  deleteQualification,
  qualifications,
  options,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    {
      path: "qualification_level_type.name",
      label: "Qualification Level Type ",
    },
    { path: "education_type.name", label: "Education Type " },
    { path: "institute.name", label: "Institute" },
    { path: "start_date", label: "Start Date " },
    { path: "end_date", label: "End Date " },
    { path: "", label: "Duration" },
    { path: "remarks", label: "Remarks" },
    {
      key: "view",
      label: "Actions",
      content: (qualification) => (
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
                  Component: QualificationForm,
                  data: qualification,
                  title: "View Qualification",
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
                  Component: QualificationForm,
                  submit: editQualification,
                  data: qualification,
                  title: "Edit Qualification",
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
                    id: qualification.id,
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
    deleteQualification(id);
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
                  Component: QualificationForm,
                  submit: addQualification,
                  title: "New Qualification",
                  options,
                },
                dispatch
              )
            }
            outline
            size="sm"
          >
            New Qualification
          </Button>
        </Col>
        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="Qualifications"
              columns={columns}
              data={qualifications.map((qualification) => ({
                ...qualification,
                updated_at: getDateFormat(qualification.updated_at),
              }))}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
};
export default Qualification;
