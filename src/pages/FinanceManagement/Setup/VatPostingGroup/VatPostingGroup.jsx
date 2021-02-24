import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import VatPostingGroupAdd from "./VatPostingGroupAdd";
import CustomTable from "../../../common/table";
import { reverse } from "../../../../helpers/reverse";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import { _toggle, reducer, initialState } from "../../../common/ModalOptions";

const VatPostingGroup = ({
  postingGroups,
  doneAdd,
  addVATPostingGroup,
  doneEdit,
  editVATPostingGroup,
  deleteVATPostingGroup,
  coa,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const okDelete = (id) => {
    deleteVATPostingGroup(id);
  };

  useEffect(() => {
    if (doneAdd || doneEdit) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit]);

  const columns = [
    { path: "name", label: "Name" },
    { path: "vat", label: "VAT" },
    {
      path: "updated_at",
      label: "Last Modified",
    },
    {
      key: "view",
      label: "Actions",
      content: (postingGroup) => (
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
                  Component: VatPostingGroupAdd,
                  data: postingGroup,
                  title: "View VAT Posting Group",
                  options: {
                    coa,
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
                  Component: VatPostingGroupAdd,
                  data: postingGroup,
                  submit: editVATPostingGroup,
                  title: "Edit VAT Posting Group",
                  options: {
                    coa,
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
                    id: postingGroup.id,
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
                  Component: VatPostingGroupAdd,
                  submit: addVATPostingGroup,
                  title: "Add VAT Posting Group",
                  options: {
                    coa,
                  },
                },
                dispatch
              )
            }
            outline
            size="sm"
          >
            New VAT Posting Group
          </Button>
        </Col>
        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="VAT Posting Group "
              columns={columns}
              data={reverse(postingGroups)}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
};

export default VatPostingGroup;
