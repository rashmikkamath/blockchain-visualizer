import React from 'react';
import Table from './Table';

class BlocksContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
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

  render() {
    let content = <div>No data</div>  ;
    if (this.state.isLoaded) {
      content = <Table
                  tableData = {this.state.items}
                />
    } 
    return (
      <div>
       {content}
      </div>
    )
    
  }
}
export default BlocksContainer;