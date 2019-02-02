import React from 'react';
import apiService from '../utils/apiService';
import humanize from '../utils/utils';
import {Button} from 'react-bootstrap';


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
      apiService(url)
          .then(response => {
            this.props.history.push({
          pathname: '/details',
          state: { details: response, type: type }
          })
          });
    }
  }
  //Go Back button functionality.
  goBack() {
    this.props.history.goBack();
  }
  render() {
    const links = this.props.location.state.details;
    let type = this.props.location.state.type;
    return (
      <div className="details">
        <Button className="back-btn" variant="outline-secondary" onClick={this.goBack}>Go Back</Button>
        {type === 'block' ? <BlockDetails 
                              links ={links}
                              handleLinkClick={this.handleLinkClick}
                            /> :
                            <TransactionDetails
                              links ={links}
                            />
        }
        
      </div>
    );
  }
}

const BlockDetails = ({links, handleLinkClick}) => {
  let txItems;
  let listItems = Object.keys(links).map((key, index) => {
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
        let boundLinkClick = handleLinkClick.bind(this, tx.hash, 'tx');
        return <div key={index}>
              <li key={index}>
              <a href="/details" onClick={boundLinkClick}>{tx.hash}</a>
                </li>
              </div>
      });
    }
    return null;
  })
  return (
    <div>
      <p className="title"> Block: {links.hash}</p>
      {listItems}
      <div className="transactions">
        <p>Transactions ({txItems.length})</p>
        <div className="items">{txItems}</div>
      </div>
    </div>
  )
}


const TransactionDetails = ({ links }) => {
  let listItems = Object.keys(links).map((key, index) => {
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
  return (
    <div>
      <p className="title">Transactions: {links.hash}</p>
      {listItems} 
    </div>

  )
}
export default DetailsContainer;
