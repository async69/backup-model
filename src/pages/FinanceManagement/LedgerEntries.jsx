import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import GeneralLedgerEntries from "./LedgerEntries/GeneralLedgerEntries";
import BankLedgerEntries from "./LedgerEntries/BankLedgerEntries";
import InventoryLedgerEntries from "./LedgerEntries/InventoryLedgerEntries";
import PurchaseLedgerEntries from "./LedgerEntries/PurchaseLedgerEntries";
import SalesLedgerEntries from "./LedgerEntries/SalesLedgerEntries";
import Page from "../../components/Page";

export const activeTabs = {
  GENERAL_LEDGER_ENTRY: "1",
  BANK_LEDGER_ENTRY: "2",
  INVENTORY_LEDGER_ENTRY: "3",
  PURCHASE_LEDGER_ENTRY: "4",
  SALES_LEDGER_ENTRY: "5",
};

const FinanceLedgerEntries = () => {
  const [activeTab, setActiveTab] = useState(activeTabs.GENERAL_LEDGER_ENTRY);

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
                General Ledger Entry
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
                Bank
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
                Inventory
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
                Purchase
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
                Sales
              </NavLink>
            </NavItem>
          </div>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId={activeTabs.GENERAL_LEDGER_ENTRY}>
            <GeneralLedgerEntries activeTab={activeTab} />
          </TabPane>
          <TabPane tabId={activeTabs.BANK_LEDGER_ENTRY}>
            <BankLedgerEntries activeTab={activeTab} />
          </TabPane>

          <TabPane tabId={activeTabs.INVENTORY_LEDGER_ENTRY}>
            <InventoryLedgerEntries activeTab={activeTab} />
          </TabPane>

          <TabPane tabId={activeTabs.PURCHASE_LEDGER_ENTRY}>
            <PurchaseLedgerEntries activeTab={activeTab} />
          </TabPane>
          <TabPane tabId={activeTabs.SALES_LEDGER_ENTRY}>
            <SalesLedgerEntries activeTab={activeTab} />
          </TabPane>
        </TabContent>
      </Page>
    </div>
  );
};

export default FinanceLedgerEntries;
