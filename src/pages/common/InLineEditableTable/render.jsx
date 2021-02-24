import React, { useState, useReducer, useEffect } from "react";
import { Button, Col } from "reactstrap";
import { initialState, reducer, addLine, DisplayTable } from "./index";
import { MdPlaylistAdd } from "react-icons/md";

export const InlineTable = ({
  data,
  columns,
  callback,
  schema,
  lineTag,
  disabled,
  startForm,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [dataAllocated, setAllocated] = useState(false);

  useEffect(() => {
    if (startForm) {
      addLine(dispatch);
    }
  }, [startForm, dispatch]);

  const _callback = (data) => {
    if (
      !dataAllocated &&
      data.length > 0 &&
      Object.values(data[0]).length > 1
    ) {
      callback(data);
      setAllocated(true);
    } else if (state._data.length >= data.length) {
      callback(data);
    }
  };

  return (
    <div>
      <DisplayTable
        {...state}
        dispatch={dispatch}
        data={data}
        schema={schema}
        columns={columns}
        callback={_callback}
        hasEdit={!disabled}
        hasDelete={!disabled}
      />
      {disabled ? (
        <></>
      ) : (
        <Col align="center" className="pl-3 pr-3 mb-2">
          <Button
            size="sm"
            outline
            color="primary"
            onClick={() => addLine(dispatch)}
          >
            <MdPlaylistAdd /> {lineTag ? lineTag : "Add Line"}
          </Button>
        </Col>
      )}
    </div>
  );
};
