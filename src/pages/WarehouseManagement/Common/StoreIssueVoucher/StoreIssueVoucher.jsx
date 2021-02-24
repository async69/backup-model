import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, Button, Col } from "reactstrap";
import StoreIssueVoucherForm from "./StoreIssueVoucherForm";
import { MdRemoveRedEye, MdEdit, MdDelete, MdClose } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";
import CommonModals from "../../../../components/CommonModal";
import statusTypes from "../../../../config/statusTypes";
const StoreIssueVoucher = ({
  storeIssueVouchers,
  addStoreIssueVoucher,
  editStoreIssueVoucher,
  deleteStoreIssueVoucher,
  sendForApproval,
  rejectStoreIssueVoucher,
  approveStoreIssueVoucher,
  issueStoreIssueVoucher,
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
    { path: "document_number", label: "Document No." },
    { path: "sales_order_number", label: "Sales Order No." },
    { path: "posting_date", label: "Posting Date " },
    // { path: "issued_by", label: "Issued By " },
    { path: "status", label: "Status" },
    {
      key: "view",
      label: "Actions",
      content: (storeIssueVoucher) => (
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
                  Component: StoreIssueVoucherForm,
                  data: storeIssueVoucher,
                  title: "View Store Issue Voucher",
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
          {storeIssueVoucher.status === statusTypes.OPEN ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="edit"
              onClick={() => {
                _toggle(
                  {
                    type: "EDIT",
                    Component: StoreIssueVoucherForm,
                    submit: editStoreIssueVoucher,
                    isEdit: true,
                    data: storeIssueVoucher,
                    title: "Edit Store Issue Voucher",
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
          {storeIssueVoucher.status === statusTypes.OPEN ? (
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
                      id: storeIssueVoucher.id,
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
          {storeIssueVoucher.status === statusTypes.OPEN ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() => sendForApproval(storeIssueVoucher)}
            >
              {/* Send For Approval */}
              <IoIosSend />
            </Button>
          ) : (
            <></>
          )}
          {storeIssueVoucher.status === statusTypes.SENT_FOR_APPROVAL ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() => approveStoreIssueVoucher(storeIssueVoucher)}
            >
              <IoIosSend /> Approve
            </Button>
          ) : (
            <></>
          )}
          {storeIssueVoucher.status === statusTypes.SENT_FOR_APPROVAL ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() => rejectStoreIssueVoucher(storeIssueVoucher)}
            >
              {/* Reject */}
              <MdClose />
            </Button>
          ) : (
            <></>
          )}
          {storeIssueVoucher.status === statusTypes.APPROVED ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() => {
                _toggle(
                  {
                    type: "POST",
                    submitButtonLabel: "Issue",
                    submit: issueStoreIssueVoucher,
                    data: storeIssueVoucher,
                    title: "Issue",
                  },
                  dispatch
                );
              }}
            >
              Issue
            </Button>
          ) : (
            <></>
          )}
        </>
      ),
    },
  ];

  const okDelete = (id) => {
    deleteStoreIssueVoucher(id);
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
                  Component: StoreIssueVoucherForm,
                  submit: addStoreIssueVoucher,
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
            New Store Issue Voucher
          </Button>
        </Col>

        <Card className="mainTable">
          <CustomTable
            title="Store Issue Vouchers "
            columns={columns}
            data={storeIssueVouchers.map((item) => ({
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

export default StoreIssueVoucher;
