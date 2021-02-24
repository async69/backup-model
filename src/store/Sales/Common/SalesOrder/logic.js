import constants from "../../../../constants/apiActions";
import uuid from "../../../../helpers/uuid";
import { salesOrders } from "./data";

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
      return defaultSimulator(apiType, action, dispatch);
    default:
      return null;
  }
};

const fetchSimulator = (type, action, dispatch) => {
  dispatch({
    ...action.payload,
    type,
    payload: salesOrders,
  });
};

export const addSimulator = (type, action, dispatch) => {
  const { data } = action.payload;
  dispatch({
    ...action.payload,
    type,
    payload: {
      ...data,
      id: uuid(),
      document_number: uuid(),
      customer_detail: {
        name: data.customer,
        number: data.customer_number,
      },
      sales_region_detail: {
        name: data.sales_region,
      },
      status: "Open",
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
