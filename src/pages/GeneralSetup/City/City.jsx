import React, { useReducer, useEffect } from "react";
import Page from "../../../components/Page";
import { Card, CardHeader, Button, Col } from "reactstrap";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import CityAdd from "./CityAdd";
import { reverse } from "../../../helpers/reverse";
import CustomTable from "../../common/table";
import { _toggle, initialState, reducer } from "../../common/ModalOptions";
import CommonModals from "../../../components/CommonModal";

const City = ({
  cities,
  regions,
  addCity,
  editCity,
  deleteCity,
  doneAdd,
  doneEdit,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "code", label: "Code" },
    { path: "name", label: "Name" },
    { path: "region_detail.name", label: "Region" },
    {
      key: "view",
      label: "Actions",
      content: (cities) => (
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
                  Component: CityAdd,
                  data: cities,
                  title: "View Cities",
                  options: {
                    regions,
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
                  Component: CityAdd,
                  submit: editCity,
                  isEdit: true,
                  data: cities,
                  options: {
                    regions,
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
                    id: cities.id,
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
    deleteCity(id);
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
                  Component: CityAdd,
                  submit: addCity,
                  isEdit: true,
                  data: cities,
                  options: {
                    regions,
                  },
                },
                dispatch
              );
            }}
            outline
            size="sm"
          >
            New City
          </Button>
        </Col>

        <Card className="border-0">
          <Col md={12} sm={12} xs={12}>
            <CardHeader className="border-0">Cities</CardHeader>
          </Col>
          <CustomTable columns={columns} data={reverse(cities)} />
        </Card>
      </Page>
    </div>
  );
};

export default City;
