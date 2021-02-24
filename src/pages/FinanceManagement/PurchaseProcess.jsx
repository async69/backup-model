import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import Vendors from "../PurchaseManagement/MasterData/Vendor/";
import PurchaseInvoice from "./PurchaseProcess/PurchaseInvoice";
import Page from "../../components/Page";

const FinancePurchaseProcess = () => {
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
                Purchase Invoice
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
                Vendors
              </NavLink>
            </NavItem>
          </div>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <PurchaseInvoice />
          </TabPane>
          <TabPane tabId="2">
            <Vendors />
          </TabPane>
        </TabContent>
      </Page>
    </div>
  );
};

export default FinancePurchaseProcess;
