import Page from "../../components/Page";
import { NumberWidget, IconWidget } from "../../components/Widget";
import { chartjs } from "../../demos/dashboardPage";
import React from "react";
import { HorizontalBar, Line } from "@reactchartjs/react-chart.js";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { MdWarning, MdDateRange } from "react-icons/md";
import { FaCheckCircle, FaUserCheck } from "react-icons/fa";

class PurchaseDashboard extends React.Component {
  render() {
    return (
      <Page className="dashboard mt-4 ml-2 mr-2" title="Purchase Dashboard">
        <Row>
          <Col md={3} sm={6} xs={12}>
            <IconWidget
              bgColor="white"
              iconColor="dark"
              inverse={false}
              icon={MdWarning}
              title="20"
              subtitle="Defect Rate "
            />
          </Col>
          <Col md={3} sm={6} xs={12}>
            <IconWidget
              bgColor="white"
              inverse={false}
              icon={FaCheckCircle}
              title="85.3 %"
              subtitle="On time Supplies   "
            />
          </Col>
          <Col md={3} sm={6} xs={12}>
            <IconWidget
              bgColor="white"
              inverse={false}
              icon={FaUserCheck}
              title="90.5 %"
              subtitle="Supplier Availability "
            />
          </Col>
          <Col md={3} sm={6} xs={12}>
            <IconWidget
              bgColor="white"
              inverse={false}
              icon={MdDateRange}
              title="1.9 %"
              subtitle=" Lead Time "
            />
          </Col>

          <Col md={4} sm={6} xs={12}>
            <NumberWidget
              title="Operating Expense"
              number="250"
              subtitle="This month"
              color="danger"
              progress={{
                value: 85,
                label: "Target 200",
              }}
            />
          </Col>
          <Col md={4} sm={6} xs={12}>
            <NumberWidget
              title="Cost of Purchase order "
              number="150,000"
              subtitle="This month"
              color="dark"
              progress={{
                value: 75,
                label: "Target 200,000",
              }}
            />
          </Col>
          <Col md={4} sm={6} xs={12}>
            <NumberWidget
              title="Cost Reduction  "
              number="150"
              subtitle="This month"
              color="warning"
              progress={{
                value: 100,
                label: "Target 120",
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col md={6} sm={12} xs={12}>
            <Card className="shadow_">
              <CardHeader align="center">
                Supplier Defect Rate {"  "}
              </CardHeader>
              <CardBody>
                <Line
                  width="25%"
                  height="7%"
                  data={chartjs.supplierdeffectRate.data}
                  options={chartjs.supplierdeffectRate.options}
                />
              </CardBody>
            </Card>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <Card className="shadow_">
              <CardHeader align="center">
                Supplier Availability {"  "}
              </CardHeader>
              <CardBody>
                <Line
                  width="25%"
                  height="7%"
                  data={chartjs.supplierAvilability.data}
                  options={chartjs.supplierAvilability.options}
                />
              </CardBody>
            </Card>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <Card className="shadow_">
              <CardHeader align="center">Lead Time {"  "}</CardHeader>
              <CardBody>
                <Line
                  width="25%"
                  height="7%"
                  data={chartjs.leadTime.data}
                  options={chartjs.leadTime.options}
                />
              </CardBody>
            </Card>
          </Col>

          <Col md={6} sm={12} xs={12}>
            <Card className="shadow_">
              <CardHeader align="center">
                Supplier Delivery Time{"  "}
              </CardHeader>
              <CardBody>
                <HorizontalBar
                  width="25%"
                  height="7%"
                  data={chartjs.supplierDeliveryTime.data}
                  options={chartjs.supplierDeliveryTime.options}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}
export default PurchaseDashboard;
