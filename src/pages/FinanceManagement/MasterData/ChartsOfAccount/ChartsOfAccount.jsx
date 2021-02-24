import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, Button, Col } from "reactstrap";
import AddCOA from "./ChartsOfAccountAdd";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import { reverse } from "../../../../helpers/reverse";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";
import CommonModals from "../../../../components/CommonModal";

const ChartOfAccounts = ({
  accounts,
  addCOA,
  editCOA,
  deleteCOA,
  accountTypes,
  doneAdd,
  doneEdit,
  doneDelete,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "account_number", label: "Account Number" },
    { path: "name", label: "Account Name" },
    { path: "parent.name", label: " Account Type" },
    {
      key: "view",
      label: "Actions",
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
                  title: "View Charts of accounts ",
                  data: coa,
                  Component: AddCOA,
                  options: { accountTypes },
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
                  title: "Edit Charts of Accounts ",
                  data: coa,
                  Component: AddCOA,
                  options: { accountTypes },
                  submit: editCOA,
                },
                dispatch
              );
            }}
          >
            <MdEdit color="warning" />
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
                    id: coa.id,
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
    if (doneAdd || doneEdit || doneDelete) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit, doneDelete]);

  const okDelete = (id) => {
    deleteCOA(id);
  };

  console.log("accounts", accounts);
  const filteredData = accounts.map((account) => ({
    ...account,
    has_related_bank: Boolean(account.has_related_bank)
      ? "Has Related Bank"
      : "Doesn't have related bank",
  }));
  return (
    <div>
      <CommonModals
        size="xl"
        title={state.title}
        data={state.data}
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
                  type: "ADD",
                  Component: AddCOA,
                  data: {},
                  title: "Add Chart of account",
                  submit: addCOA,
                  options: { accountTypes },
                },
                dispatch
              )
            }
            outline
            size="sm"
          >
            New Account
          </Button>
        </Col>
        <Col md={12} sm={12} xs={12}>
          <Card className="mainTable">
            <CustomTable
              title="Charts of Accounts "
              columns={columns}
              data={reverse(filteredData)}
            />
          </Card>
        </Col>
      </Page>
    </div>
  );
};

export default ChartOfAccounts;
