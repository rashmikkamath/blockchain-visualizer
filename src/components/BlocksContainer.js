import React from 'react';

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
          this.setState({
            isLoaded: false,
            error
          });
        }
      )
  }

  render() {

    return (
      <div>
        Hi
      </div>
    )
    
  }
}
export default BlocksContainer;