import React from "react";
import {
  Input as ReactstrapInput,
  FormGroup,
  Label,
  FormFeedback,
} from "reactstrap";

const Input = ({ name, label, error, disabled, ...rest }) => {
  return (
    <FormGroup>
      <Label className={disabled ? "disabledLabel" : "activeLabel"} for={name}>
        {label}
      </Label>
      <ReactstrapInput
        {...rest}
        name={name}
        id={name}
        className={disabled ? "disabledInput" : "activeInput"}
        disabled={disabled}
      />
      <FormFeedback>{error}</FormFeedback>
    </FormGroup>
  );
};
export default Input;
