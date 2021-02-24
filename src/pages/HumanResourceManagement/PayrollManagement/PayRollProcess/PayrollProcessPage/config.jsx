import Joi from "joi-browser";

export const saveLineTag = "payroll_lines";

export const apiLineTag = "payroll_lines";

export const mainSchema = {
  from_date: Joi.any(),
  to_date: Joi.any(),
  total_employee_pension: Joi.any(),
  total_income_tax: Joi.any(),
  total_loan: Joi.any(),
  total_local_sales: Joi.any(),
  total_overtime: Joi.any(),
  total_pension_contribution: Joi.any(),
  total_salary: Joi.any(),
  total_transport_allowance: Joi.any(),
  payroll_lines: Joi.array().items(Joi.object()).min(1),
};

export const initialState = {
  data: {
    from_date: "",
    to_date: "",
    total_employee_pension: "",
    total_income_tax: "",
    total_loan: "",
    total_local_sales: "",
    total_overtime: "",
    total_pension_contribution: "",
    total_salary: "",
    total_transport_allowance: "",
    payroll_lines: [],
  },
  errors: {},
  selectedLine: "",
  lineCounter: 1,
};

export const populateState = (payrollProcess, lineMapper) => {
  return {
    from_date: payrollProcess.from_date,
    to_date: payrollProcess.to_date,
    total_employee_pension: payrollProcess.total_employee_pension,
    total_income_tax: payrollProcess.total_income_tax,
    total_loan: payrollProcess.total_loan,
    total_local_sales: payrollProcess.total_local_sales,
    total_overtime: payrollProcess.total_overtime,
    total_pension_contribution: payrollProcess.total_pension_contribution,
    total_salary: payrollProcess.total_salary,
    total_transport_allowance: payrollProcess.total_transport_allowance,
    [saveLineTag]: lineMapper(),
  };
};

export const lineContentMapper = (data, lineTag = saveLineTag) => {
  return data[lineTag].map((line) => ({
    _id: line.employee.id,
    employee_name: line.employee.first_name + " " + line.employee.father_name,
    employee_department: line.employee.department,
    employee_position: line.employee.position,
    basic_salary: line.basic_salary,
    employee_pension: line.employee_pension,
    employer_pension: line.employer_pension,
    income_tax: line.income_tax,
    net_salary: line.net_salary,
    non_taxable_income: line.non_taxable_income,
    taxable_income: line.taxable_income,
    total_deduction: line.total_deduction,
  }));
};

export const lineSchema = {
  _id: Joi.any().allow("").optional(),
  employee_name: Joi.any(),
  employee_department: Joi.any(),
  employee_position: Joi.any(),
  basic_salary: Joi.any(),
  employee_pension: Joi.any(),
  employer_pension: Joi.any(),
  income_tax: Joi.any(),
  net_salary: Joi.any(),
  non_taxable_income: Joi.any(),
  taxable_income: Joi.any(),
  total_deduction: Joi.any(),
};

export const getColumns = (props) => {
  return [
    {
      tag: "employee_name",
      label: "Name",
      type: "text",
    },
    {
      tag: "employee_department",
      label: "Department",
      type: "text",
    },
    {
      tag: "employee_position",
      label: "Position",
      type: "text",
    },
    {
      tag: "basic_salary",
      label: "Basic Salary",
      type: "text",
    },
    {
      tag: "employee_pension",
      label: "Employee Pension",
      type: "text",
    },
    {
      tag: "employer_pension",
      label: "Employer Pension",
      type: "text",
    },
    {
      tag: "income_tax",
      label: "Income Tax",
      type: "text",
    },
    {
      tag: "net_salary",
      label: "Net Salary",
      type: "text",
    },
    {
      tag: "non_taxable_income",
      label: "Non Taxable Income",
      type: "text",
    },
    {
      tag: "taxable_income",
      label: "Taxable Income",
      type: "text",
    },
    {
      tag: "total_deduction",
      label: "Total Deduction",
      type: "text",
    },
  ];
};
