import Page from "../../components/Page";
import { IconWidget } from "../../components/Widget";
import ProductionBatch from "../../demos/ProductionPage";
import React from "react";
import { MdRateReview, MdShare, MdThumbUp } from "react-icons/md";
import InfiniteCalendar from "react-infinite-calendar";
import { Card, CardBody, CardGroup, CardHeader, Col, Row } from "reactstrap";
import { getColor } from "../../utils/colors";

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7
);

class ProductBatchDashboard extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    const primaryColor = getColor("primary");
    const secondaryColor = getColor("secondary");

    return (
      <Page
        className="dashboard"
        title="Production Batch Traceability Dashboard"
        breadcrumbs={[{ name: "Dashboard", active: true }]}
      >
        <Row>
          <Col lg="12" md="12" sm={12} xs={12}>
            <Card className="shadow  radius">
              <CardHeader className="shadow">Batch Traceability</CardHeader>
              <CardBody>
                <ProductionBatch />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <CardGroup style={{ marginBottom: "1rem" }}>
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdThumbUp}
            title="50+ Likes"
            subtitle="People you like"
          />
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdRateReview}
            title="10+ Reviews"
            subtitle="New Reviews"
          />
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdShare}
            title="30+ Shares"
            subtitle="New Shares"
          />
        </CardGroup>

        <Row>
          <Col lg="4" md="12" sm={12} xs={12}>
            <InfiniteCalendar
              selected={today}
              minDate={lastWeek}
              width="100%"
              theme={{
                accentColor: primaryColor,
                floatingNav: {
                  background: secondaryColor,
                  chevron: primaryColor,
                  color: "#FFF",
                },
                headerColor: primaryColor,
                selectionColor: secondaryColor,
                textColor: {
                  active: "#FFF",
                  default: "#333",
                },
                todayColor: secondaryColor,
                weekdayColor: primaryColor,
              }}
            />
          </Col>
        </Row>
      </Page>
    );
  }
}
export default ProductBatchDashboard;
