import React from 'react';
import * as d3 from "d3";
const TABLE_COLUMNS = ['hash', 'time', 'height', 'main_chain'];

class Table extends React.Component {
	constructor(props){
      super(props)
      this.drawTable = this.drawTable.bind(this)
   	}
	componentDidMount() {
    	this.drawTable();
  	}
  	componentDidUpdate() {
  		this.drawTable();
  	}
  	drawTable() {
  		let data = this.props.tableData['blocks'];
  		console.log(this.props.tableData['blocks']);

  		// We cannot append an HTML element directly to svg, hence create
  		// a foriegn object inside the svg to append the table to.
  		let table =  d3.select("#table")
		    .append("foreignObject")
		    .attr("width", 500)
		    .attr("height", 500)
		    .append("xhtml:table");

  		//let table = svg.append('table');
  		let thead = table.append('thead')
		let	tbody = table.append('tbody');

		// append the header row
		thead.append('tr')
		  .selectAll('th')
		  .data(TABLE_COLUMNS).enter()
		  .append('th')
		    .text(function (column) { return column; });

		// create a row for each object in the data
		let rows = tbody.selectAll('tr')
		  .data(data)
		  .enter()
		  .append('tr');

		// create a cell in each row for each column
		rows.selectAll('td')
		  .data(function (row) {
		    return TABLE_COLUMNS.map(function (column) {
		      return {column: column, value: row[column]};
		    });
		  })
		  .enter()
		  .append('td')
		    .text(function (d) { return d.value; });
  		
  	}
  	render() {
	    return <svg ref={node => this.node = node}
	    			id="table"
      				width={1000} height={1000}>
      			</svg>
  	}
}

export default Table;