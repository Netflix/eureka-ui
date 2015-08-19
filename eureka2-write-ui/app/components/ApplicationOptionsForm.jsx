import React from "react";
import { Input, Panel } from "react-bootstrap"
import $ from "jquery"

export default class ApplicationOptionsForm extends React.Component {

  constructor(props) {
    super(props);
  }

  formUpdate(e) {
    var rootEl = $("#applicationOptions");
    var options = {
      minSize: rootEl.find($("#minSize")).val()
    };
    console.log(options);
    this.props.onChange(options);
  }

  render() {
    return <Panel header="View options">
      <form id="applicationOptions">
        <Input id="minSize" type='select' label='Minimum size' placeholder='minSize' onChange={(e) => this.formUpdate(e)}>
          <option value='0'>unspecified</option>
          <option value='2'>2</option>
          <option value='5'>5</option>
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value='50'>50</option>
          <option value='100'>100</option>
        </Input>
      </form>
    </Panel>;
  }
}
