import React from "react";
import { Card, CardBody, CardHeader, Form, Row, Col, Label } from "reactstrap";
import ReusabelForm from "pages/common/form";
import { InlineTable } from "pages/common/InLineEditableTable";
import {
  initialState,
  mainSchema,
  getColumns,
  lineSchema,
  lineContentMapper,
  populateState,
  saveLineTag,
  apiLineTag,
} from "./config";

class PayrollProcessAdd extends ReusabelForm {
  constructor(props) {
    super(props);
    this.initialState = initialState;
    this.state = JSON.parse(JSON.stringify(this.initialState));
    this.schema = mainSchema;
    this.handleLineSave = this.handleLineSave.bind(this);
    this.populateState = this.populateState.bind(this);
    this.updateLines = this.updateLines.bind(this);
    this.lineMapper = this.lineMapper.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  doSubmit = async () => {
    this.props.submit(this.state.data);
  };

  componentDidMount() {
    this.componentDidUpdate();
  }

  lineMapper() {
    if (this.props.isEdit || this.props.isView) {
      return lineContentMapper(this.props.data, apiLineTag);
    } else {
      return [];
    }
  }

  populateState(data) {
    const newData = populateState(data, this.lineMapper);
    this.setState({ lockUpdate: true, data: newData });
  }

  updateLines(lines) {
    if (lines.length > 0 || this.state.data[saveLineTag].length > 0) {
      this.setState({
        data: {
          ...this.state.data,
          [saveLineTag]: lines,
        },
      });
    }
  }

  componentDidUpdate() {
    if ((this.props.isEdit || this.props.isView) && !this.state.lockUpdate) {
      this.populateState(this.props.data);
    }
  }

  handleLineSave(data) {
    this.setState({
      data: {
        ...this.state.data,
        [saveLineTag]: data,
      },
    });
  }

  updateData(key, value) {
    this.setState({
      data: {
        ...this.state.data,
        [key]: value,
      },
    });
  }

  render() {
    return (
      <Card className="border-0">
        <CardHeader className="border-0">Disposal </CardHeader>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("from_date", "From Date", "date")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput("to_date", "To Date", "date")}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput({
                  name: "total_employee_pension",
                  label: "Total Employee Pension",
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput({
                  name: "total_income_tax",
                  label: "Total Income Tax",
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput({
                  name: "total_loan",
                  label: "Total Loan",
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput({
                  name: "total_local_sales",
                  label: "Total Local Sales",
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput({
                  name: "total_overtime",
                  label: "Total Overtime",
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput({
                  name: "total_pension_contribution",
                  label: "Total Pension Contribution",
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput({
                  name: "total_salary",
                  label: "Total Salary",
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput({
                  name: "total_transport_allowance",
                  label: "Total Transport Allowance",
                })}
              </Col>
              <Col md={12} sm={12} xs={12}>
                <CardHeader>Lines</CardHeader>

                <InlineTable
                  columns={getColumns(this.props)}
                  disabled={this.props.disabled}
                  data={this.state.data[saveLineTag]}
                  callback={this.updateLines}
                  schema={lineSchema}
                  startForm={this.props.isAdd}
                />
              </Col>
              <Col align="center">{this.renderButton("Save")}</Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
export default PayrollProcessAdd;
