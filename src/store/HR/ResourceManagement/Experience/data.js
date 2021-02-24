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
  organization: {
    type: types.string,
  },
  worked_position: {
    type: types.string,
  },
  start_date: {
    type: types.date,
  },
  end_date: {
    type: types.date,
  },
  duration: {
    type: types.string,
  },
  region: {
    type: types.date,
  },
  city: {
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
