import React from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, Button, Col } from "reactstrap";
import CustomTable from "../../../common/table";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Print from "../../LedgerEntries/GeneralLedgerEntries/reports/Print";
import { MdPrint } from "react-icons/md";

export const filterWHTReport = (whtReports) => {
  return whtReports.map((item) => {
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

const WHTReport = ({ whtReports }) => {
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
            document={<Print invoice={filterWHTReport(whtReports)} />}
            fileName="WHTReport.pdf"
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
              title="Withholding Tax"
              columns={columns}
              data={filterWHTReport(whtReports)}
            />
            <PDFDownloadLink
              document={<Print invoice={filterWHTReport(whtReports)} />}
              fileName="WHTReport.pdf"
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

export default WHTReport;
