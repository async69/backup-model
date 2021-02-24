import React from "react";
import { Card, CardBody, Form, Row, Col } from "reactstrap";
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
import productTypes from "../../../../static/assets/options/productTypes.json";
import { connect } from "react-redux";
import { getLoading } from "../../../../store/Finance/SalesProcess/SalesInvoice/index";

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

  componentDidMount() {
    this.componentDidUpdate();
  }

  lineMapper() {
    if (this.props.isEdit || this.props.isView || this.props.isPatch) {
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
    if (
      (this.props.isEdit || this.props.isView || this.props.isPatch) &&
      !this.state.lockUpdate
    ) {
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
    const { customers, salesOrders } = this.props.options;
    console.log("options", this.props.options)
    return (
      <Card className="border-0">
        {/* <CardHeader className="border-0">{this.props.title}</CardHeader> */}
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "salesOrderNumber",
                  label: "Sales Order No.",
                  options: salesOrders.map(item => ({
                    ...item,
                    name: item.document_number
                  })),
                  optionsFrom: "server",
                })}
              </Col>
              <Col md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "customerName",
                  label: "Customer Name",
                  options: customers,
                  optionsFrom: "server",
                })}
              </Col>
              <Col className="mb-3" md={3} sm={6} xs={12}>
                {this.renderInput({
                  name: "postingDate",
                  label: "Posting Date",
                  type: "date",
                })}
              </Col>
              {this.props.isView && (
                <Col className="mb-3" md={3} sm={6} xs={12}>
                  {this.renderInput({
                    name: "status",
                    label: "Status",
                    disabled: true,
                  })}
                </Col>
              )}
              <Col className="mb-3" md={3} sm={6} xs={12}>
                {this.renderInput({
                  name: "totalAmount",
                  label: "Total Amount",
                  type: "number",
                })}
              </Col>
              <Col className="mb-3" md={3} sm={6} xs={12}>
                {this.renderSelect({
                  name: "withholding_tax_type",
                  label: "Item Type",
                  options: productTypes,
                })}
              </Col>
              <Col md={12} sm={6} xs={12}>
                {this.renderInput("remark", "Remarks", "textarea")}
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

export default connect(getLoading)(SalesInvoiceForm);
