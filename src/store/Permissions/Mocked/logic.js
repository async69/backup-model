import constants from "../../../constants/apiActions";
import { customers } from "./data";

export const simulateLogic = (config) => {
  const { type, apiType, action, dispatch } = config;

  switch (type) {
    case constants.FETCH:
      return fetchSimulator(apiType, action, dispatch);
    case constants.ADD:
      return addSimulator(apiType, action, dispatch);
    case constants.EDIT:
      return editSimulator(apiType, action, dispatch);
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
    payload: customers(),
  });
};

export const addSimulator = (type, action, dispatch) => {
  dispatch({
    ...action.payload,
    type,
    payload: {
      ...action.payload.data,
    },
  });
};

export const editSimulator = (type, action, dispatch) => {
  dispatch({
    ...action.payload,
    type,
    payload: {
      ...action.payload.data,
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
