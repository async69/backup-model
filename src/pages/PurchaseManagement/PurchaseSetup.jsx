import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import Page from "../../components/Page";
import PurchaseType from "./Setup/PurchaseType/";
import VendorType from "./Setup/VendorType";

export const activeTabs = {
  PURCHASE_TYPE: "1",
  VENDOR_TYPE: "2",
};

const PurchaseSetup = () => {
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
                  activeTab === activeTabs.PURCHASE_TYPE
                    ? "activepageTabBlue"
                    : "notactivePageTabBlue"
                }
                onClick={() => {
                  toggle(activeTabs.PURCHASE_TYPE);
                }}
              >
                Purchase Type
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={
                  activeTab === activeTabs.VENDOR_TYPE
                    ? "activepageTabBlue"
                    : "notactivePageTabBlue"
                }
                onClick={() => {
                  toggle(activeTabs.VENDOR_TYPE);
                }}
              >
                Vendor Type
              </NavLink>
            </NavItem>
          </div>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId={activeTabs.PURCHASE_TYPE}>
            <PurchaseType activeTab={activeTab} />
          </TabPane>
          <TabPane tabId={activeTabs.VENDOR_TYPE}>
            <VendorType activeTab={activeTab} />
          </TabPane>
        </TabContent>
      </Page>
    </div>
  );
};

export default PurchaseSetup;
