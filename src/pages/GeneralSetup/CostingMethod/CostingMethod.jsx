import React, { useReducer, useEffect } from "react";
import Page from "../../../components/Page";
import { Card, CardBody, CardHeader, Button, Col } from "reactstrap";
import { MdRemoveRedEye } from "react-icons/md";
import CostingMethodForm from "./CostingMethodForm";
import { reverse } from "../../../helpers/reverse";
import CustomTable from "../../common/table";
import { _toggle, initialState, reducer } from "../../common/ModalOptions";
import CommonModals from "../../../components/CommonModal";
import { getDateFormat } from "../../../helpers/date";

const CostingMethod = ({
  costingMethods,
  addCostingMethod,
  deleteCostingMethod,
  doneAdd,
  doneEdit,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "name", label: "Name" },
    { path: "updated_at", label: "Last Modified" },
    {
      key: "view",
      label: "Actions",
      content: (accountType) => (
        <>
          <Button
            className="m-1"
            size="sm"
            outline
            color="primary"
            onClick={() => {
              _toggle(
                {
                  type: "VIEW",
                  Component: CostingMethodForm,
                  data: accountType,
                  title: "View Costing Method",
                },
                dispatch
              );
            }}
          >
            <MdRemoveRedEye />
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

  return (
    <div>
      <Page
        title="Costing Method"
        breadcrumbs={[{ name: "General Setup", active: true }]}
      >
        <CommonModals
          size="xl"
          data={state.data}
          openModal={state.openModal}
          component={state.Component}
          title={state.title}
          toggle={_toggle}
          dispatch={dispatch}
        />
        <Col align="right" className="newButton">
          {(
            <Button
              onClick={() =>
                _toggle(
                  {
                    type: "ADD",
                    Component: CostingMethodForm,
                    submit: addCostingMethod,
                    data: {},
                    title: "New Costing Method",
                  },
                  dispatch
                )
              }
              outline
              size="sm"
            >
              New Costing Method
            </Button>
          ) && false}
        </Col>

        <Card className="border-0">
          <Col md={12} sm={12} xs={12}>
            <CardHeader className="border-0">Costing Method</CardHeader>
          </Col>
          <CardBody>
            <CustomTable
              columns={columns}
              data={reverse(
                costingMethods.map((item) => ({
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

export default CostingMethod;
