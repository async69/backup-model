import React from "react";
import { Button, CardFooter, Col, Row } from "reactstrap";
import ParentForm from "../../common/form";
import Joi from "joi-browser";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Print from "../../FinanceManagement/IncomeStatementPrint/components/reports/Print";
import invoice from "../../PrintDummyData/data/invoice";
import { MdPrint } from "react-icons/md";

class IncomeStatementReports extends ParentForm {
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
      <Row>
        <Col md={6} sm={6} xs={12}>
          {this.renderInput("start_date", "Start Date ", "date")}
        </Col>
        <Col md={6} sm={6} xs={12}>
          {this.renderInput("end_date", "End Date ", "date")}
        </Col>

        <Col md={12} sm={6} xs={12}>
          <CardFooter align="center">
            <PDFDownloadLink
              document={
                <Print
                  orientation="portrait"
                  className="app"
                  invoice={invoice}
                />
              }
              fileName="IncomeStatement.pdf"
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
    );
  }
}

export default IncomeStatementReports;
