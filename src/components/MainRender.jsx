import React from "react";
import { Button } from "reactstrap";

export const RenderButton = ({ buttonName, color, type, name }) => {
  return (
    <Button outline color={color} type={type} name={name}>
      {buttonName}
    </Button>
  );
};
