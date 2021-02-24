import React, { useReducer } from "react";
import { Button, Col } from "reactstrap";
import { initialState, reducer, addLine, DisplayTable } from "./index";

export const InlineTable = ({ data, columns, callback, schema }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const _callback = (data) => {
    if (state._data.length >= data.length) {
      callback(data);
    }
  };

  return (
    <div>
      <Col align="right" className="newButton">
        <Button
          className="m-1 align-right"
          size="sm"
          outline
          // color="primary"
          onClick={() => addLine(dispatch)}
        >
          Add Line
        </Button>
      </Col>
      <DisplayTable
        {...state}
        dispatch={dispatch}
        data={data}
        schema={schema}
        columns={columns}
        callback={_callback}
      />
    </div>
  );
};
