import constants from "../../../../constants/apiActions";
import uuid from "../../../../helpers/uuid";
import purchaseOrders from "./data";

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
      return defaultSimulator(apiType, action, dispatch);
    default:
      return null;
  }
};

const fetchSimulator = (type, action, dispatch) => {
  dispatch({
    ...action.payload,
    type,
    payload: purchaseOrders(),
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
      purchase_requisition_detail: {
        name: data.purchase_requisition,
        number: uuid(),
        id: uuid(),
      },
      vendor_detail: {
        name: data.vendor,
        number: uuid(),
        id: uuid(),
      },
      requestor_department_detail: {
        name: data.requestor_department,
        number: uuid(),
        id: uuid(),
      },
      purchase_type_detail: {
        name: data.purchase_type,
        number: uuid(),
        id: uuid(),
      },
      status: "Open",
    },
  });
};

export const editSimulator = (type, action, dispatch) => {
  const { data } = action.payload;
  dispatch({
    ...action.payload,
    type,
    payload: {
      ...data,
      document_number: uuid(),
      purchase_requisition_detail: {
        name: data.purchase_requisition,
        number: uuid(),
        id: uuid(),
      },
      vendor_detail: {
        name: data.vendor,
        number: uuid(),
        id: uuid(),
      },
      requestor_department_detail: {
        name: data.requestor_department,
        number: uuid(),
        id: uuid(),
      },
      purchase_type_detail: {
        name: data.purchase_type,
        number: uuid(),
        id: uuid(),
      },
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
