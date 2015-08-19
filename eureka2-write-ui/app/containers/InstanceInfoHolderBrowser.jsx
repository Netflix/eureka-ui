import React from "react";
import { Col, Input, OverlayTrigger, Panel, Popover, Row, Tooltip } from "react-bootstrap"
import $ from "jquery"

import {fetchEntryHolders, fetchEntryHolder} from "../utils/restAPI";
import {queryParser} from "../utils/query"
import {SortTypes} from "../utils/sorting";

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

  sortBy(sortKey) {
    var sortDir = this.state.sortDir ? (this.state.sortDir == SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC) : SortTypes.ASC;
    this.setState({
        sortDir: sortDir,
        sortKey: sortKey
      }
    );
  }

  renderDataSummary() {
    if (this.state.holders) {
      var total = this.state.holders.length;
      var cardinalities = [];
      this.state.holders.forEach((holder) => {
        while (cardinalities.length <= holder.cardinality) {
          cardinalities.push(0);
        }
        cardinalities[holder.cardinality]++;
      });
      var groups = cardinalities.map((c, i) => c == 0 ? "" : i + '=' + c).filter((s) => s.length > 0).join(', ');
      return <Panel>
        Total instances: {total}, copies: [{groups}]
      </Panel>
    }
  }

  renderInstanceDetails() {
    if (this.state.instanceCopies) {
      return <InstanceInfoHolderView
        instanceCopies={this.state.instanceCopies}
        onHide={() => this.setState({instanceCopies: null})}
        />
    }
  }

  searchTooltip() {
    return <Popover title="Query options" bsStyle="info" bsSize="large">
      <ul>
        <li>id - query by instance id</li>
        <li>app - query by application name</li>
        <li>source - query by source (origin|name)</li>
        <li>cardinality - find all holders with the given number of copies</li>
      </ul>
    </Popover>;
  }

  render() {
    var sortedHolders = this.state.holders.slice(0);
    if (sortedHolders && this.state.sortKey) {
      var sortFun = null;
      var compare = (s1, s2) => (s1 < s2) ? -1 : ((s1 > s2) ? 1 : 0);
      var sortDir = this.state.sortDir;
      var sign = (sortDir && sortDir == SortTypes.DESC) ? -1 : 1;
      switch (this.state.sortKey) {
        case 'id':
          sortFun = (first, second) => sign * compare(first.id, second.id);
          break;
        case 'app':
          sortFun = (first, second) => sign * compare(first.app, second.app);
          break;
      }
      if (sortFun) {
        sortedHolders.sort(sortFun);
      }
    }

    return <Row className='show-grid'>
      <Col md={3}>
        <Panel header="View options">
          TODO
        </Panel>
      </Col>
      <Col md={9}>
        <OverlayTrigger placement='bottom' overlay={this.searchTooltip()}>
          <Input type='text'
                 addonBefore='Search'
                 placeholder='Enter search criteria'
                 hasFeedback
                 bsStyle={this.validationState()}
                 onChange={(e) => this.validateQuery(e)}
                 onKeyPress={(e) => this.submitQuery(e)}
            />
        </OverlayTrigger>
        {this.renderDataSummary()}
        <InstanceInfoHolderList holders={sortedHolders}
                                selectRow={(rowIdx) => this.selectRow(rowIdx)}
                                sortDir={this.state.sortDir}
                                sortBy={(key) => this.sortBy(key)}
                                sortKey={this.state.sortKey}
          />
        {this.renderInstanceDetails()}
      </Col>
    </Row>;
  }
}
