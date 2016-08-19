import React, { Component } from 'react';
import TableDatum from './TableDatum.jsx';

export default class Table extends Component {
  render() {
    // Build headers
    const headerTh = this.props.headers
                        .sort((a, b) => {
                          if (a.title > b.title) {
                            return 1;
                          }
                          if (a.title < b.title) {
                            return -1;
                          }
                          return 0;
                        })
                        .map((name) => {

                          return <th data-toggle="tooltip"
                                     data-placement="top"
                                     data-container="body"
                                     title={name.context}
                                     className="col-box text-center">
                            {name.title}
                          </th>
                        });
    const tHead = <thead><tr><th className="row-header"></th>{headerTh}</tr></thead>

    // Populate rows
    let trBag = [];

    Object.keys(this.props.data).forEach(function(city) {
      let cityData = this.props.data[city];
      console.log(cityData);
      let tdBag = [<th className="row-header">{city}, {cityData[0]['State']}</th>];
      this.props.headers.forEach(function(header) {
        let continueBool = false;
        cityData.forEach(function(report) {
          if (!continueBool) {
            if (report["Type of Data"] === header.title) {
              // Hook in state manipulation
              tdBag.push(<td onClick={() => { this.props.handleClick(report) }} className="col-box bold-brand-bg table-data-hover">
                  <TableDatum svgDimensions={{ height: 20, width: 10 }} report={ report } />
              </td>);
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

      trBag.push(<tr ref={city}>{tdBag}</tr>);
    }.bind(this));

    // Sort rows A-Z
    trBag.sort((a, b) => {
      if (a.ref > b.ref) {
        return 1;
      }
      if (a.ref < b.ref) {
        return -1;
      }
      return 0;
    });

    return <div className="table-data container">
            <div className="row">
              <div className="col-xs-12">
                <div className="table-responsive">
                  <table id="pdi" summary="This is a census of currently available open datasets about police interactions with citizens in the US, including Use of Force, Officer Involved Shootings, and Complaints Against Police." className="table table-bordered table-hover">
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
