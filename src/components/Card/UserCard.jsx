import React from "react";
import PropTypes from "../../utils/propTypes";
import classNames from "classnames";
import {
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
  CardBody,
  Row,
} from "reactstrap";

import Avatar from "../Avatar";

const UserCard = ({
  avatar,
  avatarSize,
  title,
  subtitle,
  text,
  children,
  className,
  logoSize,
  logo,
  ...restProps
}) => {
  const classes = classNames("bg-dark", className);

  return (
    <Card inverse className={classes} {...restProps}>
      <CardBody className="d-flex justify-content-center align-items-center flex-column">
        <Row>
          <Avatar circle src={avatar} size={avatarSize} className="mb-2" />
          <Avatar src={logo} size={logoSize} className="mb-2" />
        </Row>

        <CardTitle>{title}</CardTitle>
        <CardSubtitle>{subtitle}</CardSubtitle>
        <CardText>
          <small>{text}</small>
        </CardText>
      </CardBody>
      {children}
    </Card>
  );
};

UserCard.propTypes = {
  avatar: PropTypes.string,
  avatarSize: PropTypes.number,
  logo: PropTypes.string,
  logoSize: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
};

UserCard.defaultProps = {
  avatarSize: 80,
  logoSize: 40,
};

export default UserCard;
