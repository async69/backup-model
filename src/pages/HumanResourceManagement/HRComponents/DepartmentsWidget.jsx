import React, { useState } from "react";
import PropTypes from "../../../utils/propTypes";

import { Card, CardText, Row, Col, Container, Button } from "reactstrap";
import Typography from "../../../components/Typography";
import { Redirect } from "react-router-dom";
import routes from "../../../config/routes/index";

const DepartmentWidget = ({
  departmentName,
  managerName,
  DepartmentDescription,
  noEmployees,
  activeSinceDate,
}) => {
  const [redirect, setRedirect] = useState("");

  if (redirect !== "") {
    return <Redirect to={redirect} />;
  }
  return (
    <div>
      <Card body>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Container className="mt-2">
            <CardText tag="div">
              <Row>
                <Col className="justify-content-space-evenly">
                  <Typography className="mb-2">
                    <h4> {departmentName} </h4>
                  </Typography>
                  <Typography className="mb-2">
                    <h6> Lead Person : {managerName}</h6>
                  </Typography>
                  <Typography className=" mb-2 text-muted medium">
                    Description : {DepartmentDescription}{" "}
                  </Typography>
                  <Typography className="mb-2">
                    No of Employees : {noEmployees}{" "}
                  </Typography>
                  <Button
                    onClick={() => {
                      console.log("Bitch");
                      setRedirect(routes.employees);
                    }}
                    className="mt-2"
                    color="primary"
                    outline
                    size="sm"
                  >
                    {" "}
                    See Employees
                  </Button>
                </Col>
              </Row>
            </CardText>
          </Container>
        </div>
      </Card>
    </div>
  );
};

DepartmentWidget.propTypes = {
  departmentName: PropTypes.string.isRequired,
  managerName: PropTypes.string.isRequired,
  DepartmentDescription: PropTypes.string.isRequired,
  noEmployees: PropTypes.number.isRequired,
  activeSinceDate: PropTypes.string.isRequired,
};

DepartmentWidget.defaultProps = {
  departmentName: "",
  managerName: "",
  DepartmentDescription: "",
  noEmployees: "",
  activeSinceDate: "",
};

export default DepartmentWidget;
