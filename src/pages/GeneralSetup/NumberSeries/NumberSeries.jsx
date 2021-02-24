import React, { useReducer, useEffect } from "react";
import Page from "../../../components/Page";
import { Card, CardBody, CardHeader, Button, Col } from "reactstrap";
import CommonModals from "../../../components/CommonModal";
import NoSeriesAdd from "./NumberSeriesAdd";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import { reverse } from "../../../helpers/reverse";
import CustomTable from "../../common/table";
import { _toggle, initialState, reducer } from "../../common/ModalOptions";

const NoSeries = ({
  doneAdd,
  addNumberSeries,
  doneEdit,
  editNumberSeries,
  deleteNumberSeries,
  numberSeries,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "feature_name", label: "Feature Name" },
    { path: "prefix", label: "Prefix" },
    { path: "sufix", label: "Suffix" },
    { path: "number_of_digits", label: "No of Digits" },
    { path: "starting_number", label: "Starting Number" },
    { path: "last_doc_number", label: "Ending Number" },
    {
      key: "view",
      label: "Actions",
      content: (numberSeries) => (
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
                  Component: NoSeriesAdd,
                  data: numberSeries,
                  title: "View Number Series",
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
                  Component: NoSeriesAdd,
                  submit: editNumberSeries,
                  data: numberSeries,
                  title: "Edit Number Series",
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
                    id: numberSeries.id,
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
    deleteNumberSeries(id);
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
                  Component: NoSeriesAdd,
                  submit: addNumberSeries,
                  title: "New Account Type",
                },
                dispatch
              )
            }
            outline
            size="sm"
          >
            New Number Series
          </Button>
        </Col>
        <Card className="border-0">
          <Col md={12} sm={12} xs={12}>
            <CardHeader className="border-0">No. Series </CardHeader>
          </Col>
          <CardBody>
            <CustomTable columns={columns} data={reverse(numberSeries)} />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
};

export default NoSeries;
