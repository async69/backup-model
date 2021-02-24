import { componentLock, stateName } from "./States/search";

export const constants = {
  UPDATE: "UPDATE",
  CLEAR: "CLEAR",
  CHANGE_LOCK: "CHANGE_LOCK",
};

export const initialState = {
  [stateName]: {
    [componentLock]: true,
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.CLEAR: {
      return initialState;
    }
    case constants.UPDATE:
      if (action.stateName) {
        // console.log("action", action.payload)
        return {
          ...state,
          [action.stateName]: {
            ...state[action.stateName],
            ...action.payload,
          },
        };
      }
      break;
    default: {
      return false;
    }
  }
};
