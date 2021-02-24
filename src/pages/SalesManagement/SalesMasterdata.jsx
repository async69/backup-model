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
import Customers from "./MasterData/Customers/";

const SalesMasterdata = () => {
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
              Customers
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col>
                <Customers />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </Page>
    </div>
  );
};

export default SalesMasterdata;
