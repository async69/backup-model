import React, { useReducer, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import PaymentForm from "./CashPaymentForm";
import CustomTable from "../../../common/table";
import { reverse } from "../../../../helpers/reverse";
import { MdRemoveRedEye } from "react-icons/md";
import { _toggle, reducer, initialState } from "../../../common/ModalOptions";
import { getDateFormat } from "../../../../helpers/date";

const CashPayment = ({
  addCashPayment,
  purchaseInvoices,
  accounts,
  doneAdd,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (doneAdd) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd]);

  const columns = [
    { path: "document_number", label: "Document Number" },
    { path: "posted_date", label: "Posting date" },
    { path: "approved_date", label: "Approve date" },
    { path: "status", label: "Status" },
    { path: "paid_amount", label: "Paid Amount" },
    { path: "sub_total", label: "Sub Total" },
    { path: "total_amount", label: "Total Amount" },
    { path: "total_vat", label: "Total VAT" },
    { path: "purchase_order_no", label: "Purchase Order No" },
    { path: "grn_no", label: "GRN No" },
    { path: "purchase_type", label: "Purchase Type" },
    { path: "vendor_detail.vendor_name", label: "Vendor" },
    { path: "sub_total", label: "Total Amount Excl VAT" },
    { path: "vendor_invoice_no", label: "Vendor Invoice No" },
    { path: "remarks", label: "Remarks" },
    {
      key: "view",
      label: "Actions",
      content: (period) => (
        <>
          {(
            <Button
              className="m-1"
              size="sm"
              outline
              color="info"
              onClick={() => {
                _toggle(
                  {
                    type: "VIEW",
                    Component: PaymentForm,
                    data: period,
                    title: "View Payment",
                  },
                  dispatch
                );
              }}
            >
              <MdRemoveRedEye />
            </Button>
          ) && period.status === "Paid"}
          <Button
            className="m-1"
            size="sm"
            outline
            color="success"
            disabled={period.status === "Paid"}
            onClick={() => {
              _toggle(
                {
                  type: "EDIT",
                  Component: PaymentForm,
                  data: period,
                  submit: addCashPayment,
                  title: "Pay Purchase Invoice",
                  options: {
                    type: "PAY",
                    accounts,
                  },
                },
                dispatch
              );
            }}
          >
            Pay
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
              title="Purchase Invoices"
              columns={columns}
              data={reverse(
                purchaseInvoices.map((item) => ({
                  ...item,
                  updated_at: getDateFormat(item.updated_at),
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

export default CashPayment;
