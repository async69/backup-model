import React, { useReducer } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import LedgerEntriesModal from "../Modal/LedgerEntriesModal";
import CustomTable from "../../../common/table";
import { MdRemoveRedEye } from "react-icons/md";
import { _toggle, reducer, initialState } from "../../../common/ModalOptions";

const GeneralLedgerEntries = ({ generalLedgerEntries }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const columns = [
    { path: "posting_date", label: "Posting Date" },
    { path: "document_number", label: "Journal Document No." },
    { path: "partner_number", label: "Partner Number" },
    { path: "partner_name", label: "Partner Name" },
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
                  Component: LedgerEntriesModal,
                  title: "General Ledger",
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
        <Card className="border-0">
          <Col md={12} sm={12} xs={12}></Col>
          <CardBody>
            <CustomTable
              title="General Ledger Entries"
              columns={columns}
              data={generalLedgerEntries}
            />
          </CardBody>
        </Card>
      </Page>
    </div>
  );
};

export default GeneralLedgerEntries;
