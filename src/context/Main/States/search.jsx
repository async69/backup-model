import { constants } from "../reducer";

export const stateName = "search_values";

export const getState = (rootState) => {
  if (rootState[stateName]) {
    return rootState[stateName];
  } else {
    return null;
  }
};

export const updateSearchValue = (_, dispatch, value) => {
  dispatch({
    type: constants.UPDATE,
    stateName,
    payload: {
      searchValue: value,
    },
  });
};

export const assignFilterComponent = (_, dispatch, Component) => {
  dispatch({
    type: constants.UPDATE,
    stateName,
    payload: {
      isComponentAssigned: true,
      Component,
    },
  });
};

export const updateSearchFilter = (_, dispatch, value) => {
  dispatch({
    type: constants.UPDATE,
    stateName,
    payload: {
      filterValue: value,
    },
  });
};

export const componentLock = "componentLock";

export const setLockComponent = (_, dispatch, value) => {
  dispatch({
    type: constants.UPDATE,
    stateName,
    payload: {
      [componentLock]: Boolean(value),
    },
  });
};

export const isLocked = (rootState) => {
  const state = getState(rootState);
  try {
    return state[componentLock] ? state[componentLock] : false;
  } catch (e) {
    return false;
  }
};
