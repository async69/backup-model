import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, CardHeader, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import VatPostingSetupAdd from "./VatPostingSetupAdd";
import CustomTable from "../../../common/table";
import { reverse } from "../../../../helpers/reverse";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import { _toggle, reducer, initialState } from "../../../common/ModalOptions";

const VatPostingSetup = ({
  addVATPostingSetup,
  editVATPostingSetup,
  deleteVATPostingSetup,
  postingSetups,
  postingGroups,
  accounts,
  doneAdd,
  doneEdit,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const okDelete = (id) => {
    deleteVATPostingSetup(id);
  };

  useEffect(() => {
    if (doneAdd || doneEdit) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit]);

  const columns = [
    { path: "partner_vat_detail.name", label: "Partner VAT" },
    { path: "item_vat_detail.name", label: "Item VAT" },
    {
      path: "vat_receivable_account_detail.name",
      label: "VAT Receivable Account",
    },
    { path: "vat_payable_account_detail.name", label: "VAT Payable Account" },
    { path: "updated_at", label: "Date" },
    {
      key: "view",
      label: "Actions",
      content: (postingSetup) => (
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
                  Component: VatPostingSetupAdd,
                  data: postingSetup,
                  title: "View General Posting Setup",
                  options: { postingGroups, accounts },
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
                  Component: VatPostingSetupAdd,
                  data: postingSetup,
                  submit: editVATPostingSetup,
                  title: "Edit General Posting Setup",
                  options: { postingGroups, accounts },
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
                    id: postingSetup.id,
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

  return (
    <div>
      <CommonModals
        size="xl"
        data={state.data}
        openModal={state.openModal}
        component={state.Component}
        title={state.title}
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
                  Component: VatPostingSetupAdd,
                  submit: addVATPostingSetup,
                  title: "Add VAT Posting Setup",
                  options: { postingGroups, accounts },
                },
                dispatch
              )
            }
            outline
            size="sm"
          >
            New VAT Posting Setup
          </Button>
        </Col>
        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="VAT Posting Setup"
              columns={columns}
              data={reverse(postingSetups)}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
};

export default VatPostingSetup;
