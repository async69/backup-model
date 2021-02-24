import Page from "../../../components/Page";
import { NumberWidget } from "../../../components/Widget";
import { chartjs } from "../../../demos/dashboardPage";
import React from "react";
import { Bar } from "@reactchartjs/react-chart.js";
import IncomeStatementReports from "./IncomeStatementReports";
import BalanceSheetReports from "./BalanceSheetReports";
import TrialBalanceReport from "./TrialBalanceReport";
import CustomTable from "../../common/table";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";

const filterTrialBalance = (trialBalance) => {
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

class FinanceDashboard extends React.Component {
  render() {
    return (
      <Page
        className="dashboard mt-4 ml-2 mr-2"
        title="Finance Dashboard"
        // breadcrumbs={[{ name: "Dashboard", active: true }]}
      >
        <Row>
          <Col md={4} sm={6} xs={12}>
            <NumberWidget
              className="shadow_ radius"
              title="Revenue"
              number={`${this.props.revenue} ETB`}
              color="success"
              progress={{
                value: this.props.revenue,
                label: "Target - 3,000,000 ETB ",
              }}
            />
          </Col>

          <Col md={4} sm={6} xs={12}>
            <NumberWidget
              className="shadow_ radius"
              title="Gross Profit "
              number={`${this.props.grossProfit} ETB`}
              color="success"
              progress={{
                value: 85,
                label: "Target - 500,000 ETB ",
              }}
            />
          </Col>

          <Col md={4} sm={6} xs={12}>
            <NumberWidget
              className="shadow_ radius"
              title="Earnings before interest and taxes (EBIT)"
              number="2,000,342 ETB (+ 45%)"
              color="success"
              progress={{
                value: 68,
                label: "Target - 2,000,000",
              }}
            />
          </Col>
          <Col md={4} sm={6} xs={12}>
            <NumberWidget
              className="shadow_ radius"
              title="Operating Expence"
              number="700,342 ETB (- 5%)"
              color="danger"
              progress={{
                value: 100,
                label: "Target - 700,000",
              }}
            />
          </Col>
          <Col md={4} sm={6} xs={12}>
            <NumberWidget
              className="shadow_ radius"
              title="Net Income "
              number={this.props.netIncome}
              color="success"
              progress={{
                value: 66,
                label: "Target - 1,500,000",
              }}
            />
          </Col>
          <Col md={4} sm={6} xs={12}>
            <NumberWidget
              className="shadow_ radius"
              title="Daily Cash Movement"
              number={this.props.dailyCashMovement}
              color="warning"
              progress={{
                value: 66,
                label: "Target - 200,000",
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col md={4} sm={12} xs={12}>
            <Card className="shadow_ PDFreports">
              <CardHeader>Income Statement Reports</CardHeader>
              <CardBody>
                <IncomeStatementReports />
              </CardBody>
            </Card>
          </Col>

          <Col md={4} sm={12} xs={12}>
            <Card className="shadow_ PDFreports">
              <CardHeader>Balance Sheet Reports</CardHeader>
              <CardBody>
                <BalanceSheetReports balanceSheet={this.props.balanceSheet} />
              </CardBody>
            </Card>
          </Col>

          <Col md={4} sm={12} xs={12}>
            <Card className="shadow_ PDFreports">
              <CardHeader>Trial Balance Report</CardHeader>
              <CardBody>
                <TrialBalanceReport
                  trialBalance={filterTrialBalance(this.props.trialBalance)}
                />
              </CardBody>
            </Card>
          </Col>

          <Col md={6} sm={12} xs={12}>
            <Card className="shadow_">
              <CardHeader>
                Accounts Payable {"  "} {"  "} {"  "}
                <small className="text-muted text-capitalize">VS</small>
                {"   "}
                {"  "} Account Receivable
              </CardHeader>
              <CardBody>
                <Bar
                  width="25%"
                  height="13%"
                  data={chartjs.accPay_accRec.data}
                  // options={chartjs.employeesRating.options}
                />
              </CardBody>
            </Card>
          </Col>

          <Col md={6} sm={12} xs={12}>
            <Card className="shadow_">
              <CardHeader>Operating Costs Per-Department {"  "}</CardHeader>
              <CardBody>
                <Bar
                  width="25%"
                  height="13%"
                  data={chartjs.operatingCosts.data}
                  options={chartjs.operatingCosts.options}
                />
              </CardBody>
            </Card>
          </Col>

          <Col md={6} sm={12} xs={12}>
            <Card className="shadow_">
              <CardHeader> Assets </CardHeader>
              <CustomTable
                columns={this.props.financeAccounts.COAs.columns}
                data={this.props.financeAccounts.COAs.data}
              />
            </Card>
          </Col>

          <Col md={6} sm={12} xs={12}>
            <div>
              <Card className="shadow_">
                <CardHeader> Liabilities </CardHeader>
                <CustomTable
                  columns={this.props.financeAccounts.COAs.columns}
                  data={this.props.financeAccounts.COAs.data}
                />
              </Card>
            </div>
          </Col>

          <Col md={12} sm={12} xs={12}>
            <Card className="shadow_">
              <CardHeader>Summary </CardHeader>
              <CardBody>
                <CustomTable
                  columns={this.props.financeAccounts.banks.columns}
                  data={this.props.financeAccounts.banks.data}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}
export default FinanceDashboard;
