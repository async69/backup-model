import React, { useReducer, useEffect } from "react";
import Page from "../../../components/Page";
import { Card, CardHeader, Button, Col } from "reactstrap";
import CountryAdd from "./CountryAdd";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import { reverse } from "../../../helpers/reverse";
import CustomTable from "../../common/table";
import { _toggle, initialState, reducer } from "../../common/ModalOptions";
import CommonModals from "../../../components/CommonModal";

const Country = ({
  countries,
  addCountry,
  editCountry,
  deleteCountry,
  doneAdd,
  doneEdit,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "code", label: "Code" },
    { path: "name", label: "Name" },
    // { path: "remarks", label: "Remarks" },
    {
      key: "view",
      label: "Actions",
      content: (countries) => (
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
                  Component: CountryAdd,
                  data: countries,
                  title: "View Countries",
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
                  Component: CountryAdd,
                  submit: editCountry,
                  isEdit: true,
                  data: countries,
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
                    id: countries.id,
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
    deleteCountry(id);
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
                  Component: CountryAdd,
                  submit: addCountry,
                  isEdit: true,
                  data: countries,
                },
                dispatch
              );
            }}
            outline
            size="sm"
          >
            New Country
          </Button>
        </Col>

        <Card className="border-0">
          <Col md={12} sm={12} xs={12}>
            <CardHeader className="border-0">Countries</CardHeader>
          </Col>
          <CustomTable columns={columns} data={reverse(countries)} />
        </Card>
      </Page>
    </div>
  );
};

export default Country;
