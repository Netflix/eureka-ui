import React from "react";
import { Button, Modal, Panel, Table } from "react-bootstrap"

export default class InstanceInfoHolderView extends React.Component {

  constructor(props) {
    super(props);
  }

  renderInstanceInfoAttribute(key) {
    var value = this.props.object[key];
    if (typeof value == "object" || typeof value == "array") {
      value = JSON.stringify(value, null, ' ');
    }
    var style = {
      "word-break": "break-word"
    }
    return <tr>
      <td>{key}</td>
      <td style={style}>{value}</td>
    </tr>;
  }

  render() {
    return <Table striped bordered condensed hover responsive>
      <thead>
      <tr>
        <th>Key</th>
        <th>Value</th>
      </tr>
      </thead>
      <tbody>
      {Object.keys(this.props.object).map((key) => this.renderInstanceInfoAttribute(key))}
      </tbody>
    </Table>;
  }
}
