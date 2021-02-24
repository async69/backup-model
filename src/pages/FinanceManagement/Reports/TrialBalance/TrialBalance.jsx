import React from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CustomTable from "../../../common/table";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Print from "../../../FinanceManagement/LedgerEntries/GeneralLedgerEntries/reports/Print";
import { MdPrint } from "react-icons/md";

export const filterTrialBalance = (trialBalance) => {
  return trialBalance.map((item) => {
    if (item.debit >= item.credit) {
      return {
        ...item,
        credit: 0,
      };
    } else {
      return {
        ...item,
        debit: 0,
      };
    }
  });
};

const TrialBalance = ({ trialBalance }) => {
  const columns = [
    { path: "account_number", label: "No." },
    { path: "name", label: "Chart of Account" },
    { path: "debit", label: "Debit" },
    { path: "credit", label: "Credit" },
  ];

  return (
    <div>
      <Page>
        <Col align="center" className="newButton">
          <PDFDownloadLink
            document={<Print invoice={filterTrialBalance(trialBalance)} />}
            fileName="TrialBalance.pdf"
          >
            {({ loading }) =>
              loading ? (
                <Button size="sm" outline>
                  ...
                </Button>
              ) : (
                <Button size="sm" outline>
                  <MdPrint /> Print
                </Button>
              )
            }
          </PDFDownloadLink>
        </Col>
        <Card className="mainTable">
          <CardBody>
            <CustomTable
              title="Trial Balance"
              columns={columns}
              data={filterTrialBalance(trialBalance)}
            />
            <PDFDownloadLink
              document={<Print invoice={filterTrialBalance(trialBalance)} />}
              fileName="TrialBalance.pdf"
            >
              {({ loading }) =>
                loading ? (
                  <Button size="sm" outline>
                    ...
                  </Button>
                ) : (
                  <Button size="sm" outline>
                    <MdPrint /> Print
                  </Button>
                )
              }
            </PDFDownloadLink>
          </CardBody>
        </Card>
      </Page>
    </div>
  );
};

export default TrialBalance;