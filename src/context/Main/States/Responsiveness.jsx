import { constants } from "../reducer";

export const stateName = "responsiveness";

export const getState = (rootState) => {
  if (rootState[stateName]) {
    return rootState[stateName];
  } else {
    return null;
  }
};

export const updateResponsiveness = (_, dispatch, tag, value) => {
  dispatch({
    type: constants.UPDATE,
    stateName,
    payload: {
      [tag]: value,
    },
  });
};

export const getBreakpoint = (rootState = null) => {
  const state = getState(rootState);
  return state ? state : {};
};
