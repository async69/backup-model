import React, { useReducer } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import SalesLedgerEntryModal from "./SalesLedgerEntryModal";
import CustomTable from "../../../common/table";
import { MdRemoveRedEye } from "react-icons/md";
import { _toggle, reducer, initialState } from "../../../common/ModalOptions";
import {
  getAccounting,
  types,
} from "../PurchaseLedgerEntries/PurchaseLedgerEntries";
import { saveLineTag } from "./config";

const SalesLedgerEntries = ({ salesLedgerEntries }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const columns = [
    { path: "sales_order.order_number", label: "Order Number" },
    { path: "customer.name", label: "Customer Name" },
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
                  data: ledgerEntry,
                  Component: SalesLedgerEntryModal,
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
              title="Sales Ledger Entries"
              columns={columns}
              data={getAccounting(salesLedgerEntries, saveLineTag, types.SALES)}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
};

export default SalesLedgerEntries;
