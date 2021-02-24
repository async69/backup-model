import constants from "../../../../constants/apiActions";
import uuid from "../../../../helpers/uuid"
import { customers } from "./data"

export const simulateLogic = (config) => {
  const { type, apiType, action, dispatch } = config;

  switch (type) {
    case constants.FETCH:
      return fetchSimulator(apiType, action, dispatch);
    case constants.ADD:
      return addSimulator(apiType, action, dispatch)
    case constants.EDIT:
      return editSimulator(apiType, action, dispatch)
    case constants.PATCH:
      return defaultSimulator(apiType, action, dispatch)
    case constants.REMOVE:
      return deleteSimulator(apiType, action, dispatch)
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
  const { data } = action.payload
  dispatch({
    ...action.payload,
    type,
    payload: {
      ...action.payload.data,
      id: uuid(),
      document_number: uuid(),
      vendor_name: data.name,
      vendor_type_detail: { id: uuid(), name: data.vendor_type },
      vendor_posting_group_detail: { id: uuid(), name: data.vendor_posting_group },
      vat_posting_group_detail: { id: uuid(), name: data.vat_posting_group },
      general_business_posting_group_detail: { id: uuid(), name: data.general_business_posting_group },
    }
  })
}

export const editSimulator = (type, action, dispatch) => {
  const { data } = action.payload
  dispatch({
    ...action.payload,
    type,
    payload: {
      ...action.payload.data,
      vendor_type_detail: { id: uuid(), name: data.vendor_type },
      vendor_name: data.name,
      vendor_posting_group_detail: { id: uuid(), name: data.vendor_posting_group },
      vat_posting_group_detail: { id: uuid(), name: data.vat_posting_group },
      general_business_posting_group_detail: { id: uuid(), name: data.general_business_posting_group },
    }
  })
}

export const defaultSimulator = (type, action, dispatch) => {
  dispatch({
    ...action.payload,
    type,
    payload: action.payload.data
  })
}

export const deleteSimulator = (type, action, dispatch) => {
  dispatch({
    ...action.payload,
    type,
    payload: action.payload.data
  })
}