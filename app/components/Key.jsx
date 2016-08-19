import React, { Component } from 'react';

export default class Key extends Component {
  render() {
    let signs = [
      { hex: "#8BDD3A", text: "Yes" },
      { hex: "#DD3D3A", text: "No" },
      { hex: "#39BEFA", text: "Unsure" }
    ]
                    .map((data) => {
                      return <div className="key-datum" data-toggle="tooltip" data-placement="top">
                        <svg height={`${this.props.svgDimensions.height}`} width={`${this.props.svgDimensions.width}`}>
                            <rect height={`${this.props.svgDimensions.height}`} width={`${this.props.svgDimensions.width}`} fill={data.hex} />
                        </svg>
                        <p>{data.text}</p>
                      </div>
                    });
    return <div>
      <div>
        <p><strong>Keys</strong></p>
        {signs}
      </div>
    </div>;
  }
}
