import { constants } from "../reducer";

export const stateName = "page_values";

export const getState = (rootState) => {
  if (rootState[stateName]) {
    return rootState[stateName];
  } else {
    return null;
  }
};

export const setPageValues = (
  state,
  dispatch,
  results,
  options = {},
  activeTab = ""
) => {
  if (typeof results !== "undefined") {
    if (results.count === 0) return null;
    dispatch({
      type: constants.UPDATE,
      stateName,
      payload: {
        results,
        options,
        pageLimit: results.length ? Math.ceil(results.length / 5) * 5 : 5,
        amount: getState(state) ? getState(state).amount + 1 : 0,
        activeTab,
      },
    });
  }
};

export const setPageLimit = (state = {}, dispatch, pageLimit) => {
  let currentTab = "";
  if (state) {
    const response = getState(state);
    if (typeof response.activeTab !== "undefined")
      currentTab = response.activeTab;
  }

  dispatch({
    type: constants.UPDATE,
    stateName,
    payload: {
      pageLimit,
      activeTab: currentTab,
    },
  });
};

export const getPageLimit = (rootState) => {
  const results = rootState[stateName];
  try {
    const payload = results["pageLimit"] ? results["pageLimit"] : 0;
    return payload ? payload : 0;
  } catch (err) {}
};

// Needs to be deleted
export const setPageOptions = (
  _,
  dispatch,
  options = { offset: 0, limit: 0 }
) => {
  dispatch({
    type: constants.UPDATE,
    stateName,
    payload: {
      options,
    },
  });
};
