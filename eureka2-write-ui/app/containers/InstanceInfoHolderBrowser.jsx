import React from "react";
import { Input, Panel, Row, Col } from "react-bootstrap"
import $ from "jquery"

import {fetchEntryHolders, fetchEntryHolder} from "../utils/restAPI";
import {queryParser} from "../utils/query"
import InstanceInfoHolderList from "components/InstanceInfoHolderList";
import InstanceInfoHolderView from "components/InstanceInfoHolderView";

export default class InstanceInfoHolderBrowser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: null,
      queryString: '',
      validation: 'success',
      holders: []
    };
  }

  componentDidMount() {
    this.internalfetchEntryHolders();
  }

  validateQuery(event) {
    var filter = queryParser(event.target.value);
    this.setState({
      queryString: event.target.value,
      filter: filter,
      validation: filter['error'] ? 'error' : 'success'
    });
  }

  validationState() {
    return this.state.validation;
  }

  internalfetchEntryHolders() {
    fetchEntryHolders(this.state.filter).then((data) => this.setState({holders: data}));
  }

  submitQuery(event) {
    if (event.key == 'Enter' && this.state.validation == 'success') {
      this.internalfetchEntryHolders();
    }
  }

  selectRow(idx) {
    var instanceId = this.state.holders[idx].id;
    fetchEntryHolder(instanceId).then((data) => this.setState({instanceCopies: data}));
  }

  renderInstanceDetails() {
    if (this.state.instanceCopies) {
      return <InstanceInfoHolderView
        instanceCopies={this.state.instanceCopies}
        onHide={() => this.setState({instanceCopies: null})}
        />
    }
  }

  render() {
    return <Row className='show-grid'>
      <Col md={3}>
        <Panel header="View options">
          TODO
        </Panel>
      </Col>
      <Col md={9}>
        <Input type='text'
               addonBefore='Search'
               placeholder='Enter search criteria'
               hasFeedback
               bsStyle={this.validationState()}
               onChange={(e) => this.validateQuery(e)}
               onKeyPress={(e) => this.submitQuery(e)}
          />
        <InstanceInfoHolderList holders={this.state.holders} selectRow={(rowIdx) => this.selectRow(rowIdx)}/>
        {this.renderInstanceDetails()}
      </Col>
    </Row>;
  }
}
