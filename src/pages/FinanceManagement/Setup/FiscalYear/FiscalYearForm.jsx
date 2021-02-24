import React from "react";
import { CardBody, Label, Form, Row, Col } from "reactstrap";
import FiscalYearLinesTable from "./FiscalYearLinesTable";
import Joi from "joi-browser";
import ReusabelForm from "../../../common/form";
import FiscalYearLineForm from "./FiscalYearLineForm";
import stateTypes from "../../../../static/data/stateTypes.json";
import { getYears } from "../../../../helpers/date";
import { connect } from "react-redux";
import { getLoading } from "../../../../store/Finance/Setup/FiscalYear/";

class FiscalYearForm extends ReusabelForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        id: "",
        year: "",
        start_date: "",
        end_date: "",
        state: "",
        good_receiving_note_lines: [],
      },
      errors: {},
      selectedLine: "",
      lineCounter: 1,
    };
    this.state = JSON.parse(JSON.stringify(this.initialState));
    this.schema = {
      id: Joi.any().allow("").optional(),
      year: Joi.string().required().label("year"),
      start_date: Joi.string().required().label("start_date"),
      state: Joi.string().required().label("state"),
      end_date: Joi.string().required().label("end_date"),
      good_receiving_note_lines: Joi.array().items(Joi.object()).min(1),
    };
  }

  doSubmit = async () => {
    this.props.submit(this.state.data);
  };

  mapToViewModel(fiscalYear) {
    return {
      id: fiscalYear.id,
      year: fiscalYear.year,
      start_date: fiscalYear.start_date,
      end_date: fiscalYear.end_date,
      state: fiscalYear.state,
      good_receiving_note_lines: fiscalYear.fiscal_year_period.map((line) =>
        this.getLineFormData(line)
      ),
    };
  }

  populateGoodReceivingNote() {
    const { goodReceivingNote } = this.props;
    if (!goodReceivingNote) return;
    this.setState({ data: this.mapToViewModel(goodReceivingNote) });
  }
  componentDidMount() {
    this.componentDidUpdate();
  }

  getLineFormData(line) {
    if (line) {
      return {
        id: line.id,
        name: line.name,
        start_date: line.start_date,
        end_date: line.end_date,
        state: line.state,
      };
    }
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        id: data.id ? data.id : "",
        year: data.year ? data.year : "",
        state: data.state ? data.state : "",
        start_date: data.start_date ? data.start_date : "",
        end_date: data.end_date ? data.end_date : "",
        good_receiving_note_lines: data.fiscal_year_period.map((line) => ({
          id: line.id,
          name: line.name,
          start_date: line.start_date,
          end_date: line.end_date,
          state: line.state,
        })),
      },
      lockUpdate: true,
    };
    this.setState(updatedState);
  }

  componentDidUpdate() {
    if ((this.props.isEdit || this.props.isView) && !this.state.lockUpdate) {
      this.populateState(this.props.data);
    }
  }

  render() {
    return (
      <>
        {/* <CardHeader className="border-0">{this.props.title}</CardHeader> */}
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "year",
                  label: "Year",
                  options: getYears(),
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput({
                  name: "start_date",
                  label: "Start Date",
                  type: "date",
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderInput({
                  name: "end_date",
                  label: "End Date",
                  type: "date",
                })}
              </Col>
              <Col className="mb-3" md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "state",
                  label: "State",
                  options: stateTypes,
                })}
              </Col>
              <Col md={12} sm={12} xs={12}>
                <Label>Periods</Label>
                <CardBody>
                  <FiscalYearLinesTable
                    goodReceivingNoteLines={this.getLineTableData(
                      this.state.data.good_receiving_note_lines,
                      {
                        item: [],
                        itemCategory: [],
                      }
                    )}
                    onEdit={this.handleLineEdit}
                    onDelete={this.handleLineDelete}
                    disabled={this.props.disabled}
                  />
                </CardBody>
              </Col>
              <Col align="center">{this.renderButton("Save")}</Col>
            </Row>
          </Form>
          <Row>
            <Col md={12} sm={12} xs={12}>
              {!this.props.disabled && (
                <>
                  <Label>Enter Line </Label>
                  <FiscalYearLineForm
                    onSubmit={this.handleLineSubmit}
                    selectedLine={this.getLineFormData(this.state.selectedLine)}
                    items={[]}
                    currencies={[]}
                    itemCategories={[]}
                    UOMs={[]}
                  />
                </>
              )}
            </Col>
          </Row>
        </CardBody>
      </>
    );
  }
}

export default connect(getLoading)(FiscalYearForm);
