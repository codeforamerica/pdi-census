import React, { Component } from 'react';
import Tabletop from 'tabletop';
import Table from './Table.jsx';
import Detail from './Detail.jsx';
import List from './List.jsx';
import $ from 'jquery';

export default class Base extends Component {
    constructor(props) {
        super(props);

        // Stateful hold of PDI evaluations
        this.state = {
          data: {},
          headers: ["Response Time", "Use of Force", "Complaints", "Officer Involved Shootings", "Assaults on Officers", "Citations", "Traffic and Pedestrian Stops", "Pursuits"],
          view: {}
        };

        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
      // Our stateful store for parsed excel data
      let store = {};

      const public_spreadsheet_url = '1lv74SigFdFMJvza_dc2tBVd37r9E4-CPeY9YkRSaBxA';
      let showInfo = (_data) => {
        const data = _data["Completed Detailed Data"]["elements"];
        console.log(`Received ${data.length} rows of data 🗃 from https://docs.google.com/spreadsheets/d/${public_spreadsheet_url}`);

        data.forEach((rowObj) => {
          let city = rowObj["Department"];
          let type = rowObj["Type of Data"];
          if (store[city]) {
            rowObj["index"] = store[city].length;
            store[city].push(rowObj);
          } else {
            rowObj["index"] = 0;
            store[city] = [rowObj];
          }
        });

        // Event listenisers for resize event
        window.addEventListener("resize", function() {
            // Fixed responsiveness
            this.handleClick(this.state.view);
        }.bind(this));

        // Change our state when the data comes in and is parsed in our store
        this.setState({ data: store });

      }

      const tabletop = Tabletop.init( { key: public_spreadsheet_url, callback: showInfo } );
    }
    componentWillMount() {
      window.removeEventListener("resize", () => {});
    }
    handleClick(datum) {
      if (JSON.stringify(datum, null, '\t') == JSON.stringify(this.state.view, null, '\t')) {
        this.setState({view: {}});
      } else {
        this.setState({view: datum});
      }
    }
    render() {
        const list = <List className="list-data" handleClick={this.handleClick} headers={this.state.headers} data={this.state.data} />;
        const table = <Table className="table-data" handleClick={this.handleClick} headers={this.state.headers} data={this.state.data} />;
		const smallScreen = $(window).width() < 1000;
        const view = smallScreen ? list : table;
        return <div>
                  <div className={smallScreen ? "list-viz" : "table-viz"}>
                    {view}
                  </div>
                  <div className="table-viz">
                    <Detail
                      className="table-detail"
                      handleClick={this.handleClick}
                      view={this.state.view} />
                  </div>
               </div>
              }
}
