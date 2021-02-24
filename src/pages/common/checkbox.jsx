import React from "react";
import { FormGroup, Label, FormFeedback } from "reactstrap";
import Switch from "react-switch";

const CheckBox = ({ name, label, error, ...restProps }) => {
  return (
    <FormGroup align="center" check className="mb-4">
      <Label check>
        <Switch width={56} name={name} {...restProps} />{" "}
        <div className="text-bold mt-2">{label}</div>
      </Label>
      <FormFeedback>{error}</FormFeedback>
    </FormGroup>
  );
};

export default CheckBox;
