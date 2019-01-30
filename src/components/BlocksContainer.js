import React from 'react';
import Table from './Table';
import DetailsContainer from './DetailsContainer';

class BlocksContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
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
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          console.log(error)
          this.setState({
            isLoaded: false,
            error
          });
        }
      )
  }

  handleLinkClick(hash, type) {
    let apiUrl;
    if (type === 'block') {
      apiUrl = 'https://blockchain.info/rawblock/';
    } else if (type === 'tx') {
      apiUrl = 'https://blockchain.info/rawtx/';
    }
    let url = apiUrl + hash;

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
          this.setState({
            isLoaded: true,
            blockDetails: result,
            isLinkClicked: true,
            type: type,
          });
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