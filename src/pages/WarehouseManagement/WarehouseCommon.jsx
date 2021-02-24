import React, { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";

import Page from "../../components/Page";
import GoodsRecevingNote from "./Common/GoodReceivingNote/";
import StoreIssueVoucher from "./Common/StoreIssueVoucher/";
// import StoreRequsition from "./Common/StoreRequisition/StoreRequisition";
// import TransferOrderIssue from "./Common/TransferOrderIssue/TransferOrderIssue";
// import TransferOrderReceive from "./Common/TransferOrderReceive/TransferOrderReceive";
import SalesReturn from "./Common/SalesReturn";
import PurchaseReturn from "./Common/PurchaseReturn";
import Disposal from "./Common/Disposal";

const WarehouseCommon = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <Page>
        <Nav tabs className="mb-2">
          <div className="tabs">
            <NavItem>
              <NavLink
                className={
                  activeTab === "1"
                    ? "activepageTabBlue"
                    : "notactivePageTabBlue"
                }
                onClick={() => {
                  toggle("1");
                }}
              >
                Goods Receving Note
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={
                  activeTab === "2"
                    ? "activepageTabBlue"
                    : "notactivePageTabBlue"
                }
                onClick={() => {
                  toggle("2");
                }}
              >
                Store Issue Voucher
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={
                  activeTab === "3"
                    ? "activepageTabBlue"
                    : "notactivePageTabBlue"
                }
                onClick={() => {
                  toggle("3");
                }}
              >
                Sales Return
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={
                  activeTab === "4"
                    ? "activepageTabBlue"
                    : "notactivePageTabBlue"
                }
                onClick={() => {
                  toggle("4");
                }}
              >
                Purchase Return
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={
                  activeTab === "5"
                    ? "activepageTabBlue"
                    : "notactivePageTabBlue"
                }
                onClick={() => {
                  toggle("5");
                }}
              >
                Disposal
              </NavLink>
            </NavItem>
          </div>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            {activeTab === "1" ? (
              <Row>
                <Col>
                  <GoodsRecevingNote activeTab={activeTab} />
                </Col>
              </Row>
            ) : null}
          </TabPane>
          <TabPane tabId="2">
            {activeTab === "2" ? (
              <Row>
                <Col>
                  <StoreIssueVoucher activeTab={activeTab} />
                </Col>
              </Row>
            ) : null}
          </TabPane>
          <TabPane tabId="3">
            {activeTab === "3" ? (
              <Row>
                <Col>
                  <SalesReturn activeTab={activeTab} />
                </Col>
              </Row>
            ) : null}
          </TabPane>
          <TabPane tabId="4">
            {activeTab === "4" ? (
              <Row>
                <Col>
                  <PurchaseReturn activeTab={activeTab} />
                </Col>
              </Row>
            ) : null}
          </TabPane>
          <TabPane tabId="5">
            {activeTab === "5" ? (
              <Row>
                <Col>
                  <Disposal activeTab={activeTab} />
                </Col>
              </Row>
            ) : null}
          </TabPane>
        </TabContent>
      </Page>
    </div>
  );
};

export default WarehouseCommon;
