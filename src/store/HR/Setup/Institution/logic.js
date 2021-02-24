import constants from "../../../../constants/apiActions";
import uuid from "../../../../helpers/uuid";

const institution = [
  {
    id: uuid(),
    name: "Institution one",
    code: "PHGJYEAB",
    remarks: "",
    created_at: String(new Date()),
    updated_at: String(new Date()),
  },
];

export const simulateLogic = (config) => {
  const { type, apiType, action, dispatch } = config;

  switch (type) {
    case constants.FETCH:
      return fetchSimulator(apiType, action, dispatch);
    case constants.ADD:
      return addSimulator(apiType, action, dispatch);
    case constants.EDIT:
      return defaultSimulator(apiType, action, dispatch);
    case constants.PATCH:
      return defaultSimulator(apiType, action, dispatch);
    case constants.REMOVE:
      return deleteSimulator(apiType, action, dispatch);
    default:
      return null;
  }
};

const fetchSimulator = (type, action, dispatch) => {
  dispatch({
    ...action.payload,
    type,
    payload: institution,
  });
};

export const addSimulator = (type, action, dispatch) => {
  dispatch({
    ...action.payload,
    type,
    payload: {
      ...action.payload.data,
      id: uuid(),
    },
  });
};

export const defaultSimulator = (type, action, dispatch) => {
  dispatch({
    ...action.payload,
    type,
    payload: action.payload.data,
  });
};

export const deleteSimulator = (type, action, dispatch) => {
  dispatch({
    ...action.payload,
    type,
    payload: action.payload.data,
  });
};
