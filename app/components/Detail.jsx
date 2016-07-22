import React, { Component } from 'react';

export default class Detail extends Component {
  render() {
    return <div className="table-detail">
      {
        JSON.stringify(this.props.view, null, '\t')
      }
    </div>
  }
}
