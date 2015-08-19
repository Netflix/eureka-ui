import React from "react";
import { Col, Grid, OverlayTrigger, Panel, Row, Popover } from "react-bootstrap"
import $ from "jquery"

import {fetchApplications} from "../utils/restAPI";

import ApplicationOptionsForm from "components/ApplicationOptionsForm";
import ApplicationPackView from "components/ApplicationPackView";
import ApplicationDetailsView from "../components/ApplicationDetailsView";
import ApplicationFooter from "../components/ApplicationFooter";

export default class ApplicationsBrowser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      applications: [],
      options: {},
      viewDiameter: 600
    };
  }

  componentDidMount() {
    this.loadApplications();

    this.updateWindowSize();
    var win = window;
    if (win.addEventListener) {
      win.addEventListener('resize', () => this.updateWindowSize(), false);
    }
  }

  updateWindowSize() {
    var root = $("#applicationViewPane");
    this.setState({
      viewDiameter: Math.min(root.width(), window.innerHeight)
    });
  }

  loadApplications() {
    fetchApplications().then((data) => this.setState({applications: data}));
  }

  applyOptions(options) {
    this.setState({
      options: options
    });
  }

  selectApplication(appName) {
    for (var app of this.state.applications) {
      if (app.name == appName) {
        this.setState({
          selectedApplication: app
        });
        return;
      }
    }
  }

  renderApplications() {
    if (this.state.applications.length > 0) {
      var selectedApps = this.state.applications;

      var minSize = this.state.options.minSize;
      if (minSize && minSize > 0) {
        selectedApps = selectedApps.filter((app) => app.asgs.reduce((acc, asg) => acc + asg.size, 0) >= minSize);
      }

      return <ApplicationPackView
        diameter={this.state.viewDiameter}
        applications={selectedApps}
        onClick={(e) => this.selectApplication(e)}
        />;
    }
    return <div>Loading...</div>;
  }

  render() {
    return <Grid>
      <Row className='show-grid'>
        <Col md={3}>
          <ApplicationOptionsForm onChange={(options) => this.applyOptions(options)}/>
        </Col>
        <Col id="applicationViewPane" md={6}>
          {this.renderApplications()}
        </Col>
        <Col md={3}>
          <ApplicationDetailsView applications={this.state.applications}
                                  selectedApplication={this.state.selectedApplication}/>
        </Col>
      </Row>
        <ApplicationFooter applications={this.state.applications}/>
    </Grid>;
  }
}
