import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, Button, Col } from "reactstrap";
import PurchaseReturnForm from "./PurchaseReturnForm";
import {
  MdRemoveRedEye,
  MdEdit,
  MdDelete,
  MdPrint,
  MdClose,
  MdCheckCircle,
} from "react-icons/md";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Print from "./PurchaseReturnprint/components/reports/Print";
import invoice from "../../../PrintDummyData/data/invoice";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";
import CommonModals from "../../../../components/CommonModal";
import statusTypes from "../../../../config/statusTypes";
import { IoIosSend } from "react-icons/io";

const PurchaseReturn = ({
  purchaseReturns,
  addPurchaseReturn,
  editPurchaseReturn,
  deletePurchaseReturn,
  sendForApproval,
  rejectPurchaseReturn,
  approvePurchaseReturn,
  postPurchaseReturn,
  doneAdd,
  doneEdit,
  donePatch,
  items,
  unitMeasurements,
  warehouses,
  bins,
  goodReceivingNotes,
  vendors,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "document_number", label: "Document Number" },
    { path: "purchase_order_no", label: "Purchase Order No." },
    { path: "grn_no", label: "Grn No." },
    { path: "vendor", label: "Vendor" },
    { path: "posting_date", label: "Posting Date" },
    { path: "status", label: "Status" },
    {
      key: "view",
      label: "Actions",
      content: (purchaseReturn) => (
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
                  Component: PurchaseReturnForm,
                  data: purchaseReturn,
                  title: "View Purchase Return",
                  options: {
                    items,
                    unitMeasurements,
                    warehouses,
                    bins,
                    goodReceivingNotes,
                    vendors,
                  },
                },
                dispatch
              );
            }}
          >
            <MdRemoveRedEye />
          </Button>
          {purchaseReturn.status === statusTypes.OPEN ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="edit"
              onClick={() => {
                _toggle(
                  {
                    type: "EDIT",
                    Component: PurchaseReturnForm,
                    submit: editPurchaseReturn,
                    isEdit: true,
                    data: purchaseReturn,
                    title: "Edit Purchase Return",
                    options: {
                      items,
                      unitMeasurements,
                      warehouses,
                      bins,
                      goodReceivingNotes,
                      vendors,
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
          {purchaseReturn.status === statusTypes.OPEN ? (
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
                      id: purchaseReturn.id,
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
          {purchaseReturn.status === statusTypes.OPEN ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() => sendForApproval(purchaseReturn)}
            >
              {/* Send For Approval */}
              <IoIosSend />
            </Button>
          ) : (
            <></>
          )}
          {purchaseReturn.status === statusTypes.SENT_FOR_APPROVAL ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() => approvePurchaseReturn(purchaseReturn)}
            >
              <MdCheckCircle /> Approve
            </Button>
          ) : (
            <></>
          )}
          {purchaseReturn.status === statusTypes.SENT_FOR_APPROVAL ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() => rejectPurchaseReturn(purchaseReturn)}
            >
              {/* Reject */}
              <MdClose />
            </Button>
          ) : (
            <></>
          )}
          {purchaseReturn.status === statusTypes.APPROVED ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() => {
                _toggle(
                  {
                    type: "POST",
                    submit: postPurchaseReturn,
                    submitButtonLabel: "Issue",
                    data: purchaseReturn,
                    title: "Post",
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
    deletePurchaseReturn(id);
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
                  Component: PurchaseReturnForm,
                  submit: addPurchaseReturn,
                  isEdit: true,
                  options: {
                    items,
                    unitMeasurements,
                    warehouses,
                    bins,
                    goodReceivingNotes,
                    vendors,
                  },
                },
                dispatch
              );
            }}
            outline
            size="sm"
          >
            New Purchase Return
          </Button>
        </Col>

        <Card className="mainTable">
          <CustomTable
            title="Purchase Returns"
            columns={columns}
            data={purchaseReturns.map((item) => ({
              ...item,
              // order_date: getDateFormat(item.order_date),
              // approved_date: getDateFormat(item.approved_date),
              // due_date: getDateFormat(item.due_date),
              // updated_at: getDateFormat(item.updated_at),
            }))}
          />
          <PDFDownloadLink
            document={
              <Print
                orientation="landscape"
                className="app"
                invoice={invoice}
              />
            }
            fileName="PurchaseReturn.pdf"
          >
            {({ loading }) =>
              loading ? (
                <Button className="ml-3" size="sm" outline color="info">
                  Loading ...
                </Button>
              ) : (
                <Button className="ml-3" size="sm" outline color="info">
                  <MdPrint />
                </Button>
              )
            }
          </PDFDownloadLink>

          {/* <PDFViewer width="1000" height="600">
            <Print invoice={invoice} />
          </PDFViewer> */}
        </Card>
      </Page>
    </div>
  );
};

export default PurchaseReturn;
