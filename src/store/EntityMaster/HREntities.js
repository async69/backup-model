// ============== SETUP IMPORTS ===============
import {
  stateName as illness_type,
  reducer as IllnessTypeReducer,
} from "../HR/Setup/IllnessType";
import {
  stateName as certification_type,
  reducer as CertificationTypeReducer,
} from "../HR/Setup/CertificationType";
import {
  stateName as consignment_type,
  reducer as ConsignmentTypeReducer,
} from "../HR/Setup/ConsignmentType";
import {
  stateName as disciplinary_action_type,
  reducer as DisciplinaryActionTypeReducer,
} from "../HR/Setup/DisciplinaryActionType";
import {
  stateName as education_type,
  reducer as EducationTypeReducer,
} from "../HR/Setup/EducationType";
import {
  stateName as goal_type,
  reducer as GoalTypeReducer,
} from "../HR/Setup/GoalType";
import {
  stateName as institution,
  reducer as InstitutionReducer,
} from "../HR/Setup/Institution";
import {
  stateName as leave_type,
  reducer as LeaveTypeReducer,
} from "../HR/Setup/LeaveType";
import {
  stateName as qualification_level_type,
  reducer as QualificationLevelTypeReducer,
} from "../HR/Setup/QualificationLevelType";
import {
  stateName as termination_type,
  reducer as TerminationTypeReducer,
} from "../HR/Setup/TerminationType";
import {
  stateName as training_type,
  reducer as TrainingTypeReducer,
} from "../HR/Setup/TrainingType";
import {
  stateName as unit_of_duration,
  reducer as UnitOfDurationReducer,
} from "../HR/Setup/UnitOfDuration";

import {
  stateName as payroll_rates,
  reducer as PayrollRateReducer,
} from "../HR/Setup/PayrollRate";
import {
  stateName as salary_income_taxes,
  reducer as SalaryIncomeTaxReducer,
} from "../HR/Setup/SalaryIncomeTax";
import {
  stateName as payroll_posting_groups,
  reducer as PayrollPostingGroupReducer,
} from "../HR/Setup/PayrollPostingGroup";
import {
  stateName as qualification_type,
  reducer as QualificationTypeReducer,
} from "store/HR/Setup/QualificationType";

// ============== RESOURCE MANAGEMENT IMPORTS ===============
import {
  stateName as employees,
  reducer as EmployeesReducer,
} from "../HR/ResourceManagement/Employees";

import {
  stateName as absence_registration,
  reducer as AbsenceRegistrationReducer,
} from "../HR/ResourceManagement/AbsenceRegistration";
import {
  stateName as position_level,
  reducer as PositionLevelReducer,
} from "../HR/Setup/PositionLevel";
import {
  stateName as qualification,
  reducer as QualificationReducer,
} from "../HR/ResourceManagement/Qualification";
import {
  stateName as experience,
  reducer as ExperienceReducer,
} from "../HR/ResourceManagement/Experience";
import {
  stateName as language,
  reducer as LanguageReducer,
} from "../HR/Setup/Language";
import {
  stateName as position,
  reducer as PositionReducer,
} from "../HR/Setup/Position";
import {
  stateName as entryTypeName,
  reducer as EntryTypeNameReducer,
} from "../HR/Setup/EntryTypeNames";
import {
  stateName as employeeStatus,
  reducer as EmployeeStatusReducer,
} from "../HR/Setup/EmployeeStatus";

import {
  stateName as departments,
  reducer as DepartmentsReducer,
} from "../HR/Setup/Department";
import {
  stateName as nationality,
  reducer as NationalityReducer,
} from "../HR/Setup/Nationality";

//Resources Management

// ============== RESOURCE MANAGEMENT IMPORTS ===============
import {
  stateName as certification,
  reducer as CertificationReducer,
} from "../HR/ResourceManagement/Certification";
import {
  stateName as employee,
  reducer as EmployeeReducer,
} from "../HR/ResourceManagement/Employee";
import {
  stateName as training,
  reducer as TrainingReducer,
} from "../HR/ResourceManagement/Training";
import {
  stateName as termination,
  reducer as TerminationReducer,
} from "../HR/ResourceManagement/Termination";
import {
  stateName as leave_balance,
  reducer as LeaveBalanceReducer,
} from "../HR/ResourceManagement/LeaveBalance";
import {
  stateName as illness,
  reducer as IllnessReducer,
} from "../HR/ResourceManagement/Illness";
import {
  stateName as disciplinary_action,
  reducer as DisciplinaryActionReducer,
} from "../HR/ResourceManagement/DisciplinaryAction";
import {
  stateName as consignment,
  reducer as ConsignmentReducer,
} from "../HR/ResourceManagement/Consignment";
import {
  stateName as performance,
  reducer as PerformanceReducer,
} from "../HR/ResourceManagement/Performance";

// ============== PAYROL MANAGEMENT IMPORTS ===============
import {
  stateName as employee_overtimes,
  reducer as EmployeeOvertimesReducer,
} from "../HR/PayrollManagement/EmployeeOvertime";
import {
  stateName as employee_payrol_setups,
  reducer as EmployeePayrolSetupReducer,
} from "../HR/PayrollManagement/EmployeePayrollSetup";
import {
  stateName as employee_bonuses,
  reducer as EmployeeBonusReducer,
} from "../HR/PayrollManagement/EmployeeBonus";

import {
  stateName as payroll_process,
  reducer as PayrollProcessReducer,
} from "../HR/PayrollManagement/PayrollProcess";
import {
  stateName as save_payroll_process,
  reducer as SavePayrollProcessReducer,
} from "../HR/PayrollManagement/SavePayrollProcess";
import {
  stateName as employee_slip,
  reducer as EmployeeSlipReducer,
} from "../HR/PayrollManagement/EmployeeSlip";

export default {
  // ============== SETUP ===============≈≈≈≈≈≈
  [qualification_type]: QualificationTypeReducer,
  [illness_type]: IllnessTypeReducer,
  [certification_type]: CertificationTypeReducer,
  [consignment_type]: ConsignmentTypeReducer,
  [disciplinary_action_type]: DisciplinaryActionTypeReducer,
  [education_type]: EducationTypeReducer,
  [goal_type]: GoalTypeReducer,
  [institution]: InstitutionReducer,
  [leave_type]: LeaveTypeReducer,
  [position_level]: PositionLevelReducer,
  [qualification_level_type]: QualificationLevelTypeReducer,
  [termination_type]: TerminationTypeReducer,
  [training_type]: TrainingTypeReducer,
  [unit_of_duration]: UnitOfDurationReducer,
  // [departments]: DepartmentsReducer,
  // [nationality]: NationalityReducer,
  // [position_type]: PositionTypeReducer,
  // [employee_status]: EmployeeStatusReducer,
  // ============== RESOURCE MANAGEMENT ===============
  [employees]: EmployeesReducer,
  [absence_registration]: AbsenceRegistrationReducer,
  [qualification]: QualificationReducer,
  [experience]: ExperienceReducer,
  [departments]: DepartmentsReducer,
  [nationality]: NationalityReducer,
  [position]: PositionReducer,
  [entryTypeName]: EntryTypeNameReducer,
  [language]: LanguageReducer,
  [employeeStatus]: EmployeeStatusReducer,
  [payroll_rates]: PayrollRateReducer,
  [salary_income_taxes]: SalaryIncomeTaxReducer,
  [payroll_posting_groups]: PayrollPostingGroupReducer,
  // ========= RESOURCE MANAGEMENT =============
  [qualification]: QualificationReducer,
  [certification]: CertificationReducer,
  [training]: TrainingReducer,
  [termination]: TerminationReducer,
  [leave_balance]: LeaveBalanceReducer,
  [illness]: IllnessReducer,
  [disciplinary_action]: DisciplinaryActionReducer,
  [consignment]: ConsignmentReducer,
  [performance]: PerformanceReducer,
  [absence_registration]: AbsenceRegistrationReducer,
  [experience]: ExperienceReducer,
  [employee]: EmployeeReducer,

  // ============== PAYROL MANAGEMENT ===============
  [employee_overtimes]: EmployeeOvertimesReducer,
  [employee_payrol_setups]: EmployeePayrolSetupReducer,
  [employee_bonuses]: EmployeeBonusReducer,
  [payroll_process]: PayrollProcessReducer,
  [save_payroll_process]: SavePayrollProcessReducer,
  [employee_slip]: EmployeeSlipReducer,
};
