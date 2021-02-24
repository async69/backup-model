import React from "react";
import { Button, Col, Row, CardFooter } from "reactstrap";
import ParentForm from "../../common/form";
import Joi from "joi-browser";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Print from "../../FinanceManagement/LedgerEntries/GeneralLedgerEntries/reports/Print";
import invoice from "../../PrintDummyData/data/invoice";
import { MdPrint } from "react-icons/md";

class BalanceSheetReports extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        start_date: "",
        end_date: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      start_date: Joi.string().required().label("start_date"),
      end_date: Joi.string().required().label("end_date"),
    };
  }

  render() {
    return (
      <>
        <Row>
          <Col md={12} sm={12} xs={12}>
            <small>
              Financial statement of a company which includes assets,
              liabilities, equity capital, total debt, etc. at this point in
              time.
            </small>
          </Col>

          <Col md={12} sm={12} xs={12}>
            <CardFooter align="center">
              <PDFDownloadLink
                document={
                  <Print
                    orientation="landscape"
                    className="app"
                    invoice={invoice}
                    balanceSheet={this.props.balanceSheet}
                  />
                }
                fileName="BalanceSheet.pdf"
              >
                {({ loading }) =>
                  loading ? (
                    <Button className="ml-3" size="sm" outline color="info">
                      ...
                    </Button>
                  ) : (
                    <Button className="ml-3" size="sm" outline color="info">
                      <MdPrint /> View
                    </Button>
                  )
                }
              </PDFDownloadLink>
            </CardFooter>
          </Col>
        </Row>
      </>
    );
  }
}

export default BalanceSheetReports;
