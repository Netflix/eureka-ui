import React from "react";
import { Col, Panel, Row } from "react-bootstrap"
import $ from "jquery"

import EurekaChart from "components/EurekaChart";

var Chart = require('chart.js');

export default class ApplicationFooter extends React.Component {

  constructor(props) {
    super(props);
  }

  groupByApplicationSize(xs) {
    var ys = [];
    this.props.applications.forEach((app) => {
      var size = app.totalInstances;
      for (var i = 0; i < xs.length; i++) {
        if (ys.length <= i) {
          ys.push(0);
        }
        if (size >= xs[i] && size < xs[i + 1]) {
          ys[i] += 1;
          break;
        }
      }
    });
    return ys;
  }

  groupByAsgCount(xs) {
    var ys = [];
    this.props.applications.forEach((app) => {
      var size = app.asgs.length;
      for (var i = 0; i < xs.length; i++) {
        if (ys.length <= i) {
          ys.push(0);
        }
        if (size >= xs[i] && size < xs[i + 1]) {
          ys[i] += 1;
          break;
        }
      }
    });
    return ys;
  }

  render() {
    var xs = [0, 1, 2, 5, 10, 20, 30, 40, 50, 100, 200, 300, 400, 500, 1000, 2000, 3000, 4000, 5000];

    return <Row className='show-grid'>
      <Col md={6}>
        <EurekaChart xs={xs}
                     ys={this.groupByApplicationSize(xs)}
                     title="Application size distribution"
                     xTitle="Number of servers per application"
                     yTitle="Number of apps"/>
      </Col>
      <Col md={6}>
        <EurekaChart xs={xs}
                     ys={this.groupByAsgCount(xs)}
                     title="ASGs per application distribution"
                     xTitle="Number of ASGs per application"
                     yTitle="Number of apps"/>
      </Col>
    </Row>;
  }
}
