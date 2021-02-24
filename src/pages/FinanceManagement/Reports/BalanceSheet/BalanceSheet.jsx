import React from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CustomTable from "../../../common/table";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Print from "../../LedgerEntries/GeneralLedgerEntries/reports/Print";
import { MdPrint } from "react-icons/md";
import { getDataFromObject } from "../IncomeStatement/IncomeStatement"

export const filterBalanceSheet = (balanceSheets) => {
  return balanceSheets.map((item) => {
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

const BalanceSheet = ({ balanceSheets }) => {
  const columns = [
    { path: "type", label: "Chart of Account Type" },
    { path: "subAccountType", label: "Sub Account Type" },
    { path: "balance", label: "Balance" },
  ];

  return (
    <Page>
      <Col align="center" className="newButton">
        <PDFDownloadLink
          document={<Print invoice={filterBalanceSheet(balanceSheets)} />}
          fileName="BalanceSheet.pdf"
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
            title="Balance Sheets"
            columns={columns}
            data={getDataFromObject(balanceSheets)}
          />
          <PDFDownloadLink
            document={<Print invoice={filterBalanceSheet(balanceSheets)} />}
            fileName="BalanceSheet.pdf"
          >
            {({ loading }) =>
              loading ? (
                <Button size="sm" outline color="info">
                  ...
                </Button>
              ) : (
                <Button size="sm" outline color="info">
                  <MdPrint /> Print
                </Button>
              )
            }
          </PDFDownloadLink>
        </CardBody>
      </Card>
    </Page>
  );
};

export default BalanceSheet;
