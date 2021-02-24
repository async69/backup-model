import { constants } from "../reducer";

export const stateName = "date_values";

export const getState = (rootState) => {
  if (rootState[stateName]) {
    return rootState[stateName];
  } else {
    return null;
  }
};

export const updateDate = (_, dispatch, tag, value) => {
  dispatch({
    type: constants.UPDATE,
    stateName,
    payload: {
      [tag]: value,
    },
  });
};
