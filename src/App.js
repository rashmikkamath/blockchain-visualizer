import React from 'react';
// Import routing components
import { Router, Route } from 'react-router-dom';
import BlocksContainer from './components/BlocksContainer';
import DetailsContainer from './components/DetailsContainer';
import createBrowserHistory from 'history/createBrowserHistory';
import './App.css';
const history = createBrowserHistory();

class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Route path='/' exact component={BlocksContainer} />
            <Route path='/details' component={DetailsContainer} />
          </div>
        </Router>
      </div>
      
    );
  }
}

export default App;
