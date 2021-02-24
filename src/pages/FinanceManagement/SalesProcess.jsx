import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import Customers from "./SalesProcess/Customers";
import SalesInvoice from "./SalesProcess/SalesInvoice";
import Page from "../../components/Page";

export const activeTabs = {
  CUSTOMERS: "1",
  SALES_INVOICE: "2",
};

const FinanceSalesProcess = () => {
  const [activeTab, setActiveTab] = useState("2");

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
                  activeTab === activeTabs.SALES_INVOICE
                    ? "activepageTabBlue"
                    : "notactivePageTabBlue"
                }
                onClick={() => {
                  toggle(activeTabs.SALES_INVOICE);
                }}
              >
                Sales Invoice
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={
                  activeTab === activeTabs.CUSTOMERS
                    ? "activepageTabBlue"
                    : "notactivePageTabBlue"
                }
                onClick={() => {
                  toggle(activeTabs.CUSTOMERS);
                }}
              >
                Customers
              </NavLink>
            </NavItem>
          </div>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId={activeTabs.SALES_INVOICE}>
            <SalesInvoice activeTab={activeTab} />
          </TabPane>
          <TabPane tabId={activeTabs.CUSTOMERS}>
            <Customers activeTab={activeTab} />
          </TabPane>
        </TabContent>
      </Page>
    </div>
  );
};

export default FinanceSalesProcess;
