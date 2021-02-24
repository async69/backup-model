import React from "react";
import { Card, CardText, Button, Col, Row } from "reactstrap";
import Typography from "../../../components/Typography";

import { MdArrowForward } from "react-icons/md";
import routes from "config/routes/index";
import { Link } from "react-router-dom";

import Page from "../../../components/Page";

const FinanceSetup = [
  {
    title: "Fiscal Year ",
    subtitle: " Year configyrations",
    link: routes.fiscalYear,
  },
];

export default function SettingsWidget() {
  return (
    <Page className="mt-4" title="Finance Settings ">
      <Row>
        {FinanceSetup.map((setups, index) => {
          return (
            <div>
              <Col key={index} md={4} sm={6} xs={12}>
                <Card className="someCard">
                  <div className="d-flex justify-content-between  ">
                    <CardText tag="div">
                      <Typography className="mb-0 p-2 ">
                        <strong>{setups.title} </strong>
                      </Typography>
                      <Typography className="mb-0 text-muted small">
                        {setups.subtitle}{" "}
                      </Typography>
                    </CardText>

                    <Link to={{ pathname: setups.link }}>
                      <Button>
                        <MdArrowForward />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </Col>
            </div>
          );
        })}
      </Row>
    </Page>
  );
}
