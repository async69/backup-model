import Page from "../../../components/Page";
import { NumberWidget, IconWidget } from "../../../components/Widget";
import { chartjs, colorscheme } from "../../../demos/dashboardPage";
import React from "react";
import { Bar, Pie, HorizontalBar, Line } from "@reactchartjs/react-chart.js";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { MdFiberNew } from "react-icons/md";
import { FaHandshake, FaFileContract, FaCheckSquare } from "react-icons/fa";
import { dateFilter, dateFilters, getMonth } from "../../../helpers/date";
import statusTypes from "../../../config/statusTypes";
import CustomTable from "../../common/table";

const getData = (data = [], type = "", otherData = []) => {
  switch (type) {
    case "NUMBER_OF_SALES": {
      return data.length;
    }
    case "SALES_REVENUE": {
      let totalAmount = 0;
      data.forEach((item) => {
        totalAmount += Math.round(Number(item.total));
      });
      return totalAmount;
    }

    case "NEW_CUSTOMERS": {
      return data.filter((item) =>
        dateFilter(item.created_at, dateFilters.LAST_THREE_MONTH)
      ).length;
    }

    case "NEW_LEADS": {
      return data.filter((item) => item.status === statusTypes.OPEN).length;
    }

    case "Negotiations": {
      return data.filter(
        (item) =>
          item.status === statusTypes.SENT_FOR_APPROVAL &&
          item.status === statusTypes.APPROVED
      ).length;
    }

    case "Proposals": {
      return data.filter(
        (item) =>
          item.status === statusTypes.OPEN_SIV ||
          item.status === statusTypes.INVOICING ||
          item.status === statusTypes.INVOICED
      ).length;
    }

    case "Closed": {
      return data.filter((item) => item.status === statusTypes.CLOSED).length;
    }

    case "Sales_Revenue": {
      let monthlyData = Array(12).fill(0);
      data.forEach((item) => {
        const index = getMonth(item.created_at);
        monthlyData[index] = Number(monthlyData[index]) + 1;
      });
      let response = chartjs.monthlySalesRev.data;
      if (data.length > 0) {
        response.datasets[0].data = monthlyData;
        return response;
      } else return 0;
    }

    case "NUMBER_OF_DEFECTS": {
      const newData = {
        length: data.filter((item) => item.status === statusTypes.REJECTED)
          .length,
        content: data
          .map((item) => {
            if (item.status === statusTypes.REJECTED) {
              return item.created_at;
            }
            return "";
          })
          .filter((item) => Boolean(item)),
      };
      return newData;
    }

    case "SALES_ORDER_BY_REGION": {
      const fetchedRegions = data.map((item) => {
        return item.sales_region.id;
      });
      let defaultData = chartjs.femaleToMaleRatio.data;
      const fetchedRegionNames = data.map((item) => item.sales_region.name);
      let amountInRegions = Array(fetchedRegions.length).fill(0);
      fetchedRegions.forEach((region, idx) => {
        const foundRegion = otherData.find((prop) => prop.id === region);
        if (foundRegion) {
          amountInRegions[idx] = amountInRegions[idx] + 1;
        }
      });
      // defaultData.labels = fetchedRegionNames
      let datasets = defaultData.datasets;
      if (fetchedRegionNames.length > 0) {
        defaultData.labels = fetchedRegionNames;
      }
      let totalSales = 0;
      amountInRegions.forEach((region) => {
        totalSales = totalSales + region;
      });
      datasets[0] = {
        label: "Number of Sales per Region",
        // data: amountInRegions.map(item => (item / (totalSales)) * 100),
        data: amountInRegions.map((amount) => (amount / totalSales) * 100),
        backgroundColor: colorscheme.allColors,
        borderColor: colorscheme.borderColor,
        borderWidth: 2,
      };
      defaultData.datasets = datasets;

      return defaultData.labels.length === fetchedRegionNames.length
        ? defaultData
        : null;
    }
    default:
      return null;
  }
};

const getConfig = (salesOrders) => {
  const defaultData = chartjs.salesSycleLength.data;
  let datasets = chartjs.salesSycleLength.data.datasets;
  const response = getData(salesOrders, "NUMBER_OF_DEFECTS");
  let existingMonthes = Array(12).fill(0);
  if (response.length > 0) {
    const monthes = response.content.map((item) => {
      return new Date(item).getMonth();
    });
    monthes.forEach((month) => {
      existingMonthes[month] = existingMonthes[month] = +1;
    });
  }
  datasets[0] = {
    ...datasets[0],
    data: existingMonthes,
  };
  return {
    ...defaultData,
    datasets,
  };
};

const SalesDashboard = ({ salesRegions, salesOrders }) => {
  const columns = [
    { path: "customer.customer_number", label: "Customer No" },
    { path: "customer.name", label: "Customer Name " },
    { path: "posting_date", label: "Posting Date " },
    { path: "due_date", label: "Due Date " },
  ];

  return (
    <Page
      className=" mt-4 ml-2 mr-2"
      title="Sales Dashboard"
      // breadcrumbs={[{ name: "Dashboard", active: true }]}
    >
      <Row>
        <Col md={3} sm={6} xs={12}>
          <NumberWidget
            title="Number of Sale "
            number={getData(salesOrders, "NUMBER_OF_SALES")}
            subtitle="This month"
            color="success"
            progress={{
              value: 85,
              label: "Target 200",
            }}
          />
        </Col>
        <Col md={3} sm={6} xs={12}>
          <NumberWidget
            title="Sales Revenue "
            number={getData(salesOrders, "SALES_REVENUE")}
            subtitle="This month"
            color="info"
            progress={{
              value: 75,
              label: "Target 200,000",
            }}
          />
        </Col>
        <Col md={3} sm={6} xs={12}>
          <NumberWidget
            title="New Customers"
            number={getData(salesOrders, "NEW_CUSTOMERS")}
            subtitle="This month"
            color="warning"
            progress={{
              value: 100,
              label: "Target 120",
            }}
          />
        </Col>

        <Col md={3} sm={6} xs={12}>
          <NumberWidget
            title="Operating Expence"
            number="700,342 ETB (- 5%)"
            subtitle="This month"
            color="secondary"
            progress={{
              value: 100,
              label: "Target - 700,000",
            }}
          />
        </Col>

        <Col md={3} sm={6} xs={12}>
          <IconWidget
            iconColor="success"
            bgColor="white"
            inverse={false}
            icon={MdFiberNew}
            title={getData(salesOrders, "NEW_LEADS")}
            subtitle="New Leads "
          />
        </Col>

        <Col md={3} sm={6} xs={12}>
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={FaHandshake}
            title={getData(salesOrders, "Negotiations")}
            subtitle=" Negotiations"
          />
        </Col>
        <Col md={3} sm={6} xs={12}>
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={FaFileContract}
            title={getData(salesOrders, "Proposals")}
            subtitle="Proposals   "
          />
        </Col>
        <Col md={3} sm={6} xs={12}>
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={FaCheckSquare}
            title={getData(salesOrders, "Closed")}
            subtitle="Closed "
          />
        </Col>
      </Row>

      <Row>
        <Col md={6} sm={12} xs={12}>
          <Card className="shadow_">
            <CardHeader align="center">Sales Revenue</CardHeader>
            <CardBody>
              <Bar
                width="25%"
                height="15%"
                data={getData(salesOrders, "Sales_Revenue")}
                options={chartjs.monthlySalesRev.options}
              />
            </CardBody>
          </Card>
        </Col>

        <Col md={6} sm={12} xs={12}>
          <Card className="shadow_">
            <CardHeader align="center">
              Top Performing sales Employees{"  "}
            </CardHeader>
            <CardBody>
              <HorizontalBar
                width="25%"
                height="15%"
                data={chartjs.topSalesman.data}
                options={chartjs.topSalesman.options}
              />
            </CardBody>
          </Card>
        </Col>

        <Col md={12} sm={12} xs={12}>
          <Card className="shadow_">
            <CardHeader align="center">Sales Order By Region</CardHeader>
            <CardBody>
              <Pie
                data={getData(
                  salesOrders,
                  "SALES_ORDER_BY_REGION",
                  salesRegions
                )}
              />
            </CardBody>
          </Card>
        </Col>
        <Col md={12} sm={12} xs={12}>
          <Card className="shadow_ ">
            <CardHeader align="center">
              Average Sales Cycle Length {"  "}
            </CardHeader>
            <Line
              width="25%"
              height="4%"
              data={getConfig(salesOrders)}
              options={chartjs.salesSycleLength.options}
            />
          </Card>
        </Col>

        <Col md={12} sm={12} xs={12}>
          <Card className="shadow_">
            <CardHeader align="center">Sales Order (latest ) </CardHeader>
            <CardBody>
              <CustomTable columns={columns} data={salesOrders.slice(3)} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default SalesDashboard;
