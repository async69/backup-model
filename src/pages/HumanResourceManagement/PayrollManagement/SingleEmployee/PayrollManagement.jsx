import React, { useState, useReducer } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardText,
  Row,
  Col,
  Container,
} from "reactstrap";
import Page from "components/Page";
import EmployeeBonus from "../EmployeeBonus/";
import EmployeeOvertime from "../EmployeeOvertime/index";
import EmployeePayrollSetup from "../EmployeePayrollSetup/index";
import EmployeeSlip from "../EmployeeSlip";
// import PayrollPostingGroup from "../Setup/PayrollPostingGroup";
import CommonModals from "components/CommonModal";
import Typography from "components/Typography";
import { _toggle, initialState, reducer } from "pages/common/ModalOptions";

export const activeTabs = {};

const PayrollManagement = ({ employee }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [activeTab, setActiveTab] = useState("3");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <Page>
        <CommonModals
          size="xl"
          data={state.data}
          openModal={state.openModal}
          component={state.Component}
          toggle={_toggle}
          dispatch={dispatch}
          title={state.title}
        />
        <Card body>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {employee ? (
              <Container className="mt-2">
                <CardText>
                  <Row>
                    <Col
                      md={3}
                      sm={6}
                      xs={12}
                      className="justify-content-space-evenly"
                    >
                      <Typography className="mb-2">
                        {" "}
                        <strong> Full Name :</strong>{" "}
                        {employee.first_name + " " + employee.father_name}
                      </Typography>
                    </Col>
                    <Col
                      md={3}
                      sm={6}
                      xs={12}
                      className="justify-content-space-evenly"
                    >
                      <Typography className=" mb-2">
                        <strong> Department </strong> :{" "}
                        {employee.department ? employee.department.name : ""}{" "}
                      </Typography>
                    </Col>
                    <Col
                      md={3}
                      sm={6}
                      xs={12}
                      className="justify-content-space-evenly"
                    >
                      <Typography className=" mb-2">
                        <strong> Position </strong> :{" "}
                        {employee.position ? employee.position.name : ""}{" "}
                      </Typography>{" "}
                    </Col>
                  </Row>

                  <hr />
                </CardText>
                <Row>
                  <Col
                    md={12}
                    sm={12}
                    xs={12}
                    className="justify-content-space-around"
                  >
                    <div>
                      <Nav tabs className="mb-2">
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
                            Salary
                          </NavLink>
                        </NavItem>
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
                            Bonus
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
                            Over Time
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
                            Slip
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                          {activeTab === "1" ? (
                            <Row>
                              <Col>
                                <EmployeeBonus employee={employee} />
                              </Col>
                            </Row>
                          ) : null}
                        </TabPane>
                        <TabPane tabId="2">
                          {activeTab === "2" ? (
                            <Row>
                              <Col>
                                <EmployeeOvertime employee={employee} />
                              </Col>
                            </Row>
                          ) : null}
                        </TabPane>
                        <TabPane tabId="3">
                          {activeTab === "3" ? (
                            <Row>
                              <Col>
                                <EmployeePayrollSetup employee={employee} />
                              </Col>
                            </Row>
                          ) : null}
                        </TabPane>
                        <TabPane tabId="4">
                          {activeTab === "4" ? (
                            <Row>
                              <Col>
                                <EmployeeSlip employee={employee} />
                              </Col>
                            </Row>
                          ) : null}
                        </TabPane>
                      </TabContent>
                    </div>
                  </Col>
                </Row>
              </Container>
            ) : (
              <></>
            )}
          </div>
        </Card>
      </Page>
    </div>
  );
};

export default PayrollManagement;
