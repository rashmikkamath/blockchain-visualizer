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
    this.goBack = this.goBack.bind(this);
  }

  //If a link is clicked, check whether its a block level or transaction level click.
  // If it's a block level click, let parent BlocksContainer know to redirect else if 
  // its a transaction level, do it here.
  handleLinkClick(hash, type, e) {
  	e.preventDefault();
  	if (type === 'block') {
  		this.props.linkClicked(hash, type);
  	} else {
  		const apiUrl = 'https://blockchain.info/rawtx/';
    	let url = apiUrl + hash;

    // For DRY purposes this code along with the code in BlocksContainer should be cleaned up.
    fetch(url, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => {
        return res.json()
      })
      .then(
        (result) => {
          this.props.history.push({
            pathname: '/details',
            state: { details: result, type: type }
          })
        },
        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
        }
      )
  	}
  }

  //Go Back button functionality.
  goBack() {
  	this.props.history.goBack();
  }
  render() {
  	const links = this.props.location.state.details;
  	let type = this.props.location.state.type;
  	let txItems;
	let content;
	let listItems;

  	// Details Container will render differently depending on whether it is a block or transaction detail
  	if (type === 'block') {
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
	  		// If transactions list them out by hash.
	  		else if(key === 'tx') {
	  			txItems = links[key].map((tx, index) => {
	  				let boundLinkClick = this.handleLinkClick.bind(this, tx.hash, 'tx');
	  				return <div key={index}>
	  							<li key={index}>
	  							<a href="/details" onClick={boundLinkClick}>{tx.hash}</a>
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
	} else if(type === 'tx') {
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
    		<button onClick={this.goBack}>Go Back</button>
    		{type === 'block' ? <p className="title"> Block: {links.hash}</p> : <p className="title"> Transaction: {links.hash}</p>}
    		{listItems}
    		{content}
    		
    	</div>
    );
  }
}

export default DetailsContainer;
