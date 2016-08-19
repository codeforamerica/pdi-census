import React, { Component } from 'react';
import Tabletop from 'tabletop';
import Table from './Table.jsx';
import Detail from './Detail.jsx';
import List from './List.jsx';
import Key from './Key.jsx';
import Legend from './Legend.jsx';
import $ from 'jquery';

export default class Base extends Component {
    constructor(props) {
        super(props);

        // Stateful hold of PDI evaluations
        this.state = {
          data: {},
          headers: [
            { title: "Response Time",                 context: "This refers to data on the time it takes for this department to respond to incidents." },
            { title: "Use of Force",                  context: "This refers to data on use of force incidents by this department." },
            { title: "Complaints",                    context: "This refers to data on complaints issued by citizens towards this department." },
            { title: "Officer Involved Shootings",    context: "This refers to data on officer-involved shootings by this department." },
            { title: "Assaults on Officers",          context: "This refers to data on assaults committed on officers by this department." },
            { title: "Citations",                     context: "This refers to data on the citations reported on this department." },
            { title: "Traffic and Pedestrian Stops",  context: "This refers to data on traffic and pedestrian stops by this department." },
            { title: "Pursuits",                      context: "This refers to data on pursuits on by officers in this department." }
          ],
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

        // Event listeners for resize event
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
        let view = smallScreen ? list : table;

        // If we haven't loaded in the data yet, shown a loading SVG animation
        if (!this.state.data) {
          view = <div className="wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="25" viewBox="0 0 120 30" fill="#8BDD3A"><circle cx="15" cy="15" r="11.8022"><animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"/><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"/></circle><circle cx="60" cy="15" r="12.1978" fill-opacity="0.3"><animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite"/><animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite"/></circle><circle cx="105" cy="15" r="11.8022"><animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"/><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"/></circle></svg>
          </div>
        }
        return <div>
                  <div className={ smallScreen ? "list-viz" : "table-viz" }>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }} className="header">
                      <Key svgDimensions={{ height: 20, width: 10 }} />
                      <Legend svgDimensions={{ height: 20, width: 10 }} />
                    </div>
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
