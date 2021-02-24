import React, { useState, useContext } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import Page from "../../components/Page";
import Employees from "./Employees";
import { MainContext } from "../../context/Main/";
import { getState } from "../../context/Main/States/Department";

export const activeTabs = {
  EMPLOYEES: "1",
};

const EmployeeTabs = (props) => {
  const [activeTab, setActiveTab] = useState(activeTabs.EMPLOYEES);

  const { rootState } = useContext(MainContext);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  console.log("department", getState(rootState));

  return (
    <div>
      <Page>
        <Nav tabs className="mb-2">
          {" "}
          <div className="tabs">
            <NavItem>
              <NavLink
                className={
                  activeTab === activeTabs.EMPLOYEES
                    ? "activepageTabBlue"
                    : "notactivePageTabBlue"
                }
                onClick={() => {
                  toggle(activeTabs.EMPLOYEES);
                }}
              >
                Employees
              </NavLink>
            </NavItem>
          </div>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId={activeTabs.EMPLOYEES}>
            <Row>
              <Col>
                <Employees activeTab={activeTab} />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </Page>
    </div>
  );
};

export default EmployeeTabs;
