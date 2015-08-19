import React from "react";
import $ from "jquery";
import d3 from "d3"

class RingRenderer {

  constructor(rootEl, cluster, type, radius, onClick) {
    this.rootEl = rootEl;
    this.cluster = cluster;
    this.type = type;
    this.radius = radius;
    this.onClick = onClick;

    this.color = d3.scale.ordinal()
      .domain(["G", "Y", "R"])
      .range(["#c7e9c0", "#ec7014", "#fff7bc"]);
  }

  drawArc(g, arc) {
    var color = this.color;
    g.append("path")
      .attr("d", arc)
      .style("fill", function (d) {
        return color(d.data.status);
      })
      .on('mouseover', function (d) {
        d3.select(this).style('cursor', 'pointer');
      })
      .on('click', this.onClick);
  }

  drawText(g, arc) {
    var textFun = d => d.data.id;
    g.append("text")
      .attr("transform", function (d) {
        return "translate(" + arc.centroid(d) + ")";
      })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .style("font-size", "10px")
      .text(function (d) {
        return textFun(d);
      });
  }

  drawRing() {
    var arc = d3.svg.arc()
      .outerRadius(this.radius - 10)
      .innerRadius(this.radius - 100);

    var pie = d3.layout.pie()
      .padAngle(.01)
      .value(function (d) {
        return 100;
      });

    var data = pie(this.cluster.servers);
    var arcClassName = `arc-${this.type}`;

    $("." + arcClassName).remove();
    var g = this.rootEl.selectAll("." + arcClassName)
      .data(data, function (d) {
        return d.data.id + '_' + d.data.status;
      })
      .enter().append("g")
      .attr("class", arcClassName);
    this.drawArc(g, arc);
    this.drawText(g, arc);
  }
}

export default class ClusterTopologyView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.setState({
        elRoot: d3.select('#clusterRing')
      }
    );
  }

  drawClusterTopology() {
    if (!this.state.elRoot) {
      return;
    }

    var width = this.props.width || 760;
    var height = this.props.height || 600;
    var radius = Math.min(width, height) / 2;

    if (this.props.clusterTopology.writeCluster) {
      new RingRenderer(
        this.state.elRoot, this.props.clusterTopology.writeCluster, "write", radius * 0.5, this.props.onClick
      ).drawRing();
    }
    if (this.props.clusterTopology.readCluster) {
      new RingRenderer(
        this.state.elRoot, this.props.clusterTopology.readCluster, "read", radius, this.props.onClick
      ).drawRing();
    }
  }

  render() {
    var transform = "translate(" + this.props.width / 2 + "," + this.props.height / 2 + ")";
    return <svg width={this.props.width} height={this.props.height}>
      <g id="clusterRing" transform={transform}>
        {this.drawClusterTopology()}
      </g>
    </svg>;
  }
}