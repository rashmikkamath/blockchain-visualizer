import React from 'react';
import * as d3 from "d3";
const TABLE_COLUMNS = ['hash', 'time', 'height', 'main_chain'];

class Table extends React.Component {
	constructor(props){
      super(props);
      this.drawTable = this.drawTable.bind(this);
   	}
	componentDidMount() {
    	this.drawTable();
  	}
  	componentDidUpdate() {
  		this.drawTable();
  	}
  	drawTable() {
  		let data = this.props.tableData['blocks'];
  		const self = this;
  		let timeClicks = 0;

  		// We cannot append an HTML element directly to svg, hence create
  		// a foriegn object inside the svg to append the table to.
  		let table =  d3.select("#table")
		    .append("foreignObject")
		    .attr("width", 500)
		    .attr("height", 500)
		    .append("xhtml:table");

  		let thead = table.append('thead')
		let	tbody = table.append('tbody');

		// append the header row
		let headers = thead.append('tr')
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
		    .html(function (d) {
		    	if (d.column === 'hash') {
		    		return "<a href='/details'>" + d.value + "</a>"
		    	}
		    	return d.value;
		    })
		    .on("click", (r) => {
		    	if (r.column === 'hash') {
		    		d3.event.preventDefault();
		    		self.props.linkClicked(r.value, 'block')
		    	}
		    })

		// Sort Functionality
		headers
    	.on("click", (d) => {
    		if (d === 'time' || d === 'height') {
    			timeClicks++;
    			// even number of clicks
    			if (timeClicks % 2 === 0) {
    				// sort ascending: numerically
    				rows.sort(function(a,b) {
			          	if (+a.time < +b.time) {
			          		return -1; 
			            } else if (+a.time > +b.time) { 
			              	return 1; 
			            } else {
			              	return 0;
			            }
		          	});
		          	this.className = 'aes';
		        // Odd number of clicks
    			}else if (timeClicks % 2 !== 0) { 
          			// sort descending: numerically
          			rows.sort(function(a,b) { 
			            if (+a.time < +b.time) { 
			              return 1; 
			            } else if (+a.time > +b.time) { 
			              return -1; 
			            } else {
			              return 0;
			            }
          			});
          			this.className = 'des';
        		}
    		}
    	})
  	}
  	render() {
	    return <svg ref={node => this.node = node}
	    			id="table"
      				width={800} height={800}>
      			</svg>
  	}
}

export default Table;