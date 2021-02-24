import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import ConsignmentTypeAdd from "./ConsignmentTypeAdd";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import { reverse } from "../../../../helpers/reverse";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";
import { getDateFormat } from "../../../../helpers/date";

const ConsignmentType = ({
  doneAdd,
  addConsignmentType,
  doneEdit,
  editConsignmentType,
  deleteConsignmentType,
  consignmentTypes,
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
      content: (consignmentTypes) => (
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
                  Component: ConsignmentTypeAdd,
                  data: consignmentTypes,
                  title: "View Consignment Type",
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
                  Component: ConsignmentTypeAdd,
                  submit: editConsignmentType,
                  data: consignmentTypes,
                  title: "Edit Consignment Type",
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
                    id: consignmentTypes.id,
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
    deleteConsignmentType(id);
  };

  return (
    <div>
      <Page
        title="Consignment Type"
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
                  Component: ConsignmentTypeAdd,
                  submit: addConsignmentType,
                  title: "New Consignment Type",
                },
                dispatch
              )
            }
            outline
            size="sm"
          >
            New Consignment Type
          </Button>
        </Col>
        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="Consignment Types"
              columns={columns}
              data={reverse(
                consignmentTypes.map((item) => ({
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

export default ConsignmentType;
