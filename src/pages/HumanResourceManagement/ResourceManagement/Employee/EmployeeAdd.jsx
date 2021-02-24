import React from "react";
import ParentForm from "../../../common/form";
import Joi from "joi-browser";

import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Form,
  Row,
  Col,
} from "reactstrap";

import { getLoading } from "store/HR/ResourceManagement/Employee";
import { connect } from "react-redux";
class EmployeeAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        first_name: "",
        father_name: "",
        grand_father_name: "",
        employment_type: "",
        gender: "",
        employment_start_date: "",
        employment_end_date: "",
        birth_date: "",
        place_of_birth: "",
        marital_status: "",
        bank_account_no: "",
        p_o_box: "",
        phone_no: "",
        home_phone_no: "",
        emergency_contact_name: "",
        emergency_contact_phone: "",
        picture: "",
        id_picture: "",
        remarks: "",
        department: "",
        position: "",
        position_level: "",
        supervisor_no: "",
        city: "",
        bank: "",
        nationality: "",
        language: "",
        status: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      id: Joi.string().allow("").optional(),
      first_name: Joi.string(),
      father_name: Joi.string(),
      grand_father_name: Joi.string(),
      employment_type: Joi.string(),
      gender: Joi.string(),
      employment_start_date: Joi.any().allow("").optional(),
      employment_end_date: Joi.any().allow("").optional(),
      birth_date: Joi.date().allow("").optional(),
      place_of_birth: Joi.string().allow("").optional(),
      marital_status: Joi.string(),
      bank_account_no: Joi.string().allow("").optional(),
      p_o_box: Joi.string().allow("").optional(),
      phone_no: Joi.string().allow("").optional(),
      home_phone_no: Joi.string().allow("").optional(),
      emergency_contact_name: Joi.string().allow("").optional(),
      emergency_contact_phone: Joi.string().allow("").optional(),
      picture: Joi.any().allow("").optional(),
      id_picture: Joi.any().allow("").optional(),
      remarks: Joi.string().allow("").optional(),
      department: Joi.string(),
      position: Joi.string(),
      position_level: Joi.string(),
      supervisor_no: Joi.string().allow("").optional(),
      city: Joi.string(),
      bank: Joi.string().allow("").optional(),
      nationality: Joi.string(),
      language: Joi.string(),
      status: Joi.string(),
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        first_name: data.first_name,
        father_name: data.father_name,
        grand_father_name: data.grand_father_name,
        employment_type: data.employment_type,
        gender: data.gender,
        employment_start_date: data.employment_start_date,
        employment_end_date: data.employment_end_date,
        birth_date: data.birth_date,
        place_of_birth: data.place_of_birth,
        marital_status: data.marital_status,
        bank_account_no: data.bank_account_no,
        p_o_box: data.p_o_box,
        phone_no: data.phone_no,
        home_phone_no: data.home_phone_no,
        emergency_contact_name: data.emergency_contact_name,
        emergency_contact_phone: data.emergency_contact_phone,
        picture: data.picture,
        id_picture: data.id_picture,
        remarks: data.remarks,
        department: data.department ? data.department.id : "",
        position: data.position ? data.position.id : "",
        position_level: data.position_level ? data.position_level.id : "",
        supervisor_no: data.supervisor_no ? data.supervisor_no : "",
        city: data.city ? data.city.id : "",
        bank: data.bank ? data.bank.id : "",
        nationality: data.nationality ? data.nationality.id : "",
        language: data.language ? data.language.id : "",
        status: data.status ? data.status.id : "",
      },
      lockUpdate: true,
    };
    this.setState(updatedState);
  }

  componentDidUpdate() {
    if ((this.props.isEdit || this.props.isView) && !this.state.lockUpdate) {
      this.populateState(this.props.data);
    }
    this.populateDefaults();
  }
  componentDidMount() {
    this.componentDidUpdate();
  }

  doSubmit() {
    const data = { ...this.state.data };
    if (!data.employment_end_date) delete data.employment_end_date;
    if (typeof data.picture !== "object" || data.picture == null)
      delete data.picture;
    if (typeof data.id_picture !== "object" || data.id_picture == null)
      delete data.id_picture;
    this.props.submit(data);
  }

  render() {
    const {
      employmentTypes,
      maritalStatuses,
      departments,
      positionLevels,
      positions,
      cities,
      nationalities,
      languages,
      employeeStatuses,
      employees,
      banks,
    } = this.props.options;

    const { employment_type, department, position } = this.state.data;

    return (
      <Card className="border-0">
        <CardHeader className="border-0">{this.props.title}</CardHeader>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col
                md={6}
                sm={12}
                xs={12}
                style={{ border: "3px dotted #222222", marginBottom: "5px" }}
                className="p-4 mb-6"
              >
                {this.renderFileUploader("picture", "Employee Photo")}
              </Col>
              <Col
                md={6}
                sm={12}
                xs={12}
                style={{ border: "3px dotted #222222", marginBottom: "5px" }}
                className="p-4 mb-6"
              >
                {this.renderFileUploader("id_picture", "Employee ID")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("first_name", "First Name")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("father_name", "Father's Name")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("grand_father_name", "Family Name")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "employment_type",
                  label: "Employment Type ",
                  options: employmentTypes,
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect("gender", "Gender ", ["Male", "Female"])}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput(
                  "employment_start_date",
                  "Employment Start Date ",
                  "Date"
                )}
              </Col>

              <Col md={3} sm={6} xs={12}>
                {this.renderInput({
                  name: "employment_end_date",
                  label: "Employment End Date ",
                  type: "Date",
                  disabled: employment_type !== "Contract",
                })}
              </Col>

              <Col md={3} sm={6} xs={12}>
                {this.renderInput("birth_date", "Date of Birth", "Date")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("place_of_birth", "Place Of Birth")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "marital_status",
                  label: "Maritial Status ",
                  options: maritalStatuses,
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("bank_account_no", "Bank Account Number ")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "bank",
                  label: "Bank",
                  options: banks,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("p_o_box", "Address")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("phone_no", "Phone Number")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("home_phone_no", "Home Phone Number")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput(
                  "emergency_contact_name",
                  "Emergency Contact Name"
                )}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput(
                  "emergency_contact_phone",
                  "Emergency Contact Phone"
                )}
              </Col>

              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "department",
                  label: "Department ",
                  options: departments,
                  optionsFrom: "server",
                })}
              </Col>

              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "position",
                  label: "Positon ",
                  options: positions.filter(
                    (p) => p.department.id === department
                  ),
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "position_level",
                  label: "Positon Level",
                  options: positionLevels.filter(
                    (pl) => pl.position.id === position
                  ),
                  optionsFrom: "server",
                })}
              </Col>

              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "supervisor_no",
                  label: "Supervisor ",
                  options: employees.map((employee) => ({
                    name: employee.first_name,
                    id: employee.id,
                  })),
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "city",
                  label: "City",
                  options: cities,
                  optionsFrom: "server",
                })}
              </Col>

              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "nationality",
                  label: "Nationality",
                  options: nationalities,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "language",
                  label: "Language",
                  options: languages,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "status",
                  label: "Employee Status",
                  options: employeeStatuses,
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={12} sm={12} xs={12}>
                {this.renderInput("remarks", "Remarks", "textarea")}
              </Col>
            </Row>
            <CardFooter align="center">
              {this.renderButton("Save Employee")}
            </CardFooter>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
export default connect(getLoading)(EmployeeAdd);
