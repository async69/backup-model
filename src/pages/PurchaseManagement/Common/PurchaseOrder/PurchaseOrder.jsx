import React, { useReducer, useEffect, useState } from "react";
import Page from "../../../../components/Page";
import { Card, Button, Col } from "reactstrap";
import CustomerForm from "./PurchaseOrderForm";
import { MdRemoveRedEye, MdEdit, MdDelete, MdClose } from "react-icons/md";
import { reverse } from "../../../../helpers/reverse";
import CustomTable from "../../../common/table";
import { _toggle, initialState, reducer } from "../../../common/ModalOptions";
import CommonModals from "../../../../components/CommonModal";
import { getDateFormat } from "../../../../helpers/date";
import statusTypes from "../../../../config/statusTypes";
import { MdPrint } from "react-icons/md";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Print from "./PurchaseOrderprint/components/reports/Print";
import invoice from "../../../PrintDummyData/data/invoice";
import routes from "../../../../config/routes/index";
import { Redirect } from "react-router-dom";
import { IoMdCash } from "react-icons/io";
import { IoIosSend } from "react-icons/io";

const PurchaseOrder = ({
  purchaseOrders,
  addPurchaseOrder,
  editPurchaseOrder,
  deleteOrderOrder,
  sendForApproval,
  approvePurchaseOrder,
  rejectPurchaseOrder,
  invoicePurchaseOrder,
  doneAdd,
  doneEdit,
  itemMasterDatas,
  UOMs,
  vendors,
  itemCategories,
  currencies,
  purchaseTypes,
  purchaseRequisitions,
  departments,
  employees,
}) => {
  console.log(employees);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [redirect, setRedirect] = useState("");
  const columns = [
    { path: "document_number", label: "Document Number" },
    {
      path: "purchase_requisition_detail.name",
      label: "Purchase Requisition",
    },
    { path: "order_date", label: "Order Date" },
    { path: "vendor_detail.name", label: "Vendor Name" },
    { path: "status", label: "Status" },

    {
      key: "view",
      label: "Actions",
      content: (purchaseOrder) => (
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
                  Component: CustomerForm,
                  data: purchaseOrder,
                  title: "View Purchase Order",
                  options: {
                    itemMasterDatas,
                    departments,
                    UOMs,
                    vendors,
                    itemCategories,
                    currencies,
                    purchaseTypes,
                    purchaseRequisitions,
                    employees,
                  },
                },
                dispatch
              );
            }}
          >
            <MdRemoveRedEye />
          </Button>
          {purchaseOrder.status === statusTypes.OPEN ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              onClick={() => sendForApproval(purchaseOrder)}
            >
              {/* Send For Approval */}
              <IoIosSend />
            </Button>
          ) : (
            <></>
          )}
          {purchaseOrder.status === statusTypes.SENT_FOR_APPROVAL ? (
            <Button
              className="m-1"
              size="sm"
              color="success"
              onClick={() => approvePurchaseOrder(purchaseOrder)}
            >
              <IoIosSend />
            </Button>
          ) : (
            <></>
          )}
          {purchaseOrder.status === statusTypes.RECEIVED ? (
            <Button
              className="m-1"
              size="sm"
              color="success"
              onClick={() => invoicePurchaseOrder(purchaseOrder)}
            >
              Invoice
            </Button>
          ) : (
            <></>
          )}
          {purchaseOrder.status === statusTypes.INVOICING ? (
            <Button
              className="m-1"
              size="sm"
              color="success"
              onClick={() => setRedirect(routes.financePurchaseProcess)}
            >
              <IoMdCash /> Pay Cash
            </Button>
          ) : (
            <></>
          )}
          {purchaseOrder.status === statusTypes.SENT_FOR_APPROVAL ? (
            <Button
              className="m-1"
              size="sm"
              color="danger"
              onClick={() => rejectPurchaseOrder(purchaseOrder)}
            >
              {/* Reject */}
              <MdClose />
            </Button>
          ) : (
            <></>
          )}
          {purchaseOrder.status === statusTypes.OPEN ? (
            <Button
              className="m-1"
              size="sm"
              outline
              color="edit"
              onClick={() => {
                _toggle(
                  {
                    type: "EDIT",
                    Component: CustomerForm,
                    submit: editPurchaseOrder,
                    isEdit: true,
                    data: purchaseOrder,
                    title: "Edit Purchase Order",
                    options: {
                      itemMasterDatas,
                      UOMs,
                      vendors,
                      itemCategories,
                      currencies,
                      purchaseTypes,
                      departments,
                      employees,
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
          {purchaseOrder.status === statusTypes.OPEN ? (
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
                      id: purchaseOrder.id,
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
        </>
      ),
    },
  ];

  const okDelete = (id) => {
    deleteOrderOrder(id);
  };

  useEffect(() => {
    if (doneAdd || doneEdit) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit]);

  return redirect !== "" ? (
    <Redirect to={routes.financePurchaseProcess} />
  ) : (
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
                  Component: CustomerForm,
                  submit: addPurchaseOrder,
                  isEdit: true,
                  data: {},
                  options: {
                    itemMasterDatas,
                    departments,
                    UOMs,
                    vendors,
                    itemCategories,
                    currencies,
                    purchaseTypes,
                    purchaseRequisitions,
                    employees,
                  },
                },
                dispatch
              );
            }}
            outline
            size="sm"
          >
            New Purchase Order
          </Button>
        </Col>
        <Card className="mainTable">
          <CustomTable
            title="Purchase Orders"
            columns={columns}
            data={reverse(
              purchaseOrders.map((item) => ({
                ...item,
                order_date: getDateFormat(item.order_date),
                approved_date: getDateFormat(item.approved_date),
                posting_date: getDateFormat(item.posting_date),
                expected_delivery_date: getDateFormat(
                  item.expected_delivery_date
                ),
                updated_at: getDateFormat(item.updated_at),
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
            fileName="PurchaseOrder.pdf"
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
        </Card>
      </Page>
    </div>
  );
};

export default PurchaseOrder;
