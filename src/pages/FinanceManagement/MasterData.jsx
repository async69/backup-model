import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import BankAccount from "./MasterData/BankAccount";
import ChartsOfAcounts from "./MasterData/ChartsOfAccount";

import Page from "../../components/Page";

export const activeTabs = {
  BANK_ACCOUNTS: "2",
  CHART_OF_ACCOUNTS: "1",
};

const FinanceMasterData = (props) => {
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Page>
      <Nav tabs className="mb-2">
        <div className="tabs">
          <NavItem>
            <NavLink
              className={
                activeTab === "1" ? "activepageTabBlue" : "notactivePageTabBlue"
              }
              onClick={() => {
                toggle(activeTabs.CHART_OF_ACCOUNTS);
              }}
            >
              Charts of Accounts
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={
                activeTab === "2" ? "activepageTabBlue" : "notactivePageTabBlue"
              }
              onClick={() => {
                toggle(activeTabs.BANK_ACCOUNTS);
              }}
            >
              Bank Accounts
            </NavLink>
          </NavItem>
        </div>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={activeTabs.BANK_ACCOUNTS}>
          <BankAccount activeTab={activeTab} />
        </TabPane>
        <TabPane tabId={activeTabs.CHART_OF_ACCOUNTS}>
          <ChartsOfAcounts activeTab={activeTab} />
        </TabPane>
      </TabContent>
    </Page>
  );
};

export default FinanceMasterData;
