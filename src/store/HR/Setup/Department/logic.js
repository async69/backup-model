// import constants from "../../../../constants/apiActions";
// import uuid from "../../../../helpers/uuid";
// const levelType = [
//   {
//     id: uuid(),
//     name: "Level Type one",
// const departments = [
//   {
//     id: uuid(),
//     name: "Department One",
// >>>>>>> this
//     code: "PHGJYEAB",
//     remarks: "",
//     created_at: String(new Date()),
//     updated_at: String(new Date()),
//   },
// ];

// export const simulateLogic = (config) => {
//   const { type, apiType, action, dispatch } = config;

//   switch (type) {
//     case constants.FETCH:
//       return fetchSimulator(apiType, action, dispatch);
//     case constants.ADD:
//       return addSimulator(apiType, action, dispatch);
//     case constants.EDIT:
//       return defaultSimulator(apiType, action, dispatch);
//     case constants.PATCH:
//       return defaultSimulator(apiType, action, dispatch);
//     case constants.REMOVE:
//       return deleteSimulator(apiType, action, dispatch);
//     default:
//       return null;
//   }
// };

// const fetchSimulator = (type, action, dispatch) => {
//   dispatch({
//     ...action.payload,
//     type,
// <<<<<<< HEAD
//     payload: departments,
// =======
// <<<<<<< HEAD:src/store/HR/Setup/PositionLevel/logic.js
//     payload: levelType,
// =======
//     payload: departments,
// >>>>>>> this:src/store/HR/Setup/Department/logic.js
// >>>>>>> this
//   });
// };

// export const addSimulator = (type, action, dispatch) => {
//   dispatch({
//     ...action.payload,
//     type,
//     payload: {
//       ...action.payload.data,
//       id: uuid(),
//     },
//   });
// };

// export const defaultSimulator = (type, action, dispatch) => {
//   dispatch({
//     ...action.payload,
//     type,
//     payload: action.payload.data,
//   });
// };

// export const deleteSimulator = (type, action, dispatch) => {
//   dispatch({
//     ...action.payload,
//     type,
//     payload: action.payload.data,
//   });
// };
