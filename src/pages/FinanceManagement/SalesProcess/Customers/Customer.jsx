import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, Button } from "reactstrap";
import CustomerForm from "./CustomerForm";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import { reverse } from "../../../../helpers/reverse";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";
import CommonModals from "../../../../components/CommonModal";

const Customer = ({
  customers,
  addCustomer,
  editCustomer,
  deleteCustomer,
  doneAdd,
  doneEdit,
  postingGroups,
  currencies,
  countries,
  regions,
  cities,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "document_number", label: "Customer No." },
    { path: "name", label: "Customer Name" },
    { path: "credit_limit", label: "Credit Limit" },
    {
      key: "view",
      label: "Actions",
      content: (customer) => (
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
                  Component: CustomerForm,
                  data: customer,
                  title: " Customers",
                  options: {
                    postingGroups,
                    currencies,
                    countries,
                    regions,
                    cities,
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
                  Component: CustomerForm,
                  submit: editCustomer,
                  title: "Edit Customer details",
                  isEdit: true,
                  data: customer,
                  options: {
                    postingGroups,
                    currencies,
                    countries,
                    regions,
                    cities,
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
        <Card className="mainTable">
          <CustomTable
            title="Customers"
            columns={columns}
            data={reverse(
              customers.map((item) => ({
                ...item,
                currency:
                  typeof item.currency === "string"
                    ? String("" + item.currency)
                    : "",
              }))
            )}
          />
        </Card>
      </Page>
    </div>
  );
};

export default Customer;
