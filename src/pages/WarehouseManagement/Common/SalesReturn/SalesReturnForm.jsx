import React from "react";
import { CardBody, Form, Row, Col, CardHeader } from "reactstrap";
import ReusabelForm from "../../../common/form";
import { InlineTable } from "../../../common/InLineEditableTable";
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
import { statuses } from "config/statusTypes";
import { getLoading } from "store/Inventory/Common/SalesRetrun";
import { connect } from "react-redux";

class SalesReturnForm extends ReusabelForm {
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
    const { storeIssueVouchers, customers } = this.props.options;
    const { isView } = this.props;
    return (
      <>
        {/* <CardHeader className="border-0">Sales Return </CardHeader> */}
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              {isView && (
                <Col md={3} sm={12} xs={12}>
                  {this.renderInput("document_number", "Document No.")}
                </Col>
              )}
              <Col md={4} sm={6} xs={12}>
                {this.renderInput("sales_order_no", "Sales Order Number")}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect(
                  "siv_no",
                  "SIV No.",
                  storeIssueVouchers.map((siv) => ({
                    name: siv.document_number,
                    id: siv.id,
                  })),
                  "server"
                )}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderSelect("customer", "Customer", customers, "server")}
              </Col>

              {isView && (
                <>
                  <Col md={3} sm={12} xs={12}>
                    {this.renderInput({
                      name: "received_by",
                      label: "Received By",
                      disabled: true,
                    })}
                  </Col>
                  <Col md={3} sm={12} xs={12}>
                    {this.renderInput({
                      name: "posting_date",
                      label: "Posting Date",
                      type: "date",
                      disabled: true,
                    })}
                  </Col>
                  <Col md={3} sm={12} xs={12}>
                    {this.renderInput({
                      name: "approved_date",
                      label: "Approved Date",
                      type: "date",
                      disabled: true,
                    })}
                  </Col>
                  <Col md={3} sm={12} xs={12}>
                    {this.renderInput({
                      name: "approved_by",
                      label: "Approved By",
                      disabled: true,
                    })}
                  </Col>
                  <Col md={3} sm={12} xs={12}>
                    {this.renderSelect({
                      name: "status",
                      label: "Status",
                      options: statuses,
                      disabled: true,
                    })}
                  </Col>
                </>
              )}
              <Col md={12} sm={6} xs={12}>
                {this.renderInput("remarks", "Remarks (optional)", "textarea")}
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
      </>
    );
  }
}

export default connect(getLoading)(SalesReturnForm);
