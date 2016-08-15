import React, { Component } from 'react';
import TableDatum from './TableDatum.jsx';

export default class List extends Component {
  render() {
    let list = [], tags = [];
    let boolHeaders = [ 'Data is machine readable', 'Data is freely available online', 'Context is provided', 'Available in bulk', 'Up-to-date', 'Incident-level data' ];
    for(let department in this.props.data) {

      // Add leading department w/ 0 suffix for better sorting
      tags.push(
        <p ref={department + '0'}>
            {department}
        </p>);

      for (var i = 0; i < this.props.data[department].length; i++) {
        let view = this.props.data[department][i];
        // Build table of contents
        const tag = view['Type of Data'].replace(/\W/g, '');
        tags.push(<div ref={`${department}${i+1}`}>
            <div style={{display: 'flex', flexDirection: 'row'}} ref={`${department}${i + 1}`}>
              <TableDatum svgDimensions={{height: 10, width:5}} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80px', marginLeft: '2em'}} report={view} />
              &emsp;
              <a href={`#${department}${tag}`}>
                {view['Type of Data']}
              </a>
            </div>
			</div>);

        // Build list
        list.push(<div className='list-item' id={`${department}${tag}`} ref={department}>

            <div className='inline-items'>
              <p className='data-title links'>Last Updated:</p>
              &nbsp;
              <p>{view['Row last updated']}</p>
            </div>

            <h1>
              {view['Department']}, {view['State']} - {view['Type of Data']}
            </h1>

            <div className='inline-items'>
              <p>{view['Description']}</p>
              <a href={`${view['Link']}`}>Source</a>
            </div>

            <ul className='leaders'>
              {
                boolHeaders.map(function(header) {
                  return <li>
                    <span className="blocks">
                      <svg height='20' width='20'>
                        <rect y='0' height='20' width='20' fill={view[header] == 'Yes' ? '#8BDD3A' : (view[header] == 'No' ? '#DD3D3A' : '#39BEFA') } />
                      </svg>
                    </span>
                    <span className='data-title'>{header}</span>
                  </li>
                }.bind(this))
              }
            </ul>

            {
              ['Content Available', 'Fields Included', 'Available downloads', 'Update frequency', 'Data timeline']
			  .map((header) => {
                return <div>
                  <p className='data-title'>{header}:</p>
                  <p>{view[header]}</p>
                </div>
              })
			}

			<a className="data-title links" href="#"><em>Back to Table of Contents</em></a>

			<hr style={{borderWidth: 3, marginBottom: 0, borderColor: '#8BDD3A'}}></hr>
      <hr style={{borderWidth: 5, marginTop: 0, marginBottom: 0, borderColor: '#DD3D3A'}}></hr>
      <hr style={{borderWidth: 3, marginTop: 0, borderColor: '#39BEFA'}}></hr>

        </div>);
      }
    }

    // Sort list and tags (TOC)
    list.sort((a, b) => {
      if (a.ref > b.ref) {
        return 1;
      }
      if (a.ref < b.ref) {
        return -1;
      }
      return 0;
    });
    tags.sort((a, b) => {
      if (a.ref > b.ref) {
        return 1;
      }
      if (a.ref < b.ref) {
        return -1;
      }
      return 0;
    });

    return <div className='list-data container'>
            <div className='row'>
              <div className='col-xs-12'>
              <h1>Table of Contents</h1>
              <div className='toc'>
                {tags}
              </div>
              <hr></hr>
			  {list}
              </div>
            </div>
          </div>
  }
}
