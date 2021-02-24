import React, { useReducer } from "react";
import Page from "../../../../../components/Page";
import { Row, Col } from "reactstrap";
import CommonModals from "../../../../../components/CommonModal";

import EmployeeWidgetDetail from "../../../HRComponents/EmployeeWidgetDetail";

import {
  _toggle,
  initialState,
  reducer,
} from "../../../../common/ModalOptions";

export default function SingleEmployeeView({
  employee,
  employees,
  options,
  doneAdd,
  addEmployee,
  doneEdit,
  editEmployee,
  deleteEmployee,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <Page className="mt-4">
        <CommonModals
          size="xl"
          data={state.data}
          openModal={state.openModal}
          component={state.Component}
          toggle={_toggle}
          dispatch={dispatch}
          title={state.title}
        />
        <Row>
          <Col md={12} sm={6} xs={12}>
            <div>
              {employee ? (
                <EmployeeWidgetDetail
                  name={employee.first_name + " " + employee.father_name}
                  firstName={employee.first_name}
                  lastName={employee.father_name}
                  familyName={employee.grand_father_name}
                  department={employee.department.name}
                  position={employee.position.name}
                  employeeStatus={employee.status.name}
                  gender={employee.gender}
                  phoneNumber={employee.phone_no}
                  birthDate={employee.birth_date}
                  maritalStatu={employee.marital_status}
                  bankAccount={employee.bank_account_no}
                  empolyeeStartDate={employee.employment_start_date}
                  employeeEndDate={employee.employment_end_date}
                  homePhoneNumber={employee.home_phone_no}
                  supervisor={employee.supervisor_no}
                  emergencyName={employee.emergency_contact_name}
                  emergencyPhone={employee.emergency_contact_phone}
                  nationality={employee.nationality.name}
                  cityRegion={employee.city.name}
                  language={employee.language.name}
                  employeeType={employee.employment_type}
                  src={employee.picture}
                  employee={employee}
                  employees={employees}
                  options={options}
                  doneAdd={doneAdd}
                  addEmployee={addEmployee}
                  doneEdit={doneEdit}
                  editEmployee={editEmployee}
                  deleteEmployee={deleteEmployee}
                />
              ) : (
                <></>
              )}
            </div>
          </Col>
        </Row>
      </Page>
    </div>
  );
}
