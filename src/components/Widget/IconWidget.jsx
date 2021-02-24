import React from "react";
import PropTypes from "../../utils/propTypes";

import classNames from "classnames";

import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";

const IconWidget = ({
  bgColor,
  icon: Icon,
  iconProps,
  title,
  subtitle,
  className,
  ...restProps
}) => {
  const classes = classNames("cr-widget shadow_", className, {
    [`bg-${bgColor}`]: bgColor,
  });
  return (
    <div>
      <Card inverse className={classes} {...restProps}>
        <CardBody className="cr-widget__icon">
          <Icon
            className="text-dark"
            size={30}
            color="primary"
            {...iconProps}
          />
        </CardBody>
        <CardBody>
          <CardTitle style={{ fontSize: "20px" }}>{title}</CardTitle>
          <CardSubtitle>{subtitle}</CardSubtitle>
        </CardBody>
      </Card>
    </div>
  );
};

IconWidget.propTypes = {
  bgColor: PropTypes.string,
  icon: PropTypes.component,
  iconProps: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

IconWidget.defaultProps = {
  bgColor: "primary",
  icon: "span",
  iconProps: { size: 50 },
};

export default IconWidget;
