const { toast } = require("react-toastify");

const toastify = (store) => (next) => (action) => {
  if (action.type === "error") {
    toast.error(action.payload.message);
  }
  return next(action);
};
export default toastify;
