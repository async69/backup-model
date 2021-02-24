import React, { useReducer, useEffect } from "react";
import { Card, Col, Button } from "reactstrap";
import Page from "../../../../components/Page";
import CommonModals from "../../../../components/CommonModal";
import SalesInvoiceForm from "./PurchaseInvoiceForm";
import CashPayForm from "../../SalesProcess/SalesInvoice/CashReceiptForm";
import PostForm from "../../SalesProcess/SalesInvoice/PostForm";
import CustomTable from "../../../common/table";
import { MdDelete, MdDoneAll, MdLaunch } from "react-icons/md";
import { _toggle, reducer, initialState } from "../../../common/ModalOptions";
import statusTypes from "../../../../config/statusTypes";
import { IoMdCash } from "react-icons/io";

const PurchaseInvoice = ({
  purchaseInvoices,
  doneAdd,
  addSalesInvoice,
  doneEdit,
  donePatch,
  postPurchaseInvoice,
  deletePurchaseInvoice,
  approvePurchaseInvoice,
  customers,
  currencies,
  itemMasterDatas,
  itemCategories,
  UOMs,
  COAs,
  bankAccounts,
  addCashPayment,
  salesOrders,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "document_number", label: "Document No." },
    { path: "purchase_order.name", label: "PO No." },
    { path: "vendor.name", label: "Vendor Name" },
    { path: "status", label: "Status" },
    { path: "amount_excl_vat", label: "T.Amount Excl. VAT" },
    { path: "total", label: "Total Amount" },
    {
      key: "view",
      label: "Actions",
      content: (salesInvoice) => (
        <>
          {Boolean(salesInvoice.status === statusTypes.POSTED) && (
            <Button
              className="m-1"
              size="sm"
              outline
              color="edit"
              disabled={!Boolean(salesInvoice.status === statusTypes.POSTED)}
              onClick={() => {
                _toggle(
                  {
                    type: "PATCH",
                    Component: CashPayForm,
                    data: salesInvoice,
                    title: "Pay Invoice",
                    size: "sm",
                    options: {
                      accounts: COAs,
                      bankAccounts: bankAccounts.map((item) => ({
                        ...item,
                        name: item.account_number,
                      })),
                    },
                    submit: addCashPayment,
                  },
                  dispatch
                );
              }}
            >
              <IoMdCash />
            </Button>
          )}
          {Boolean(salesInvoice.status === statusTypes.APPROVED) && (
            <Button
              className="m-1"
              size="sm"
              color="blue"
              outline
              disabled={!Boolean(salesInvoice.status === statusTypes.APPROVED)}
              onClick={() => {
                _toggle(
                  {
                    type: "PATCH",
                    Component: PostForm,
                    size: "md",
                    data: salesInvoice,
                    submit: postPurchaseInvoice,
                    title: "Post Purchase Invoice",
                  },
                  dispatch
                );
              }}
            >
              <MdLaunch />
            </Button>
          )}
          {Boolean(salesInvoice.status === statusTypes.OPEN) && (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              disabled={!Boolean(salesInvoice.status === statusTypes.OPEN)}
              onClick={() => approvePurchaseInvoice(salesInvoice)}
            >
              <MdDoneAll />
            </Button>
          )}
          {Boolean(salesInvoice.status === statusTypes.OPEN) && (
            <Button
              className="m-1"
              size="sm"
              outline
              color="danger"
              disabled={!Boolean(salesInvoice.status === statusTypes.OPEN)}
              onClick={() => {
                _toggle(
                  {
                    type: "DELETE",
                    deleteOptions: {
                      okCallback: okDelete,
                      title: "Are you sure?",
                      id: salesInvoice.id,
                      message: "",
                    },
                  },
                  dispatch
                );
              }}
            >
              <MdDelete />
            </Button>
          )}
        </>
      ),
    },
  ];

  const okDelete = (id) => {
    deletePurchaseInvoice(id);
  };

  useEffect(() => {
    if (doneAdd || doneEdit || donePatch) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit || donePatch]);

  return (
    <div>
      <CommonModals
        data={state.data}
        size={state.size}
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
                  Component: SalesInvoiceForm,
                  submit: addSalesInvoice,
                  title: "Add Sales Invoice",
                  options: {
                    customers,
                    currencies,
                    itemMasterDatas,
                    itemCategories,
                    UOMs,
                    salesOrders,
                  },
                },
                dispatch
              )
            }
            outline
            size="sm"
          >
            New Purchase Invoice
          </Button>
        </Col>

        <Card className="mainTable">
          <CustomTable
            title="Purchase Invoices"
            columns={columns}
            data={purchaseInvoices.map((invoice) => ({
              ...invoice,
            }))}
          />
        </Card>
      </Page>
    </div>
  );
};
export default PurchaseInvoice;
