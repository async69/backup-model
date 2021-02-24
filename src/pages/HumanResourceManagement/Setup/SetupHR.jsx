import React from "react";
import Page from "../../../components/Page";
import { Row, Col, Card, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import routes from "config/routes/index";
import Typography from "../../../components/Typography";
import {
  MdHome,
  MdClearAll,
  MdKeyboardCapslock,
  MdShortText,
  MdFormatListNumbered,
  MdCancel,
  MdGavel,
  MdDoneAll,
  MdContentPaste,
  MdBusinessCenter,
  MdTransferWithinAStation,
  MdAccountBalance,
  MdAddShoppingCart,
  MdHotel,
  MdTimeline,
  MdPersonPin,
  MdPeople,
  MdDirectionsWalk,
  MdImageAspectRatio,
  MdAttachMoney,
} from "react-icons/md";

const HRSetups = [
  {
    name: "Departments",
    subtitle: "Divisions under the Company",
    link: routes.HRDepartmentSetup,
    icon: <MdClearAll size={80} className="text-dark" />,
  },
  {
    name: "Goal Type",
    subtitle: "Types of expected Outcome",
    link: routes.goalType,
    icon: <MdKeyboardCapslock size={80} className="text-dark" />,
  },
  {
    name: "Position",
    subtitle: "Status in the Department ",
    link: routes.positionType,
    icon: <MdShortText size={80} className="text-dark" />,
  },
  {
    name: "Position Level",
    subtitle: "Level of Status in a Department",
    link: routes.positionLevel,
    icon: <MdFormatListNumbered size={80} className="text-dark" />,
  },
  {
    name: "Termination Type",
    subtitle: "Types of Terminations",
    link: routes.terminationType,
    icon: <MdCancel size={80} className="text-dark" />,
  },
  {
    name: "Disciplinary Action Type",
    subtitle: "Offence types",
    link: routes.disciplinaryActionType,
    icon: <MdGavel size={80} className="text-dark" />,
  },
  {
    name: "Certification Type",
    subtitle: "Offical Document Types",
    link: routes.certificationType,
    icon: <MdContentPaste size={80} className="text-dark" />,
  },
  {
    name: "Qualification Type",
    subtitle: "Profession on a specific feild",
    link: routes.qualificationType,
    icon: <MdDoneAll size={80} className="text-dark" />,
  },
  {
    name: "Qualification Level Type",
    subtitle: "Type of Profession on a Specific field",
    link: routes.qualificationLevelType,
    icon: <MdClearAll size={80} className="text-dark" />,
  },
  {
    name: "Education Type",
    subtitle: "Level of Literacy",
    link: routes.educationType,
    icon: <MdBusinessCenter size={80} className="text-dark" />,
  },
  {
    name: "Training Type",
    subtitle: "Types of aquired Skills",
    link: routes.trainingType,
    icon: <MdTransferWithinAStation size={80} className="text-dark" />,
  },
  {
    name: "Institution",
    subtitle: "Place of Study",
    link: routes.institution,
    icon: <MdAccountBalance size={80} className="text-dark" />,
  },
  {
    name: "Language",
    subtitle: "Communication",
    link: routes.language,
    icon: <MdHome size={80} className="text-dark" />,
  },
  {
    name: "Consignment Type",
    subtitle: "Fixed Asset lent",
    link: routes.consignmentType,
    icon: <MdAddShoppingCart size={80} className="text-dark" />,
  },
  {
    name: "Illness Type",
    subtitle: "Medical Types",
    link: routes.illnessType,
    icon: <MdHotel size={80} className="text-dark" />,
  },
  {
    name: "Unit Of Duration",
    subtitle: "Time",
    link: routes.unitOfDuration,
    icon: <MdTimeline size={80} className="text-dark" />,
  },
  {
    name: "Nationality",
    subtitle: "Place of Birth / Residence",
    link: routes.nationality,
    icon: <MdPersonPin size={80} className="text-dark" />,
  },
  {
    name: "Employee Status",
    subtitle: "Status of an Employee",
    link: routes.employeeStatus,
    icon: <MdPeople size={80} className="text-dark" />,
  },
  {
    name: "Leave Type",
    subtitle: "Types of Reasons for Leaving",
    link: routes.leaveType,
    icon: <MdDirectionsWalk size={80} className="text-dark" />,
  },
];

const HRPayrollSetups = [
  // payroll setups

  {
    name: "Payroll Posting Group ",
    subtitle: "Payroll Posting Group Configuration",
    link: routes.payrollPostingGroup,
    icon: <MdAttachMoney size={80} className="text-dark" />,
  },
  {
    name: "Payroll Rate",
    subtitle: "Rate of an Employee Paycheck ",
    link: routes.payrollRate,
    icon: <MdImageAspectRatio size={80} className="text-dark" />,
  },
  {
    name: "Salary Income Tax ",
    subtitle: "Tax",
    link: routes.salaryIncomeTax,
    icon: <MdAttachMoney size={80} className="text-dark" />,
  },
];

export default function SetupHR() {
  return (
    <Page className="mt-4" title="Human Rescources Settings ">
      <Row>
        {HRSetups.map((setups, index) => {
          return (
            <Col key={index} md={4} sm={6} xs={12}>
              <Link
                style={{ textDecoration: "none" }}
                to={{ pathname: setups.link }}
              >
                <Card className="shadow_ settingsCard">
                  <Row>
                    <Col md={3} sm={6} xs={12}>
                      {setups.icon}
                    </Col>
                    <Col md={9} sm={6} xs={12}>
                      <CardText>
                        <Typography className="mb-2 p-2 ">
                          <h5>
                            {" "}
                            <strong>{setups.name} </strong>
                          </h5>
                        </Typography>
                        <Typography className="mb-3 ">
                          <h7>{setups.subtitle}</h7>{" "}
                        </Typography>
                      </CardText>
                    </Col>
                  </Row>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>

      <hr />
      <h4 className="mt-2 mb-2 ml-5 ">Payroll Settings Settings </h4>
      <hr />

      <Row>
        {HRPayrollSetups.map((setups, index) => {
          return (
            <Col key={index} md={4} sm={6} xs={12}>
              <Link
                style={{ textDecoration: "none" }}
                to={{ pathname: setups.link }}
              >
                <Card className="shadow_ settingsCard">
                  <Row>
                    <Col md={3} sm={6} xs={12}>
                      {setups.icon}
                    </Col>
                    <Col md={9} sm={6} xs={12}>
                      <CardText>
                        <Typography className="mb-2 p-2 ">
                          <h5>
                            {" "}
                            <strong>{setups.name} </strong>
                          </h5>
                        </Typography>
                        <Typography className="mb-3 ">
                          <h7>{setups.subtitle}</h7>{" "}
                        </Typography>
                      </CardText>
                    </Col>
                  </Row>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </Page>
  );
}
