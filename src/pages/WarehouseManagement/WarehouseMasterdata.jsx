import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

import Page from "../../components/Page";
import Item from "./MasterData/Item/";
import ItemCategories from "./MasterData/ItemCategory/";
import InventoryItem from "./MasterData/InventoryItem/";

const WarehouseMasterdata = () => {
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
                Items
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
                Item Categories
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
                Inventory Item
              </NavLink>
            </NavItem>
          </div>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">{activeTab === "1" ? <Item /> : null}</TabPane>
          <TabPane tabId="2">
            {activeTab === "2" ? <ItemCategories /> : null}
          </TabPane>
          <TabPane tabId="3">
            {activeTab === "3" ? <InventoryItem /> : null}
          </TabPane>
        </TabContent>
      </Page>
    </div>
  );
};

export default WarehouseMasterdata;
