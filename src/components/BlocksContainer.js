import React from 'react';
import Table from './Table';
import apiService from '../utils/apiService';

class BlocksContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: [],
      isLinkClicked: false,
      blockDetails: [],
      type: '',
    };
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  componentDidMount() {
    // Today's date in milliseconds
    let d = new Date();
    const dateToday = d.getTime();

    // Construct the apiUrl to fetch all blocks in todays date
    const apiUrl = 'https://blockchain.info/blocks/';
    let url = apiUrl + dateToday + '?format=json';

    apiService(url)
      .then(response => {
        this.setState({
          isLoaded: true,
          items: response
        });
      });
  }

  handleLinkClick(hash, type) {
    let apiUrl;
    if (type === 'block') {
      apiUrl = 'https://blockchain.info/rawblock/';
    } else if (type === 'tx') {
      apiUrl = 'https://blockchain.info/rawtx/';
    }
    let url = apiUrl + hash;

    apiService(url)
      .then(response => {
        this.setState({
        isLoaded: true,
        blockDetails: response,
        isLinkClicked: true,
        type: type,
      });
        this.props.history.push({
          pathname: '/details',
          state: { details: response , type: type }
        })
      });

  }
  render() {
    let content = <p> Loading ...</p>;
    if (this.state.isLoaded && !this.state.isLinkClicked) {
      content = <div>
                  <h2>Blocks Today</h2>
                  <p> The table below shows all blocks and related data for today. Click the time header to sort data by time.</p>
                  <p> Click on the hash ids to view block details.</p>  
                  <Table
                    tableData = {this.state.items}
                    linkClicked={this.handleLinkClick}
                  />
                </div>
    }
    return (
      <div className="main">
       {content}
      </div>
    )
    
  }
}
export default BlocksContainer;