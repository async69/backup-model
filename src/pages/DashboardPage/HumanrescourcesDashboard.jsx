import Page from "../../components/Page";
import { NumberWidget, IconWidget } from "../../components/Widget";
import { chartjs } from "../../demos/dashboardPage";
import React from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { Pie, Bar } from "@reactchartjs/react-chart.js";
import { MdThumbUp, MdHotel, MdCancel } from "react-icons/md";

class HumanrescourcesDashboard extends React.Component {
  render() {
    return (
      <Page
        className="dashboard mt-4 ml-2 mr-2"
        title="Human Resource Dashboard"
      >
        <Row>
          <Col md={4} sm={6} xs={12}>
            <NumberWidget
              title="Number of Employees "
              number="78"
              color="danger"
              progress={{
                value: 90,
                label: "Total",
              }}
            />
          </Col>
          <Col md={4} sm={6} xs={12}>
            <NumberWidget
              title="Total Monthly Salary "
              number="345,890 ETB"
              color="success"
              progress={{
                value: 90,
                label: "Total",
              }}
            />
          </Col>
          <Col md={4} sm={6} xs={12}>
            <NumberWidget
              title="Open Vacancies "
              number="8"
              color="info"
              progress={{
                value: 90,
                label: "Total",
              }}
            />
          </Col>

          <Col md={4} sm={6} xs={12}>
            <NumberWidget
              title="Time to fill"
              number="16 Days"
              color="secondary"
              progress={{
                value: 50,
                label: "This month",
              }}
            />
          </Col>

          <Col md={4} sm={6} xs={12}>
            <NumberWidget
              title="New Hires"
              number="5 Employees"
              color="secondary"
              progress={{
                value: 90,
                label: "This month",
              }}
            />
          </Col>

          <Col md={4} sm={6} xs={12}>
            <NumberWidget
              title="Training Costs"
              number="3,400 ETB"
              color="secondary"
              progress={{
                value: 90,
                label: "This month",
              }}
            />
          </Col>

          {/* <Col md={4} sm={6} xs={12}>
            <NumberWidget
              title="Costs PerHire"
              number="680 ETB"
              color="secondary"
              progress={{
                value: 90,
                label: "This month",
              }}
            />
          </Col> */}
        </Row>

        <Row>
          <Col md={6} sm={12} xs={12}>
            <Card className="shadow_">
              <CardHeader align="center">
                Employee Turnover Rate
                <small className="text-muted text-capitalize">
                  By Departments
                </small>
              </CardHeader>
              <CardBody>
                <Bar
                  data={chartjs.employeeTurnOverRate.data}
                  options={chartjs.employeeTurnOverRate.options}
                />{" "}
              </CardBody>
            </Card>
          </Col>

          <Col md={6} sm={12} xs={12}>
            <Card className="shadow_">
              <CardHeader align="center">Female to Male Ratio</CardHeader>
              <CardBody>
                <Pie data={chartjs.femaleToMaleRatio.data} />
              </CardBody>
            </Card>
          </Col>
          <Col md={12} sm={12} xs={12}>
            <Row>
              <Col md={4} sm={12} xs={12}>
                <IconWidget
                  className="shadow_ m-2"
                  bgColor="white"
                  inverse={false}
                  icon={MdThumbUp}
                  title="23 Scale Ups"
                  subtitle="Employees That got Upgraded"
                />
              </Col>
              <Col md={4} sm={12} xs={12}>
                <IconWidget
                  className="shadow_ m-2"
                  bgColor="white"
                  inverse={false}
                  icon={MdCancel}
                  title="2 Terminations"
                  subtitle="Employees That has been Terminated"
                />
              </Col>
              <Col md={4} sm={12} xs={12}>
                <IconWidget
                  className="shadow_ m-2"
                  bgColor="white"
                  inverse={false}
                  icon={MdHotel}
                  title="42 Sick-Leaves"
                  subtitle="Employees That took sick-leaves"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Page>
    );
  }
}
export default HumanrescourcesDashboard;
