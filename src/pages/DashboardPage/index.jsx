import Page from "../../components/Page";
import { IconWidget, NumberWidget } from "../../components/Widget";
import { chartjs } from "../../demos/dashboardPage";
import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  MdBubbleChart,
  MdInsertChart,
  MdPieChart,
  MdRateReview,
  MdShare,
  MdShowChart,
  MdThumbUp,
} from "react-icons/md";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";

import { getColor } from "../../utils/colors";

class DashboardPage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    const primaryColor = getColor("primary");
    // const secondaryColor = getColor("secondary");

    return (
      <Page
        className="dashboard"
        title="Dashboard"
        breadcrumbs={[{ name: "Dashboard", active: true }]}
      >
        <Row>
          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Monthly Visitors"
              subtitle="This month"
              number="5,400"
              color="secondary"
              progress={{
                value: 45,
                label: "Last month",
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="New Customers"
              subtitle="This month"
              number="3,400"
              color="secondary"
              progress={{
                value: 90,
                label: "Last month",
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Total Sales"
              subtitle="This month"
              number="68%"
              color="secondary"
              progress={{
                value: 60,
                label: "Last month",
              }}
            />
          </Col>
          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Bounce Rate"
              subtitle="This month"
              number="38%"
              color="secondary"
              progress={{
                value: 60,
                label: "Last month",
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col lg={8} md={12} sm={12} xs={12}>
            <Card className="shadow_">
              <CardHeader>
                Total Revenue{" "}
                <small className="text-muted text-capitalize">This year</small>
              </CardHeader>
              <CardBody>
                <Line data={chartjs.line.data} options={chartjs.line.options} />
              </CardBody>
            </Card>
          </Col>

          <Col lg={4} md={12} sm={12} xs={12}>
            <Card className="shadow_">
              <CardHeader>Total Expense</CardHeader>
              <CardBody>
                <Bar data={chartjs.bar.data} options={chartjs.bar.options} />
              </CardBody>
              <ListGroup flush>
                <ListGroupItem>
                  <MdInsertChart size={25} color={primaryColor} /> Cost of sales{" "}
                  <Badge color="secondary">$3000</Badge>
                </ListGroupItem>
                <ListGroupItem>
                  <MdBubbleChart size={25} color={primaryColor} /> Management
                  costs <Badge color="secondary">$1200</Badge>
                </ListGroupItem>
                <ListGroupItem>
                  <MdShowChart size={25} color={primaryColor} /> Financial costs{" "}
                  <Badge color="secondary">$800</Badge>
                </ListGroupItem>
                <ListGroupItem>
                  <MdPieChart size={25} color={primaryColor} /> Other operating
                  costs <Badge color="secondary">$2400</Badge>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
          <Col md={12} xs={12} sm={12}>
            <Row>
              <Col md={4} sm={6} xs={12}>
                <IconWidget
                  bgColor="white"
                  inverse={false}
                  icon={MdThumbUp}
                  title="50+ Likes"
                  subtitle="People you like"
                />
              </Col>
              <Col md={4} sm={6} xs={12}>
                <IconWidget
                  bgColor="white"
                  inverse={false}
                  icon={MdRateReview}
                  title="10+ Reviews"
                  subtitle="New Reviews"
                />
              </Col>
              <Col md={4} sm={6} xs={12}>
                <IconWidget
                  bgColor="white"
                  inverse={false}
                  icon={MdShare}
                  title="30+ Shares"
                  subtitle="New Shares"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Page>
    );
  }
}
export default DashboardPage;
