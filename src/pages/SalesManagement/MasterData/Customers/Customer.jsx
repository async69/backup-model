import React, { useReducer, useEffect, useContext, useState } from "react";
import Page from "../../../../components/Page";
import { Card, Button, Col } from "reactstrap";
import CustomerForm from "./CustomerForm";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import { reverse } from "../../../../helpers/reverse";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";
import CommonModals from "../../../../components/CommonModal";
import { MainContext } from "../../../../context/Main";
import {
  getState,
  defaultPermissions,
} from "../../../../context/Main/States/Department";

const FEATURE = "CUSTOMER";
const Customer = ({
  customers,
  addCustomer,
  editCustomer,
  deleteCustomer,
  doneAdd,
  doneEdit,
  postingGroups,
  vatPostingGroups,
  currencies,
  countries,
  regions,
  cities,
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
    { path: "document_number", label: "Customer Number" },
    { path: "name", label: "Customer Name" },
    { path: "tin_number", label: "Tin Number " },
    { path: "currency.symbol", label: "Currency" },
    // { path: "customer_posting_group.name", label: "Customer Posting Group" },
    { path: "credit_limit", label: "Credit Limit" },
    // { path: "remark", label: "Remarks" },
    {
      key: "view",
      label: "Actions",
      content: (customer) => (
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
                    Component: CustomerForm,
                    data: customer,
                    title: "View Customer",
                    options: {
                      postingGroups,
                      currencies,
                      countries,
                      regions,
                      cities,
                      vatPostingGroups,
                    },
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
                    title: "Edit Customer",
                    Component: CustomerForm,
                    submit: editCustomer,
                    isEdit: true,
                    data: customer,
                    options: {
                      postingGroups,
                      currencies,
                      countries,
                      regions,
                      cities,
                      vatPostingGroups,
                    },
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
                      id: customer.id,
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

  const okDelete = (id) => {
    deleteCustomer(id);
  };

  useEffect(() => {
    if (doneAdd || doneEdit) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit]);

  return (
    <div className="mt-3">
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
              onClick={() => {
                _toggle(
                  {
                    type: "ADD",
                    Component: CustomerForm,
                    submit: addCustomer,
                    isEdit: true,
                    data: customers,
                    title: "Add Customer",

                    options: {
                      postingGroups,
                      currencies,
                      regions,
                      cities,
                      countries,
                      vatPostingGroups,
                    },
                  },
                  dispatch
                );
              }}
              outline
              size="sm"
            >
              New Customer
            </Button>
          </Col>
        ) : (
          <></>
        )}
        {permissions.read ? (
          <Card className="border-0">
            <CustomTable
              title="Customers"
              columns={columns}
              data={reverse(
                customers.map((item) => ({
                  ...item,
                  currency: item.currency
                    ? item.currency
                    : { id: "", name: "" },
                  cic: item.currency ? item.currency : { id: "", name: "" },
                }))
              )}
            />
          </Card>
        ) : (
          <></>
        )}
      </Page>
    </div>
  );
};

export default Customer;
