import React, { Component } from "react";
import _ from "lodash"; // for nesting property
import { getFormattedDate } from "helpers/date";
import getFormattedNumber from "helpers/number";
import numberTypes from "static/data/helpers/numberTypes.json";
import dateTypes from "static/data/helpers/dateTypes.json";
import Shimmer from "react-shimmer-effect";

class TableBody extends Component {
  //for nested s
  renderCell = (item, column, loading) => {
    // console.log("loaded", loading)
    if (column.content) return column.content(item, loading);
    const result = _.get(item, column.path);
    const numberIndex = numberTypes.findIndex(
      (type) => type === String(column.path)
    );
    const index = dateTypes.findIndex((type) => type === String(column.path));
    if (index >= 0) {
      const date = getFormattedDate(result);
      return date;
    } else if (numberIndex >= 0) {
      return getFormattedNumber("#,###.00", result, { enforceMaskSign: true });
    } else {
      return result? String(result) : "";
    }
  };

  //for buttons
  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };
  render() {
    const { data, columns } = this.props;

    const shimmer = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    const condition = _.isEmpty(data) ? shimmer : data;

    return (
      <tbody>
        {condition.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <>
                <td key={this.createKey(item, column)}>
                  {_.isEmpty(data) ? (
                    <Shimmer>
                      <div className="line" />
                    </Shimmer>
                  ) : (
                    <>{this.renderCell(item, column)}</>
                  )}
                </td>
              </>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;