import React from "react";
import $ from "jquery";
import d3 from "d3"

class ApplicationPackRenderer {
  constructor(rootEl, diameter, applications, onClick) {
    this.rootEl = rootEl;
    this.diameter = diameter;
    this.applications = applications;
    this.onClick = onClick;

    this.format = d3.format(",d");
    this.color = d3.scale.category20c();
    this.bubble = d3.layout.pack()
      .sort(null)
      .size([diameter, diameter])
      .padding(1.5);
  }

  buildAndLoadSortedAppList() {
    var appNamesWithSizes = this.applications.map(
      (app) => ({
        name: app.name,
        value: app.asgs.reduce((acc, asg) => acc + asg.size, 0)
      })
    );
    appNamesWithSizes.sort((a, b) =>  b['value'] - a['value']);
    return {children: appNamesWithSizes};
  }

  updateView(data) {
    $(".node").remove();
    var myRef = this;
    var nodes = this.rootEl.selectAll(".node")
      .data(this.bubble.nodes(data)
        .filter(function (d) {
          return !d.children;
        }), function (d) {
        return d.name + "-" + d.value;
      });

    var node = nodes.enter().append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

    node.append("title")
      .text(function (d) {
        return d.name + ": " + myRef.format(d.value);
      });

    node.append("circle")
      .attr("r", function (d) {
        return d.r;
      })
      .style("fill", function (d) {
        return myRef.color(d.name);
      }).on('mouseover', function (d) {
        d3.select(this).style('cursor', 'pointer');
      }).on('click', function (d) {
        myRef.onClick(d.name);
      });

    var labels = node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .style("font-size", "10px")
      .text(function (d) {
        if (d.name) {
          return d.name.substring(0, d.r / 3);
        }
        return "";
      }).on('mouseover', function (d) {
        d3.select(this).style('cursor', 'pointer');
      }).on('click', function (d) {
        myRef.onClick(d.name);
      });

    labels.append('tspan')
      .attr('y', function (d) {
        return (d.r / 2.0);
      })
      .attr('x', '0')
      .style("text-anchor", "middle")
      .style("font-size", "10px")
      .text(function (d) {
        if (d.r > 20) {
          return myRef.format(d.value);
        }
        return '';
      });
  }

  renderBubbleChart(data) {
    this.updateView(data);
  }

  render() {
    var data = this.buildAndLoadSortedAppList();
    this.renderBubbleChart(data);
  }
}

export default class ApplicationPackView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({
        elRoot: d3.select('#applicationsPack')
      }
    );
  }

  drawApplicationsPack() {
    if (!this.state.elRoot) {
      return;
    }
    new ApplicationPackRenderer(this.state.elRoot, this.props.diameter, this.props.applications, this.props.onClick).render();
  }

  render() {
    return <svg id="applicationsPack"
                width={this.props.diameter}
                height={this.props.diameter}
                className="bubble">
      {this.drawApplicationsPack()}
    </svg>;
  }
}