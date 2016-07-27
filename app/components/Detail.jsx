import React, { Component } from 'react';

export default class Detail extends Component {
  render() {
    let boolHeaders = [ "Data is machine readable", "Data is freely available online", "Context is provided", "Available in bulk", "Up-to-date", "Incident-level data" ];
    let display = !this.props.view["State"] ? "none" : "";
    return <div className="table-detail container" style={{display: display}}>

        <div style={{cursor: "pointer"}} onClick={() => { this.props.handleClick({}) }} className="text-center">
          <h3>&times;</h3>
        </div>

        <div className="inline-items">
          <p className="data-title">Last Updated:</p>
          &nbsp;
          <p>{this.props.view["Row last updated"]}</p>
        </div>

        <div className="inline-items">
          <p className="data-title">Type of Data:</p>
          &nbsp;
          <p>{this.props.view["Type of Data"]}</p>
        </div>

        <h1>
          {this.props.view["Department"]}, {this.props.view["State"]}
        </h1>

        <div className="inline-items">
          <p>{this.props.view["Description"]}</p>
          <a href={`${this.props.view["Link"]}`}>Source</a>
        </div>

        <ul className="leaders">
          {
            boolHeaders.map(function(header) {
              return <li>
                <span className="data-title">{header}:</span>
                <span>
                  <svg height="20" width="40">
                    <rect y="5" height="20" width="40" fill={this.props.view[header] == "Yes" ? "#8BDD3A" : (this.props.view[header] == "No" ? "#DD3D3A" : "#39BEFA") } />
                  </svg>
                </span>
              </li>
            }.bind(this))
          }
        </ul>

        {
          ["Content Available", "Fields Included", "Available downloads", "Update frequency", "Data timeline"].map((header) => {
            return <div>
              <p className="data-title">{header}:</p>
              <p>{this.props.view[header]}</p>
            </div>
          })
        }

    </div>
  }
}
