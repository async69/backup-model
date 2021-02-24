import React, { Component } from 'react';
import Table from 'pages/common/table'
import { Button } from "reactstrap";
import { MdDelete, MdEdit } from "react-icons/md";

class SalesQuoteLinesTable extends Component {
    columns = [
        {path:"item_category_code",label:"Item Category Code "},
        {path:"item_no",label:"Item No"},
        {path:"item_name",label:"Item Name"},
        {path:"quantity",label:"Quantity"},
        {path:"unit_measure",label:"Uit Measure"},
        {path:"unit_price",label:"Unit Price"},
        {path:"net_amount",label:"Net Amount"},
        {path:"currency",label:"Currency"},
        {path:"remarks",label:"Remarks"},
        {
            key: "edit",
            content: (line) => (
              <Button size="sm" outline onClick={() => this.props.onEdit(line)}>
                <MdEdit />
              </Button>
            ),
          },
          {
            key: "delete",
            content: (line) => (
              <Button
                size="sm"
                outline
                color="danger"
                onClick={() => this.props.onDelete(line)}
              >
                <MdDelete />
              </Button>
            ),
          },
    ]
    render() {
        const {salesQuoteLines} = this.props
        return (
            <div>
                <Table columns={this.columns} data={salesQuoteLines}/>
            </div>
        );
    }
}

export default SalesQuoteLinesTable;