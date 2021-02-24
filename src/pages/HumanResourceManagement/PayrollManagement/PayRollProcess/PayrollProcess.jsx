import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import PayrollProcessPage from "./PayrollProcessPage/index";
import SavedPayrollProcess from "./SavedPayrollProcess/index";
import Page from "../../../../components/Page";

const PayrollProcess = () => {
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
                Payroll Process
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
                Saved Process
              </NavLink>
            </NavItem>
          </div>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            {activeTab === "1" ? <PayrollProcessPage /> : null}
          </TabPane>
          <TabPane tabId="2">
            {activeTab === "2" ? <SavedPayrollProcess /> : null}
          </TabPane>
        </TabContent>
      </Page>
    </div>
  );
};

export default PayrollProcess;
