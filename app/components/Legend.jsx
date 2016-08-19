import React, { Component } from 'react';
import $ from 'jquery';

export default class Legend extends Component {
  render() {
    const smallScreen = $(window).width() < 1000;
    return <div>
      <p><strong>{`Data qualities (${ smallScreen ? "click" : "hover over" } to see description):`}</strong></p>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {
          [
            "This first label is concerned with whether the data is machine readable (PDF, CSV, XML, etc).",
            "This second label is concerned with whether the data is freely available online and not behind a paywall or authorization wall.",
            "This third label is concerned with whether the data has context / meta text provided.",
            "This fourth label is concerned with whether the data is available in bulk (the whole dataset can be downloaded at once).",
            "This fifth label is concerned with whether the data is reasonably up-to-date (within past year).",
            "This sixth label is concerned with whether the data is incident-level data, i.e. information about each individual complaint or traffic stop, rather than an aggregated count of incidents."
          ]
          .map((header, index) => {
            return <div style={{ marginRight: 5 }} data-toggle="tooltip" data-placement="bottom" title={header} >
              <svg height={`${this.props.svgDimensions.height}`} width={`${this.props.svgDimensions.width}`}>
                  <rect height={`${this.props.svgDimensions.height}`} width={`${this.props.svgDimensions.width}`} fill={`#22416c`} />
                  <text x="1.1" y="15" font-size="30" fill="white">{index + 1}</text>
              </svg>
            </div>
          })
        }
      </div>
    </div>;
  }
}
