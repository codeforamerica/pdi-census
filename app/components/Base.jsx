import React, { Component } from 'react';

export default class Base extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="container">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Age</th>
                        <th>City</th>
                        <th>Country</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Edmund</td>
                        <td>Korley</td>
                        <td>23</td>
                        <td>Newark, NJ</td>
                        <td>USA</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
               </div>
              }
}
