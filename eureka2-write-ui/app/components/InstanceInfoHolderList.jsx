import React from "react";
import FixedDataTable from "fixed-data-table";
import $ from "jquery";

import {fetchEntryHolder} from "../utils/restAPI";

export default class InstanceInfoHolderList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tableWidth: 800,
      tableHeight: 600,
      displayRow: -1
    };
  }

  componentDidMount() {
    this.updateWindowSize();
    var win = window;
    if (win.addEventListener) {
      win.addEventListener('resize', () => this.updateWindowSize(), false);
    }
  }

  updateWindowSize() {
    var root = $("#InstanceInfoHolderListDiv");
    this.setState({
      tableWidth: root.width() - 10,
      tableHeight: window.innerHeight,
    });
  }

  render() {
    var Table = FixedDataTable.Table;
    var Column = FixedDataTable.Column;

    return <div id="InstanceInfoHolderListDiv">
      <Table
        rowHeight={50}
        rowGetter={rowIndex => this.props.holders[rowIndex]}
        rowsCount={this.props.holders.length}
        width={this.state.tableWidth}
        height={this.state.tableHeight}
        headerHeight={50}
        onRowClick={(e,idx) => this.props.selectRow(idx)}>
        <Column
          dataKey='id'
          fixed={true}
          label='Instance id'
          width={100}
          flexGrow={1}
          />
        <Column
          dataKey='app'
          fixed={true}
          label='Application'
          width={100}
          flexGrow={1}
          />
        <Column
          dataKey='sources'
          fixed={true}
          label='Instance copy sources'
          width={100}
          flexGrow={1}
          />
      </Table>
    </div>
  }
};

InstanceInfoHolderList.propTypes = {
  holders: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};
