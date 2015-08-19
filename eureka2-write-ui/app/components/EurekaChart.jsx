import React from "react";
import { Col, Panel, Row } from "react-bootstrap"
import $ from "jquery"

var Chart = require('chart.js');

export default class EurekaChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chart: null
    };
  }

  componentDidMount() {
    this.initializeChart(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.destroyChart();
    this.initializeChart(nextProps);
  }

  componentWillUnmount() {
    this.destroyChart();
  }

  initializeChart(props) {
    if (props.xs && props.xs.length > 0) {
      this.applicationSizeDistribution(props);
    }
  }

  destroyChart() {
    var chart = this.state.chart;
    if (chart) {
      chart.destroy();
    }
  }

  applicationSizeDistribution(props) {
    var data = {
      labels: props.xs.slice(0, props.ys.length),
      datasets: [
        {
          label: "Application size",
          fillColor: "rgba(220,220,220,0.5)",
          strokeColor: "rgba(220,220,220,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: props.ys
        }
      ]
    };

    var el = React.findDOMNode(this.refs.chartCanvas);
    var ctx = el.getContext("2d");
    var chart = new Chart(ctx).Bar(data, {});
    this.setState({
      chart: chart
    });
  }

  render() {
    return <Panel header={<div className="text-center">{this.props.title}</div>}>
      <p>
        <small>{this.props.yTitle}</small>
      </p>
      <canvas ref="chartCanvas" width="400" height="150"></canvas>
      <p className="text-center">
        <small >{this.props.xTitle}</small>
      </p>
    </Panel>;
  }
}
