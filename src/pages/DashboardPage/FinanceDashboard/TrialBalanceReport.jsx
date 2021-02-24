import React from "react";
import { Button, Col, Row, CardFooter } from "reactstrap";
import ParentForm from "../../common/form";
import Joi from "joi-browser";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Print from "../../FinanceManagement/LedgerEntries/GeneralLedgerEntries/reports/Print";
import { MdPrint } from "react-icons/md";

class TrialBalanceReport extends ParentForm {
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

  // callback selector for selecting date

  render() {
    return (
      <>
        {/* <Col md={12} sm={12} xs={12}>
          <small>
            A list of all the general ledger accounts (both revenue and capital)
            contained in the ledger of a business
          </small>
        </Col> */}
        <Row>
          <Col md={6} sm={6} xs={12}>
            {this.renderInput("start_date", "Start Date ", "date")}
          </Col>
          <Col md={6} sm={6} xs={12}>
            {this.renderInput("end_date", "End Date ", "date")}
          </Col>

          <Col md={12} sm={12} xs={12}>
            <CardFooter align="center">
              <PDFDownloadLink
                document={<Print invoice={this.props.trialBalance} />}
                fileName="TrialBalance.pdf"
              >
                {({ loading }) =>
                  loading ? (
                    <Button size="sm" outline color="info">
                      ...
                    </Button>
                  ) : (
                    <Button size="sm" outline color="info">
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

export default TrialBalanceReport;
