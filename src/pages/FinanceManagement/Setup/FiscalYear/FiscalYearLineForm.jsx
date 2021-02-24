import React from "react"
import { CardBody, Col, Form, Row } from "reactstrap"
import ReusabelForm from "../../../common/form"
import Joi from "joi-browser"
import stateTypes from "../../../../static/data/stateTypes.json"

class FiscalYearLineForm extends ReusabelForm {
  initialState = {
    data: {
      id: "",
      name: "",
      start_date: "",
      end_date: "",
      state: ""
    },
    warehouseId: "",
    errors: {},
  }
  state = JSON.parse(JSON.stringify(this.initialState))
  schema = {
    id: Joi.any().allow("").optional(),
    name: Joi.string(),
    start_date: Joi.string(),
    end_date: Joi.string(),
    state: Joi.string(),
  }
  mapToViewModel(line) {
    return {
      id: line.id,
      name: line.name,
      start_date: line.start_date,
      end_date: line.end_date,
      state: line.state
    }
  }
  populateLine() {
    const { selectedLine } = this.props
    if (!selectedLine) return
    this.setState({ data: this.mapToViewModel(selectedLine) })
  }
  componentDidMount() {
    this.populateLine()
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevProps.selectedLine) !==
      JSON.stringify(this.props.selectedLine)
    ) {
      this.populateLine()
    }
  }
  doSubmit = async () => {
    try {
      this.props.onSubmit(this.state.data, "good_receiving_note_lines")
      this.resetForm()
    } catch (error) {
      console.log("submit error", error)
    }
  }
  handleWarehouseChange = (warehouseId) => {
    this.setState({ warehouseId })
  }
  render() {
    return (
      <CardBody>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col md={2} sm={12} xs={12}>
              {this.renderInput({
                name: "name",
                label: "Name"
              })}
            </Col>  
            <Col md={2} sm={12} xs={12}>
              {this.renderInput({
                name: "start_date",
                label: "Start Date",
                type: "date"
              })}
            </Col>
            <Col md={2} sm={12} xs={12}>
              {this.renderInput({
                name: "end_date",
                label: "End Date",
                type: "date"
              })}
            </Col>
            <Col md={2} sm={12} xs={12}>
              {this.renderSelect({
                name: "state",
                label: "State",
                options: stateTypes
              })}
            </Col>
            <Col align="center" md={12} sm={12} xs={12}>
              {this.renderButton("Insert Line")}
            </Col>
          </Row>
        </Form>
      </CardBody>
    )
  }
}

export default FiscalYearLineForm
