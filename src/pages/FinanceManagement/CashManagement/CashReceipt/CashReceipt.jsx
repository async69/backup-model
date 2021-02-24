import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import PaymentForm from "./CashReceiptForm";
import SalesInvoiceForm from "../../SalesProcess/SalesInvoice/SalesInvoiceForm";
import CustomTable from "../../../common/table";
import { reverse } from "../../../../helpers/reverse";
import { MdRemoveRedEye } from "react-icons/md";
import { _toggle, reducer, initialState } from "../../../common/ModalOptions";
import { getDateFormat } from "../../../../helpers/date";

const CashReceipt = ({
  addCashPayment,
  salesInvoices,
  accounts,
  doneAdd,
  customers,
  currencies,
  itemMasterDatas,
  itemCategories,
  UOMs,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (doneAdd) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd]);

  const columns = [
    { path: "document_number", label: "Document No." },
    { path: "sales_order_no", label: "Sales Order No." },
    // { path: "siv_no", label: "SIV No." },
    // { path: "customer_number", label: "Customer Number" },
    { path: "customer_detail.customer_name", label: "Customer Name" },
    { path: "posted_date", label: "Posting Date" },
    // { path: "approvedBy", label: "Approved By" },
    // { path: "approved_date", label: "Approved Date" },
    { path: "status", label: "Status" },
    // { path: "sub_total", label: "Total Amount Excl. VAT" },
    // { path: "remarks", label: "Remarks" },
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
            color="success"
            disabled={salesInvoice.status === "Paid"}
            onClick={() => {
              _toggle(
                {
                  type: "EDIT",
                  Component: PaymentForm,
                  data: salesInvoice,
                  submit: addCashPayment,
                  title: "Collect Sales Invoice",
                  options: {
                    type: "PAY",
                    accounts,
                  },
                },
                dispatch
              );
            }}
          >
            Receive Pay
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <CommonModals
        size="xl"
        title={state.title}
        data={state.data}
        openModal={state.openModal}
        component={state.Component}
        toggle={_toggle}
        dispatch={dispatch}
      />

      <Page>
        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="Sales Invoices"
              columns={columns}
              data={reverse(
                salesInvoices.map((item) => ({
                  ...item,
                  updated_at: getDateFormat(item.updated_at),
                  approved_date: getDateFormat(item.approved_date),
                }))
              ).filter(
                (invoice) =>
                  invoice.status === "Paid" || invoice.status === "Posted"
              )}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
};

export default CashReceipt;
