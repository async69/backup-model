import React, { useReducer } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import PurchaseLedgerEntryModal from "./PurchaseLedgerEntryModal";
import CustomTable from "../../../common/table";
import { MdRemoveRedEye } from "react-icons/md";
import { _toggle, reducer, initialState } from "../../../common/ModalOptions";
import subAccountTypes from "../../../../static/data/subAccountType";
import { saveLineTag } from "./config";

export const types = {
  SALES: "SALES",
  PURCHASE: "PURCHASE",
};

export const getAccounting = (data = [], saveLineTag, type = "") => {
  return data.map((item) => {
    let values = {};

    item[saveLineTag].forEach((prop) => {
      // const
      const isSalesLedger = type === types.SALES;
      if (isSalesLedger) {
        if (
          subAccountTypes["Export Sales"] === prop.account.sub_account_type ||
          prop.account.sub_account_type === subAccountTypes["Local Sales"]
        ) {
          values = {
            ...prop,
            line_description: prop.description,
          };
        }
      } else {
        if (subAccountTypes["Cost Expense"] === prop.account.sub_account_type) {
          values = {
            ...prop,
            line_description: prop.description,
          };
        }
      }
    });
    return {
      ...values,
      ...item,
    };
  });
};

const SalesLedgerEntries = ({ salesLedgerEntries }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const columns = [
    { path: "purchase_order.order_number", label: "Order Number" },
    { path: "vendor.name", label: "Vendor Name" },
    { path: "invoice.invoice_number", label: "Invoice" },
    { path: "document_number", label: "Reference Number" },
    { path: "debit", label: "Debit" },
    { path: "credit", label: "Credit" },
    {
      key: "view",
      label: "Actions",
      content: (ledgerEntry) => (
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
                  title: "View Purchase Ledger",
                  data: ledgerEntry,
                  Component: PurchaseLedgerEntryModal,
                },
                dispatch
              );
            }}
          >
            <MdRemoveRedEye />
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
        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="Vendor Ledger Entries"
              columns={columns}
              data={getAccounting(
                salesLedgerEntries,
                saveLineTag,
                types.PURCHASE
              ).map((item) => {
                console.log("item", item);
                return item;
              })}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
};

export default SalesLedgerEntries;
