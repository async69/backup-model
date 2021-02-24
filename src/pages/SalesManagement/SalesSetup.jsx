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
import SalesRegion from "./Setup/SalesRegion/";

const SalesSetup = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <Page>
        <Nav tabs className="mb-2">
          {" "}
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
                Sales Region
              </NavLink>
            </NavItem>
          </div>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col>
                <SalesRegion />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </Page>
    </div>
  );
};

export default SalesSetup;
