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
  loan_item: {
    type: types.string,
  },
  loan_date: {
    type: types.date,
  },
  requested_date: {
    type: types.date,
  },
  expected_return_date: {
    type: types.date,
  },
  actual_return_date: {
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
