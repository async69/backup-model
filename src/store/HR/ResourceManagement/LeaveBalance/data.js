import { generateArray, types, tags } from "../../../../helpers/Generator";

const props = {
  id: {
    type: types.string,
    tag: tags.id,
  },
  employee_number: {
    type: types.string,
  },
  employee_name: {
    type: types.string,
  },
  department: {
    type: types.string,
  },
  annual_leave: {
    type: types.string,
  },
  leave_type: {
    type: types.string,
  },
  duration: {
    type: types.date,
  },
  leave_request_date: {
    type: types.date,
  },
  leave_from_date: {
    type: types.date,
  },
  leave_to_date: {
    type: types.date,
  },
  leave_balance: {
    type: types.string,
  },
  remarks: {
    type: types.string,
  },
  created_at: {
    type: types.timestamp,
  },
  updated_at: {
    type: types.timestamp,
  },
};

export default () => {
  const data = generateArray(10, props);
  return {
    count: data.length,
    results: data.slice(0, 5),
  };
};
