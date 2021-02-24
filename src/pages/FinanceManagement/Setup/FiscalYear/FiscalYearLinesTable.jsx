import React, { Component } from "react";
import Tabel from "../../../common/table";
import { Button } from "reactstrap";
import { MdDelete, MdEdit } from "react-icons/md";

class FiscalYearLinesTable extends Component {
  columns = [
    { path: "name", label: "Period Name" },
    { path: "start_date", label: "Start Date" },
    { path: "end_date", label: "End Date" },
    { path: "state", label: "State" },
    {
      key: "edit",
      content: (line) => {
        return !this.props.disabled && (
          <Button size="sm" outline onClick={() => this.props.onEdit(line)}>
            <MdEdit />
          </Button>
        )
      },
    },
    {
      key: "delete",
      content: (line) =>
        !this.props.disabled && (
          <Button
            size="sm"
            outline
            color="danger"
            onClick={() =>
              this.props.onDelete(line, "good_receiving_note_lines")
            }
          >
            <MdDelete />
          </Button>
        ),
    },
  ];

  render() {
    const { goodReceivingNoteLines } = this.props;
    return (
      <div>
        <Tabel columns={this.columns} data={goodReceivingNoteLines}></Tabel>
      </div>
    );
  }
}

export default FiscalYearLinesTable;
