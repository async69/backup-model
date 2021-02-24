import React from "react";
import { Card, CardBody, CardHeader, Form, Row, Col } from "reactstrap";
import ReusabelForm from "../../common/form";
import { InlineTable } from "../../common/InLineEditableTable/";
import { MainContext } from "../../../context/Main/";
import { getState } from "../../../context/Main/States/Department";
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

class SalesInvoiceForm extends ReusabelForm {
  constructor(props) {
    super(props);
    this.initialState = initialState;
    this.state = JSON.parse(JSON.stringify(this.initialState));
    this.schema = mainSchema;
    this.handleLineSave = this.handleLineSave.bind(this);
    this.populateState = this.populateState.bind(this);
    this.updateLines = this.updateLines.bind(this);
    this.lineMapper = this.lineMapper.bind(this);
  }

  doSubmit = async () => {
    this.props.submit(this.state.data);
  };

  static contextType = MainContext;

  componentDidMount() {
    this.componentDidUpdate();
  }

  lineMapper() {
    if (this.props.isEdit || this.props.isView) {
      return lineContentMapper(
        this.props.data,
        apiLineTag,
        getState(this.context.rootState)
      );
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

  render() {
    return (
      <Card className="border-0">
        <CardHeader className="border-0">{this.props.title}</CardHeader>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("firstName", "First Name")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("lastName", "Last Name")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "department",
                  label: "Department",
                })}
              </Col>
              <Col md={12} sm={12} xs={12}>
                {this.renderInput("remarks", "Remarks", "textarea")}
              </Col>

              <Col md={12} sm={12} xs={12}>
                <InlineTable
                  columns={getColumns(this.props.options)}
                  disabled={this.props.disabled}
                  data={this.state.data[saveLineTag]}
                  callback={this.updateLines}
                  startForm={this.props.isAdd}
                  schema={lineSchema}
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

export default SalesInvoiceForm;
