import React, { useState, useEffect } from "react";
import Page from "../../../../components/Page";
import { Card, CardBody, CardHeader, Button, Col } from "reactstrap";
import CommonModals from "../../../../components/CommonModal";
import SalesQuotesTable from "./SalesQuotesTable";
import { useDispatch, useSelector } from "react-redux";
import SalesQuoteForm from "./SalesQuoteForm";
import { loadSalesQuotes, getSalesQuotes } from "store/Sales/salesQuotes";

import { MdPrint } from "react-icons/md";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Print from "./SalesQuoteprint/components/reports/Print";
import invoice from "../../../PrintDummyData/data/invoice";

import PrintStatement from "./IncomeStatementPrint/components/reports/Print";

export default function SalesQuote() {
  const [modal, setModal] = useState({
    openModal: false,
    component: <React.Fragment />,
    data: {},
    buttonLabel: "",
  });

  const toggle = (type, data) => {
    switch (type) {
      case "OPEN": {
        setModal({ openModal: true });
        break;
      }

      case "CLOSE": {
        setModal({ openModal: false, data: null });
        break;
      }
      default:
        return data;
    }
  };
  const dispatch = useDispatch();
  const salesQuotes = useSelector(getSalesQuotes);
  useEffect(() => {
    dispatch(loadSalesQuotes());
  }, []);
  return (
    <div>
      <CommonModals
        size="xl"
        data={modal.data}
        openModal={modal.openModal}
        component={modal.component}
        title={modal.title}
        toggle={toggle}
        buttonLabel="Save Sales Quote"
      />

      <Page
        title="Sales Quote"
        breadcrumbs={[
          { name: "Sales Management", name1: "Common", active: true },
        ]}
      >
        <Col align="right" className="newButton">
          <Button
            onClick={() =>
              setModal({
                openModal: true,

                component: <SalesQuoteForm />,
              })
            }
            outline
            size="sm"
          >
            New Sales Quote
          </Button>
        </Col>

        <Card className="border-0">
          <Col md={12} sm={12} xs={12}>
            <CardHeader className="border-0">Sales Quote </CardHeader>
          </Col>
          <CardBody>
            <SalesQuotesTable salesQuotes={salesQuotes} />
          </CardBody>

          <PDFDownloadLink
            document={
              <Print
                orientation="landscape"
                className="app"
                invoice={invoice}
              />
            }
            fileName="SalesQuote.pdf"
          >
            {({ loading }) =>
              loading ? (
                <Button className="ml-3" size="sm" outline color="info">
                  Loading ...
                </Button>
              ) : (
                <Button className="ml-3" size="sm" outline color="info">
                  <MdPrint />
                </Button>
              )
            }
          </PDFDownloadLink>

          <PDFViewer width="1000" height="600">
            <PrintStatement invoice={invoice} />
          </PDFViewer>
        </Card>
      </Page>
    </div>
  );
}
