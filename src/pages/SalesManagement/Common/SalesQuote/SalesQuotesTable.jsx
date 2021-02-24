import React, { Component } from 'react';
import Table from 'pages/common/table';

class SalesQuotesTable extends Component {
    columns = [
        {path:"document_number",label:"Document Number "},
        {path:"quoted_date",label:"Quoted Date"},
        {path:"customer_no",label:"Customer No "},
        {path:"customer_name",label:"Customer Name "},
        {path:"sales_region",label:"Sales Region"},
        {path:"sales_person",label:"Sales Person"},
        {path:"prepared_by",label:"Prepared By"},
        {path:"posting_date",label:"Posting Date "},
        {path:"approved_by",label:"Approved By "},
        {path:"approved_date",label:"Approved Date"},
        {path:"status",label:"Status"},
        {path:"last_modified_date",label:"Last M0dified Date"},
        {path:"remarks",label:"Remarks"},
    ]
    render() {
        const {salesQuotes} = this.props;
        return (
            <div>
                <Table columns={this.columns} data={salesQuotes}/>
            </div>
        );
    }
}

export default SalesQuotesTable;