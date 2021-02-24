import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import VendorPostingGroupForm from "./VendorPostingGroupForm";
import CustomTable from "../../../common/table";
import { reverse } from "../../../../helpers/reverse";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import { _toggle, reducer, initialState } from "../../../common/ModalOptions";
import { getDateFormat } from "../../../../helpers/date";

const VendorPostingGroup = ({
  postingGroups,
  addVendorPostingGroup,
  editVendorPostingGroup,
  deleteVendorPostingGroup,
  doneAdd,
  doneEdit,
  accounts,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const okDelete = (id) => {
    deleteVendorPostingGroup(id);
  };

  useEffect(() => {
    if (doneAdd || doneEdit) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit]);

  const columns = [
    { path: "name", label: "Name" },
    { path: "updated_at", label: "Last Modified" },
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
                  Component: VendorPostingGroupForm,
                  data: postingGroup,
                  title: "Add Vendor Posting Group",
                  options: { accounts },
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
                  Component: VendorPostingGroupForm,
                  data: postingGroup,
                  submit: editVendorPostingGroup,
                  title: "Edit Vendor Posting Group",
                  options: { accounts },
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
                  Component: VendorPostingGroupForm,
                  submit: addVendorPostingGroup,
                  title: "Add Vendor Posting Group",
                  options: { accounts },
                },
                dispatch
              )
            }
            outline
            size="sm"
          >
            New Vendor Posting Group
          </Button>
        </Col>
        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="Vendor Posting Group "
              columns={columns}
              data={reverse(
                postingGroups.map((postingGroup) => ({
                  ...postingGroup,
                  updated_at: getDateFormat(postingGroup.updated_at),
                }))
              )}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
};
export default VendorPostingGroup;
