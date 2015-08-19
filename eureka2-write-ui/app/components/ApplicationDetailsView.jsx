import React from "react";
import { Panel, Table } from "react-bootstrap"
import $ from "jquery"

import ObjectView from "components/ObjectView";

export default class ApplicationDetailsView extends React.Component {

  constructor(props) {
    super(props);
  }

  renderApplicationsSummary() {
    var apps = this.props.applications;
    return <Panel header="Summary">
      return <Table striped bordered condensed hover responsive>
      <tbody>
        <tr><td>Total applications</td><td>{apps.length}</td></tr>
        <tr><td>Total ASGs</td><td>{apps.totalAsgs}</td></tr>
        <tr><td>Total instances</td><td>{apps.totalInstances}</td></tr>
      </tbody>
    </Table>
    </Panel>
  }

  renderSelectedApplicationDetails() {
    var application = this.props.selectedApplication;
    if (application) {
      var total = application.asgs.reduce((acc, asg) => acc + asg.size, 0);
      return <Panel header={`'${application.name}' (total ${total})`}>
        <ObjectView object={application}/>
      </Panel>;
    } else {
      return <Panel header="Application details">
        Select an application on the left
      </Panel>
    }
  }

  render() {
    if(this.props.applications && this.props.applications.length > 0) {
      return <div>
        {this.renderApplicationsSummary()}
        {this.renderSelectedApplicationDetails()}
      </div>;
    } else {
      return <div/>
    }
  }
}