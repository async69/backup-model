import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, Button, Col } from "reactstrap";
import SalesReturnForm from "./SalesReturnForm";
import { MdRemoveRedEye, MdEdit, MdDelete, MdClose } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { reverse } from "../../../../helpers/reverse";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";
import CommonModals from "../../../../components/CommonModal";
import statusTypes from "../../../../config/statusTypes";
import { MdPrint } from "react-icons/md";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Print from "./SalesReturnprint/components/reports/Print";
import invoice from "../../../PrintDummyData/data/invoice";
import { FaHandHolding } from "react-icons/fa";
const SalesReturn = ({
  salesReturns,
  addSalesReturn,
  editSalesReturn,
  deleteSalesReturn,
  sendForApproval,
  rejectSalesReturn,
  approveSalesReturn,
  postSalesReturn,
  doneAdd,
  doneEdit,
  donePatch,
  items,
  unitMeasurements,
  warehouses,
  bins,
  storeIssueVouchers,
  customers,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "document_number", label: "Document Number" },
    { path: "siv_no", label: "SIV No." },
    { path: "customer", label: "Customer" },
    { path: "sales_order_no", label: "Sales Order Number" },
    { path: "posting_date", label: "Posting Date" },
    { path: "status", label: "Status" },
    // { path: "remarks", label: "Remarks" },
    {
      key: "view",
      label: "Actions",
      content: (salesReturn) => (
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
                  Component: SalesReturnForm,
                  data: salesReturn,
                  title: "View Sales Return",
                  options: {
                    items,
                    unitMeasurements,
                    warehouses,
                    bins,
                    storeIssueVouchers,
                    customers,
                  },
                },
                dispatch
              );
            }}
          >
            <MdRemoveRedEye />
          </Button>
          {salesReturn.status === statusTypes.OPEN ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="edit"
              onClick={() => {
                _toggle(
                  {
                    type: "EDIT",
                    Component: SalesReturnForm,
                    submit: editSalesReturn,
                    isEdit: true,
                    data: salesReturn,
                    title: "Edit Sales Return",
                    options: {
                      items,
                      unitMeasurements,
                      warehouses,
                      bins,
                      storeIssueVouchers,
                      customers,
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
          {salesReturn.status === statusTypes.OPEN ? (
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
                      id: salesReturn.id,
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
          {salesReturn.status === statusTypes.OPEN ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() => sendForApproval(salesReturn)}
            >
              {/* Send For Approval */}
              <IoIosSend />
            </Button>
          ) : (
            <></>
          )}
          {salesReturn.status === statusTypes.SENT_FOR_APPROVAL ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() => approveSalesReturn(salesReturn)}
            >
              <IoIosSend /> Approve
            </Button>
          ) : (
            <></>
          )}
          {salesReturn.status === statusTypes.SENT_FOR_APPROVAL ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() => rejectSalesReturn(salesReturn)}
            >
              {/* Reject */}
              <MdClose />
            </Button>
          ) : (
            <></>
          )}
          {salesReturn.status === statusTypes.APPROVED ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() => {
                _toggle(
                  {
                    type: "POST",
                    submit: postSalesReturn,
                    submitButtonLabel: "Receive",
                    data: salesReturn,
                    title: "Post",
                  },
                  dispatch
                );
              }}
            >
              {/* Receive */}
              <FaHandHolding />
            </Button>
          ) : (
            <></>
          )}
        </>
      ),
    },
  ];

  const okDelete = (id) => {
    deleteSalesReturn(id);
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
                  Component: SalesReturnForm,
                  submit: addSalesReturn,
                  isEdit: true,
                  options: {
                    items,
                    unitMeasurements,
                    warehouses,
                    bins,
                    storeIssueVouchers,
                    customers,
                  },
                },
                dispatch
              );
            }}
            outline
            size="sm"
          >
            New Sales Return
          </Button>
        </Col>

        <Card className="mainTable">
          <CustomTable
            title="Sales Returns"
            columns={columns}
            data={reverse(
              salesReturns.map((item) => ({
                ...item,
                // order_date: getDateFormat(item.order_date),
                // approved_date: getDateFormat(item.approved_date),
                // due_date: getDateFormat(item.due_date),
                // updated_at: getDateFormat(item.updated_at),
              }))
            )}
          />
          <PDFDownloadLink
            document={
              <Print
                orientation="landscape"
                className="app"
                invoice={invoice}
              />
            }
            fileName="SalesReturn.pdf"
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

export default SalesReturn;
