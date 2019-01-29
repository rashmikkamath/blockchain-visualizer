import React from 'react';
import BlocksContainer from './components/BlocksContainer'
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <div>A Generic Hello World text</div>
        <BlocksContainer/>
      </div>
    );
  }
}

export default App;
