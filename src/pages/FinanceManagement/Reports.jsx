import React from "react";
import { Row, Col, Card, CardText, CardTitle } from "reactstrap";
import Page from "../../components/Page";
import routes from "config/routes/index";
import { Link } from "react-router-dom";
import { MdAssignment } from "react-icons/md";

const financeReports = [
  {
    title: "Trial Balance",
    subtitle: "Trial Balance Configurations",
    link: routes.trialBalance,
    width: 6,
    icon: <MdAssignment size={80} className="text-dark" />,
  },
  {
    title: "Balance Sheet",
    subtitle: "Balance Sheet Description",
    link: routes.balanceSheet,
    width: 6,
    icon: <MdAssignment size={80} className="text-dark" />,
  },
  {
    title: "Income Statement",
    subtitle: "Income Statement Configurations",
    link: routes.incomeStatement,
    width: 6,
    icon: <MdAssignment size={80} className="text-dark" />,
  },
  {
    title: "Withholding Tax",
    subtitle: "Withholding Tax Configurations",
    link: routes.WHTReport,
    width: 6,
    icon: <MdAssignment size={80} className="text-dark" />,
  },
];

const FinanceReports = () => {
  return (
    <Page className="mt-4" title="Reports">
      <hr />
      <Row>
        {financeReports.map((setups, index) => {
          return (
            <Col key={index} md={setups.width} sm={6} xs={12}>
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
                      <CardTitle className="text-title">
                        <h5>
                          <b>{setups.title} </b>
                        </h5>
                      </CardTitle>
                      <CardText className="mb-3 ml-2 ">
                        <h7>{setups.subtitle}</h7>{" "}
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
};

export default FinanceReports;
