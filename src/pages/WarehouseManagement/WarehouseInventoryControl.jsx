import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import Page from "../../components/Page";

import ItemAdjJournal from "./InventoryControl/ItemAdjJournal";
import ItemAvailability from "./InventoryControl/ItemAvailability";
import ItemAvailabilityByLocation from "./InventoryControl/ItemAvailabilityByLocation";
import StockMovementByItem from "./InventoryControl/StockMovementByItem";
import PhysicalInventoryCount from "./InventoryControl/PhysicalInventoryCount";
import StockMovement from "./InventoryControl/StockMovement";
import StockMovementByLocation from "./InventoryControl/StockMovementByLocation";

const WarehouseInventoryControl = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Page>
      <Nav className="mb-2">
        <div className="tabs">
          <NavItem>
            <NavLink
              className={
                activeTab === "1" ? "activepageTabBlue" : "notactivePageTabBlue"
              }
              onClick={() => {
                toggle("1");
              }}
            >
              Item Adj
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={
                activeTab === "2" ? "activepageTabBlue" : "notactivePageTabBlue"
              }
              onClick={() => {
                toggle("2");
              }}
            >
              Item Availability
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={
                activeTab === "3" ? "activepageTabBlue" : "notactivePageTabBlue"
              }
              onClick={() => {
                toggle("3");
              }}
            >
              Item Availability By Location
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={
                activeTab === "4" ? "activepageTabBlue" : "notactivePageTabBlue"
              }
              onClick={() => {
                toggle("4");
              }}
            >
              Stock Movement By Item
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={
                activeTab === "5" ? "activepageTabBlue" : "notactivePageTabBlue"
              }
              onClick={() => {
                toggle("5");
              }}
            >
              Stock Movement
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={
                activeTab === "6" ? "activepageTabBlue" : "notactivePageTabBlue"
              }
              onClick={() => {
                toggle("6");
              }}
            >
              Stock Movement By Location
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={
                activeTab === "7" ? "activepageTabBlue" : "notactivePageTabBlue"
              }
              onClick={() => {
                toggle("7");
              }}
            >
              Physical Inventory Count
            </NavLink>
          </NavItem>
        </div>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          {activeTab === "1" ? <ItemAdjJournal activeTab={activeTab} /> : null}
        </TabPane>
        <TabPane tabId="2">
          {activeTab === "2" ? (
            <ItemAvailability activeTab={activeTab} />
          ) : null}
        </TabPane>
        <TabPane tabId="3">
          {activeTab === "3" ? (
            <ItemAvailabilityByLocation activeTab={activeTab} />
          ) : null}
        </TabPane>
        <TabPane tabId="4">
          {activeTab === "4" ? (
            <StockMovementByItem activeTab={activeTab} />
          ) : null}
        </TabPane>
        <TabPane tabId="5">
          {activeTab === "5" ? <StockMovement activeTab={activeTab} /> : null}
        </TabPane>
        <TabPane tabId="6">
          {activeTab === "6" ? (
            <StockMovementByLocation activeTab={activeTab} />
          ) : null}
        </TabPane>
        <TabPane tabId="7">
          {activeTab === "7" ? <PhysicalInventoryCount /> : null}
        </TabPane>
      </TabContent>
    </Page>
  );
};

export default WarehouseInventoryControl;
