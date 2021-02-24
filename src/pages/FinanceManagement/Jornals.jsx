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
import classnames from "classnames";

import CashReceptJournal from "./Journals/CashReceiptJournal";
import GeneralJournal from "./Journals/GeneralJournal";
import PaymentJournal from "./Journals/PaymentJournals";
import PurchaseJournal from "./Journals/PurchaseJournal";
import SalesJournal from "./Journals/SalesJournal";

import Page from "../../components/Page";

const FinanceMasterData = (props) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <Page>
        <Nav tabs className="mb-2"> <div className='tabs'>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1");
              }}
              style={
                activeTab === "1"
                  ? { border: " 3px solid #0275d8 ", color: "#222222" }
                  : {}
              }
            >
              Cash Recept Journal
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle("2");
              }}
              style={
                activeTab === "2"
                  ? { border: " 3px solid #0275d8 ", color: "#222222" }
                  : {}
              }
            >
              General Journal
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "3" })}
              onClick={() => {
                toggle("3");
              }}
              style={
                activeTab === "3"
                  ? { border: " 3px solid #0275d8 ", color: "#222222" }
                  : {}
              }
            >
              Payment Journal
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "4" })}
              onClick={() => {
                toggle("4");
              }}
              style={
                activeTab === "4"
                  ? { border: " 3px solid #0275d8 ", color: "#222222" }
                  : {}
              }
            >
              Purchase Journal
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "5" })}
              onClick={() => {
                toggle("5");
              }}
              style={
                activeTab === "5"
                  ? { border: " 3px solid #0275d8 ", color: "#222222" }
                  : {}
              }
            >
              Sales Journal
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col>
                <CashReceptJournal />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col>
                <GeneralJournal />
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId="3">
            <Row>
              <Col>
                <PaymentJournal />
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId="4">
            <Row>
              <Col>
                <PurchaseJournal />
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId="5">
            <Row>
              <Col>
                <SalesJournal />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </Page>
    </div>
  );
};

export default FinanceMasterData;
