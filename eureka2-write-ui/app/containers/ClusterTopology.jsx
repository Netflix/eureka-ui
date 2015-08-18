import React from "react";
import { Col, OverlayTrigger, Panel, Row, Popover } from "react-bootstrap"
import $ from "jquery"

import {fetchClusterTopology} from "../utils/restAPI";

import ClusterTopologyView from "components/ClusterTopologyView";
import ObjectView from "components/ObjectView"

export default class ClusterTopology extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      clusterTopology: {}
    }
  }

  componentDidMount() {
    this.loadClusterTopology();
  }

  loadClusterTopology() {
    fetchClusterTopology().then((data) => this.setState({clusterTopology: data}));
  }

  selectClusterNode(e) {
    this.setState({
      selectedClusterNode: e.data
    });
  }

  renderCluster() {
    if (this.state.clusterTopology) {
      return <ClusterTopologyView
        width={800}
        height={600}
        clusterTopology={this.state.clusterTopology}
        onClick={(e) => this.selectClusterNode(e)}
        />;
    }
    return null;
  }

  renderSelectedClusterNode() {
    var instanceInfo = this.state.selectedClusterNode;
    if (instanceInfo) {
      return <Panel header={`Cluster node details ${instanceInfo.id}`}>
        <ObjectView object={instanceInfo}/>
      </Panel>;
    } else {
      return <Panel header="Cluster node details">
        Select a cluster node
      </Panel>
    }
  }

  render() {
    return <Row className='show-grid'>
      <Col md={2}>
        <Panel header="View options">
          TODO
        </Panel>
      </Col>
      <Col md={6}>
        {this.renderCluster()}
      </Col>
      <Col md={4}>
        {this.renderSelectedClusterNode()}
      </Col>
    </Row>;
  }
}