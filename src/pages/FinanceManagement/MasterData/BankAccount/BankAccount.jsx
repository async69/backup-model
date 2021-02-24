import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import BankAccountAdd from "./BankAccountAdd";
import CustomTable from "../../../common/table";
import CommonModals from "../../../../components/CommonModal";
import { reverse } from "../../../../helpers/reverse";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";

const BankAccount = ({
  bankAccounts,
  addBankAccount,
  editBankAccount,
  deleteBankAccount,
  accountTypes,
  currencies,
  regions,
  cities,
  banks,
  COAs,
  doneAdd,
  doneEdit,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "bank_account_code", label: "BA Code " },
    { path: "bank.name", label: "Bank Name" },
    { path: "branch_name", label: "Bank Branch " },
    { path: "account_number", label: "BA No" },
    { path: "currency.name", label: "Currency " },
    { path: "is_active", label: "Status" },
    {
      label: "Actions",
      key: "view",
      content: (coa) => (
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
                  Component: BankAccountAdd,
                  data: coa,
                  title: "View Bank Account",
                  options: {
                    accountTypes,
                    currencies,
                    regions,
                    cities,
                    banks,
                    COAs,
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
                  Component: BankAccountAdd,
                  submit: (data) => editBankAccount(data),
                  data: coa,
                  title: "Edit Bank Account",
                  options: {
                    accountTypes,
                    currencies,
                    regions,
                    cities,
                    banks,
                    COAs,
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
              _toggle({
                type: "DELETE",
                deleteOptions: {
                  okCallback: okDelete,
                  title: "Are you sure?",
                  id: coa.id,
                  message: "",
                },
              });
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
    deleteBankAccount(id);
  };

  return (
    <div>
      <CommonModals
        size="xl"
        data={state.data}
        title={state.title}
        openModal={state.openModal}
        component={state.Component}
        toggle={_toggle}
        dispatch={dispatch}
      />
      <Page>
        <Col align="right" className="newButton">
          <Button
            onClick={() =>
              _toggle(
                {
                  title: "Add Bank Account",
                  type: "ADD",
                  Component: BankAccountAdd,
                  data: {},
                  submit: (data) => addBankAccount(data),
                  options: {
                    accountTypes,
                    currencies,
                    regions,
                    cities,
                    banks,
                    COAs,
                  },
                },
                dispatch
              )
            }
            outline
            size="sm"
          >
            New Bank Account
          </Button>
        </Col>

        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="Bank Accounts"
              columns={columns}
              data={reverse(
                bankAccounts.map((account) => ({
                  ...account,
                  is_active: Boolean(account.is_active)
                    ? "Is Active"
                    : "Not Active",
                }))
              )}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
};

export default BankAccount;
