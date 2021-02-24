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
import SalesQuote from "./Common/SalesQuote/";
import SalesOrder from "./Common/SalesOrder/";

const SalesCommon = () => {
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
              className={{ active: activeTab === "1" }}
              onClick={() => {
                toggle("1");
              }}
              style={
                activeTab === "1"
                  ? { border: " 3px solid #0275d8 ", color: "#222222    " }
                  : {}
              }
            >
              Sales Quote
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={{ active: activeTab === "2" }}
              onClick={() => {
                toggle("2");
              }}
              style={
                activeTab === "2"
                  ? { border: " 3px solid #0275d8 ", color: "#222222    " }
                  : {}
              }
            >
              Sales Order
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col>
                <SalesQuote />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col>
                <SalesOrder />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </Page>
    </div>
  );
};

export default SalesCommon;
