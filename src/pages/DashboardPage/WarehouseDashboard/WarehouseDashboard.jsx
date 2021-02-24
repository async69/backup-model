import Page from "../../../components/Page";

import { NumberWidget, IconWidget } from "../../../components/Widget";
import { chartjs } from "../../../demos/dashboardPage";
import React from "react";
import { Bar } from "@reactchartjs/react-chart.js";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import {
  MdYoutubeSearchedFor,
  MdCallMissedOutgoing,
  MdAddToQueue,
  MdAssignmentReturn,
} from "react-icons/md";
import CustomTable from "../../common/table";

class WarehouseDashboard extends React.Component {
  render() {
    return (
      <Page className="dashboard mt-4 ml-2 mr-2" title="Warehouse Dashboard">
        <Row>
          <Col md={3} sm={6} xs={12}>
            <IconWidget
              iconColor="success"
              bgColor="white"
              inverse={false}
              icon={MdAddToQueue}
              title={this.props.newInventoryItems}
              subtitle="Items Receved"
            />
          </Col>

          <Col md={3} sm={6} xs={12}>
            <IconWidget
              bgColor="white"
              inverse={false}
              icon={MdCallMissedOutgoing}
              title={this.props.itemsOut}
              subtitle=" Items Out "
            />
          </Col>
          <Col md={3} sm={6} xs={12}>
            {/*
            returnedItems={getData({}, types.RETURNED_ITEMS)}
      inventoryBacklog={getData({}, types.INVENTORY_BACKLOG)}
      perfectOrderRate={getData({}, types.PERFECT_ORDER_RATE)}
      inventoryTurnoverRate={getData({}, types.INVENTORY_TURNOVER_RATE)}*/}
            <IconWidget
              bgColor="white"
              inverse={false}
              icon={MdAssignmentReturn}
              title={this.props.returnedItems}
              subtitle="Returned Items   "
            />
          </Col>
          <Col md={3} sm={6} xs={12}>
            <IconWidget
              bgColor="white"
              inverse={false}
              icon={MdYoutubeSearchedFor}
              title={this.props.inventoryBacklog}
              subtitle="Inventory Backlog "
            />
          </Col>

          <Col md={12} sm={12} xs={12}>
            <Card className="shadow_">
              <CardHeader>Turnover Rate per item {"  "}</CardHeader>
              <CardBody>
                <Bar
                  width="25%"
                  height="9%"
                  data={this.props.turnOverperItem}
                  options={chartjs.turnOverperItem.options}
                />
              </CardBody>
            </Card>
          </Col>

          <Col md={4} sm={6} xs={12}>
            <NumberWidget
              title="Operating Expence"
              number="700,342 ETB (- 5%)"
              subtitle="This month"
              color="success"
              progress={{
                value: 100,
                label: "Target - 700,000",
              }}
            />
          </Col>
          <Col md={4} sm={6} xs={12}>
            <NumberWidget
              title="Perfect Order Rate"
              number={`${this.props.perfectOrderRate} %`}
              subtitle="This month"
              color="secondary"
              progress={{
                value: 89,
                label: "Target - 100",
              }}
            />
          </Col>
          <Col md={4} sm={12} xs={12}>
            <NumberWidget
              title="Inventory TurnOver Rate"
              number={`${this.props.inventoryTurnoverRate} &`}
              subtitle="This month"
              color="info"
              progress={{
                value: 47,
                label: "Target - 60",
              }}
            />
          </Col>
        </Row>

        <Row>
          {/* <Col md={12} sm={12} xs={12}>
            <Card className="shadow_">
              <CardHeader className="shadow_" align="center">
                Shipment Status with relative to time
              </CardHeader>
              <CardBody>
                <Doughnut
                  width="25%"
                  height="30%"
                  data={this.props.stockPerWarehouse}
                />
              </CardBody>
            </Card>
          </Col> */}

          <Col md={6} sm={12} xs={12}>
            <Card className="shadow_">
              <CustomTable
                title="Goods Receiving Note (latest )"
                columns={this.props.tableData.grns.columns}
                data={this.props.tableData.grns.data}
              />
            </Card>
          </Col>

          <Col md={6} sm={12} xs={12}>
            <Card className="shadow_">
              <CustomTable
                title="Store Issue Voucher (Latest)"
                columns={this.props.tableData.sivs.columns}
                data={this.props.tableData.sivs.data}
              />
            </Card>
          </Col>
          <Col md={12} sm={12} xs={12}>
            <Card className="shadow_">
              <CustomTable
                title="Sales Return (Latest)"
                columns={this.props.tableData.salesReturns.columns}
                data={this.props.tableData.salesReturns.data}
              />
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}
export default WarehouseDashboard;
