import React, { Component } from 'react';

export default class Detail extends Component {
  render() {
    console.log(JSON.stringify(this.props.view, null, '\t'));
    let boolHeaders = [
      "Data is machine readable",
      "Data is freely available online",
      "Context is provided",
      "Available in bulk",
      "Up-to-date",
      "Incident-level data"
    ];
    let display = !this.props.view["State"] ? "none" : "";
    return <div className="table-detail container" style={{display: display}}>

        <div onClick={() => { this.props.handleClick({}) }} className="text-center">
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

        <div class="container">
          {
            boolHeaders.map(function(header) {
              return <div className="inline-items">
                <p className="data-title">{header}:</p>
                <p className="text-overflow-clip">
                {
                  new Array(95 - header.length).join(".")
                }
                </p>
                &nbsp;
                <svg height="20" width="40">
                  <rect y="5" width="40" height="20" fill={this.props.view[header] == "Yes" ? "#8BDD3A" : (this.props.view[header] == "No" ? "#DD3D3A" : "#39BEFA") } />
                </svg>
              </div>
            }.bind(this))
          }
        </div>

        <div>
          <p className="data-title">Content Available:</p>
          <p>{this.props.view["Content Available"]}</p>
        </div>

        <div>
          <p className="data-title">Fields Included:</p>
          <p>{this.props.view["Fields Included"]}</p>
        </div>

        <div className="inline-items">
          <p className="data-title">Available downloads:</p>
          &nbsp;
          <p>{this.props.view["Available downloads"]}</p>
        </div>

        <div className="inline-items">
          <p className="data-title">Update frequency:</p>
          &nbsp;
          <p>{this.props.view["Update frequency"]}</p>
        </div>

        <div className="inline-items">
          <p className="data-title">Data timeline:</p>
          &nbsp;
          <p>{this.props.view["Data timeline"]}</p>
        </div>

    </div>
  }
}
