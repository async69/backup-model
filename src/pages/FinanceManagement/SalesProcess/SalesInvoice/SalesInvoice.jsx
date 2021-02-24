import React, { useReducer, useEffect } from "react";
import { Card, Button } from "reactstrap";
import Page from "../../../../components/Page";
import CommonModals from "../../../../components/CommonModal";
import SalesInvoiceForm from "./SalesInvoiceForm";
import CashReceiptForm from "./CashReceiptForm";
import PostForm from "./PostForm";
import CustomTable from "../../../common/table";
import {
  MdRemoveRedEye,
  MdEdit,
  MdDelete,
  MdLocalPostOffice,
} from "react-icons/md";
import { _toggle, reducer, initialState } from "../../../common/ModalOptions";
import { getDateFormat } from "../../../../helpers/date";
import statusTypes from "../../../../config/statusTypes";
import { IoMdCash, IoMdCheckmark } from "react-icons/io";

const SalesInvoice = ({
  salesInvoices,
  doneAdd,
  doneEdit,
  editSalesInvoice,
  donePatch,
  postSalesInvoice,
  deleteSalesInvoice,
  approveSalesInvoice,
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
    { path: "sales_order.document_number", label: "Sales Order No." },
    { path: "customer_name", label: "Customer Name" },
    { path: "posting_date", label: "Posting Date" },
    { path: "status_update", label: "Status" },
    { path: "total", label: "Total Amount" },
    {
      key: "view",
      label: "Actions",
      content: (salesInvoice) => (
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
                  Component: SalesInvoiceForm,
                  data: salesInvoice,
                  title: "View Sales Invoice",
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
              );
            }}
          >
            <MdRemoveRedEye />
          </Button>
          {Boolean(salesInvoice.status === statusTypes.POSTED) && (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              disabled={!Boolean(salesInvoice.status === statusTypes.POSTED)}
              onClick={() => {
                _toggle(
                  {
                    type: "PATCH",
                    Component: CashReceiptForm,
                    data: salesInvoice,
                    title: "Collect Invoice",
                    size: "md",
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
              color="success"
              disabled={!Boolean(salesInvoice.status === statusTypes.APPROVED)}
              onClick={() => {
                _toggle(
                  {
                    type: "PATCH",
                    size: "md",
                    Component: PostForm,
                    data: salesInvoice,
                    submit: postSalesInvoice,
                    title: "Post Sales Invoice",
                  },
                  dispatch
                );
              }}
            >
              <MdLocalPostOffice /> Post
            </Button>
          )}
          {Boolean(salesInvoice.status === statusTypes.OPEN) && (
            <Button
              className="m-1"
              size="sm"
              outline
              color="success"
              disabled={!Boolean(salesInvoice.status === statusTypes.OPEN)}
              onClick={() => approveSalesInvoice(salesInvoice)}
            >
              <IoMdCheckmark />
            </Button>
          )}
          {Boolean(salesInvoice.status === statusTypes.OPEN) && (
            <Button
              className="m-1"
              size="sm"
              outline
              color="edit"
              disabled={!Boolean(salesInvoice.status === statusTypes.OPEN)}
              onClick={() => {
                _toggle(
                  {
                    type: "PATCH",
                    Component: SalesInvoiceForm,
                    data: salesInvoice,
                    submit: editSalesInvoice,
                    title: "Edit Sales Invoice",
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
                );
              }}
            >
              <MdEdit />
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
    deleteSalesInvoice(id);
  };

  useEffect(() => {
    if (doneAdd || doneEdit || donePatch) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit || donePatch]);

  const getStatus = (status) => {
    if (status === statusTypes.POSTED) {
      return statusTypes.INVOICED;
    } else if (status === statusTypes.PENDING_PAYMENT) {
      return statusTypes.INVOICED;
    } else {
      return status;
    }
  };

  return (
    <div>
      <CommonModals
        size={state.size}
        title={state.title}
        data={state.data}
        openModal={state.openModal}
        component={state.Component}
        toggle={_toggle}
        dispatch={dispatch}
      />
      <Page>
        <Card className="mainTable">
          <CustomTable
            title="Sales Invoices"
            columns={columns}
            data={salesInvoices.map((invoice) => ({
              ...invoice,
              customer_name: invoice.customer.name,
              approved_date: getDateFormat(invoice.approved_date),
              status_update: getStatus(invoice.status),
            }))}
          />
        </Card>
      </Page>
    </div>
  );
};
export default SalesInvoice;
