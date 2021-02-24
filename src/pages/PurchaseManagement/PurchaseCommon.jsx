import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import Page from "../../components/Page";
import PurchaseOrder from "./Common/PurchaseOrder/";
import PurchaseRequisition from "./Common/PurchaseRequisition/";

export const activeTabs = {
  PURCHASE_ORDER: "1",
  PURCHASE_REQUISITION: "2",
};

const PurchaseCommon = () => {
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
                  activeTab === activeTabs.PURCHASE_ORDER
                    ? "activepageTabBlue"
                    : "notactivePageTabBlue"
                }
                onClick={() => {
                  toggle(activeTabs.PURCHASE_ORDER);
                }}
              >
                Purchase Order
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={
                  activeTab === activeTabs.PURCHASE_REQUISITION
                    ? "activepageTabBlue"
                    : "notactivePageTabBlue"
                }
                onClick={() => {
                  toggle(activeTabs.PURCHASE_REQUISITION);
                }}
              >
                Purchase Requisition
              </NavLink>
            </NavItem>
          </div>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId={activeTabs.PURCHASE_ORDER}>
            <PurchaseOrder activeTab={activeTab} />
          </TabPane>
          <TabPane tabId={activeTabs.PURCHASE_REQUISITION}>
            <PurchaseRequisition activeTab={activeTab} />
          </TabPane>
        </TabContent>
      </Page>
    </div>
  );
};

export default PurchaseCommon;
