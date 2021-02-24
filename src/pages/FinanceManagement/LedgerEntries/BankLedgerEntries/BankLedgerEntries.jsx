import React, { useReducer } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import LedgerEntriesModal from "../Modal/LedgerEntriesModal";
import CustomTable from "../../../common/table";
import { reverse } from "../../../../helpers/reverse";
import { MdRemoveRedEye } from "react-icons/md";
import { _toggle, reducer, initialState } from "../../../common/ModalOptions";

const BankLedgerEntries = ({ bankLedgerEntries }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "posting_date", label: "Posting Date" },
    { path: "document_number", label: " Document No." },
    { path: "debit", label: "Debit" },
    { path: "credit", label: "Credit" },
    // { path: "account_balance", label: "Balance" },
    // { path: "", label: "Document Type" },
    // { path: "", label: "Ref. No." },
    // { path: "", label: "Account No." },
    // { path: "description", label: "Description" },

    // { path: "", label: "Remarks" },
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
                  options: { noBalance: true },
                  Component: LedgerEntriesModal,
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
        title={state.title}
        component={state.Component}
        toggle={_toggle}
        dispatch={dispatch}
      />

      <Page>
        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="Bank Ledger Entries"
              columns={columns}
              data={reverse(bankLedgerEntries)}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
};

export default BankLedgerEntries;
