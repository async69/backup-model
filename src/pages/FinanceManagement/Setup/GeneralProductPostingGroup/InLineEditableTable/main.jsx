import React, { useState, useEffect } from "react";
import { Table as ReactstrapTable, Button, Input } from "reactstrap";
import { MdEdit, MdDelete } from "react-icons/md";
import { updateData } from "./reducer";
import Joi from "joi-browser";
import _ from "lodash";

const uuid = () => Math.random().toString(36).substring(7);

export const populateLine = (obj, _id) => {
  let returnObj = {};
  for (let prop in obj) {
    returnObj[prop] = "";
  }
  return {
    ...returnObj,
    _id,
  };
};

export const statusTypes = {
  ADD: "ADDING_LINE",
  IDLE: "IDLE",
  EDIT: "EDIT",
  SAVED: "SAVED",
  CANCELED: "CANCELED",
};

export const DisplayTable = ({
  data,
  columns,
  hasEdit,
  hasDelete,
  status,
  addCount,
  schema,
  dispatch,
  callback,
}) => {
  const [fetchedData, setFetchedData] = useState([]);
  const [formStatus, setFormStatus] = useState(statusTypes.IDLE);
  const [displayValues, setDisplay] = useState(data.map(() => false));

  useEffect(() => {
    if (
      statusTypes.IDLE === formStatus ||
      statusTypes.SAVED === formStatus ||
      statusTypes.CANCELED === formStatus
    ) {
      setFormStatus(status);
    }
  }, [status, setFormStatus, addCount]);

  useEffect(() => {
    if (data.length > 0 && fetchedData.length === 0) {
      setFetchedData(
        data.map((item, idx) => {
          var returnObj = {};
          for (var prop in item) {
            // eslint-disable-next-line no-loop-func
            const found = columns.find((_item) => _item.tag === prop);
            returnObj[found.tag] = _.get(item, found.path);
          }
          return {
            ...returnObj,
            _id: uuid(),
          };
        })
      );
    }
  }, [data, setFetchedData]);

  useEffect(() => {
    updateData(fetchedData)(dispatch);
    callback(fetchedData);
  }, [fetchedData, dispatch]);

  const [formData, setForm] = useState({});
  const [validationData, setValidation] = useState({});
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (formStatus === statusTypes.ADD) {
      const _id = uuid();
      setFetchedData(fetchedData.concat(populateLine(fetchedData[0], _id)));
      populateData(populateLine(fetchedData[0], _id));
      setDisplay(displayValues.concat(true));
    }
  }, [formStatus]);

  const populateData = (data) => {
    setValidation(schema);
    setForm(data);
  };

  useEffect(() => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(formData, validationData, options);

    if (!error) {
      setCompleted(true);
    } else {
      console.log(error);
      setCompleted(false);
    }
  }, [formData]);

  const handleChange = ({ currentTarget: { name, value } }) => {
    setForm({
      ...formData,
      [name]: value,
    });
  };

  const cancelCallback = () => {
    if (formStatus === statusTypes.ADD) {
      const index = fetchedData.findIndex((data) => data._id === formData._id);
      if (index >= 0) {
        setFetchedData(fetchedData.filter((_, idx) => index !== idx));
        setDisplay(displayValues.filter((_, idx) => index !== idx));
      }
      setCompleted(true);
    } else {
      setDisplay(displayValues.map(() => false));
    }
    setFormStatus(statusTypes.CANCELED);
    setValidation({});
  };

  const deleteCallback = (_id) => {
    const index = fetchedData.findIndex((data) => data._id === _id);
    if (index >= 0) {
      setFetchedData(fetchedData.filter((_, idx) => idx !== index));
      setDisplay(displayValues.filter((_, idx) => idx !== index));
      setFormStatus(statusTypes.CANCELED);
    }
  };

  const saveCallback = () => {
    setFetchedData(
      fetchedData.map((data) => {
        if (data._id === formData._id) {
          return {
            _id: uuid(),
            ...formData,
          };
        } else {
          return data;
        }
      })
    );
    setDisplay(displayValues.map(() => false));
  };

  const returnName = (dataItem, item) => {
    if (item.tag === "root_item") {
    }
    if (item.optionsFrom === "server") {
      const found = item.options.find(
        (prop) => String(prop.id) === String(dataItem[item.tag])
      );
      if (found) return found.name;
      else {
      }
    } else {
      return dataItem[item.tag];
    }
  };

  return (
    <ReactstrapTable hover responsive>
      <thead>
        <tr>
          {columns.map((item) => (
            <th>{item.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {fetchedData.map((dataItem, idx) => {
          return (
            <tr>
              {columns.map((item) => {
                return displayValues[idx] && !item.noEdit ? (
                  <td>
                    {item.type === "select" ? (
                      <Input
                        type={item.type}
                        name={item.tag}
                        value={_.get(formData, item.tag)}
                        onChange={handleChange}
                      >
                        <option></option>
                        {item.optionsFrom === "server"
                          ? item.options.map((_item) => (
                              <option value={_item.id}>{_item.name}</option>
                            ))
                          : item.options.map((_item) => (
                              <option value={_item}>{_item}</option>
                            ))}
                      </Input>
                    ) : (
                      <Input
                        type={item.type}
                        name={item.tag}
                        value={_.get(formData, item.tag)}
                        onChange={handleChange}
                      />
                    )}
                  </td>
                ) : (
                  <td>{returnName(dataItem, item)}</td>
                );
              })}
              {hasEdit ? (
                <td>
                  {displayValues[idx] ? (
                    <div>
                      <Button
                        className="m-1"
                        size="sm"
                        outline
                        color="info"
                        onClick={() => {
                          saveCallback();
                          setFormStatus(statusTypes.SAVED);
                        }}
                        disabled={!completed}
                      >
                        Save
                      </Button>
                      <Button
                        className="m-1"
                        size="sm"
                        outline
                        color="danger"
                        onClick={() => {
                          cancelCallback();
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="m-1"
                      size="sm"
                      outline
                      color="warning"
                      onClick={() => {
                        setDisplay(
                          displayValues.map((_, value) => value === idx)
                        );
                        populateData(dataItem);
                        setFormStatus(statusTypes.EDIT);
                      }}
                      disabled={!completed}
                    >
                      <MdEdit />
                    </Button>
                  )}
                </td>
              ) : (
                <></>
              )}
              {hasDelete ? (
                <td>
                  <Button
                    className="m-1"
                    size="sm"
                    outline
                    color="danger"
                    onClick={() => deleteCallback(dataItem._id)}
                  >
                    <MdDelete />
                  </Button>
                </td>
              ) : (
                <></>
              )}
            </tr>
          );
        })}
      </tbody>
    </ReactstrapTable>
  );
};
