import React, { useState, useReducer, useEffect } from "react";
import PropTypes from "../../../utils/propTypes";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  Card,
  Row,
  Col,
  CardHeader,
  Button,
  CardFooter,
} from "reactstrap";
import Qualification from "../ResourceManagement/Qualification";
import Experiance from "../ResourceManagement/Experience";
import AbsenseRegestration from "../ResourceManagement/AbsencesRegistration";
import Performance from "../ResourceManagement/Performance";
import Loan from "../ResourceManagement/Loan";
import Consignment from "../ResourceManagement/Consignment";
import DisciplinaryAction from "../ResourceManagement/DisciplinaryAction";
import Illness from "../ResourceManagement/Illness";
import LeaveBalance from "../ResourceManagement/LeaveBalance";
import Termination from "../ResourceManagement/Termination";
import Training from "../ResourceManagement/Training";
import CommonModals from "../../../components/CommonModal";
import EmployeeAdd from "../ResourceManagement/Employee/EmployeeAdd";
import Avatar from "components/Avatar";
import Certification from "pages/HumanResourceManagement/ResourceManagement/Certification";
import { _toggle, initialState, reducer } from "pages/common/ModalOptions";
import _ from "lodash";

const EmployeeWidgetDetail = ({
  employeeID,
  department,
  position,
  employeeStatus,
  gender,
  phoneNumber,
  birthDate,
  maritalStatus,
  bankAccount,
  empolyeeStartDate,
  employeeEndDate,
  homePhoneNumber,
  supervisor,
  emergencyName,
  emergencyPhone,
  nationality,
  cityRegion,
  language,
  ethnicOrigin,
  employeeType,
  src,
  name,
  //for functions
  employee,
  options,
  doneAdd,
  doneEdit,
  editEmployee,
  deleteEmployee,
}) => {
  const [activeTab, setActiveTab] = useState("1");
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [collapse, setCollapse] = useState(false);
  const [status, setStatus] = useState("Show More");
  const onEntered = () => setStatus("Show Less");
  const onExited = () => setStatus("Show More");
  const toggleMore = () => setCollapse(!collapse);

  useEffect(() => {
    if (doneAdd || doneEdit) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit]);

  return (
    <div>
      <CommonModals
        size="xl"
        data={state.data}
        openModal={state.openModal}
        component={state.Component}
        toggle={_toggle}
        dispatch={dispatch}
        title={state.title}
      />
      <Card className="p-4">
        <CardHeader className="mb-4">
          <strong>{name}</strong>
        </CardHeader>
        <Row>
          <Col md={2} sm={6} xs={12} className="text-center mb-3  ">
            <Avatar size={160} src={src} />
          </Col>
          <Col md={10} sm={12} xs={12}>
            <Row>
              <Col md={4} sm={6} xs={12}>
                <div className="mb-2">
                  <strong> Employee ID </strong> : {employeeID}
                </div>
                <div className="mb-2">
                  <strong> Status </strong> : {employeeStatus}
                </div>
                <div className="mb-2">
                  <strong> Gender </strong> : {gender}
                </div>
                <div className="mb-2">
                  <strong> Phone No </strong> : {phoneNumber}
                </div>
                <div className="mb-2">
                  <strong> Birth Date </strong> : {birthDate}
                </div>
                <Collapse
                  isOpen={collapse}
                  onEntered={onEntered}
                  onExited={onExited}
                >
                  <div className="mb-2">
                    <strong> Marital Status </strong> : {maritalStatus}
                  </div>
                  <div className="mb-2">
                    <strong> Bank Account </strong> : {bankAccount}
                  </div>
                </Collapse>
              </Col>
              <Col md={4} sm={6} xs={12}>
                <div className=" mb-2">
                  <strong> Department </strong> : {department}
                </div>
                <div className=" mb-2">
                  <strong> Position </strong> : {position}
                </div>
                <div className="mb-2">
                  <strong> Employee Start Date </strong>: {empolyeeStartDate}
                </div>
                <div className=" mb-2">
                  <strong> Position Type </strong> : {position}
                </div>
                <div className="mb-2">
                  <strong> Employee Type </strong> : {employeeType}
                </div>
                <div className=" mb-2 ">
                  <strong> Employee End Date </strong> : {employeeEndDate}
                </div>
                <Collapse
                  isOpen={collapse}
                  onEntered={onEntered}
                  onExited={onExited}
                >
                  <div className="mb-2">
                    <strong> Home Phone No </strong> : {homePhoneNumber}
                  </div>
                  <div className="mb-2">
                    <strong> Supervisor </strong> :{" "}
                    {!_.isEmpty(supervisor)
                      ? supervisor.first_name + " " + supervisor.father_name
                      : ""}
                  </div>
                </Collapse>
              </Col>
              <Col md={4} sm={6} xs={12}>
                <div className="mb-2">
                  <strong> Emergency Contact Name </strong>: {emergencyName}
                </div>
                <div className=" mb-2 ">
                  <strong> Emergency contact No </strong> : {emergencyPhone}
                </div>
                <div className="mb-2">
                  <strong> Nationality </strong> : {nationality}
                </div>
                <div className="mb-2">
                  <strong> City/Region </strong> :{cityRegion}
                </div>
                <div className="mb-2">
                  <strong> Language </strong> : {language}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <CardFooter align="right">
          <Button
            className="m-2"
            size="sm"
            outline
            color="primary"
            onClick={toggleMore}
          >
            {status}
          </Button>
          <Button
            onClick={() => {
              _toggle(
                {
                  type: "EDIT",
                  Component: EmployeeAdd,
                  submit: editEmployee,
                  data: employee,
                  title: "Edit Employee",
                  options: options,
                },
                dispatch
              );
            }}
            outline
            size="sm"
          >
            Edit Personal Info
          </Button>
        </CardFooter>
        <hr />
        <Col md={12} sm={12} xs={12} className="justify-content-space-around">
          <Nav className="text-primary border">
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
                Qualifications
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
                Experience
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
                Absence Registration
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
                Performance
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
                Loan
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={
                  activeTab === "6"
                    ? "activepageTabBlue"
                    : "notactivePageTabBlue"
                }
                onClick={() => {
                  toggle("6");
                }}
              >
                Disciplinary Action
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={
                  activeTab === "7"
                    ? "activepageTabBlue"
                    : "notactivePageTabBlue"
                }
                onClick={() => {
                  toggle("7");
                }}
              >
                Illness
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={
                  activeTab === "8"
                    ? "activepageTabBlue"
                    : "notactivePageTabBlue"
                }
                onClick={() => {
                  toggle("8");
                }}
              >
                Leave
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={
                  activeTab === "9"
                    ? "activepageTabBlue"
                    : "notactivePageTabBlue"
                }
                onClick={() => {
                  toggle("9");
                }}
              >
                Termination
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={
                  activeTab === "10"
                    ? "activepageTabBlue"
                    : "notactivePageTabBlue"
                }
                onClick={() => {
                  toggle("10");
                }}
              >
                Training
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={
                  activeTab === "11"
                    ? "activepageTabBlue"
                    : "notactivePageTabBlue"
                }
                onClick={() => {
                  toggle("11");
                }}
              >
                Certification
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={
                  activeTab === "12"
                    ? "activepageTabBlue"
                    : "notactivePageTabBlue"
                }
                onClick={() => {
                  toggle("12");
                }}
              >
                Consignment
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              {activeTab === "1" ? <Qualification employee={employee} /> : null}
            </TabPane>
            <TabPane tabId="2">
              {activeTab === "2" ? <Experiance employee={employee} /> : null}
            </TabPane>
            <TabPane tabId="3">
              {activeTab === "3" ? (
                <AbsenseRegestration employee={employee} />
              ) : null}
            </TabPane>
            <TabPane tabId="4">
              {activeTab === "4" ? <Performance employee={employee} /> : null}
            </TabPane>
            <TabPane tabId="5">
              {activeTab === "5" ? <Loan employee={employee} /> : null}
            </TabPane>
            <TabPane tabId="6">
              {activeTab === "6" ? (
                <DisciplinaryAction employee={employee} />
              ) : null}
            </TabPane>
            <TabPane tabId="7">
              {activeTab === "7" ? <Illness employee={employee} /> : null}
            </TabPane>
            <TabPane tabId="8">
              {activeTab === "8" ? <LeaveBalance employee={employee} /> : null}
            </TabPane>
            <TabPane tabId="9">
              {activeTab === "9" ? <Termination employee={employee} /> : null}
            </TabPane>
            <TabPane tabId="10">
              {activeTab === "10" ? <Training employee={employee} /> : null}
            </TabPane>
            <TabPane tabId="11">
              {activeTab === "11" ? (
                <Certification employee={employee} />
              ) : null}
            </TabPane>
            <TabPane tabId="12">
              {activeTab === "12" ? <Consignment employee={employee} /> : null}
            </TabPane>
          </TabContent>
        </Col>
      </Card>
    </div>
  );
};

EmployeeWidgetDetail.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  familyName: PropTypes.string.isRequired,
  employeeID: PropTypes.number.isRequired,
  department: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  employeeStatus: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  birthDate: PropTypes.date.isRequired,
  maritalStatus: PropTypes.string.isRequired,
  bankAccount: PropTypes.string.isRequired,
  empolyeeStartDate: PropTypes.date.isRequired,
  employeeEndDate: PropTypes.date.isRequired,
  homePhoneNumber: PropTypes.string.isRequired,
  supervisor: PropTypes.string.isRequired,
  emergencyName: PropTypes.string.isRequired,
  emergencyPhone: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  cityRegion: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  ethnicOrigin: PropTypes.string.isRequired,
  employeeType: PropTypes.string.isRequired,
};

EmployeeWidgetDetail.defaultProps = {
  firstName: "",
  lastName: "",
  familyName: "",
  employeeID: "",
  department: "",
  position: "",
  employeeStatus: "",
  gender: "",
  phoneNumber: "",
  birthDate: "",
  maritalStatus: "",
  bankAccount: "",
  empolyeeStartDate: "",
  employeeEndDate: "",
  homePhoneNumber: "",
  supervisor: "",
  emergencyName: "",
  emergencyPhone: "",
  nationality: "",
  cityRegion: "",
  language: "",
  ethnicOrigin: "",
  employeeType: "",
};

export default EmployeeWidgetDetail;
