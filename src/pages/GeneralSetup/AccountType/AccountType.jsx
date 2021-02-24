import React, { useReducer, useEffect } from "react";
import Page from "../../../components/Page";
import { Card, CardHeader, Button, Col } from "reactstrap";
import AccountTypeAdd from "./AccountTypeAdd";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import { reverse } from "../../../helpers/reverse";
import CustomTable from "../../common/table";
import { _toggle, initialState, reducer } from "../../common/ModalOptions";
import CommonModals from "../../../components/CommonModal";

const AccountType = ({
  accountTypes,
  addAccountType,
  editAccountType,
  deleteAccountType,
  doneAdd,
  doneEdit,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "name", label: "Name" },
    { path: "starting_number", label: "Starting Number" },
    { path: "number_of_digits", label: "Number of Digits" },

    {
      key: "view",
      label: "Actions",
      content: (accountTypes) => (
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
                  Component: AccountTypeAdd,
                  data: accountTypes,
                  title: "View Account Types",
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
                  title: "Edit Account Type",
                  Component: AccountTypeAdd,
                  submit: editAccountType,
                  isEdit: true,
                  data: accountTypes,
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
                    id: accountTypes.id,
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
    deleteAccountType(id);
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
                  title: "Add Account Type",
                  Component: AccountTypeAdd,
                  submit: addAccountType,
                  isEdit: true,
                  data: accountTypes,
                },
                dispatch
              );
            }}
            outline
            size="sm"
          >
            New AccountType
          </Button>
        </Col>

        <Card className="border-0">
          <Col md={12} sm={12} xs={12}>
            <CardHeader className="border-0">Account Types</CardHeader>
          </Col>
          <CustomTable columns={columns} data={reverse(accountTypes)} />
        </Card>
      </Page>
    </div>
  );
};

export default AccountType;
