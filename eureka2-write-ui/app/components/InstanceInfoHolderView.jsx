import React from "react";
import { Button, Modal, Panel, Table } from "react-bootstrap"

import {addModalOpen, removeModalOpen} from "elements/ModalFix"
import ObjectView from "components/ObjectView"

export default class InstanceInfoHolderView extends React.Component {

  constructor(props) {
    super(props);
  }

  renderInstanceInfoCopy(copy) {
    var src = copy.source;
    var title = `${src.origin}/${src.name}/${src.id}`;
    return <Panel header={title} bsStyle='info'>
      <ObjectView object={copy.instanceInfo}/>
    </Panel>;
  }

  componentDidMount() {
    addModalOpen();
  }

  componentWillUnmount() {
    removeModalOpen();
  }

  render() {
    return <div>
      <Modal.Dialog onHide={this.props.onHide}>
        <Modal.Header closeButton={true} onHide={this.props.onHide}>
          <Modal.Title>Instance info {this.props.instanceCopies[0].instanceInfo.id}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {this.props.instanceCopies.map((copy) => this.renderInstanceInfoCopy(copy))}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>;
  }
}