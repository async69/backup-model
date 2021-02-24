import React from "react";
import { Row, Col, Card, CardText } from "reactstrap";
import routes from "config/routes/index";
import { Link } from "react-router-dom";
import Typography from "../../components/Typography";

import Page from "../../components/Page";
import {
  MdHome,
  MdViewAgenda,
  MdPermDataSetting,
  MdSwapHoriz,
} from "react-icons/md";

const WarehouseSettingsitem = [
  {
    title: "Warehouse",
    subtitle: "Physical Location of warehouse",
    link: routes.warehouse,
    icon: <MdHome size={80} className="text-dark" />,
  },
  {
    title: "Bin",
    subtitle: "Bins inside warehouse",
    link: routes.bin,
    icon: <MdViewAgenda size={80} className="text-dark" />,
  },
  {
    title: "UOM",
    subtitle: "Measurement logic",
    link: routes.uom,
    icon: <MdPermDataSetting size={80} className="text-dark" />,
  },
  {
    title: "UOM Conversion",
    subtitle: "Declare Measuring units",
    link: routes.uomConversion,
    icon: <MdSwapHoriz size={80} className="text-dark" />,
  },
];

const WarehouseSetup = () => {
  return (
    <div>
      <Page className="mt-4" title="Warehouse  Settings ">
        <Row>
          {WarehouseSettingsitem.map((setups, index) => {
            return (
              <Col key={index} md={4} sm={6} xs={12}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={{ pathname: setups.link }}
                >
                  <Card className=" shadow_ settingsCard">
                    <div className="d-flex justify-content-between">
                      <Col md={4} sm={6} xs={12}>
                        {setups.icon}
                      </Col>
                      <Col md={8} sm={6} xs={12}>
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

export default WarehouseSetup;
