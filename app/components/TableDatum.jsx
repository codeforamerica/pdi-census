import React, { Component } from 'react';

export default class TableDatum extends Component {
  render() {
    return <div style={this.props.style} className="table-datum">
      {
        ["Data is machine readable", "Data is freely available online", "Context is provided", "Available in bulk", "Up-to-date", "Incident-level data"]
        .map((header) => {
          return <div data-toggle="tooltip" data-placement="top" title={`${header} - ${this.props.report[header]}`} >
            <svg id={`td${this.props.report['Department']}${header.split(" ").join("")}`} height={`${this.props.svgDimensions.height}`} width={`${this.props.svgDimensions.width}`}>
                <rect height={`${this.props.svgDimensions.height}`} width={`${this.props.svgDimensions.width}`} fill={this.props.report[header] == "Yes" ? "#8BDD3A" : (this.props.report[header] == "No" ? "#DD3D3A" : "#39BEFA") } />
            </svg>
          </div>
        })
      }
    </div>
  }
}
