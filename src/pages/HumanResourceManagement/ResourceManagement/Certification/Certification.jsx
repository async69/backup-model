import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import CertificationAdd from "./CertificationAdd";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";

const Certification = ({
  doneAdd,
  addCertification,
  doneEdit,
  editCertification,
  deleteCertification,
  certifications,
  options,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "start_date", label: "Start Date" },
    { path: "end_date", label: "End Date" },
    { path: "certification_type.name", label: "Certification Type" },
    { path: "education_type.name", label: "Education Type" },
    { path: "remarks", label: "Remarks" },

    {
      key: "view",
      label: "Actions",
      content: (certifications) => (
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
                  Component: CertificationAdd,
                  data: certifications,
                  title: "View Certification",
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
                  Component: CertificationAdd,
                  submit: editCertification,
                  data: certifications,
                  title: "Edit Certification",
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
                    id: certifications.id,
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
    deleteCertification(id);
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
                  Component: CertificationAdd,
                  submit: addCertification,
                  title: "New Certification",
                  options,
                },
                dispatch
              )
            }
            outline
            size="sm"
          >
            New Certification
          </Button>
        </Col>
        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="Certifications"
              columns={columns}
              data={certifications}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
};

export default Certification;
