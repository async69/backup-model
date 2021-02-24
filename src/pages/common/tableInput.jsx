import React from "react";
import { Input as ReactstrapInput, FormGroup, FormFeedback } from "reactstrap";

const TableInput = ({ name, placeholder, error, ...rest }) => {
  return (
    <FormGroup>
      <ReactstrapInput
        {...rest}
        name={name}
        id={name}
        placeholder={placeholder}
      />
      <FormFeedback>{error}</FormFeedback>
    </FormGroup>
  );
};
export default TableInput;
