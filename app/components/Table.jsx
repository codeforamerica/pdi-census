import React, { Component } from 'react';

export default class Table extends Component {
  render() {
    // Build headers
    const headerTh = this.props.headers.map((name) => {
      return <th className="col-box">{name}</th>
    });
    const tHead = <thead><tr><th className="row-header">Department</th>{headerTh}</tr></thead>

    // Populate rows
    let trBag = [];
    // for(let city in this.props.data) {
    Object.keys(this.props.data).forEach(function(city) {
      let cityData = this.props.data[city];
      let tdBag = [<th className="row-header">{city}</th>];
      this.props.headers.forEach(function(header) {
        let continueBool = false;
        cityData.forEach(function(report) {
          if (!continueBool) {
            if (report["Type of Data"] === header) {
              // Hook in state manipulation
              tdBag.push(<td onClick={() => { this.props.handleClick(report) }} className="col-box bold-brand-bg table-data-hover"></td>);
              continueBool = true;
            }
          }
        }.bind(this));
        if (!continueBool) {
          tdBag.push(<td
            className="col-box opaque-brand-bg"
            onClick={() => { this.props.handleClick({}) }}
            ></td>)
        }
      }.bind(this));

      trBag.push(<tr>{tdBag}</tr>);
    }.bind(this));

    // Sort rows A-Z
    trBag.sort((a, b) => {
      if (a.props.children[0].props.children > b.props.children[0].props.children) {
        return 1;
      }
      if (a.props.children[0].props.children < b.props.children[0].props.children) {
        return -1;
      }
      return 0;
    });

    return <div className="table-data container">
            <div className="row">
              <div className="col-xs-12">
                <div className="table-responsive">
                  <table summary="This is a census of currently available open datasets about police interactions with citizens in the US, including Use of Force, Officer Involved Shootings, and Complaints Against Police." className="table table-bordered table-hover">
                    <caption className="text-center">Want to add or update a dataset? <a href="https://docs.google.com/a/codeforamerica.org/forms/d/1Qe3UQOPI7w0QxdsVVhy6tTbX5TYMlqc48duP7YP9z6k/viewform">Click here</a></caption>
                    {tHead}
                    <tbody>
                      {trBag}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
  }
}
