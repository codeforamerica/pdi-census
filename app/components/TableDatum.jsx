import React, { Component } from 'react';

export default class TableDatum extends Component {
  render() {
    return <div className="table-datum">
      {
        ["Data is machine readable", "Data is freely available online", "Context is provided", "Available in bulk", "Up-to-date", "Incident-level data"]
        .map((header) => {
          return <svg height="20" width="10">
            <rect height="20" width="10" fill={this.props.report[header] == "Yes" ? "#8BDD3A" : (this.props.report[header] == "No" ? "#DD3D3A" : "#39BEFA") } />
          </svg>
        })
      }
    </div>
  }
}
