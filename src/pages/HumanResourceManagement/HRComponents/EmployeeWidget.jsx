import React, { useState } from "react";
import PropTypes from "../../../utils/propTypes";
import {
  Card,
  CardText,
  CardTitle,
  Row,
  Col,
  Container,
  Button,
} from "reactstrap";
import Typography from "../../../components/Typography";
import Avatar from "react-avatar";
import { Redirect } from "react-router-dom";
import routes from "../../../config/routes/index";

const EmployeeWidget = ({
  firstName,
  lastName,
  familyName,
  employeeID,
  department,
  position,
  employeeStatus,
  buttonAction,
  // for avatar
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
  return <></>;
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
