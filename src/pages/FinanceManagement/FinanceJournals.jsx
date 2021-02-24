import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

import CashReceptJournal from "./Journals/CashReceiptJournal";
import GeneralJournal from "./Journals/GeneralJournal";
import PaymentJournal from "./Journals/CashPaymentJournal";

import Page from "../../components/Page";

const FinanceJournals = () => {
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
                General Journal
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
                Cash Receipt
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
                Cash Payment Journal
              </NavLink>
            </NavItem>
          </div>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <GeneralJournal />
          </TabPane>
          <TabPane tabId="2">
            <CashReceptJournal />
          </TabPane>
          <TabPane tabId="3">
            <PaymentJournal />
          </TabPane>
        </TabContent>
      </Page>
    </div>
  );
};

export default FinanceJournals;
