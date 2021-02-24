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
  disciplinary_action_type: {
    type: types.string,
  },
  from_date: {
    type: types.date,
  },
  to_date: {
    type: types.date,
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
