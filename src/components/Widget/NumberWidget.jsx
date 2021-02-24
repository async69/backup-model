import React from "react";
import PropTypes from "../../utils/propTypes";

import { Card, CardText, CardTitle, Progress } from "reactstrap";
import Typography from "../Typography";

const NumberWidget = ({
  title,
  subtitle,
  number,
  color,
  progress: { value, label },
  ...restProps
}) => {
  return (
    <Card body {...restProps} className="shadow_ numberWidget">
      <div className="d-flex justify-content-between  ">
        <CardText tag="div">
          <Typography>
            <strong>{title}</strong>
          </Typography>
          <Typography className="mb-0 text-muted small">{subtitle}</Typography>
        </CardText>
        <CardTitle className={`text-${color} numbers`}>{number}</CardTitle>
      </div>
      <Progress
        className="mb-3"
        value={value}
        color={color}
        striped
        style={{ height: "10px" }}
      />
      <CardText tag="div" className="d-flex justify-content-between">
        <Typography tag="span" className="text-left text-muted small ">
          {label}
        </Typography>
        <Typography tag="span" className="text-right text-muted small">
          {value}%
        </Typography>
      </CardText>
    </Card>
  );
};

NumberWidget.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  number: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "danger",
    "light",
    "dark",
  ]),
  progress: PropTypes.shape({
    value: PropTypes.number,
    label: PropTypes.string,
  }),
};

NumberWidget.defaultProps = {
  title: "",
  subtitle: "",
  number: 0,
  color: "primary",
  progress: {
    value: 0,
    label: "",
  },
};

export default NumberWidget;
