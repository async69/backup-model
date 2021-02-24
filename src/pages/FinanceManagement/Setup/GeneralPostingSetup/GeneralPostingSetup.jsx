import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, CardHeader, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import GeneralPostingSetupAdd from "./GeneralPostingSetupAdd";
import CustomTable from "../../../common/table";
import { reverse } from "../../../../helpers/reverse";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import { _toggle, reducer, initialState } from "../../../common/ModalOptions";

const GeneralPostingSetup = ({
  postingSetups,
  addGeneralBusinessPostingSetup,
  editGeneralBusinessPostingSetup,
  deleteGeneralBusinessPostingSetup,
  postingGroups,
  itemCategories,
  accounts,
  doneAdd,
  doneEdit,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "partner_group_detail.name", label: "Partner Group" },
    { path: "item_group_detail.name", label: "Item Group" },
    { path: "purchase_account_detail.name", label: "Purchase Account" },
    { path: "sales_account_detail.name", label: "Sales Account" },
    {
      path: "cost_of_goods_sold_account_detail.name",
      label: "Cost of Goods Sold Account",
    },
    { path: "updated_at", label: "Last Modified Date" },
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
                  Component: GeneralPostingSetupAdd,
                  data: postingSetup,
                  title: "View General Posting Setup",
                  options: {
                    postingGroups,
                    itemCategories,
                    accounts,
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
                  Component: GeneralPostingSetupAdd,
                  data: postingSetup,
                  submit: editGeneralBusinessPostingSetup,
                  title: "Edit General Posting Setup",
                  options: {
                    postingGroups,
                    itemCategories,
                    accounts,
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

  const okDelete = (id) => {
    deleteGeneralBusinessPostingSetup(id);
  };

  useEffect(() => {
    if (doneAdd || doneEdit) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit]);

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
                  Component: GeneralPostingSetupAdd,
                  submit: addGeneralBusinessPostingSetup,
                  title: "Add General Posting Setup",
                  options: {
                    postingGroups,
                    itemCategories,
                    accounts,
                  },
                },
                dispatch
              )
            }
            outline
            size="sm"
          >
            New General Posting Setup
          </Button>
        </Col>
        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="General Posting Setup "
              columns={columns}
              data={reverse(postingSetups)}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
};

export default GeneralPostingSetup;
