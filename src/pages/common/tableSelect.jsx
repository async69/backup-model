import React from "react";
import { Input, FormGroup, FormFeedback } from "reactstrap";

const TableSelect = ({
  name,
  placeholder,
  options,
  error,
  optionsFrom,
  ...rest
}) => {
  return (
    <FormGroup>
      <Input name={name} id={name} type="select" {...rest}>
        <option value="">{placeholder}</option>
        {optionsFrom === "client"
          ? options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))
          : options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
      </Input>
      <FormFeedback>{error}</FormFeedback>
    </FormGroup>
  );
};
export default TableSelect;
