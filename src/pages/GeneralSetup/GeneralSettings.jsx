import React from "react";
import { Row, Col, Card, CardText } from "reactstrap";
import routes from "config/routes/index";
import { Link } from "react-router-dom";
import Typography from "../../components/Typography";
import Page from "../../components/Page";
import {
  MdFormatListNumbered,
  MdMap,
  MdNearMe,
  MdLocationCity,
  MdList,
  MdAccountBalance,
  MdAttachMoney,
  MdDateRange,
  MdWc,
} from "react-icons/md";

const GeneralSettingsItems = [
  {
    title: "Number Series",
    subtitle: "Number Series Configurations",
    link: routes.numberSeries,
    icon: <MdFormatListNumbered size={80} className="text-dark" />,
  },
  {
    title: "Countries",
    subtitle: "Countries Registration",
    link: routes.country,
    icon: <MdMap size={80} className="text-dark" />,
  },
  {
    title: "Regions",
    subtitle: "Regions Registration",
    link: routes.region,
    icon: <MdNearMe size={80} className="text-dark" />,
  },
  {
    title: "City",
    subtitle: "City Registration",
    link: routes.city,
    icon: <MdLocationCity size={80} className="text-dark" />,
  },
  {
    title: "Account Type",
    subtitle: "Account Type Configurations",
    link: routes.accountType,
    icon: <MdList size={80} className="text-dark" />,
  },
  {
    title: "Company",
    subtitle: "Company Configurations",
    link: routes.company,
    icon: <MdAccountBalance size={80} className="text-dark" />,
  },
  {
    title: "Currency",
    subtitle: "Currency Configurations",
    link: routes.currency,
    icon: <MdAttachMoney size={80} className="text-dark" />,
  },
  {
    title: "Status",
    subtitle: "Status Configurations",
    link: routes.status,
    icon: <MdWc size={80} className="text-dark" />,
  },
  {
    title: "Entry Type",
    subtitle: "Entry Type Configurations",
    link: routes.entryType,
    icon: <MdDateRange size={80} className="text-dark" />,
  },
];

const GeneralSettings = () => {
  return (
    <div>
      <Page className="mt-4 page" title="General Settings ">
        <Row>
          {GeneralSettingsItems.map((setups, index) => {
            return (
              <Col key={index} md={4} sm={6} xs={12}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={{ pathname: setups.link }}
                >
                  <Card className="pl-3 pr-3 pt-3 pb-3 shadow_  settingsCard">
                    <div className="d-flex justify-content-between  ">
                      <Col md={3} sm={6} xs={12}>
                        {setups.icon}
                      </Col>
                      <Col md={9} sm={6} xs={12}>
                        <CardText>
                          <Typography className="mb-2 p-2 ">
                            <h5>
                              {" "}
                              <strong>{setups.title} </strong>
                            </h5>
                          </Typography>
                          <Typography className="mb-3 ">
                            <h7>{setups.subtitle}</h7>{" "}
                          </Typography>
                        </CardText>
                      </Col>
                    </div>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>
      </Page>
    </div>
  );
};

export default GeneralSettings;
