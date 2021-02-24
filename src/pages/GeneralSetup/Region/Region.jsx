import React, { useReducer, useEffect } from "react";
import Page from "../../../components/Page";
import { Card, CardHeader, Button, Col } from "reactstrap";
import RegionAdd from "./RegionAdd";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import { reverse } from "../../../helpers/reverse";
import CustomTable from "../../common/table";
import { _toggle, initialState, reducer } from "../../common/ModalOptions";
import CommonModals from "../../../components/CommonModal";

export default function Region({
  regions,
  countries,
  addRegion,
  editRegion,
  deleteRegion,
  doneAdd,
  doneEdit,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "code", label: "Code" },
    { path: "name", label: "Name" },
    { path: "country_detail.name", label: "Country" },
    {
      key: "view",
      label: "Actions",
      content: (regions) => (
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
                  Component: RegionAdd,
                  data: regions,
                  title: "View Regions",
                  options: {
                    countries,
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
                  Component: RegionAdd,
                  submit: editRegion,
                  isEdit: true,
                  data: regions,
                  options: {
                    countries,
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
                    id: regions.id,
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
    deleteRegion(id);
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
          size="md"
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
                  Component: RegionAdd,
                  submit: addRegion,
                  isEdit: true,
                  data: regions,
                  options: {
                    countries,
                  },
                },
                dispatch
              );
            }}
            outline
            size="sm"
          >
            New Region
          </Button>
        </Col>

        <Card className="border-0">
          <Col md={12} sm={12} xs={12}>
            <CardHeader className="border-0">Regions</CardHeader>
          </Col>
          <CustomTable columns={columns} data={reverse(regions)} />
        </Card>
      </Page>
    </div>
  );
}
