import React, { useState } from "react";
import PropTypes from "../../../../utils/propTypes";
import {
  Card,
  CardText,
  CardTitle,
  Row,
  Col,
  Container,
  Button,
} from "reactstrap";
import Typography from "../../../../components/Typography";
import Avatar from "react-avatar";
import { Redirect } from "react-router-dom";
import routes from "../../../../config/routes/index";

const EmployeeWidget = ({
  firstName,
  lastName,
  familyName,
  department,
  position,
  employeeStatus,
  githubHandle,
  src,
  instagramId,
  googleId,
  facebookId,
  name,
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
                <Col className="text-center">
                  <Avatar
                    name={name}
                    src={src}
                    githubHandle={githubHandle}
                    instagramId={instagramId}
                    googleId={googleId}
                    facebookId={facebookId}
                    size="170"
                    round={true}
                  />
                </Col>
                <Col className="justify-content-space-evenly">
                  <Typography className="mb-2">
                    <strong>
                      {" "}
                      {firstName} {lastName} {familyName}
                    </strong>
                  </Typography>
                  <Typography className=" mb-2 text-muted medium">
                    {department} : {position}{" "}
                  </Typography>
                  <CardTitle className="mb-2">
                    Status : {employeeStatus}{" "}
                  </CardTitle>
                  <Button
                    onClick={() => {
                      console.log("Bitch");
                      setRedirect(routes.singleEmployee);
                    }}
                    color="primary"
                    outline
                    size="sm"
                  >
                    {" "}
                    Manage Employee
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

EmployeeWidget.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  familyName: PropTypes.string.isRequired,
  employeeID: PropTypes.number.isRequired,
  department: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  employeeStatus: PropTypes.string.isRequired,
};

EmployeeWidget.defaultProps = {
  firstName: "",
  lastName: "",
  familyName: "",
  employeeID: "",
  department: "",
  position: "",
  employeeStatus: "",
};

export default EmployeeWidget;
