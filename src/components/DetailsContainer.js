import React from 'react';
const humanize = str => {
  var frags = str.split('_');
  for (let i=0; i<frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(' ');
}


class DetailsContainer extends React.Component {
	constructor(props) {
    super(props);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }
  handleLinkClick(hash, type) {
  	console.log("link clicked", type)
  	this.props.linkClicked(hash, type);
  }
  render() {
  	const links = this.props.details;
  	let txItems;
	let content;
	let listItems;


  	// Details Container will render differently depending on whether it is a block or transaction detail
  	if (this.props.type === 'block') {
	  	
	  	// Create a label input combi for each key value pair in the per block data
	  	listItems = Object.keys(links).map((key, index) => {
	  		// If not of type transaction
	  		if (key !== 'tx') {
	  			let labelText = humanize(key);
	  		 	return <li key={index}>
			            <label>
			            <div className="label">{labelText}</div> 
			            <span>{links[key]}</span>
			            </label>
	        		</li>
	  		} 
	  		// if transactions list them out by hash
	  		else if(key === 'tx') {
	  			txItems = links[key].map((tx, index) => {
	  				let boundLinkClick = this.handleLinkClick.bind(this, tx.hash, 'tx');
	  				return <div key={index}>
	  							<li key={index}>
	  							<a href="" onClick={boundLinkClick}>{tx.hash}</a>
	        					</li>
	        				</div>
	  			});
	  		}
	  		return null;
	  	})
	  	if (txItems && txItems.length>0) {
	  		content = <div className="transactions">
	  					<p>Transactions ({txItems.length})</p>
	    				<div className="items">{txItems}</div>
	    			</div>
	  	} else {
	  		content = <span>Loading...</span>
	  	}
	} else if(this.props.type === 'tx') {
		listItems = Object.keys(links).map((key, index) => {
			let labelText = humanize(key);
			if (key !== 'out' && key !== 'inputs') {
				return <li key={index}>
			            <label>
			            <div className="label">{labelText}</div> 
			            <span>{links[key]}</span>
			            </label>
	        		</li>
			}
			return null
		})
	}
    
    return (
    	<div className="details">
    		{listItems}
    		{content}
    		
    	</div>
    );
  }
}

export default DetailsContainer;
