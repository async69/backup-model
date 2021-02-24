import React, { useReducer, useEffect, useContext, useState } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import NumberSeriesAdd from "./SalesRegionForm";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import { reverse } from "../../../../helpers/reverse";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";
import { getDateFormat } from "../../../../helpers/date";
import { MainContext } from "../../../../context/Main";
import {
  getState,
  defaultPermissions,
} from "../../../../context/Main/States/Department";

const FEATURE = "SALES REGION";
const SalesRegion = ({
  doneAdd,
  addSalesRegion,
  doneEdit,
  editSalesRegion,
  deleteSalesRegion,
  salesRegions,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { rootState } = useContext(MainContext);
  const [permissions, setPermissions] = useState(defaultPermissions);

  useEffect(() => {
    const state = getState(rootState);
    if (state) {
      if (state.permissions) {
        setPermissions(state.permissions[FEATURE]);
      }
    }
  }, [rootState]);
  const columns = [
    { path: "name", label: "Name" },
    { path: "code", label: "Code" },
    { path: "remarks", label: "Remarks" },
    { path: "updated_at", label: "Last Modified Date" },
    {
      key: "view",
      label: "Actions",
      content: (salesRegion) => (
        <>
          {permissions.read ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="info"
              onClick={() => {
                _toggle(
                  {
                    type: "VIEW",
                    Component: NumberSeriesAdd,
                    data: salesRegion,
                    title: "View Sales Region ",
                  },
                  dispatch
                );
              }}
            >
              <MdRemoveRedEye />
            </Button>
          ) : (
            <></>
          )}
          {permissions.update ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="edit"
              onClick={() => {
                _toggle(
                  {
                    type: "EDIT",
                    Component: NumberSeriesAdd,
                    submit: editSalesRegion,
                    data: salesRegion,
                    title: "Edit  Sales Region",
                  },
                  dispatch
                );
              }}
            >
              <MdEdit />
            </Button>
          ) : (
            <></>
          )}
          {permissions.delete ? (
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
                      id: salesRegion.id,
                      message: "",
                    },
                  },
                  dispatch
                );
              }}
            >
              <MdDelete />
            </Button>
          ) : (
            <></>
          )}
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
    deleteSalesRegion(id);
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
        {permissions.create ? (
          <Col align="right" className="newButton">
            <Button
              onClick={() =>
                _toggle(
                  {
                    type: "ADD",
                    Component: NumberSeriesAdd,
                    submit: addSalesRegion,
                    title: "New SalesRegion",
                  },
                  dispatch
                )
              }
              outline
              size="sm"
            >
              New Sales Region
            </Button>
          </Col>
        ) : (
          <></>
        )}
        {permissions.read ? (
          <Card className="border-0">
            <CardBody>
              <CustomTable
                title="Sales Regions"
                columns={columns}
                data={reverse(
                  salesRegions.map((item) => ({
                    ...item,
                    updated_at: getDateFormat(item.updated_at),
                  }))
                )}
              />
            </CardBody>
          </Card>
        ) : (
          <></>
        )}
      </Page>
    </div>
  );
};

export default SalesRegion;
