import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, Button, Col } from "reactstrap";
import DisposalForm from "./DisposalForm";
import {
  MdRemoveRedEye,
  MdEdit,
  MdDelete,
  MdLocalPostOffice,
  MdClose,
  MdCheckCircle,
} from "react-icons/md";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";
import CommonModals from "../../../../components/CommonModal";
import statusTypes from "../../../../config/statusTypes";
import { IoIosSend } from "react-icons/io";
const Disposal = ({
  disposals,
  addDisposal,
  editDisposal,
  deleteDisposal,
  sendForApproval,
  rejectDisposal,
  approveDisposal,
  postDisposal,
  doneAdd,
  doneEdit,
  donePatch,
  items,
  unitMeasurements,
  warehouses,
  bins,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "document_number", label: "Document Number" },
    { path: "external_document_no", label: "External Document Number" },
    { path: "status", label: "Status" },
    { path: "remarks", label: "Remarks" },
    {
      key: "view",
      label: "Actions",
      content: (disposal) => (
        <>
          <Button
            className="m-1"
            size="sm"
            outline
            color="primary"
            onClick={() => {
              _toggle(
                {
                  type: "VIEW",
                  Component: DisposalForm,
                  data: disposal,
                  title: "View Disposal",
                  options: {
                    items,
                    unitMeasurements,
                    warehouses,
                    bins,
                  },
                },
                dispatch
              );
            }}
          >
            <MdRemoveRedEye />
          </Button>
          {disposal.status === statusTypes.OPEN ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="primary"
              onClick={() => {
                _toggle(
                  {
                    type: "EDIT",
                    Component: DisposalForm,
                    submit: editDisposal,
                    isEdit: true,
                    data: disposal,
                    title: "Edit Disposal",
                    options: {
                      items,
                      unitMeasurements,
                      warehouses,
                      bins,
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
          {disposal.status === statusTypes.OPEN ? (
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
                      id: disposal.id,
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
          {disposal.status === statusTypes.OPEN ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() => sendForApproval(disposal)}
            >
              {/* Send For Approval */}
              <IoIosSend />
            </Button>
          ) : (
            <></>
          )}
          {disposal.status === statusTypes.SENT_FOR_APPROVAL ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() => approveDisposal(disposal)}
            >
              <MdCheckCircle /> Approve
            </Button>
          ) : (
            <></>
          )}
          {disposal.status === statusTypes.SENT_FOR_APPROVAL ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() => rejectDisposal(disposal)}
            >
              {/* Reject */}
              <MdClose />
            </Button>
          ) : (
            <></>
          )}
          {disposal.status === statusTypes.APPROVED ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() => {
                _toggle(
                  {
                    type: "POST",
                    submit: postDisposal,
                    submitButtonLabel: "Post",
                    data: disposal,
                    title: "Post",
                  },
                  dispatch
                );
              }}
            >
              <MdLocalPostOffice /> Post
            </Button>
          ) : (
            <></>
          )}
        </>
      ),
    },
  ];

  const okDelete = (id) => {
    deleteDisposal(id);
  };

  useEffect(() => {
    if (doneAdd || doneEdit || donePatch) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit, donePatch]);

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
        <Col align="right" className="newButton">
          <Button
            onClick={() => {
              _toggle(
                {
                  type: "ADD",
                  Component: DisposalForm,
                  submit: addDisposal,
                  isEdit: true,
                  options: {
                    items,
                    unitMeasurements,
                    warehouses,
                    bins,
                  },
                },
                dispatch
              );
            }}
            outline
            size="sm"
          >
            New Disposal
          </Button>
        </Col>

        <Card className="mainTable">
          <CustomTable
            title="Disposals"
            columns={columns}
            data={disposals.map((item) => ({
              ...item,
              // order_date: getDateFormat(item.order_date),
              // approved_date: getDateFormat(item.approved_date),
              // due_date: getDateFormat(item.due_date),
              // updated_at: getDateFormat(item.updated_at),
            }))}
          />
        </Card>
      </Page>
    </div>
  );
};

export default Disposal;
